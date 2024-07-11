import React from "react";

type ResetEmailProps = {
  name: string;
  companyName: string;
  token: string;
};

const ResetEmail = ({
  name,
  companyName,
  token,
}: ResetEmailProps) => {
  return (
    <html>
      <head>
        <title>Reset Password Email</title>
      </head>
      <body
        style={{
          width: "100%",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f4f4f4",
          margin: 0,
          padding: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "400px",
            padding: "20px",
            boxSizing: "border-box",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              marginBottom: "20px",
              color: "#333",
            }}
          >
            Password Reset
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "#555",
              marginBottom: "20px",
            }}
          >
            Hello {name},
          </p>
          <p
            style={{
              fontSize: "16px",
              color: "#555",
              marginBottom: "20px",
            }}
          >
            You are about to verify your account with {companyName}. You can
            then change your password. Please confirm your decision by
            clicking the button below.
          </p>
          <p
            style={{
              fontSize: "16px",
              color: "#555",
              marginBottom: "20px",
            }}
          >
            Please ignore if you did not request this action
          </p>
          <a
            href={`${process.env.BASE_URL}/auth/new-password?token=${token}`}
            style={{ textDecoration: "none" }}
          >
            <button
              type="submit"
              style={{
                padding: "12px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                fontSize: "16px",
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Verify Email
            </button>
          </a>
        </div>
      </body>
    </html>
  );
};

export default ResetEmail;
