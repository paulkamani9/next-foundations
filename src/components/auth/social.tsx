"use client";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { defaultLoginRedirect } from "@/routes";
export const Social = () => {
  const socialSignIn = (provider: "google") => {
    signIn(provider, { callbackUrl: defaultLoginRedirect });
  };
  return (
    <div className="flex items-center w-full justify-center">
      <Button
        size="lg"
        className="w-full py-1"
        variant="outline"
        onClick={() => {
          socialSignIn("google");
        }}
      >
        <FcGoogle className="h-8 w-8" />
      </Button>
    </div>
  );
};
