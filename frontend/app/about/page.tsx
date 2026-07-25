import Link from "next/link";
import { ArrowRight, Brain, HeartPulse, Hospital, ShieldCheck } from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const values = [
  {
    title: "Emergency-first",
    description: "Designed around fast decisions when patients need clear next steps.",
    icon: HeartPulse,
  },
  {
    title: "Assistive AI",
    description: "Uses a rule-based decision engine with a service layer ready for future AI providers.",
    icon: Brain,
  },
  {
    title: "Care routing",
    description: "Connects triage, hospitals, ambulances, blood banks, and scheme guidance.",
    icon: Hospital,
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 px-5 py-6 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link href="/">
            <BrandLogo showVersion variant="light" />
          </Link>
          <Button asChild className="hidden bg-white text-slate-950 hover:bg-teal-100 sm:inline-flex">
            <Link href="/dashboard">Open Dashboard</Link>
          </Button>
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-16 sm:px-8 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.28),transparent_32rem)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-teal-300/25 bg-teal-300/10 px-4 py-2 text-sm font-medium text-teal-100">
            <ShieldCheck className="h-4 w-4" />
            About HealthConnect AI
          </p>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
            A focused emergency healthcare demo for faster care coordination.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            HealthConnect AI brings core emergency workflows into one polished hackathon-ready
            product: triage, hospital recommendations, ambulance booking, blood bank discovery,
            medical report explanation, and scheme assistance. Demonstration data is used in this
            hackathon prototype.
          </p>
          <div className="mt-8">
            <Button asChild className="h-12 bg-teal-500 px-6 text-base text-slate-950 hover:bg-teal-300">
              <Link href="/assistant">
                Try AI Command Center
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-16 text-slate-950 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-3">
            {values.map((value) => (
              <Card
                className="border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-900/10"
                key={value.title}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                  <value.icon className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-xl font-semibold">{value.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
