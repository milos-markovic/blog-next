"use client";

import { useActionState, useEffect } from "react";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formActionState } from "@/lib/validate";
import { createUser } from "@/action/user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CreateUserForm = () => {
  const router = useRouter();

  const initialState: formActionState = {
    success: false,
    errors: {},
  };

  const [state, formAction, pending] = useActionState(createUser, initialState);

  useEffect(() => {
    if (state?.success) {
      toast.success("User has been created.");

      router.push("/admin/users");
    }
  }, [state?.success, router]);

  return (
    <Card>
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
              <Input id="name" name="name" type="text" placeholder="John Doe" />
              {state?.errors?.name &&
                state.errors.name.map((errorMsg, index) => (
                  <FieldDescription key={index} className="text-red-600">
                    {errorMsg}
                  </FieldDescription>
                ))}
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" name="email" type="email" placeholder="m@example.com" />

              {state?.errors?.email &&
                state.errors.email.map((errorMsg, index) => (
                  <FieldDescription key={index} className="text-red-600">
                    {errorMsg}
                  </FieldDescription>
                ))}
            </Field>
            <Field>
              <FieldLabel htmlFor="email">User type</FieldLabel>
              <Select name="role">
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Types</SelectLabel>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {state?.errors?.email &&
                state.errors.email.map((errorMsg, index) => (
                  <FieldDescription key={index} className="text-red-600">
                    {errorMsg}
                  </FieldDescription>
                ))}
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" name="password" type="password" />

              {state?.errors?.password &&
                state.errors.password.map((errorMsg, index) => (
                  <FieldDescription key={index} className="text-red-600">
                    {errorMsg}
                  </FieldDescription>
                ))}

              <FieldDescription>Must be at least 8 characters long.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="img">Image</FieldLabel>
              <Input id="img" name="img" type="file" />

              {state?.errors?.img &&
                state.errors.img.map((errorMsg, index) => (
                  <FieldDescription key={index} className="text-red-600">
                    {errorMsg}
                  </FieldDescription>
                ))}

              <FieldDescription>Must be png or jpg.</FieldDescription>
            </Field>

            {state?.success && <p className="text-primary">User is created</p>}

            <FieldGroup>
              <Field>
                <Button type="submit" className="dark:text-foreground" disabled={pending}>
                  {pending ? "Creating..." : "Create User"}
                </Button>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateUserForm;
