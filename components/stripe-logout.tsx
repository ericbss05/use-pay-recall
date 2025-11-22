"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function StripeDisconnectButton() {
  const [accountId, setAccountId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [disconnecting, setDisconnecting] = useState(false);

  // Récupérer le compte Stripe actuel
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await fetch("/api/stripe-disconnect");
        const data = await res.json();
        setAccountId(data.providerAccountId || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, []);

  // Déconnexion Stripe
  const handleDisconnect = async () => {
    if (!accountId) return;
    setDisconnecting(true);
    try {
      const res = await fetch("/api/stripe-disconnect", { method: "POST" });
      const data = await res.json();
      if (data.success) setAccountId(null);
      else console.error("Error disconnecting Stripe:", data.error);
    } catch (err) {
      console.error("Error disconnecting Stripe:", err);
    } finally {
      setDisconnecting(false);
    }
  };

  if (loading || !accountId) return null;

  return (
    <div className="flex justify-center">
      <Button
        onClick={handleDisconnect}
        variant="outline"
        disabled={disconnecting}
        className="w-full"
      >
        {disconnecting ? "deconnexion" : "Deconnecter Stripe"}
      </Button>
    </div>
  );
}
