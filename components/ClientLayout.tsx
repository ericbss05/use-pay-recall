// components/ClientLayout.tsx
"use client";

import Providers from "./providers";
import { ReactNode } from "react";

type ClientLayoutProps = {
  children: ReactNode;
};

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <Providers>
      <main>{children}</main>
    </Providers>
  );
}
