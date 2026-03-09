"use client";

import { useActionState, useEffect } from "react";
import { SignUp } from "@/action/user";

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
import { formActionState } from "@/lib/validate";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();

  const initialState: formActionState = {
    success: false,
    errors: {},
  };

  const [state, formAction, pending] = useActionState(SignUp, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success("User is register");
      router.push("/login");
    }
  }, [state, router]);

  return (
    <div className="space-y-4">
      <Card {...props}>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input id="name" name="name" type="text" placeholder="John Doe" className="bg-input" />
                {state?.errors?.name &&
                  state.errors.name.map((errorMsg, index) => (
                    <FieldDescription key={index} className="text-red-600">
                      {errorMsg}
                    </FieldDescription>
                  ))}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" name="email" type="email" placeholder="m@example.com" className="bg-input" />

                {state?.errors?.email &&
                  state.errors.email.map((errorMsg, index) => (
                    <FieldDescription key={index} className="text-red-600">
                      {errorMsg}
                    </FieldDescription>
                  ))}

                <FieldDescription>
                  We&apos;ll use this to contact you. We will not share your email with
                  anyone else.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" name="password" type="password" className="bg-input" />

                {state?.errors?.password &&
                  state.errors.password.map((errorMsg, index) => (
                    <FieldDescription key={index} className="text-red-600">
                      {errorMsg}
                    </FieldDescription>
                  ))}

                <FieldDescription>Must be at least 8 characters long.</FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                <Input id="confirm-password" name="confirmPassword" type="password" className="bg-input" />
                <FieldDescription>Please confirm your password.</FieldDescription>
              </Field>
              <FieldGroup>
                <Field>
                  <Button type="submit" className="dark:text-foreground" disabled={pending}>
                    Create Account
                  </Button>

                  <FieldDescription className="px-6 text-center">
                    Already have an account? <Link href="login" className="text-primary">Sign in</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
