"use server";

// Import necessary modules and functions
import * as z from "zod";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { defaultLoginRedirect } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

// Function to handle user login
export const login = async (values: z.infer<typeof LoginSchema>) => {
  // Validate the provided login fields
  const validatedFields = LoginSchema.safeParse(values);

  // Return an error if validation fails
  if (!validatedFields.success)
    return { error: "Please enter valid email and Password" };

  const { email, password } = validatedFields.data;

  // Retrieve the user by email
  const existingUser = await getUserByEmail(email);

  // Return an error if the user is not found
  if (!existingUser) return { error: "Invalid Credentials" };
  if (!existingUser.password) {
    return { error: "Error, perhaps you signed up with Google?" };
  }

  // Compare the provided password with the stored password
  const passwordMatch = await bcrypt.compare(password, existingUser.password);

  // Return an error if the password does not match
  if (!passwordMatch) return { error: "Invalid Credentials" };

  // Handle email verification if not already verified
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);
    try {
      await sendVerificationEmail({
        subject: "Email Verification",
        email: existingUser.email,
        token: verificationToken.token,
        name: existingUser.name,
        companyName: "Compilers",
      });
      return {
        success: "We sent you another confirmation email, please verify.",
      };
    } catch (error) {
      return { error: "Something went wrong" };
    }
  }

  // Attempt to sign in the user
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: defaultLoginRedirect,
    });
    return { success: "Login Successful" };
  } catch (error) {
    // Handle authentication errors
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};
