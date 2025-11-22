"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  // SessionProvider de NextAuth enveloppe tout le projet
  return <SessionProvider>{children}</SessionProvider>;
}
