// app/api/checkout/route.ts

import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  try {
    const baseUrl = process.env.BASE_URL; // <-- On récupère BASE_URL

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: "price_1SYmoXFRTIL1twzk1lITJF0k", // <-- Remplace par ton vrai price_id
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
