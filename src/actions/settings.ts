"use server";

// Import necessary functions and schemas
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/user";
import { NameSchema } from "@/schemas";
import * as z from "zod";

// Function to change user's name
export const changeName = async (values: z.infer<typeof NameSchema>) => {
  // Validate the provided fields
  const validatedFields = NameSchema.safeParse(values);

  // Return an error if validation fails
  if (!validatedFields.success) return { error: "Please provide valid fields" };
  const { name } = validatedFields.data;

  // Get the currently logged in user
  const activeUser = await currentUser();

  // Return an error if no user is logged in
  if (!activeUser) return { error: "Please login to continue" };

  // Retrieve the existing user data from the database
  const existingUser = await getUserById(activeUser.id);

  // Return an error if user data is not found
  if (!existingUser) return { error: "Your data is not found" };

  // Update the user's name in the database
  await db.user.update({
    where: { id: existingUser.id },
    data: {
      name,
    },
  });

  // Return a success message if the update is successful
  return { success: "Update Successful" };
};
