// Import email templates and the Resend API
import VerificationEmail from "@/email/verification-email";
import ResetEmail from "@/email/reset-email";
import { Resend } from "resend";
import DeleteAccountConfirmation from "@/email/delete-email";

// Initialize the Resend API with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

interface sendEmailProps {
  subject: string;
  email: string;
  name: string;
  companyName: string;
  token: string;
}

// Function to send a verification email
export const sendVerificationEmail = async ({
  subject,
  email,
  name,
  companyName,
  token,
}: sendEmailProps) => {
  await resend.emails.send({
    from: `${process.env.COMPANY_EMAIL}`,
    to: email,
    subject,
    react: VerificationEmail({ name, token, companyName }),
  });
};

// Function to send a password reset email
export const sendResetEmail = async ({
  subject,
  email,
  name,
  companyName,
  token,
}: sendEmailProps) => {
  await resend.emails.send({
    from: `${process.env.COMPANY_EMAIL}`,
    to: email,
    subject,
    react: ResetEmail({ name, companyName, token }),
  });
};

// Function to send an account deletion confirmation email
export const sendDeleteEmail = async ({
  subject,
  email,
  name,
  companyName,
  token,
}: sendEmailProps) => {
  await resend.emails.send({
    from: `${process.env.COMPANY_EMAIL}`,
    to: email,
    subject,
    react: DeleteAccountConfirmation({ name, token, companyName }),
  });
};
