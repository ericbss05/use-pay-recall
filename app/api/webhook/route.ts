// app/api/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover",
});

/**
 * Récupère l'email du client depuis un invoice
 */
async function getCustomerEmail(invoice: Stripe.Invoice): Promise<string | null> {
  if (typeof invoice.customer_email === "string") return invoice.customer_email;

  if (typeof invoice.customer === "string") {
    const customer = await stripe.customers.retrieve(invoice.customer);
    if (!customer.deleted && typeof customer.email === "string") return customer.email;
  }

  return null;
}

/**
 * Fonction fictive d'envoi de mail de relance
 */
async function sendFailedPaymentEmail(
  email: string,
  subscriptionId: string,
  accountId?: string
) {
  console.log(
    `[Mail] Relance envoyée à ${email} pour l'abonnement ${subscriptionId} (account: ${accountId})`
  );
  // Ici tu peux brancher ton service mail réel (SendGrid, Nodemailer...)
}

/**
 * Webhook Stripe
 */
export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    console.error("[Webhook] Stripe-Signature manquant");
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const endpointSecret = process.env.WEBHOOK_SECRET_KEY;
  if (!endpointSecret) {
    console.error("[Webhook] WEBHOOK_SECRET_KEY non défini");
    return NextResponse.json({ error: "Webhook secret missing" }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error("[Webhook] ❌ Erreur validation Stripe :", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const connectedAccount = event.account ?? null; // Stripe Connect account

  console.log("⚡ Événement Stripe reçu :", event.type);

  switch (event.type) {
    // -------------------------------
    // Paiement réussi
    // -------------------------------
    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;

      // ⚡ Subscription peut ne pas être typée, on cast
      const subscriptionId =
        (invoice as Stripe.Invoice & { subscription?: string }).subscription ?? null;

      const email = await getCustomerEmail(invoice);

      console.log("✅ Paiement réussi");
      console.log("→ Abonnement :", subscriptionId);
      console.log("→ Email client :", email);
      console.log("→ Connected account :", connectedAccount);

      break;
    }

    // -------------------------------
    // Paiement échoué
    // -------------------------------
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;

      const subscriptionId =
        (invoice as Stripe.Invoice & { subscription?: string }).subscription ?? null;

      const email = await getCustomerEmail(invoice);

      console.log("❌ Paiement échoué");
      console.log("→ Abonnement :", subscriptionId);
      console.log("→ Email client :", email);
      console.log("→ Connected account :", connectedAccount);

      if (email && subscriptionId) {
        await sendFailedPaymentEmail(email, subscriptionId, connectedAccount ?? undefined);
      }

      break;
    }

    // -------------------------------
    // Nouvel abonnement
    // -------------------------------
    case "customer.subscription.created": {
      const subscription = event.data.object as Stripe.Subscription;
      console.log("🆕 Nouvel abonnement :", subscription.id);
      console.log("→ Connected account :", connectedAccount);
      break;
    }

    default:
      console.log("ℹ️ Événement non géré :", event.type);
  }

  return NextResponse.json({ received: true });
}
