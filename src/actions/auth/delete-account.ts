"use server";
import { getUserByEmail, getUserById } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";
import { sendDeleteEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { currentUser } from "@/lib/user";
import { logOut } from "./logout";

export const deleteUserAccount = async () => {
  const user = await currentUser();

  if (!user) return { error: "User not found" };

  const existingUser = await getUserById(user.id);

  if (!existingUser) return { error: "User data not found" };

  const { email, name } = existingUser;

  try {
    const verificationToken = await generateVerificationToken(email);

    await sendDeleteEmail({
      name,
      email,
      subject: "Delete your account",
      companyName: `${process.env.COMPANY_NAME}`,
      token: verificationToken.token,
    });

    return { success: "Please verify your email, to delete your account" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const accountDeletion = async (token: string) => {
  // Retrieve the verification token from the database
  const existingToken = await getVerificationTokenByToken(token);

  // Check if the token does not exist
  if (!existingToken) {
    return { error: "Error, please try again" }; // Return error if no token found
  }

  // Check if the token has expired
  const hasExpired = new Date(existingToken.expires) < new Date();

  // Return error if the token has expired
  if (hasExpired) return { error: "Expired request. Please try again" };

  // Retrieve the user associated with the token's email
  const existingUser = await getUserByEmail(existingToken.email);

  // Return error if no user found with the given email
  if (!existingUser) return { error: "Error, Email not found" };

  // delete the users account
  await db.user.delete({
    where: { id: existingUser.id },
  });

  // Delete the verification token from the database
  await db.verificationToken.delete({ where: { id: existingToken.id } });

  // Return success message
  return { success: "Account deleted" };
};
