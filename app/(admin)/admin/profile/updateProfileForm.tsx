"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { formActionState } from "@/lib/validate";
import { useActionState, useEffect } from "react";
import { updateProfile } from "@/action/user";
import { FieldDescription } from "@/components/ui/field";
import { UserType } from "@/models/User";
import { toast } from "sonner";

type UserProfileProps = {
  user: UserType;
};

export const UpdateProfileForm = ({ user }: UserProfileProps) => {
  const initialState: formActionState = {
    success: false,
    errors: {},
  };

  const [state, formAction, pending] = useActionState(updateProfile, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success("Profile is updated");
    }
  }, [state]);

  return (
    <Card className="w-4xl">
      <CardHeader>
        <h2 className="text-xl font-medium">User Profile</h2>
      </CardHeader>
      <CardContent>
        <Image
          src={user?.img || "/img/profile/default.jpg"}
          width={100}
          height={100}
          alt="profile image"
          className="rounded-full object-cover mx-auto aspect-square"
        />

        <form action={formAction}>
          <input type="hidden" name="_id" defaultValue={user?._id?.toString()} />

          <div className="space-y-2 mb-4">
            <Label htmlFor="img">Image</Label>
            <Input id="img" name="img" type="file" className="bg-input" />

            {state?.errors?.img &&
              state.errors.img.map((errorMsg, index) => (
                <FieldDescription key={index} className="text-red-600">
                  {errorMsg}
                </FieldDescription>
              ))}

            <FieldDescription>Must be png or jpg.</FieldDescription>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Name</Label>
              <Input
                defaultValue={user.name}
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                className="bg-input"
              />
              {state?.errors?.name &&
                state.errors.name.map((errorMsg, index) => (
                  <FieldDescription key={index} className="text-red-600">
                    {errorMsg}
                  </FieldDescription>
                ))}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                defaultValue={user.email}
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="bg-input"
              />
              {state?.errors?.email &&
                state.errors.email.map((errorMsg, index) => (
                  <FieldDescription key={index} className="text-red-600">
                    {errorMsg}
                  </FieldDescription>
                ))}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                defaultValue={user.password}
                id="password"
                name="password"
                type="password"
                className="bg-input"
              />
              {state?.errors?.password &&
                state.errors.password.map((errorMsg, index) => (
                  <FieldDescription key={index} className="text-red-600">
                    {errorMsg}
                  </FieldDescription>
                ))}
            </div>

            <div>
              <Button disabled={pending}>
                {pending ? "Updating ..." : "Update Profile"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateProfileForm;
