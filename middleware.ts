import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const apexHost = "forgestacklabs.com";
const wwwHost = `www.${apexHost}`;

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";

  if (host === apexHost) {
    const url = request.nextUrl.clone();
    url.host = wwwHost;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
