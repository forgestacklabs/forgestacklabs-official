import { NextResponse } from "next/server";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

export function getClientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function rateLimit(
  request: Request,
  scope: string,
  options: { limit: number; windowMs: number; key?: string },
) {
  const now = Date.now();
  const key = `${scope}:${options.key || getClientIp(request)}`;
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + options.windowMs });
    return null;
  }

  if (current.count >= options.limit) {
    const retryAfter = Math.ceil((current.resetAt - now) / 1000);
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  current.count += 1;
  return null;
}

export function rejectOversizedRequest(request: Request, maxBytes: number) {
  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > maxBytes) {
    return NextResponse.json({ error: "Request payload is too large." }, { status: 413 });
  }
  return null;
}

export function validateSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return null;

  const host = request.headers.get("host");
  const allowedOrigins = new Set(
    [
      host ? `http://${host}` : "",
      host ? `https://${host}` : "",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "https://forgestacklabs.com",
      "https://www.forgestacklabs.com",
    ].filter(Boolean),
  );

  if (!allowedOrigins.has(origin)) {
    return NextResponse.json({ error: "Request origin is not allowed." }, { status: 403 });
  }

  return null;
}
