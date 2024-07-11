import nodemailer from "nodemailer";

// Create a Nodemailer transporter using environment variables
export const transporter = nodemailer.createTransport({
  host: process.env.HOST, // SMTP host
  service: process.env.SERVICE, // Email service (e.g., "gmail")
  port: Number(process.env.EMAIL_PORT), // Port for SMTP server
  secure: Boolean(process.env.SECURE), // Whether to use SSL/TLS
  auth: {
    user: process.env.USER, // Email account username
    pass: process.env.tag, // Email account password or app-specific password
  },
});
