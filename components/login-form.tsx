"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { SignIn } from "@/action/user";
import { formActionState } from "@/lib/validate";
import { useRouter } from "next/navigation";
import { UserType } from "@/models/User";
import { toast } from "sonner";

export function LoginForm({ authUser }: { authUser: UserType }) {
  const router = useRouter();

  const initialState: formActionState = {
    success: false,
    errors: {},
  };

  const [state, formAction, pending] = useActionState(SignIn, initialState);

  useEffect(() => {
    if (state.success && authUser) {
      toast("Welcome to dashboard");
      router.push("/admin/dashboard");
    }
  }, [state]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" name="email" type="email" placeholder="m@example.com" className="bg-input" />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" name="password" type="password" className="bg-input" />
              </Field>
              <Field>
                <Button type="submit" className="dark:text-foreground">
                  Login
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="signup" className="text-primary">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
