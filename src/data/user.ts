// Import the database instance from the specified path
import { db } from "@/lib/db";

// Define an asynchronous function to get a user by their email address
export const getUserByEmail = async (email: string) => {
  try {
    // Attempt to find a unique user by their email address in the database
    const user = await db.user.findUnique({
      where: {
        email, // Specify the email as the search criteria
      },
    });

    // Return the user object if found
    return user;
  } catch {
    // Return null if an error occurs or if no user is found
    return null;
  }
};

// Define an asynchronous function to get a user by their ID
export const getUserById = async (id: string | undefined) => {
  try {
    // Attempt to find a unique user by their ID in the database
    const user = await db.user.findUnique({
      where: {
        id, // Specify the ID as the search criteria
      },
    });

    // Return the user object if found
    return user;
  } catch {
    // Return null if an error occurs or if no user is found
    return null;
  }
};
