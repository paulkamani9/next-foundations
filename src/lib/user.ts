"use server";

// Import the auth module
import { auth } from "@/auth";

// Function to get the current authenticated user
export const currentUser = async () => {
  // Retrieve the current authentication session
  const session = await auth();

  // Return the user object from the session, or undefined if not authenticated
  return session?.user;
};
