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
import { LoginSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { login } from "@/actions/auth/login";
import { SyncLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email in use with another Account"
      : "";
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values).then((data) => {
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
      title="Login"
      headerLabel="Login to access your account"
      backButtonLabel="Not Registered? Sign up now"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex flex-col "
        >
          <div className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="someone@email.com"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="******"
                      disabled={isPending}
                    />
                  </FormControl>

                  <FormMessage />
                  <Button
                    size="sm"
                    variant="link"
                    asChild
                    className="px-0 font normal"
                  >
                    <Link href="/auth/reset">Forgot Password?</Link>
                  </Button>
                </FormItem>
              )}
            />
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? <SyncLoader color="#fff" /> : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
