// middleware.ts
import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      const isAuth = !!token
      const isAdminPage = req.nextUrl.pathname.startsWith("/admin")
      if (isAdminPage) return isAuth
      return true
    }
  }
})

export const config = {
  matcher: ["/admin/:path*"]
}