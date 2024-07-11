"use server";

// Import the signOut function
import { signOut } from "@/auth";

// Function to handle user logout
export const logOut = async () => {
  // Sign out the user and redirect to the login page
  await signOut({ redirectTo: "/auth/login" });
};
