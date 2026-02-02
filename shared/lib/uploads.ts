const LEGACY_BLOB_HOST_SUFFIX = ".blob.vercel-storage.com"

const baseInfo = (() => {
  const rawBaseUrl = (process.env.NEXT_PUBLIC_UPLOADS_BASE_URL ?? process.env.UPLOADS_BASE_URL ?? "").trim()
  if (!rawBaseUrl) {
    return null
  }

  try {
    const parsed = new URL(rawBaseUrl)
    const trimmedPathname = parsed.pathname.replace(/\/+$/, "")
    return {
      origin: parsed.origin,
      pathname: trimmedPathname,
      href: `${parsed.origin}${trimmedPathname}` || parsed.origin,
    }
  } catch (error) {
    console.warn("Invalid uploads base URL provided:", error)
    return null
  }
})()

const PUBLIC_BASE_URL = baseInfo?.href ?? ""

const normalizePathname = (pathname: string): string => pathname.replace(/^\/+/, "")

export function getUploadsBaseUrl(): string {
  return PUBLIC_BASE_URL
}

export function buildPublicUploadUrl(key: string): string {
  if (!baseInfo) {
    throw new Error("Uploads base URL is not configured")
  }

  const normalizedKey = key.replace(/^\/+/, "")
  return `${baseInfo.href}/${normalizedKey}`
}

export function isLegacyBlobUrl(url: string): boolean {
  if (!url) {
    return false
  }

  try {
    const parsed = new URL(url)
    return parsed.hostname.endsWith(LEGACY_BLOB_HOST_SUFFIX)
  } catch {
    return false
  }
}

function isS3ManagedUrl(url: string): boolean {
  if (!baseInfo) {
    return false
  }

  try {
    const parsed = new URL(url)
    if (parsed.origin !== baseInfo.origin) {
      return false
    }

    const basePath = normalizePathname(baseInfo.pathname)
    const path = normalizePathname(parsed.pathname)

    if (!basePath) {
      return path.length > 0
    }

    return path.startsWith(`${basePath}/`)
  } catch {
    return false
  }
}

export function isManagedUploadUrl(url: string): boolean {
  if (!url) {
    return false
  }

  return isLegacyBlobUrl(url) || isS3ManagedUrl(url)
}

export function extractUploadKeyFromUrl(url: string): string | null {
  if (!baseInfo || !url) {
    return null
  }

  try {
    const parsed = new URL(url)
    if (parsed.origin !== baseInfo.origin) {
      return null
    }

    const basePath = normalizePathname(baseInfo.pathname)
    const path = normalizePathname(parsed.pathname)

    if (!basePath) {
      return path.length ? path : null
    }

    if (path.startsWith(`${basePath}/`)) {
      const key = path.slice(basePath.length + 1)
      return key.length ? key : null
    }

    return path.length ? path : null
  } catch {
    return null
  }

  return null
}

export function extractLegacyBlobPath(url: string): string | null {
  if (!isLegacyBlobUrl(url)) {
    return null
  }

  try {
    const parsed = new URL(url)
    const path = normalizePathname(parsed.pathname)
    return path.length ? path : null
  } catch {
    return null
  }
}
