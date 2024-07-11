/**
 * List of routes accessible without authentication.
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/auth/new-verification",
  "/auth/new-password",
  "/auth/delete-account",
];

/**
 * List of routes related to authentication processes.
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
];

/**
 * Prefix for routes handling API authentication.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default path to redirect to after a successful login.
 * @type {string}
 */
export const defaultLoginRedirect = "/settings"; // we put our main page route here
