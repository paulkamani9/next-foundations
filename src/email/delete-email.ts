import { transporter } from "@/lib/mail";

const BASE_URL = `${process.env.BASE_URL}`;

// Function to send a delete account confirmation email
export const sendDeleteEmail = async ({
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
    <title>Delete Account Confirmation</title>
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
        Delete Account Confirmation
      </h1>
      <p style="font-size: 16px; color: #555; margin-bottom: 20px">
        Hello {name},
      </p>
      <p style="font-size: 16px; color: #555; margin-bottom: 20px">
        You are about to delete your account with ${companyName}. This action is
        irreversible. Please confirm your decision by clicking the button below.
      </p>
      <p style="font-size: 16px; color: #555; margin-bottom: 20px">
        Please ignore if you did not request this action.
      </p>
      <a
        href="${process.env.BASE_URL}/delete-account?token=${token}"
        style="text-decoration: none"
      >
        <button
          type="submit"
          style="
            padding: 12px 20px;
            background-color: #ff0000;
            color: #fff;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
            display: inline-block;
          "
        >
          Confirm Delete
        </button>
      </a>
    </div>
  </body>
</html>
`,
    });
  } catch (error) {
    console.error("Error sending delete email:", error);
    throw error; // Rethrow the error to handle it further up the call stack
  }
};
