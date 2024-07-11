import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { TopNavbar } from "./_components/top-navbar";
import { BottomNavbar } from "./_components/bottom-navbar";
import { Toaster } from "@/components/ui/toaster";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <main className="w-full bg-[#f5f5f5] flex flex-col items-center justify-between relative">
        {/* Fixed Top Navigation Bar */}
        <TopNavbar />
        {/* Main Content with Padding to Avoid Overlap */}
        <div className="w-full flex flex-col justify-start items-center px-4  mt-[124px] mb-[180px] ">
          {children}
          <Toaster />
        </div>
        {/* Fixed Bottom Navigation Bar */}
        <BottomNavbar />
      </main>
    </SessionProvider>
  );
};
export default MainLayout;
