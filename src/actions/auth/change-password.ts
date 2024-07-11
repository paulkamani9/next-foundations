"use server";

// Import necessary functions and modules
import { getUserById } from "@/data/user";
import { sendResetEmail } from "@/email/reset-email";
import { generateResetToken } from "@/lib/tokens";
import { currentUser } from "@/lib/user";

// Function to initiate password change
export const passwordChange = async () => {
  // Get the currently logged in user
  const user = await currentUser();
  if (!user) return { error: "User not found" };

  // Retrieve the existing user data from the database
  const existingUser = await getUserById(user.id);

  // Return an error if user data is not found
  if (!existingUser) return { error: "User data not found" };
  const { email, name } = existingUser;

  try {
    // Generate a reset token for the user's email
    const resetToken = await generateResetToken(email);

    // Send a password reset email to the user
    await sendResetEmail({
      subject: "Password Reset",
      email,
      name,
      companyName: `${process.env.COMPANY_NAME}`,
      token: resetToken.token,
    });

    // Return a success message if the email is sent successfully
    return { success: "Please verify your email, to change password" };
  } catch (error) {
    // Return an error message if something goes wrong
    return { error: "Something went wrong" };
  }
};
