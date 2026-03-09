import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { ProfileDropdown } from "./ProfileDropdown";
import { getAuthUser } from "@/lib/dal";
import Search from "./Search";

const Header = async () => {
  const user = await getAuthUser();

  return (
    <header className="border-b border-border mb-6">
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <Link href="/">
          <h1 className="text-2xl font-semibold text-primary">Blog</h1>
        </Link>

        <Search />

        <nav>
          <div className="flex items-center gap-2">
            <ModeToggle />

            {!user && (
              <Button variant="outline" className="dark:border-primary" asChild>
                <Link href="/login">Get Started</Link>
              </Button>
            )}

            {user && <ProfileDropdown name={user.name} img={user.img} />}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
