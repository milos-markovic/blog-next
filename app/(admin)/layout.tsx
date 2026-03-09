import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/ModeToggle";
import { getAuthUser, verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const authUser = await getAuthUser();

  return (
    <SidebarProvider>
      <AppSidebar name={authUser?.name || ""} img={authUser?.img || ""} />
      <main className="w-full">
        <div className="flex justify-between pt-4 px-4">
          <SidebarTrigger />
          <ModeToggle />
        </div>
        <section className="p-5">{children}</section>
      </main>
    </SidebarProvider>
  );
}
