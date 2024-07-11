import { SettingsForm } from "@/app/(main)/_components/settings-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings Page",
  description: "Custom next-auth Settings page",
};

const SettingsPage = () => {
  return <SettingsForm />;
};
export default SettingsPage;
