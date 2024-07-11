import { NewVerificationForm } from "@/components/auth/new-verification-form";
import { Suspense } from "react";
import { SyncLoader } from "react-spinners";

const NewVerificationPage = () => {
  return (
    <Suspense fallback={<SyncLoader />}>
      <NewVerificationForm />
    </Suspense>
  );
};
export default NewVerificationPage;
