import { transporter } from "@/lib/mail";

const BASE_URL = `${process.env.BASE_URL}`;

// Function to send a password reset email
export const sendResetEmail = async ({
  subject,
  email,
  name,
  companyName,
  token,
}: SendEmailProps) => {
  try {
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject,
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset Password Email</title>
  </head>
  <body
    style="
      width: 100%;
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    "
  >
    <div
      style="
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
        padding: 20px;
        box-sizing: border-box;
        text-align: center;
      "
    >
      <h1 style="font-size: 24px; margin-bottom: 20px; color: #333">
        Password Reset
      </h1>
      <p style="font-size: 16px; color: #555; margin-bottom: 20px">
        Hello ${name},
      </p>
      <p style="font-size: 16px; color: #555; margin-bottom: 20px">
        You are about to verify your account with ${companyName}. You can then
        change your password. Please confirm your decision by clicking the
        button below.
      </p>
      <p style="font-size: 16px; color: #555; margin-bottom: 20px">
        Please ignore if you did not request this action.
      </p>
      <a
        href="${BASE_URL}/auth/new-password?token=${token}"
        style="text-decoration: none"
      >
        <button
          type="submit"
          style="
            padding: 12px 20px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
            display: inline-block;
          "
        >
          Verify Email
        </button>
      </a>
    </div>
  </body>
</html>
`,
    });
  } catch (error) {
    console.error("Error sending reset email:", error);
    throw error; // Rethrow the error to handle it further up the call stack
  }
};
