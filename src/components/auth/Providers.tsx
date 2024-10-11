"use client";

import { SessionProvider } from "../../../node_modules/next-auth/react";

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;
