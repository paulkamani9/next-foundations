"use client";
import { newVerification } from "@/actions/auth/new-verification";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  // using search params hook to get token from url
  const token = useSearchParams().get("token");
  // using  use callback hook to submit token for verification at the server
  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Error, please sign up again");
    } else {
      newVerification(token)
        .then((data) => {
          if (data.success) {
            setSuccess(data.success);
            return;
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
  }, [token, error, success]);
  //   using use effect to trigger onSubmit the moment page is rendered
  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      title="Email Verification"
      headerLabel="Just a sec, confirming your email..."
      backButtonLabel="Proceed to Login"
      backButtonHref="/auth/login"
    >
      <div className="flex  items-center w-full justify-center">
        {!error && !success && <SyncLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
