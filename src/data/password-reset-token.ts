"use server";

// Import the database instance from the specified path
import { db } from "@/lib/db";

// Retrieve a password reset token by token from the database
export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    // Attempt to find the password reset token that matches the given token
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });

    return passwordResetToken; // Return the password reset token if found
  } catch (error) {
    return null; // Return null if an error occurs or if no token is found
  }
};

// Retrieve a password reset token by email from the database
export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    // Attempt to find the password reset token that matches the given email
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email },
    });

    return passwordResetToken; // Return the password reset token if found
  } catch (error) {
    return null; // Return null if an error occurs or if no token is found
  }
};
