"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { PasswordResetSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { SyncLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/auth/new-password";

export const NewPasswordForm = () => {
  const token = useSearchParams().get("token");
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof PasswordResetSchema>>({
    resolver: zodResolver(PasswordResetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof PasswordResetSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      newPassword({ values, token }).then((data) => {
        if (data?.success) {
          form.reset();
          setSuccess(data.success);
        }
        if (data?.error) {
          form.reset();
          setError(data.error);
        }
      });
    });
  };

  return (
    <CardWrapper
      title="Change Password"
      headerLabel="Enter a new Password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex flex-col "
        >
          <div className="space-y-4">
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="******"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="******"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? <SyncLoader color="#fff" /> : "Submit"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
