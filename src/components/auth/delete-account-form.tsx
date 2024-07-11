"use client";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { accountDeletion } from "@/actions/auth/delete-account";
import { logOut } from "@/actions/auth/logout";

export const DeleteAccountForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  // using search params hook to get token from url
  const token = useSearchParams().get("token");
  // using  use callback hook to submit token for verification at the server
  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Error, please sign up again");
      return;
    } else {
      accountDeletion(token)
        .then((data) => {
          if (data.success) {
            setSuccess(data.success);
            logOut();
          }
          if (data.error) {
            setError(data.error);
            return;
          }
        })
        .catch(() => {
          setError("Something went wrong");
        });
    }
  }, [token]);
  //   using use effect to trigger onSubmit the moment page is rendered
  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      title="Delete Account"
      headerLabel="Just a sec, trying to delete your account"
      backButtonLabel="Register again?"
      backButtonHref="/auth/register"
    >
      <div className="flex  items-center w-full justify-center">
        {!error && !success && <SyncLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
