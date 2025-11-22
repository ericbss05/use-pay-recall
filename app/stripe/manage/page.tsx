'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import StripeDisconnectButton from '@/components/stripe-logout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ConnectToStripe = () => {
  const handleConnect = () => {
    const stripeClientId = process.env.STRIPE_CLIENT_ID; // Utilisez la clé client publique
    const redirectUri = encodeURIComponent('http://localhost:3000/api/stripe-callback'); // Mettez l'URI de redirection

    // Redirige l'utilisateur vers la page d'autorisation Stripe
    window.location.href = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_Qylm9Czsh8cfagU6jegnjb82zd5ZNRce&scope=read_write`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Connexion Stripe</CardTitle>
          <CardDescription>
            Connectez votre compte Stripe pour gérer vos paiements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            onClick={handleConnect}
            className="w-full"
          >
            Connecter Stripe
          </Button>
          <StripeDisconnectButton />
        </CardContent>
      </Card>
    </div>
  );
};

export default ConnectToStripe;
