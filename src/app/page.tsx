import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landing Page",
  description: "Custom next-auth Landing page",
};

// this is where we build our landing page
export default function Home() {
  return (
    <>
      <main className="w-full flex flex-col justify-center h-full items-center gap-[16px]">
        <h1 className="text-black font-bold text-2xl">Landing Page</h1>
        <LoginButton>
          <Button size="lg" className="">
            Sign in
          </Button>
        </LoginButton>
      </main>
    </>
  );
}
