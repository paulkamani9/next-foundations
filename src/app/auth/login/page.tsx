import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Page",
  description: "Custom next-auth Login page",
};
const LoginPage = () => {
  return <LoginForm />;
};
export default LoginPage;
