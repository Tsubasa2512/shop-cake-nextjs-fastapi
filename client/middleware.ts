import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // If it's not an admin route, don't do anything
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  // If it's the login page and they're already logged in,
  // redirect to admin dashboard
  if (pathname === "/login") {
    const session = request.cookies.get("admin-session")
    if (session) {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
    return NextResponse.next()
  }

  // Check if the user is logged in
  const session = request.cookies.get("admin-session")
  if (!session) {
    // Store the original path and redirect to admin login
    return NextResponse.redirect(new URL("/login", request.url))
  }

  try {
    // Verify session is valid
    const sessionData = JSON.parse(session.value)
    if (Date.now() > sessionData.expiresAt) {
      // Session has expired
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // Check if user has admin role
    if (sessionData.user.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 403 })
    }
  } catch {
    // If there's any error parsing the session, redirect to login
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
}

