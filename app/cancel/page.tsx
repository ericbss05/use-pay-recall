"use client"

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";

export default function CancelPage() {
    async function handleClick() {
        const res = await fetch("/api/checkout", { method: "POST" });
        const data = await res.json();
        window.location.href = data.url;
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        {/* Icône d'annulation */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
            <X className="w-8 h-8 text-orange-600" strokeWidth={2.5} />
          </div>
        </div>

        {/* Contenu */}
        <div className="text-center space-y-3 mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Paiement annulé
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Votre paiement a été annulé. Aucun montant n'a été débité de votre compte. Vous pouvez réessayer quand vous le souhaitez.
          </p>
        </div>

        {/* Boutons d'action */}
        <div className="space-y-3">
          <Button
            onClick={handleClick}
            className="block w-full px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors text-center"
          >
            Réessayer le paiement
          </Button>
          <Link
            href="/"
            className="block w-full px-4 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-center"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}