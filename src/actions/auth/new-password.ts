"use server";

// Import necessary modules and functions
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { PasswordResetSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

interface newPasswordProps {
  values: z.infer<typeof PasswordResetSchema>;
  token: string | null;
}

// Function to handle password reset
export const newPassword = async ({ values, token }: newPasswordProps) => {
  // Return an error if no token is provided
  if (!token) return { error: "Email confirmation failed, try again" };

  // Validate the provided password fields
  const validatedFields = await PasswordResetSchema.safeParse(values);

  // Return an error if validation fails
  if (!validatedFields.success) return { error: "Invalid Password" };

  const { password } = validatedFields.data;

  // Retrieve the password reset token from the database
  const existingToken = await getPasswordResetTokenByToken(token);

  // Return an error if the token is not found
  if (!existingToken) return { error: "Email confirmation error, try again" };

  // Check if the token has expired
  const hasExpired = new Date(existingToken.expires) < new Date();

  // Return an error if the token has expired
  if (hasExpired) return { error: "Email link expired, try again" };

  // Retrieve the user by email
  const existingUser = await getUserByEmail(existingToken.email);

  // Return an error if the user is not found
  if (!existingUser) return { error: "Email does not exist" };

  // Hash the new password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update the user's password in the database
  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  // Delete the used password reset token from the database
  await db.passwordResetToken.delete({ where: { id: existingToken.id } });

  // Return a success message if the password is updated successfully
  return { success: "Password updated" };
};

