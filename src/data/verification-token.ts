// Import the database instance from the specified path
import { db } from "@/lib/db";

// Retrieve a verification token by email from the database
export const getVerificationTokenByEmail = async (email: string) => {
  try {
    // Attempt to find the verification token that matches the given email
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });
    return verificationToken; // Return the verification token if found
  } catch (error) {
    return null; // Return null if an error occurs or if no token is found
  }
};

// Retrieve a verification token by token from the database
export const getVerificationTokenByToken = async (token: string) => {
  try {
    // Attempt to find the verification token that matches the given token
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });
    return verificationToken; // Return the verification token if found
  } catch (error) {
    return null; // Return null if an error occurs or if no token is found
  }
};
