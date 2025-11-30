import { Check } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        {/* Icône de succès */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="w-8 h-8 text-green-600" strokeWidth={2.5} />
          </div>
        </div>

        {/* Contenu */}
        <div className="text-center space-y-3 mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Paiement confirmé
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Merci pour votre achat. Un email de confirmation vous a été envoyé avec les détails de votre commande.
          </p>
        </div>

        {/* Boutons d'action */}
        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors text-center"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}