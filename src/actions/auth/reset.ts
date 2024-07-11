"use server";

// Import necessary modules and functions
import * as z from "zod";
import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generateResetToken } from "@/lib/tokens";
import { sendResetEmail } from "@/lib/mail";

// Function to handle password reset
export const reset = async (values: z.infer<typeof ResetSchema>) => {
  // Validate the provided email field
  const validatedFields = await ResetSchema.safeParse(values);

  // Return an error if validation fails
  if (!validatedFields.success) return { error: "Please enter a valid email" };

  const { email } = validatedFields.data;

  // Check if a user with the provided email exists
  const existingUser = await getUserByEmail(email);
  if (!existingUser) return { error: "Email not found" };

  try {
    // Generate a reset token for the user
    const resetToken = await generateResetToken(email);

    // Send a reset email to the user
    await sendResetEmail({
      subject: "Password Reset",
      email,
      name: existingUser.name,
      token: resetToken.token,
      companyName: `${process.env.COMPANY_NAME}`,
    });

    // Return a success message if the email is sent successfully
    return { success: "Email verification sent" };
  } catch (error) {
    // Return an error message if something goes wrong
    return { error: "Something went wrong, try again" };
  }
};
