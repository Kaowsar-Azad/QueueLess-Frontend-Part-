import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    
    // Fetch session from backend using the incoming cookie header
    const res = await fetch(`${apiUrl}/auth/get-session`, {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });

    const data = await res.json().catch(() => null);
    
    const session = data?.session;
    const user = data?.user;

    // If not logged in, block protected routes
    if (!session || !user) {
      if (pathname.startsWith("/dashboard") || pathname.startsWith("/items")) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      return NextResponse.next();
    }

    // Role-based routing
    // @ts-expect-error - role field bypass
    const role = user.role || "user";

    // Admins only need access to admin dashboard
    if (role === "admin" && (pathname.startsWith("/dashboard/user") || pathname.startsWith("/dashboard/owner") || pathname === "/dashboard")) {
        return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    }
    
    // Owners only need access to owner dashboard
    if (role === "owner" && (pathname.startsWith("/dashboard/user") || pathname.startsWith("/dashboard/admin") || pathname === "/dashboard")) {
        return NextResponse.redirect(new URL("/dashboard/owner", request.url));
    }

    // Users (customers) cannot access admin/owner dashboards or item management
    if (role === "user" && (pathname.startsWith("/dashboard/admin") || pathname.startsWith("/dashboard/owner") || pathname.startsWith("/items/manage") || pathname.startsWith("/items/add") || pathname === "/dashboard")) {
        return NextResponse.redirect(new URL("/dashboard/user", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware session check failed:", error);
    // On network failure, let the request through so client-side guards can take over
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/items/:path*"],
};
