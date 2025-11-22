import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LoginButton from "../loginbutton";

export default async function Header() {
  const session = await getServerSession(authOptions);

  const stripeAccountRecord = await prisma.account.findFirst({
    where: { userId: session?.user?.id, provider: "stripe" },
    select: { stripeAccount: true },
  });

  const stripeAccount = stripeAccountRecord?.stripeAccount;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="w-full border-b bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between p-4">
          {/* LOGO */}
          <h1 className="text-xl font-bold">PayRecall</h1>

          {/* USER DROPDOWN */}
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session.user.image || ""} />
                  <AvatarFallback>
                    {session.user.name?.slice(0, 2).toUpperCase() || "US"}
                  </AvatarFallback>
                </Avatar>

                <span className="hidden text-sm font-medium sm:block">
                  {session.user.name}
                </span>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-72">
                {/* USER INFO */}
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-medium">{session.user.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {session.user.email}
                    </span>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {/* STRIPE INFO */}
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Stripe
                </DropdownMenuLabel>

                {stripeAccount ? (
                  <>
                    {/* État Stripe */}
                    <div className="px-3 py-1 text-sm text-green-600">
                      Connecté
                    </div>

                    {/* ID Stripe */}
                    <div className="px-3 pb-2 text-xs text-gray-500">
                      Compte : <span className="font-mono">{stripeAccount}</span>
                    </div>

                    <DropdownMenuItem asChild>
                      <Link href="/stripe/manage">
                        Gérer mon compte Stripe
                      </Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <div className="px-3 py-1 text-sm text-red-600">
                      Non connecté
                    </div>

                    <DropdownMenuItem asChild>
                      <Link href="/stripe/manage">Connecter Stripe</Link>
                    </DropdownMenuItem>
                  </>
                )}

                <DropdownMenuSeparator />

                {/* LOGOUT */}
                <DropdownMenuItem asChild>
                  <LoginButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/">
              <Button variant="outline">Se connecter</Button>
            </Link>
          )}
        </div>
      </header>
    </div>
  );
}
