"use server"; 

import { getUserByEmail } from "@/data/user"; // Import function to get user by email
import { getVerificationTokenByToken } from "@/data/verification-token"; // Import function to get verification token by token
import { db } from "@/lib/db"; // Import the database instance

// Function to handle new email verification
export const newVerification = async (token: string) => {
  // Retrieve the verification token from the database
  const existingToken = await getVerificationTokenByToken(token);

  // Check if the token does not exist
  if (!existingToken) {
    return { error: "Error, please sign up again" }; // Return error if no token found
  }

  // Check if the token has expired
  const hasExpired = new Date(existingToken.expires) < new Date();

  // Return error if the token has expired
  if (hasExpired) return { error: "Expired. Please sign up again" };

  // Retrieve the user associated with the token's email
  const existingUser = await getUserByEmail(existingToken.email);

  // Return error if no user found with the given email
  if (!existingUser) return { error: "Error, Email not found" };

  // Update the user's email verification status
  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(), // Set emailVerified to the current date and time
      email: existingUser.email, // Ensure the email remains the same
    },
  });

  // Delete the verification token from the database
  await db.verificationToken.delete({ where: { id: existingToken.id } });

  // Return success message
  return { success: "Email Verified, Please login" };
};
