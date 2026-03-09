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
import { updateUser } from "@/action/user";
import { UserType } from "@/models/User";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type UpdateUserFormProps = {
  user: UserType;
};

const UpdateUserForm = ({ user }: UpdateUserFormProps) => {
  const router = useRouter();

  const initialState: formActionState = {
    success: false,
    errors: {},
  };

  const [state, formAction, pending] = useActionState(updateUser, initialState);

  useEffect(() => {
    if (state?.success) {
      toast.success("User has been updated.");

      router.push("/admin/users");
    }
  }, [state, router]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update an account</CardTitle>
        <CardDescription>
          Enter your information below to update your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <FieldGroup>
            <input type="hidden" name="id" defaultValue={user._id.toString()} />
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                defaultValue={user.name}
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
              />
              {state?.errors?.name &&
                state.errors.name.map((errorMsg, index) => (
                  <FieldDescription key={index} className="text-red-600">
                    {errorMsg}
                  </FieldDescription>
                ))}
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                defaultValue={user.email}
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
              />

              {state?.errors?.email &&
                state.errors.email.map((errorMsg, index) => (
                  <FieldDescription key={index} className="text-red-600">
                    {errorMsg}
                  </FieldDescription>
                ))}
            </Field>
            <Field>
              <FieldLabel htmlFor="email">User type</FieldLabel>
              <Select defaultValue={user.role} name="role">
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
              <Input
                defaultValue={user.password}
                id="password"
                name="password"
                type="password"
              />

              {state?.errors?.password &&
                state.errors.password.map((errorMsg, index) => (
                  <FieldDescription key={index} className="text-red-600">
                    {errorMsg}
                  </FieldDescription>
                ))}

              <FieldDescription>Must be at least 8 characters long.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" className="dark:text-foreground" disabled={pending}>
                  {pending ? "Updating..." : "Update User"}
                </Button>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateUserForm;
