import { RegisterForm } from "@/components/auth/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register Page",
  description: "Custom next-auth Registration page",
};

const RegisterPage = () => {
  return <RegisterForm />;
};
export default RegisterPage;
