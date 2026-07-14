import { NextResponse } from "next/server";
import {
  adminSessionCookieName,
  adminSessionCookieOptions,
  createAdminSessionValue,
  getAdminSession,
  hasAdminAuthConfig,
  missingAdminAuthConfigMessage,
  verifyAdminLogin,
} from "@/lib/adminAuth";
import { getClientIp, rateLimit, rejectOversizedRequest, validateSameOrigin } from "@/lib/requestGuards";

type LoginBody = {
  adminEmail?: string;
  password?: string;
};

function clientKey(request: Request, email: string | undefined) {
  const ip = getClientIp(request);
  return `${ip}:${(email || "").trim().toLowerCase()}`;
}

function configuredOrError() {
  if (hasAdminAuthConfig()) return null;
  return NextResponse.json({ error: missingAdminAuthConfigMessage() }, { status: 500 });
}

export async function GET(request: Request) {
  const configError = configuredOrError();
  if (configError) return configError;

  const session = getAdminSession(request);
  if (!session) return NextResponse.json({ authenticated: false }, { status: 401 });

  return NextResponse.json({ authenticated: true, email: session.email, role: session.role, name: session.name });
}

export async function POST(request: Request) {
  const configError = configuredOrError();
  if (configError) return configError;

  const originError = validateSameOrigin(request);
  if (originError) return originError;

  const sizeError = rejectOversizedRequest(request, 4 * 1024);
  if (sizeError) return sizeError;

  const body = (await request.json()) as LoginBody;
  const key = clientKey(request, body.adminEmail);
  const rateLimitError = rateLimit(request, "admin-login", { limit: 5, windowMs: 15 * 60 * 1000, key });
  if (rateLimitError) return rateLimitError;

  const user = verifyAdminLogin(body.adminEmail, body.password);
  if (!user) {
    return NextResponse.json({ error: "Invalid admin email or password." }, { status: 401 });
  }

  const response = NextResponse.json({ authenticated: true, email: user.email, role: user.role, name: user.name });
  response.cookies.set(adminSessionCookieName, createAdminSessionValue(user), adminSessionCookieOptions());
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(adminSessionCookieName, "", { ...adminSessionCookieOptions(), maxAge: 0 });
  return response;
}
