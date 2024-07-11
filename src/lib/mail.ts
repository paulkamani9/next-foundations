import nodemailer from "nodemailer";
import fs from "fs";

// Create a Nodemailer transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.HOST, // SMTP host
  service: process.env.SERVICE, // Email service (e.g., "gmail")
  port: Number(process.env.EMAIL_PORT), // Port for SMTP server
  secure: Boolean(process.env.SECURE), // Whether to use SSL/TLS
  auth: {
    user: process.env.USER, // Email account username
    pass: process.env.tag, // Email account password or app-specific password
  },
});

// Interface for email sending properties
interface SendEmailProps {
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
}: SendEmailProps) => {
  try {
    const verificationEmail = fs.readFileSync("email/verification-email.html", {
      encoding: "utf-8",
    });

    const html = verificationEmail
      .replace("{name}", name)
      .replace("{companyName}", companyName)
      .replace("{token}", token)
      .replace("{url}", `${process.env.BASE_URL}`);

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject,
      html,
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error; // Rethrow the error to handle it further up the call stack
  }
};

// Function to send a password reset email
export const sendResetEmail = async ({
  subject,
  email,
  name,
  companyName,
  token,
}: SendEmailProps) => {
  try {
    const resetEmail = fs.readFileSync("email/reset.html", {
      encoding: "utf-8",
    });

    const html = resetEmail
      .replace("{name}", name)
      .replace("{companyName}", companyName)
      .replace("{token}", token)
      .replace("{url}", `${process.env.BASE_URL}`);

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject,
      html,
    });
  } catch (error) {
    console.error("Error sending reset email:", error);
    throw error; // Rethrow the error to handle it further up the call stack
  }
};

// Function to send a delete account confirmation email
export const sendDeleteEmail = async ({
  subject,
  email,
  name,
  companyName,
  token,
}: SendEmailProps) => {
  try {
    const deleteEmail = fs.readFileSync("email/delete-email.html", {
      encoding: "utf-8",
    });

    const html = deleteEmail
      .replace("{name}", name)
      .replace("{companyName}", companyName)
      .replace("{token}", token)
      .replace("{url}", `${process.env.BASE_URL}`);

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject,
      html,
    });
  } catch (error) {
    console.error("Error sending delete email:", error);
    throw error; // Rethrow the error to handle it further up the call stack
  }
};
