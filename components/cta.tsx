"use client"

import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Cta4Props {
    title?: string;
    description?: string;
    buttonText?: string;
    buttonUrl?: string;
    items?: string[];
}

const defaultItems = [
    "Accès anticipé dès le lancement",
    "Prix founding member : 200€l'année au lieu du prix public",
    "Garantie : remboursement si insatisfait sous 60 jours après accès",
    "Influence directe sur le développement des fonctionnalités"
];

export const Cta4 = ({
    title = "Rejoignez l'Early Access PayRecall",
    description = "Profitez de l’accès anticipé à l’outil qui automatise vos relances et récupère vos paiements en retard. Offre limitée aux premiers utilisateurs.",
    buttonText = "Obtenir l'accès anticipé",
    buttonUrl = "#",
    items = defaultItems,
}: Cta4Props) => {

    async function handleClick() {
        const res = await fetch("/api/checkout", { method: "POST" });
        const data = await res.json();
        window.location.href = data.url;
    }
    return (
        <section className="py-32">
            <div className="container mx-auto">
                <div className="flex justify-center">
                    <div className="max-w-5xl">
                        <div className="flex flex-col items-start justify-between gap-8 rounded-lg bg-muted px-6 py-10 md:flex-row lg:px-20 lg:py-16">
                            {/* Left: Title + Description + Button */}
                            <div className="md:w-1/2">
                                <h4 className="mb-1 text-2xl font-bold md:text-3xl">{title}</h4>
                                <p className="text-muted-foreground mt-2">{description}</p>
                                <Button className="mt-6"
                                    onClick={handleClick}
                                >
                                    {buttonText} <ArrowRight className="size-4" />
                                </Button>
                            </div>

                            {/* Right: Benefits */}
                            <div className="md:w-1/3">
                                <ul className="flex flex-col space-y-3 text-sm font-medium">
                                    {items.map((item, idx) => (
                                        <li className="flex items-center" key={idx}>
                                            <Check className="mr-3 size-4 text-primary" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
