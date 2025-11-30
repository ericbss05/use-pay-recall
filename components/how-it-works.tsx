import { ArrowRight, Check } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function HowItWorks() {
    return (
        <div>
            <section id="how-it-works" className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20 reveal">
                        <span className="text-brand-600 font-display font-bold uppercase tracking-wider text-sm mb-4 block">Fonctionnement</span>
                        <h1
                            className="mt-8 max-w-4xl mx-auto text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem]">
                            Configuration éclair en 3 étapes
                        </h1>
                        <p
                            className="mx-auto mt-8 max-w-2xl text-balance text-lg">
                            Pas besoin de développeur : connectez votre stack, activez vos relances et laissez PayRecall récupérer automatiquement vos paiements en arrière-plan.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="relative bg-neutral-900 rounded-xl p-8 overflow-hidden group hover:-translate-y-2 transition-all duration-500 reveal shadow-xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-neutral-600 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-neutral-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-brand-600/30">
                                    <span className='text-2xl text-white'>1</span>
                                </div>
                                <h3 className="font-display text-2xl font-semibold text-white mb-4">1. Connectez Stripe</h3>
                                <p className="text-muted-foreground text-lg mb-8">Connexion sécurisée en un clic via Stripe Connect. Nous détectons les échecs en temps réel via webhooks.</p>

                                <div className="bg-neutral-800/50 rounded-xl p-4 border border-slate-700/50 h-36 flex flex-col justify-center items-center gap-4 group-hover:border-brand-500/50 transition-colors">
                                    <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full">
                                        <div className="w-6 h-6 bg-indigo-500 rounded-md text-center text-white font-bold">S</div>
                                        <span className="text-white font-medium">Stripe</span>
                                        <ArrowRight className="text-white" />
                                        <div className="w-6 h-6 bg-brand-600 rounded-md flex items-center justify-center text-white text-xs font-bold"><Image src="/logo-white.svg" width={32} height={32} alt="logo" /></div>
                                    </div>
                                    <div className="text-green-400 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Check />Connecté avec succès
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative bg-white rounded-xl p-8 overflow-hidden group hover:-translate-y-2 transition-all duration-500 reveal shadow-xl border border-slate-200">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-100 rounded-full blur-[100px] opacity-60 group-hover:opacity-80 transition-opacity"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-accent-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-accent-500/30">
                                   <span className='text-2xl'>2</span>
                                </div>
                                <h3 className="font-display text-2xl font-semibold text-slate-900 mb-4">2. Personnalisez vos relances</h3>
                                <p className="text-muted-foreground text-lg mb-8">Personnalisez vos relances, ajoutez votre logo, vos couleurs et configurez votre domaine (CNAME) pour une confiance totale.</p>

                                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 h-36 flex flex-col justify-center gap-3 group-hover:border-accent-300 transition-colors relative overflow-hidden">
                                    <div className="absolute top-0 right-0 bg-accent-500 text-white text-xs uppercase font-semibold px-2 py-1 rounded-bl-lg">Marque Blanche</div>
                                    <div className="w-full bg-white border border-slate-200 rounded-lg p-3 flex items-center gap-3 shadow-sm">
                                        <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                                        <div className="flex-1">
                                            <div className="h-2 w-3/4 bg-slate-200 rounded mb-2"></div>
                                            <div className="h-2 w-1/2 bg-slate-100 rounded"></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <div className="bg-accent-100 text-accent-700 text-xs font-semibold px-3 py-1 rounded-full">De: facturation@votresite.com</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative bg-neutral-900 rounded-xl p-8 overflow-hidden group hover:-translate-y-2 transition-all duration-500 reveal shadow-xl">

                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-purple-600/30">
                                    <span className='text-2xl text-white'>3</span>
                                </div>
                                <h3 className="font-display text-2xl font-semibold text-white mb-4">3. Activez et récupérez</h3>
                                <p className="text-muted-foreground text-lg mb-8">Lancez les séquences. PayRecall gère tout et vous redirige les fonds récupérés directement sur votre compte Stripe.</p>

                                <div className="bg-neutral-800/50 rounded-xl p-4 border border-slate-700/50 h-36 flex items-end justify-center gap-2 group-hover:border-purple-500/50 transition-colors relative overflow-hidden pb-0">
                                    <div className="w-1/5 bg-purple-900/50 rounded-t-lg h-10 group-hover:h-16 transition-all duration-500 relative"><div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-purple-300 opacity-0 group-hover:opacity-100">$</div></div>
                                    <div className="w-1/5 bg-purple-800/50 rounded-t-lg h-16 group-hover:h-24 transition-all duration-500 delay-75 relative"><div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-purple-300 opacity-0 group-hover:opacity-100">$$</div></div>
                                    <div className="w-1/5 bg-purple-600/50 rounded-t-lg h-24 group-hover:h-32 transition-all duration-500 delay-150 relative"><div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-purple-300 font-bold opacity-0 group-hover:opacity-100">$$$</div></div>
                                    <div className="w-1/5 bg-purple-500 rounded-t-lg h-32 group-hover:h-full transition-all duration-500 delay-200 relative shadow-lg shadow-purple-500/50"><div className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm text-white font-bold bg-purple-600 px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100">+35%</div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HowItWorks
