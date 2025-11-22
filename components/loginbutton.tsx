"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

export default function LoginButton() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (session) {
    return (
      <div>
        <Button
          onClick={() =>
            signOut({
              callbackUrl: "/", // 🔥 redirection après logout
            })
          }
          variant="ghost"
        >
          Se déconnecter
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={() =>
        signIn("google", {
          callbackUrl: "/dashboard", // 🔥 redirection après login
        })
      }
    >
      Se connecter avec Google
    </Button>
  );
}
