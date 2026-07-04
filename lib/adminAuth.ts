import { createHmac, timingSafeEqual } from "crypto";
import type { ForgeRole } from "@/lib/forgeosData";

export const adminSessionCookieName = "fsl_admin_session";

const hashAlgorithm = "sha256";
const sessionMaxAgeSeconds = 60 * 60 * 8;
const allowedRoles: ForgeRole[] = ["CEO", "CTO", "COO", "Employee"];

type AdminUser = {
  email: string;
  password: string;
  role: ForgeRole;
  name: string;
};

type AdminSession = {
  email: string;
  role: ForgeRole;
  name: string;
  exp: number;
};

function base64UrlEncode(input: Buffer | string) {
  return Buffer.from(input).toString("base64url");
}

function base64UrlDecode(input: string) {
  return Buffer.from(input, "base64url");
}

function isForgeRole(value: string): value is ForgeRole {
  return allowedRoles.includes(value as ForgeRole);
}

function getAdminUsers() {
  return (process.env.ADMIN_USERS || "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry): AdminUser | null => {
      const [email, password, roleValue, nameValue] = entry.split("|").map((part) => part.trim());
      if (!email || !password) return null;
      let role: ForgeRole = "Employee";
      if (isForgeRole(roleValue || "")) role = roleValue as ForgeRole;
      return { email: email.toLowerCase(), password, role, name: nameValue || email };
    })
    .filter((user): user is AdminUser => Boolean(user));
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || "";
}

function sign(value: string) {
  return createHmac(hashAlgorithm, getSessionSecret()).update(value).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

function safePasswordEqual(input: string, stored: string) {
  return safeEqual(input, stored);
}

function parseCookieHeader(cookieHeader: string | null | undefined) {
  return new Map(
    (cookieHeader || "")
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const separator = part.indexOf("=");
        if (separator === -1) return [part, ""];
        return [part.slice(0, separator), decodeURIComponent(part.slice(separator + 1))];
      }),
  );
}

export function hasAdminAuthConfig() {
  return getAdminUsers().length > 0 && Boolean(getSessionSecret());
}

export function missingAdminAuthConfigMessage() {
  if (!getAdminUsers().length) return "ADMIN_USERS is not configured.";
  return "ADMIN_SESSION_SECRET is not configured.";
}

export function verifyAdminLogin(email: string | null | undefined, password: string | null | undefined) {
  if (!email || !password || !hasAdminAuthConfig()) return null;

  const normalizedEmail = email.trim().toLowerCase();
  const user = getAdminUsers().find((adminUser) => adminUser.email === normalizedEmail);
  if (!user || !safePasswordEqual(password, user.password)) return null;

  return user;
}

export function createAdminSessionValue(user: AdminUser) {
  const payload: AdminSession = {
    email: user.email,
    role: user.role,
    name: user.name,
    exp: Math.floor(Date.now() / 1000) + sessionMaxAgeSeconds,
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  return `${encodedPayload}.${sign(encodedPayload)}`;
}

export function verifyAdminSessionValue(value: string | undefined) {
  if (!value || !hasAdminAuthConfig()) return null;

  const [encodedPayload, signature] = value.split(".");
  if (!encodedPayload || !signature || !safeEqual(sign(encodedPayload), signature)) return null;

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload).toString("utf8")) as AdminSession;
    if (!payload.email || !payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
    if (!isForgeRole(payload.role)) return null;
    if (!getAdminUsers().some((adminUser) => adminUser.email === payload.email)) return null;
    return payload;
  } catch {
    return null;
  }
}

export function getAdminSession(request: Request) {
  const cookies = parseCookieHeader(request.headers.get("cookie"));
  return verifyAdminSessionValue(cookies.get(adminSessionCookieName));
}

export function adminSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: sessionMaxAgeSeconds,
  };
}