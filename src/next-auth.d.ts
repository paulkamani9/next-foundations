import NextAuth, { DefaultSession } from "next-auth"; // Import NextAuth and DefaultSession type
import { UserRole } from "@prisma/client"; // Import UserRole type from Prisma client

// Define ExtendedUser type based on DefaultSession["user"] with additional properties
export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole; // Role property of type UserRole
  isOAuth: boolean; // isOAuth property of type boolean
};

// Extend the Session interface from NextAuth
declare module "next-auth" {
  interface Session {
    user: ExtendedUser; // Update Session interface to include ExtendedUser
  }
}
