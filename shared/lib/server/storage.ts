import { DeleteObjectsCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { randomUUID, createHash } from "crypto"

const AWS_REGION = process.env.AWS_REGION
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
const S3_UPLOAD_BUCKET = process.env.S3_UPLOAD_BUCKET
const AWS_S3_ENDPOINT = process.env.AWS_S3_ENDPOINT
const AWS_S3_FORCE_PATH_STYLE = process.env.AWS_S3_FORCE_PATH_STYLE === "true"
const AWS_S3_BUCKET_ENDPOINT = process.env.AWS_S3_BUCKET_ENDPOINT === "true"

const s3Client = new S3Client({
  region: AWS_REGION,
  endpoint: AWS_S3_ENDPOINT,
  forcePathStyle: AWS_S3_FORCE_PATH_STYLE,
  bucketEndpoint: AWS_S3_BUCKET_ENDPOINT,
  credentials: AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY
    ? {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    }
    : undefined,
})

const md5Middleware = (next: any, context: any) => async (args: any) => {
  const isDeleteObjects = context.commandName === "DeleteObjectsCommand"

  if (!isDeleteObjects) {
    return next(args)
  }

  const headers = args.request.headers

  Object.keys(headers).forEach((header) => {
    const lowerHeader = header.toLowerCase()
    if (lowerHeader.startsWith("x-amz-checksum-") || lowerHeader.startsWith("x-amz-sdk-checksum-")) {
      delete headers[header]
    }
  })

  if (args.request.body) {
    const bodyContent = Buffer.from(args.request.body)
    headers["Content-MD5"] = createHash("md5").update(bodyContent).digest("base64")
  }

  return await next(args)
}

s3Client.middlewareStack.addRelativeTo(md5Middleware, {
  relation: "after",
  toMiddleware: "flexibleChecksumsMiddleware",
  name: "addMD5ChecksumForDeleteObjects",
  tags: ["MD5_FALLBACK"]
})

function getBucketName(): string {
  if (!S3_UPLOAD_BUCKET) {
    throw new Error("S3_UPLOAD_BUCKET env is not configured")
  }

  return S3_UPLOAD_BUCKET
}

export function generateUploadKey(originalName?: string): string {
  const now = new Date()
  const year = now.getUTCFullYear()
  const month = String(now.getUTCMonth() + 1).padStart(2, "0")
  const day = String(now.getUTCDate()).padStart(2, "0")
  const extension = originalName?.includes(".") ? originalName.split(".").pop() : undefined
  const safeExtension = extension ? `.${extension.toLowerCase()}` : ""
  return `uploads/${year}/${month}/${day}/${randomUUID()}${safeExtension}`
}

export async function uploadBufferToS3(key: string, body: Buffer, contentType?: string): Promise<void> {
  const bucket = getBucketName()
  await s3Client.send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: contentType || "application/octet-stream",
    ACL: "public-read",
  }))
}

export async function deleteUploadsByKeys(keys: string[]): Promise<void> {
  const bucket = getBucketName()
  const uniqueKeys = Array.from(new Set(keys.filter(Boolean)))

  if (!uniqueKeys.length) {
    console.log("No keys to delete")
    return
  }

  console.log("Deleting objects from S3:", {
    bucket,
    keys: uniqueKeys,
  })

  try {
    const result = await s3Client.send(new DeleteObjectsCommand({
      Bucket: bucket,
      Delete: {
        Objects: uniqueKeys.map((Key) => ({ Key })),
        Quiet: false,
      },
    }))

    console.log("Delete result:", {
      deleted: result.Deleted?.length || 0,
      errors: result.Errors?.length || 0,
    })

    if (result.Errors && result.Errors.length > 0) {
      console.error("Delete errors:", result.Errors)
    }
  } catch (error) {
    console.error("Failed to delete objects from S3:", error)
    throw error
  }
}
