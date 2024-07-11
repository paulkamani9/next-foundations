import { DeleteAccountForm } from "@/components/auth/delete-account-form";
import { Suspense } from "react";
import { SyncLoader } from "react-spinners";

const DeleteAccountPage = () => {
  return (
    <Suspense fallback={<SyncLoader />}>
      <DeleteAccountForm />
    </Suspense>
  );
};
export default DeleteAccountPage;
