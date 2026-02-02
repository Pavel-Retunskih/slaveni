import { DeleteObjectsCommand, S3Client } from "@aws-sdk/client-s3"
import { createHash } from "crypto"

const AWS_REGION = process.env.AWS_REGION
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
const S3_UPLOAD_BUCKET = process.env.S3_UPLOAD_BUCKET
const AWS_S3_ENDPOINT = process.env.AWS_S3_ENDPOINT
const AWS_S3_FORCE_PATH_STYLE = process.env.AWS_S3_FORCE_PATH_STYLE === "true"

export function createS3ClientWithMD5() {
  const client = new S3Client({
    region: AWS_REGION,
    endpoint: AWS_S3_ENDPOINT,
    forcePathStyle: AWS_S3_FORCE_PATH_STYLE,
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

  client.middlewareStack.addRelativeTo(md5Middleware, {
    relation: "after",
    toMiddleware: "flexibleChecksumsMiddleware",
    name: "addMD5ChecksumForDeleteObjects",
    tags: ["MD5_FALLBACK"]
  })

  return client
}

export async function testDelete(keys: string[]) {
  const client = createS3ClientWithMD5()
  const bucket = S3_UPLOAD_BUCKET

  if (!bucket) {
    throw new Error("S3_UPLOAD_BUCKET not configured")
  }

  console.log("Testing delete with MD5 checksum:", {
    bucket,
    keys,
    endpoint: AWS_S3_ENDPOINT,
    forcePathStyle: AWS_S3_FORCE_PATH_STYLE,
  })

  try {
    const result = await client.send(new DeleteObjectsCommand({
      Bucket: bucket,
      Delete: {
        Objects: keys.map((Key) => ({ Key })),
        Quiet: false,
      },
    }))

    console.log("Delete result:", {
      deleted: result.Deleted?.length || 0,
      errors: result.Errors?.length || 0,
      deletedObjects: result.Deleted,
      errorDetails: result.Errors,
    })

    return result
  } catch (error) {
    console.error("Delete failed:", error)
    throw error
  }
}
