import NextAuth from "next-auth"; // Import NextAuth library
import authConfig from "@/auth.config"; // Import configuration for authentication
import { PrismaAdapter } from "@auth/prisma-adapter"; // Import PrismaAdapter for NextAuth
import { db } from "./lib/db"; // Import database instance
import { getUserById } from "./data/user"; // Import function to get user by ID
import { UserRole } from "@prisma/client"; // Import UserRole from Prisma client
import { getAccountByUserId } from "./data/account"; // Import function to get account by user ID

// Destructure handlers, auth, signIn, signOut from NextAuth
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  // Define custom pages for sign-in and error handling
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  // Define events handling for linking accounts
  events: {
    async linkAccount({ user }) {
      // Update user's email verification status upon linking an account
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  // Define callbacks for specific actions
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth users without email verification
      if (account?.provider !== "credentials") {
        return true;
      }
      const existingUser = await getUserById(user.id);
      // Return false for unverified email
      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async session({ session, token }) {
      // Update session with user ID, role, name, OAuth status, and email
      if (session.user && token.sub && token.role) {
        session.user.id = token.sub;
        session.user.role = token.role as UserRole;
      }
      if (session.user) {
        session.user.name = token.name;
        session.user.isOAuth = token.isOAuth as boolean;
      }
      if (token.email) {
        session.user.email = token.email;
      }

      return session;
    },
    async jwt({ token }) {
      // Update JWT token with user details from database and account existence
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      return token;
    },
  },
  // Configure adapter with Prisma for session management
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" }, // Define JWT as session strategy
  ...authConfig, // Spread additional authentication configurations
});
