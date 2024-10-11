"use client";
import {
  signIn,
  signOut,
  useSession,
} from "../../../node_modules/next-auth/react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { IconHome, IconShoppingBag } from "@tabler/icons-react";
import {
  EnterIcon,
  AvatarIcon,
  PersonIcon,
  ExitIcon,
} from "@radix-ui/react-icons";

export function NavBar() {
  const { data: session } = useSession();
  const links = session?.user
    ? [
        {
          title: "Home",
          icon: (
            <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "/",
        },
        {
          title: "Signed in as",
          icon: (
            <PersonIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          content: <span className="text-base">{session.user.email}</span>,
        },
        {
          title: "Sign out",
          icon: (
            <ExitIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          action: () => signOut(),
        },
        {
          title: "Cart",
          icon: (
            <IconShoppingBag className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "/cart",
        },
      ]
    : [
        {
          title: "Home",
          icon: (
            <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "/",
        },
        {
          title: "Sign in",
          icon: (
            <AvatarIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          action: () => signIn(),
        },
        {
          title: "Sign up",
          icon: (
            <EnterIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "/register",
        },
        {
          title: "Cart",
          icon: (
            <IconShoppingBag className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "/cart",
        },
      ];

  return (
    <div className="text-red-200 flex  justify-center items-center h-[14rem] w-screen bg-gray-700 px-10">
      <h1 className="text-base text-center md:text-5xl"> Cartify</h1>
      <FloatingDock
        desktopClassName=" bg-gray-400 text-red-200"
        mobileClassName="translate-y-20"
        items={links}
      />
    </div>
  );
}
