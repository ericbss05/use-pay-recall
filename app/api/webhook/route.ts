import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { saveFailedPayment } from "@/lib/stripe-events";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover",
});

type InvoiceWithSubscription = Stripe.Invoice & { subscription?: string };

// ===== Fonctions utilitaires =====
async function getCustomerEmail(invoice: Stripe.Invoice): Promise<string | null> {
  if (typeof invoice.customer_email === "string") return invoice.customer_email;
  if (typeof invoice.customer === "string") {
    const customer = await stripe.customers.retrieve(invoice.customer);
    if (!customer.deleted && typeof customer.email === "string") return customer.email;
  }
  return null;
}

async function getCustomerName(invoice: Stripe.Invoice): Promise<string | null> {
  if (typeof invoice.customer_name === "string") return invoice.customer_name;
  if (typeof invoice.customer === "string") {
    const customer = await stripe.customers.retrieve(invoice.customer);
    if (!customer.deleted && typeof customer.name === "string") return customer.name;
  }
  return null;
}

function formatPaidAmount(invoice: Stripe.Invoice): string | null {
  if (typeof invoice.amount_paid === "number" && typeof invoice.currency === "string") {
    return `${(invoice.amount_paid / 100).toFixed(2)} ${invoice.currency.toUpperCase()}`;
  }
  return null;
}

function formatDueAmount(invoice: Stripe.Invoice): number | null {
  if (typeof invoice.amount_due === "number") return invoice.amount_due;
  return null;
}

// Placeholder mail function
async function sendFailedPaymentEmail(email: string, subscriptionId: string, accountId?: string) {
  console.log(`[Mail] Relance envoyée à ${email} pour l'abonnement ${subscriptionId} (account: ${accountId})`);
}

// ===== Handlers =====
const handlers: Record<string, (event: Stripe.Event) => Promise<void>> = {
  "invoice.payment_succeeded": async (event) => {
    const invoice = event.data.object as InvoiceWithSubscription;
    const subscriptionId = invoice.subscription ?? null;
    const email = await getCustomerEmail(invoice);
    const name = await getCustomerName(invoice);
    const amountPaid = formatPaidAmount(invoice);

    console.log(`[SUCCESS] Invoice ID: ${invoice.id}`);
    console.log(`→ Subscription: ${subscriptionId}`);
    console.log(`→ Email client: ${email}`);
    console.log(`→ Nom client: ${name}`);
    console.log(`→ Montant payé: ${amountPaid}`);
    console.log(`→ Connected account: ${event.account}`);
  },

  "invoice.payment_failed": async (event) => {
    const invoice = event.data.object as InvoiceWithSubscription;
    const subscriptionId = invoice.subscription ?? null;
    const email = await getCustomerEmail(invoice);
    const name = await getCustomerName(invoice);
    const amountDue = formatDueAmount(invoice);

    if (event.account) {
      const valid = await ({
        connectedAccount: event.account,
        invoiceId: invoice.id,
        subscriptionId,
        email,
        name,
        amountDue: amountDue?.toString() ?? null,
      });

      if (valid) {
        await saveFailedPayment({
          connectedAccount: event.account,
          invoiceId: invoice.id,
          subscriptionId,
          email,
          name,
          amountDue: amountDue ?? null,
        });
      }
    }

    console.log(`[FAILED] Invoice ID: ${invoice.id}`);
    console.log(`→ Subscription: ${subscriptionId}`);
    console.log(`→ Email client: ${email}`);
    console.log(`→ Nom client: ${name}`);
    console.log(`→ Montant dû: ${amountDue}`);
    console.log(`→ Connected account: ${event.account}`);

    if (email && subscriptionId) {
      await sendFailedPaymentEmail(email, subscriptionId, event.account);
    }
  },

  "customer.subscription.created": async (event) => {
    const subscription = event.data.object as Stripe.Subscription;
    console.log(`[NEW SUBSCRIPTION] Subscription ID: ${subscription.id}`);
    console.log(`→ Connected account: ${event.account}`);
  },

  "account.application.authorized": async (event) => {
    console.log(`[CONNECT] Application autorisée pour le compte: ${event.account}`);
  },

  "payment_intent.canceled": async (event) => {
    const pi = event.data.object as Stripe.PaymentIntent;
    console.log(`[CANCELED] PaymentIntent ID: ${pi.id}`);
  },

  "checkout.session.expired": async (event) => {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log(`[EXPIRED] Checkout Session ID: ${session.id}`);
  },
};

// ===== Webhook =====
export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  const endpointSecret = process.env.WEBHOOK_SECRET_KEY;
  if (!endpointSecret) return NextResponse.json({ error: "Webhook secret missing" }, { status: 500 });

  let event: Stripe.Event;
  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error("[Webhook] ❌ Erreur validation Stripe :", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const connectedAccount = event.account;

  console.log("⚡ Événement Stripe reçu :", event.type, connectedAccount ? `(account: ${connectedAccount})` : "");

  // ✅ Appel du handler correspondant
  const handler = handlers[event.type];
  if (handler) await handler(event);

  return NextResponse.json({ received: true });
}
