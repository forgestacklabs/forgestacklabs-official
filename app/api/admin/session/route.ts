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

type LoginBody = {
  adminEmail?: string;
  password?: string;
};

const loginWindowMs = 15 * 60 * 1000;
const maxLoginAttempts = 5;
const loginAttempts = new Map<string, { count: number; resetAt: number }>();

function clientKey(request: Request, email: string | undefined) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwardedFor || request.headers.get("x-real-ip") || "unknown";
  return `${ip}:${(email || "").trim().toLowerCase()}`;
}

function isRateLimited(key: string) {
  const now = Date.now();
  const attempt = loginAttempts.get(key);
  if (!attempt || attempt.resetAt <= now) {
    loginAttempts.delete(key);
    return false;
  }
  return attempt.count >= maxLoginAttempts;
}

function recordFailedLogin(key: string) {
  const now = Date.now();
  const attempt = loginAttempts.get(key);
  if (!attempt || attempt.resetAt <= now) {
    loginAttempts.set(key, { count: 1, resetAt: now + loginWindowMs });
    return;
  }
  attempt.count += 1;
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

  const body = (await request.json()) as LoginBody;
  const key = clientKey(request, body.adminEmail);

  if (isRateLimited(key)) {
    return NextResponse.json({ error: "Too many login attempts. Try again later." }, { status: 429 });
  }

  const user = verifyAdminLogin(body.adminEmail, body.password);
  if (!user) {
    recordFailedLogin(key);
    return NextResponse.json({ error: "Invalid admin email or password." }, { status: 401 });
  }

  loginAttempts.delete(key);

  const response = NextResponse.json({ authenticated: true, email: user.email, role: user.role, name: user.name });
  response.cookies.set(adminSessionCookieName, createAdminSessionValue(user), adminSessionCookieOptions());
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(adminSessionCookieName, "", { ...adminSessionCookieOptions(), maxAge: 0 });
  return response;
}