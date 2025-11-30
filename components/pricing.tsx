import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'

export default function Pricing() {
    async function handleClick() {
        const res = await fetch("/api/checkout", { method: "POST" });
        const data = await res.json();
        window.location.href = data.url;
    }
    
    const earlyAccessBenefits = [
        "Accès anticipé dès le lancement",
        "Prix founding member : 200€ au lieu du prix public",
        "Garantie : remboursement si insatisfait sous 60 jours après accès",
        "Influence directe sur le développement des fonctionnalités"
    ]

    return (
        <div className="relative py-16 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                {/* Heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
                        Rejoignez l'Early Access PayRecall
                    </h2>
                </div>

                {/* Pricing Card */}
                <div className="mt-12 md:mt-20">
                    <Card className="relative p-8 md:p-12">
                        <div className="grid gap-12 md:grid-cols-2 md:divide-x">
                            {/* Left: Offer */}
                            <div className="text-center md:pr-12 flex flex-col items-center justify-center">
                                <h3 className="text-2xl font-semibold">Prévente Early Access</h3>
                                <p className="mt-2 text-lg">
                                    Payez maintenant et accédez à PayRecall pour une durée d’un an dès son lancement.
                                </p>

                                <span className="mb-6 mt-10 inline-block text-6xl font-bold">
                                    200<span className="text-xl">€/1er année</span>
                                </span>

                                <Button asChild size="lg" className="w-full max-w-xs" onClick={handleClick}>
                                    <Link href="#">Obtenir l'accès anticipé</Link>
                                </Button>

                                <p className="text-muted-foreground mt-6 text-sm max-w-xs">
                                    Offre limitée aux 10 premiers utilisateurs.
                                    Profitez d’un tarif réduit et garanti pour votre première année.
                                </p>
                            </div>

                            {/* Right: Benefits + Call */}
                            <div className="md:pl-12">
                                <ul role="list" className="space-y-4">
                                    {earlyAccessBenefits.map((item, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <Check className="text-primary size-3" strokeWidth={3.5} />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <p className="text-muted-foreground mt-8 text-sm">
                                    Profitez de votre rôle d’Early Access pour façonner le produit et bénéficier de tous les avantages réservés aux premiers utilisateurs.
                                </p>

                                <div className="mt-10 p-6 border rounded-xl bg-muted/20">
                                    <h4 className="font-semibold text-lg">Pas sûr ? Réservez un call</h4>
                                    <p className="text-sm mt-2 text-muted-foreground">
                                        Discutons ensemble de vos besoins et voyons comment PayRecall peut vous aider à réduire vos impayés.
                                    </p>

                                    <Button asChild variant="outline" className="mt-4 w-full">
                                        Réserver un appel découverte
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
