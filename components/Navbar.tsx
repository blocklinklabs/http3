import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, LogIn, LogOut } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { createOrUpdateUser } from "@/utils/db/actions";

export default function Navbar() {
  const { login, logout, authenticated, user } = usePrivy();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (authenticated && user) {
      handleUserAuthenticated();
    }
  }, [authenticated, user]);

  console.log("all about the users", user);

  const handleUserAuthenticated = async () => {
    if (user && user.wallet?.address) {
      try {
        await createOrUpdateUser(
          user.wallet.address,
          user.email?.address || ""
        );
      } catch (error) {
        console.error("Error updating user information:", error);
      }
    }
  };

  const handleAuth = () => {
    if (authenticated) {
      logout();
    } else {
      login();
    }
  };

  return (
    <nav className="flex justify-between items-center mb-8 py-8 px-4 md:px-8 lg:px-16">
      <Link href="/" className="flex items-center">
        <Image
          src="/svg/lock-square-rounded.svg"
          alt="HTTP3 logo"
          width={40}
          height={40}
          priority
        />
        <span className="ml-2 text-xl font-bold">HTTP3</span>
      </Link>
      <div className="hidden md:flex items-center space-x-4">
        <Link href="/dashboard" className="text-foreground hover:text-primary">
          Dashboard
        </Link>
        <Link href="/docs" className="text-foreground hover:text-primary">
          Docs
        </Link>
        <Button onClick={handleAuth} variant="outline">
          {authenticated ? (
            <>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </>
          ) : (
            <>
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </>
          )}
        </Button>
        {authenticated && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/help">Help & Support</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <ModeToggle />
      </div>
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background border-b border-border p-4 md:hidden">
          <div className="flex flex-col space-y-4">
            <Link
              href="/dashboard"
              className="text-foreground hover:text-primary"
            >
              Dashboard
            </Link>
            <Link href="/docs" className="text-foreground hover:text-primary">
              Docs
            </Link>
            <Button onClick={handleAuth} variant="outline" className="w-full">
              {authenticated ? "Logout" : "Login"}
            </Button>
            {authenticated && (
              <>
                <Link
                  href="/profile"
                  className="text-foreground hover:text-primary"
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="text-foreground hover:text-primary"
                >
                  Settings
                </Link>
                <Link
                  href="/help"
                  className="text-foreground hover:text-primary"
                >
                  Help & Support
                </Link>
              </>
            )}
            <ModeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
