"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FcSettings } from "react-icons/fc";
import { NameSchema } from "@/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";
import { changeName } from "@/actions/settings";
import { SyncLoader } from "react-spinners";
import { passwordChange } from "@/actions/auth/change-password";
import { useToast } from "@/components/ui/use-toast";
import { deleteUserAccount } from "@/actions/auth/delete-account";

export const SettingsForm = () => {
  const [isPending, startTransition] = useTransition();
  const [isChangePasswordPending, startTransition2] = useTransition();
  const [isDeleteAccountPending, startTransition3] = useTransition();
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const user = useCurrentUser();
  const form = useForm<z.infer<typeof NameSchema>>({
    resolver: zodResolver(NameSchema),
    defaultValues: {
      name: user?.name || undefined,
    },
  });

  const { toast } = useToast();

  const { update } = useSession();
  const onSubmit = (values: z.infer<typeof NameSchema>) => {
    startTransition(() => {
      changeName(values).then((data) => {
        if (data?.error) {
          setError(data.error);
        }

        if (data?.success) {
          update();
          setSuccess(data.success);
        }
      });
    });
  };

  const changePassword = () => {
    startTransition2(() => {
      passwordChange().then((data) => {
        if (data?.success) {
          toast({
            title: `Success`,
            description: `${data.success}`,
          });
        }

        if (data?.error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: `${data.error}`,
          });
        }
      });
    });
  };

  const deleteAccount = () => {
    startTransition3(() => {
      deleteUserAccount().then((data) => {
        if (data?.success) {
          toast({
            title: `Success`,
            description: `${data.success}`,
          });
        }

        if (data.error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: `${data.error}`,
          });
        }
      });
    });
  };
  return (
    <Card className=" w-[90%] md:w-[60%] lg:w-[50%] shadow-md">
      <CardHeader className="flex flex-row justify-center items-center gap-4 text-2xl font-semibold">
        <FcSettings />
        <h1>Settings</h1>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6 flex flex-col ">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormError message={error} />
              <FormSuccess message={success} />
              <Button className="w-ful" disabled={isPending} type="submit">
                {isPending ? <SyncLoader color="white" /> : "Change name"}
              </Button>
              <div className="flex flex-col items-start py-2 border-t gap-2">
                {!user?.isOAuth && (
                  <div className="">
                    <Button
                      className=" text-base cursor-pointer"
                      variant="link"
                      disabled={isChangePasswordPending}
                      onClick={() => {
                        changePassword();
                      }}
                    >
                      Change Password
                    </Button>
                  </div>
                )}

                <div className="">
                  <Button
                    variant="link"
                    className="text-destructive text-base  cursor-pointer"
                    disabled={isDeleteAccountPending}
                    onClick={() => {
                      deleteAccount();
                    }}
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
