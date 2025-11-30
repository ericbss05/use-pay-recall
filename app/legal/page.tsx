"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <main className="max-w-xl text-justify mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft size={20} className="mr-2" />
          <span className="text-lg">Retour</span>
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Politique de confidentialité de PayRecall
      </h1>

      <section className="space-y-6 text-gray-700">
        <p>
          Merci de votre visite sur PayRecall. Cette politique de confidentialité explique
          comment nous collectons, utilisons et protégeons vos données personnelles lors de
          l’utilisation de notre site web et de notre service de gestion de relance et paiement.
        </p>

        <p>
          En utilisant PayRecall, vous acceptez les pratiques décrites ici. Si vous n’êtes pas
          d’accord avec cette politique, veuillez ne pas utiliser notre service.
        </p>

        {/* SECTION 1 */}
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Données que nous collectons</h2>
          
          {/* 1.1 Données personnelles */}
          <div className="ml-4">
            <h3 className="font-medium mb-2">1.1 Données personnelles</h3>
            <p className="mb-4">
              Dans le cadre de l’utilisation de PayRecall, nous collectons certaines
              informations personnelles afin d'assurer le bon fonctionnement du service.
              Cela inclut :
            </p>

            <ul className="list-disc ml-8 mb-4">
              <li>Votre nom et votre adresse e-mail</li>
              <li>Les informations relatives à votre paiement (gérées exclusivement via Stripe)</li>
              <li>Vos préférences d’abonnement ou d’utilisation</li>
            </ul>

            <p className="mb-4">
              Nous ne stockons <strong>jamais</strong> les informations complètes de votre carte bancaire.
              Tous les paiements sont traités de manière sécurisée par notre prestataire de
              paiement <strong>Stripe</strong>, conforme aux normes PCI-DSS.
            </p>
          </div>

          {/* 1.2 Données non personnelles */}
          <div className="ml-4">
            <h3 className="font-medium mb-2">1.2 Données non personnelles</h3>
            <p className="mb-4">
              Nous pouvons collecter automatiquement des données techniques (adresse IP,
              type d’appareil, navigateur, pages consultées) afin d’améliorer notre plateforme,
              analyser l’usage et détecter d’éventuelles anomalies.
            </p>
          </div>
        </section>

        {/* SECTION 2 */}
        <section>
          <h2 className="text-xl font-semibold mb-3">2. Traitement des paiements</h2>

          <p className="ml-4 mb-4">
            PayRecall utilise Stripe pour traiter les paiements. Lorsque vous effectuez un achat
            ou un abonnement, certaines données (email, montant, type d’abonnement) sont transmises
            à Stripe afin de permettre la transaction.
          </p>

          <p className="ml-4 mb-4">
            Stripe est un service certifié PCI Level 1, garantissant le plus haut niveau de
            sécurité pour vos données financières.
          </p>
        </section>

        {/* SECTION 3 */}
        <section>
          <h2 className="text-xl font-semibold mb-3">3. Partage de données</h2>
          <p className="ml-4 mb-4">
            Nous ne vendons, n’échangeons et ne louons <strong>aucune</strong> donnée personnelle.
            Nous ne partageons vos informations qu’avec les prestataires indispensables au bon
            fonctionnement du service (ex. Stripe pour les paiements, services d’hébergement).
          </p>
        </section>

        {/* SECTION 4 */}
        <section>
          <h2 className="text-xl font-semibold mb-3">4. Vos droits (RGPD)</h2>
          <p className="ml-4 mb-4">
            Conformément au RGPD, vous disposez des droits suivants :
          </p>

          <ul className="list-disc ml-12 mb-4">
            <li>Droit d’accès</li>
            <li>Droit de rectification</li>
            <li>Droit à la suppression (effacement)</li>
            <li>Droit d’opposition</li>
            <li>Droit à la portabilité de vos données</li>
          </ul>

          <p className="ml-4 mb-4">
            Pour exercer ces droits, il vous suffit de nous contacter à l’adresse e-mail ci-dessous.
          </p>
        </section>

        {/* SECTION 5 */}
        <section>
          <h2 className="text-xl font-semibold mb-3">5. Mise à jour de la politique</h2>
          <p className="ml-4 mb-4">
            Nous pouvons mettre à jour cette politique de confidentialité pour refléter des
            changements légaux ou des améliorations de notre service. Les modifications
            importantes seront communiquées par e-mail.
          </p>
        </section>

        {/* SECTION 6 */}
        <section>
          <h2 className="text-xl font-semibold mb-3">6. Contact</h2>
          <p>
            Pour toute question, demande ou exercice de vos droits, vous pouvez nous contacter à :
          </p>

          <p className="mt-2">
            Contact :{" "}
            <a
              href="mailto:eric.buisson.pro@gmail.com"
              className="underline hover:text-blue-500 cursor-pointer transition"
            >
              eric.buisson.pro@gmail.com
            </a>
          </p>

          <p className="mt-4">
            En utilisant PayRecall, vous acceptez pleinement les termes de cette politique
            de confidentialité.
          </p>
        </section>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
