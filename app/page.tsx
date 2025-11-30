"use client"

import { Cta4 } from "@/components/cta"
import FAQ from "@/components/faq"
import Footer from "@/components/footer"
import { HeroSection } from "@/components/hero-section-1"
import HowItWorks from "@/components/how-it-works"
import Pricing from "@/components/pricing"

export default function page (){
    return (
        <>
        <HeroSection />
        <section id="fonctionnement"><HowItWorks /></section>
        <section id="tarifs"><Pricing /></section>
        <section id="faq"><FAQ /></section>
        <Cta4 />
        <Footer />
        </>
    )
}