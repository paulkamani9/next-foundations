import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login Page",
  description: "Custom next-auth Login page",
};
const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
};
export default LoginPage;
