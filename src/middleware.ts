// Import the NextAuth function from the next-auth module
import NextAuth from "next-auth";

// Import the authentication configuration from a local module
import authConfig from "@/auth.config";

// Import route constants from a local module
import {
  apiAuthPrefix,
  authRoutes,
  defaultLoginRedirect,
  publicRoutes,
} from "@/routes";

// Initialize NextAuth with the provided authentication configuration
const { auth } = NextAuth(authConfig);

// Export the default authentication handler
export default auth((req): any => {
  // Destructure nextUrl from the request object
  const { nextUrl } = req;

  // Determine if the user is logged in by checking the auth property in the request
  const isLoggedIn = !!req.auth;

  // Check if the request is for an API authentication route
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  // Check if the request is for a public route
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  // Check if the request is for an authentication route
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Allow access if the request is for an API authentication route
  if (isApiAuthRoute) {
    return null;
  }

  // Redirect logged-in users away from authentication routes
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(defaultLoginRedirect, nextUrl));
    }
    return null;
  }

  // Redirect unauthenticated users to the login page for protected routes
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  // Allow access if none of the above conditions are met
  return null;
});

// Export the configuration for route matching
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"], // Define routes that the authentication handler should match
};
