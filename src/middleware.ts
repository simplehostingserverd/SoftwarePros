import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Admin routes - require admin role
    if (pathname.startsWith("/admin")) {
      if (!token || token.role !== "admin") {
        return NextResponse.redirect(
          new URL("/auth/signin?callbackUrl=" + encodeURIComponent(pathname), req.url),
        );
      }
    }

    // Portal/Dashboard routes - require any authenticated user
    if (pathname.startsWith("/portal")) {
      if (!token) {
        return NextResponse.redirect(
          new URL("/auth/signin?callbackUrl=" + encodeURIComponent(pathname), req.url),
        );
      }
    }

    // API routes protection
    if (pathname.startsWith("/api/admin")) {
      if (!token || token.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    if (pathname.startsWith("/api/user") || pathname.startsWith("/api/onboarding")) {
      if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Public routes - allow everyone
        if (
          pathname.startsWith("/") &&
          !pathname.startsWith("/admin") &&
          !pathname.startsWith("/portal") &&
          !pathname.startsWith("/api/admin") &&
          !pathname.startsWith("/api/user") &&
          !pathname.startsWith("/api/onboarding")
        ) {
          return true;
        }

        // Auth routes - allow everyone
        if (pathname.startsWith("/auth")) {
          return true;
        }

        // Protected routes - require authentication
        return !!token;
      },
    },
    pages: {
      signIn: "/auth/signin",
    },
  },
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth.js API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|images|icons|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.ico$|.*\\.css$|.*\\.js$).*)",
  ],
};
