// app/api/stripe-disconnect/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover",
});

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    // Récupérer le compte Stripe connecté
    const account = await prisma.account.findFirst({
      where: {
        user: { email: session.user.email },
        provider: "stripe",
      },
      select: {
        providerAccountId: true,
      },
    });

    if (!account) {
      return NextResponse.json({ error: "No Stripe account linked" }, { status: 404 });
    }

    console.log("Stripe Account for current user:", account.providerAccountId);

    return NextResponse.json({ providerAccountId: account.providerAccountId });
  } catch (err) {
    console.error("Erreur récupération Stripe account:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    // Récupérer le compte Stripe connecté
    const account = await prisma.account.findFirst({
      where: {
        user: { email: session.user.email },
        provider: "stripe",
      },
      select: {
        providerAccountId: true,
        id: true,
      },
    });

    if (!account) {
      return NextResponse.json({ error: "No Stripe account linked" }, { status: 404 });
    }

    const { providerAccountId, id: accountId } = account;
    console.log("Disconnecting Stripe account:", providerAccountId);

    // Déconnecter le compte via Stripe OAuth
    await stripe.oauth.deauthorize({
      client_id: process.env.STRIPE_CLIENT_ID!,
      stripe_user_id: providerAccountId,
    });

    // Supprimer complètement l'entrée Account
    await prisma.account.delete({
      where: { id: accountId },
    });

    return NextResponse.json({ success: true, message: "Stripe account disconnected" });
  } catch (err) {
    console.error("Erreur déconnexion Stripe:", err);
    return NextResponse.json({ error: "Failed to disconnect Stripe account" }, { status: 500 });
  }
}
