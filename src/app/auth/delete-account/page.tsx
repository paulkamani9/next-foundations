import { DeleteAccountForm } from "@/components/auth/delete-account-form";
import { Suspense } from "react";

const DeleteAccountPage = () => {
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <DeleteAccountForm />
    </Suspense>
  );
};
export default DeleteAccountPage;
