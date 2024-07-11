"use server";

import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";

// Generate a new verification token for the specified email
export const generateVerificationToken = async (email: string) => {
  // Generate a unique token using UUID v4
  const token = uuidv4();

  // Set expiration time to 5 minutes from the current time
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  // Check if there is an existing verification token for the email
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    // Delete the existing token if found
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  // Create a new verification token in the database
  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken; // Return the newly generated verification token
};

// Generate a new password reset token for the specified email
export const generateResetToken = async (email: string) => {
  // Generate a unique token using UUID v4
  const token = uuidv4();

  // Set expiration time to 5 minutes from the current time
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  // Check if there is an existing password reset token for the email
  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken) {
    // Delete the existing token if found
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  // Create a new password reset token in the database
  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken; // Return the newly generated password reset token
};
