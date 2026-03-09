import { LoginForm } from "@/components/login-form";
import { getAuthUser } from "@/lib/dal";

export default async function Page() {
  const authUser = await getAuthUser();

  return (
    <div className="flex min-h-svh w-full items-start justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm authUser={authUser} />
      </div>
    </div>
  );
}
