"use server";

// Import necessary modules and functions
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/email/verification-email";


// Function to handle user registration
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  try {
    // Validate the provided registration fields
    const validatedFields = RegisterSchema.safeParse(values);

    // Return an error if validation fails
    if (!validatedFields.success) return { error: "Invalidated fields" };

    const { email, name, password } = validatedFields.data;

    // Check if a user with the provided email already exists
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      // If the email is already verified, prompt the user to log in
      if (existingUser.emailVerified)
        return { error: "Email already registered. Please Login" };

      // If the email is not verified, delete the existing user record
      await db.user.delete({
        where: { id: existingUser.id },
      });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    // Generate a verification token for the user
    const verificationToken = await generateVerificationToken(email);

    // Send a verification email to the user
    try {
      await sendVerificationEmail({
        subject: "Email Verification",
        email,
        token: verificationToken.token,
        name,
        companyName: `${process.env.COMPANY_NAME}`,
      });
      return { success: "Verification Email sent" };
    } catch (error) {
      return { error: "Something went wrong, Try again" };
    }
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

