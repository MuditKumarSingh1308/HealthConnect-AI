import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const contactCards = [
  {
    title: "Demo Support",
    value: "support@healthconnect.ai",
    description: "Sample support channel for hackathon reviewers.",
    icon: Mail,
  },
  {
    title: "Emergency Partner Line",
    value: "+91 90000 00000",
    description: "Demonstration contact for care coordination scenarios.",
    icon: Phone,
  },
  {
    title: "Demo Location",
    value: "Bengaluru, India",
    description: "Used for demonstration care-routing scenarios.",
    icon: MapPin,
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fafc,#e2e8f0)] text-slate-950">
      <section className="border-b border-slate-200 bg-white/90 px-5 py-6 backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link href="/">
            <BrandLogo showVersion />
          </Link>
          <Button asChild className="hidden bg-slate-950 hover:bg-teal-700 sm:inline-flex">
            <Link href="/dashboard">Open Dashboard</Link>
          </Button>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-medium text-teal-800">
              <MessageCircle className="h-4 w-4" />
              Contact
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
              Talk to the HealthConnect AI demo team.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              This page provides demonstration contact details for judges, hospitals, and care
              coordination scenarios.
            </p>
          </div>

          <div className="grid gap-5">
            {contactCards.map((item) => (
              <Card
                className="border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-900/10"
                key={item.title}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{item.title}</h2>
                      <p className="mt-1 font-medium text-teal-700">{item.value}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
