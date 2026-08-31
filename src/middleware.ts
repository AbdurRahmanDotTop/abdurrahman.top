import { defineMiddleware } from "astro:middleware";
import { verifySession } from "./lib/auth";

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect } = context;

  // Protect /admin routes (except /admin/login)
  if (url.pathname.startsWith("/admin") && url.pathname !== "/admin/login") {
    const token = cookies.get("admin_session")?.value;
    
    if (!token) {
      return redirect("/admin/login");
    }

    const session = await verifySession(token);
    if (!session) {
      // Invalid or expired token
      cookies.delete("admin_session", { path: "/" });
      return redirect("/admin/login");
    }

    // Set user info in locals
    context.locals.userId = session.userId;
  }

  // If user is already logged in and visits /admin/login, redirect to /admin
  if (url.pathname === "/admin/login") {
    const token = cookies.get("admin_session")?.value;
    if (token) {
      const session = await verifySession(token);
      if (session) {
        return redirect("/admin");
      }
    }
  }

  return next();
});
