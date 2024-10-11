"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const SigninButton = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <div className="flex items-center justify-center gap-3">
        <p className="flex">
          <span className="text-base font-bold text-gray-400">
            Signed in as:{" "}
          </span>
          <span className="text-base text-gray-600">{session.user.email}</span>
        </p>
        <Button
          onClick={() => signOut()}
          className="flex items-center justify-center my-auto"
          variant={"secondary"}
        >
          Sign out
        </Button>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-3">
      <Link href={"/register"} className="">
        Sign up
      </Link>
      <Button onClick={() => signIn()} variant={"default"} className="">
        Sign in
      </Button>
    </div>
  );
};

export default SigninButton;
