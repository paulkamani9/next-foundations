// Import Google OAuth provider and custom credentials provider from NextAuth
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing

import type { NextAuthConfig } from "next-auth"; // Import type definition for NextAuthConfig
import { LoginSchema } from "@/schemas"; // Import login schema for credentials validation
import { getUserByEmail } from "@/data/user"; // Import function to fetch user by email
import Google from "next-auth/providers/google"; // Import Google OAuth provider

// Default export: NextAuth configuration object
export default {
  providers: [
    // Configure Google OAuth provider with client ID and client secret from environment variables
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Configure custom credentials provider
    Credentials({
      // Authorize function to validate credentials
      async authorize(credentials) {
        // Validate incoming credentials using LoginSchema
        const validatedFields = LoginSchema.safeParse(credentials);

        // Check if validation succeeds
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          // Retrieve user from database based on email
          const existingUser = await getUserByEmail(email);

          // Return null if user does not exist or does not have a password (e.g., Google OAuth user)
          if (!existingUser || !existingUser.password) return null;

          // Compare provided password with hashed password stored in database
          const passwordMatch = await bcrypt.compare(
            password,
            existingUser.password
          );

          // Return user object if passwords match, otherwise return null
          if (passwordMatch) return existingUser;
        }

        // Return null if credentials are invalid or user does not exist
        return null;
      },
    }),
  ],
} as NextAuthConfig; // Ensure configuration satisfies NextAuthConfig interface
