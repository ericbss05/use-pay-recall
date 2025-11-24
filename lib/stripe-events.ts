import { prisma } from "@/lib/prisma";

interface FailedPaymentEvent {
  connectedAccount: string; // providerAccountId Stripe
  invoiceId?: string;
  subscriptionId?: string | null;
  email?: string | null;
  name?: string | null;
  amountDue?: number | null;
}

/**
 * Enregistre un paiement échoué pour un compte Stripe existant
 */
export async function saveFailedPayment(event: FailedPaymentEvent) {
  const { connectedAccount, invoiceId, subscriptionId, email, name, amountDue } = event;

  // 1️⃣ Récupérer l'Account correspondant au connectedAccount
  const account = await prisma.account.findUnique({
    where: {
      provider_providerAccountId: {
        provider: "stripe",
        providerAccountId: connectedAccount,
      },
    },
  });

  if (!account) {
    console.error(`[Stripe Lib] ❌ Account inconnu pour connectedAccount ${connectedAccount}`);
    return null;
  }

  // 2️⃣ Créer le FailedPayment lié à cet Account
  try {
    const failedPayment = await prisma.failedPayment.create({
      data: {
        accountId: account.id,      // la relation many-to-one
        invoiceId: invoiceId ?? null,
        subscriptionId: subscriptionId ?? null,
        email: email ?? null,
        name: name ?? null,
        amountDue: amountDue ?? null,
      },
    });

    console.log(`[Stripe Lib] 💾 Paiement échoué enregistré : ${failedPayment.id}`);
    return failedPayment;

  } catch (err) {
    console.error("[Stripe Lib] ❌ Erreur lors de l’enregistrement du paiement échoué :", err);
    throw err;
  }
}
