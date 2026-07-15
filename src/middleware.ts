import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const allCookies = request.cookies.getAll();
  const sessionToken = allCookies.find(c => c.name.includes("session_token"));

  const { pathname } = request.nextUrl;

  // Protect all dashboard and items routes
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/items")) {
    if (!sessionToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/items/:path*"],
};
