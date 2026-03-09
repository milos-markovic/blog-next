"use client";

import React, { useActionState, useEffect } from "react";
import { Button } from "./ui/button";
import { formActionState } from "@/lib/validate";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ToggleStatusButton = {
  action: (prevState: formActionState, formData: FormData) => Promise<formActionState>;
  redirectUrl: string;
  children: React.ReactNode;
};

const ToggleStatusButton = ({ action, redirectUrl, children }: ToggleStatusButton) => {
  const router = useRouter();

  const [state, formAction, pending] = useActionState(action, { success: false });

  useEffect(() => {
    if (state.success) {
      toast.success("status is updated");
      router.push(redirectUrl);
    }
  }, [state]);

  return <form action={formAction}>{children}</form>;
};

export default ToggleStatusButton;
