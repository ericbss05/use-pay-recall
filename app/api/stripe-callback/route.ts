// app/api/stripe-callback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth'; 
import { authOptions } from '@/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Code d’autorisation manquant' }, { status: 400 });
  }

  try {
    const response = await stripe.oauth.token({
      grant_type: 'authorization_code',
      code,
    });

    const stripe_user_id = response.stripe_user_id;
    const access_token = response.access_token;

    if (!stripe_user_id || !access_token) {
      return NextResponse.json({ error: 'Échec de la récupération des identifiants Stripe' }, { status: 400 });
    }

    const accountInfo = await stripe.accounts.retrieve(stripe_user_id);
    console.log(accountInfo); // Vérifiez ce qui est renvoyé par l'API

    // Vérifiez si settings et display_name existent
    const stripeAccount = accountInfo.settings?.dashboard?.display_name || null;

    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    if (!userId) {
      return NextResponse.json({ error: 'Utilisateur non connecté' }, { status: 401 });
    }

    await prisma.account.create({
      data: {
        userId,
        type: 'oauth',
        provider: 'stripe',
        providerAccountId: stripe_user_id,
        access_token,
        stripeAccount, // Stockez le nom de la boutique ici
      },
    });

    return NextResponse.redirect(`${req.nextUrl.origin}/dashboard`);

  } catch (err) {
    console.error(err); // Log d'erreur pour déboguer
    return NextResponse.json({ error: 'Une erreur inconnue est survenue' }, { status: 400 });
  }
}
