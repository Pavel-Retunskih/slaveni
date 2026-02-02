import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

const uploadsBaseUrl = process.env.NEXT_PUBLIC_UPLOADS_BASE_URL;

const remotePatterns: RemotePattern[] = [];

if (uploadsBaseUrl) {
  try {
    const parsed = new URL(uploadsBaseUrl);
    const pathname = parsed.pathname.endsWith("/") ? `${parsed.pathname}**` : `${parsed.pathname}/**`;
    const protocol = parsed.protocol.replace(":", "");

    if (protocol !== "http" && protocol !== "https") {
      throw new Error(`Unsupported protocol for uploads base URL: ${protocol}`);
    }

    remotePatterns.push({
      protocol,
      hostname: parsed.hostname,
      port: parsed.port || undefined,
      pathname,
    });
  } catch (error) {
    console.warn("Invalid NEXT_PUBLIC_UPLOADS_BASE_URL provided:", error);
  }
}

remotePatterns.push({
  protocol: "https",
  hostname: "**.public.blob.vercel-storage.com",
  port: "",
  pathname: "/**",
}, {
  protocol: "https",
  hostname: "storage-675.s3hoster.by",
  port: "",
  pathname: "/**",
}, {
  protocol: "https",
  hostname: "slaveni.s3hoster.by",
  port: "",
  pathname: "/**",
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
