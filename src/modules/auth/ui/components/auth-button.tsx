"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ClapperboardIcon, UserCircleIcon, UserIcon } from "lucide-react";

export const AuthButton = () => {
  return (
    <>
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-9 w-9",
            },
          }}
        >
          <UserButton.MenuItems>
            <UserButton.Link
              href="/users/current"
              label="My profile"
              labelIcon={<UserIcon className="size-4" />}
            />
            <UserButton.Link
              href="/studio"
              label="Studio"
              labelIcon={<ClapperboardIcon className="size-4" />}
            />
            <UserButton.Action label="manageAccount" />
          </UserButton.MenuItems>
        </UserButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button className="px-4 py-2 font-medium text-blue-600 bg-white hover:text-blue-500 hover:bg-blue-50 border-blue-500 rounded-full shadow-none">
            <UserCircleIcon />
            Sign in
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  );
};
