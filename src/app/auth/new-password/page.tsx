import { NewPasswordForm } from "@/components/auth/new-password";
import { Suspense } from "react";
import { SyncLoader } from "react-spinners";

const NewPasswordPage = () => {
  return (
    <Suspense fallback={<SyncLoader />}>
      <NewPasswordForm />
    </Suspense>
  );
};
export default NewPasswordPage;
