import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Authentication check is handled client-side using useSession hook.
  // Cross-domain cookies from backend are not visible to this frontend middleware.
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/items/:path*"],
};
