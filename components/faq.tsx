"use client"

import React from "react";

const FAQ = () => {
    // 👉 TypeScript doit comprendre que le state peut être number OU null
    const [openIndex, setOpenIndex] = React.useState<number | null>(null);

    const faqs = [
        {
            question: "Qu’est-ce que l’Early Access PayRecall ?",
            answer:
                "C’est un accès anticipé à PayRecall avant le lancement public, vous permettant d’utiliser l’outil pendant 1 an au tarif réduit de 79€ et de bénéficier des premières fonctionnalités.",
        },
        {
            question: "Comment fonctionne le paiement ?",
            answer:
                "Vous payez une seule fois pour accéder à l’Early Access pendant 1 an. Après cette période, vous pourrez renouveler au tarif normal si vous souhaitez continuer à utiliser PayRecall.",
        },
        {
            question: "Que se passe-t-il si PayRecall ajoute de nouvelles fonctionnalités ?",
            answer:
                "Toutes les nouvelles fonctionnalités ajoutées pendant l’Early Access sont automatiquement disponibles pour vous, sans coût supplémentaire.",
        },
        {
            question: "Quel support est disponible pendant l’Early Access ?",
            answer:
                "Un support basique est inclus : vous pouvez nous contacter par email ou via LinkedIn pour toute question ou problème lié à l’utilisation de PayRecall.",
        },
    ];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>

            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start justify-center gap-8 px-4 md:px-0">
                <div>
                    <p className="text-indigo-600 text-sm font-medium">FAQ's</p>
                    <h1 className="text-3xl font-semibold">Tout ce qu’il faut savoir sur PayRecall</h1>
                    <p className="text-sm text-slate-500 mt-2 pb-4">
                        Découvrez les réponses aux questions les plus courantes concernant l’Early Access, les tarifs, le support, et le fonctionnement général de PayRecall.
                    </p>

                    {faqs.map((faq, index) => (
                        <div
                            className="border-b border-slate-200 py-4 cursor-pointer"
                            key={index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-base font-medium">{faq.question}</h3>
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`${openIndex === index ? "rotate-180" : ""} transition-all duration-500 ease-in-out`}
                                >
                                    <path
                                        d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                                        stroke="#1D293D"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>

                            <p
                                className={`text-sm text-slate-500 transition-all duration-500 ease-in-out max-w-md ${
                                    openIndex === index
                                        ? "opacity-100 max-h-[300px] translate-y-0 pt-4"
                                        : "opacity-0 max-h-0 -translate-y-2"
                                }`}
                            >
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default FAQ;
