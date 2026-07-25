import {
  Activity,
  Ambulance,
  ArrowRight,
  Banknote,
  Bed,
  Brain,
  Droplets,
  FileText,
  Hospital,
  Siren,
  Sparkles,
  PlayCircle,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { BrandLogo } from "@/components/brand-logo";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const features = [
  {
    title: "AI Emergency Triage",
    description: "Guides patients from symptom input to suggested emergency action.",
    icon: Brain,
  },
  {
    title: "Smart Hospital Recommendation",
    description: "Matches patients with hospitals based on urgency, distance, and care needs.",
    icon: Hospital,
  },
  {
    title: "Ambulance Booking",
    description: "Supports fast emergency booking flows for nearby ambulance availability.",
    icon: Ambulance,
  },
  {
    title: "Live Bed Availability",
    description: "Surfaces ICU and general bed capacity for faster care routing.",
    icon: Bed,
  },
  {
    title: "Blood Bank Finder",
    description: "Helps locate compatible blood groups and emergency blood bank contacts.",
    icon: Droplets,
  },
  {
    title: "Government Scheme Assistant",
    description: "Helps patients discover eligible healthcare schemes and required documents.",
    icon: Banknote,
  },
  {
    title: "Medical Report Explanation",
    description: "Turns complex report text into simpler summaries and doctor questions.",
    icon: FileText,
  },
  {
    title: "Patient Medical History",
    description: "Keeps key patient context ready for emergency and follow-up care.",
    icon: UserRound,
  },
];

const steps = [
  {
    title: "Tell symptoms",
    description: "A patient shares symptoms through a guided emergency intake flow.",
  },
  {
    title: "AI recommends action",
    description: "The platform assists with urgency, next steps, and care direction.",
  },
  {
    title: "Connect to ambulance/hospital/blood bank",
    description: "Patients are routed toward the right emergency support channel.",
  },
];

const stats = [
  { value: "Rule-based", label: "triage engine" },
  { value: "Sample", label: "hospital dataset" },
  { value: "Simulated", label: "response planning" },
  { value: "Guided", label: "demo scenarios" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <section className="relative border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.32),transparent_34rem),radial-gradient(circle_at_top_right,rgba(59,130,246,0.2),transparent_30rem),linear-gradient(to_bottom,rgba(15,23,42,0),rgba(15,23,42,0.92))]" />
        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-6 sm:px-8">
          <BrandLogo showVersion variant="light" />
          <nav aria-label="Primary navigation" className="hidden items-center gap-5 md:flex">
            <Link className="text-sm font-medium text-slate-300 transition hover:text-teal-200" href="/about">
              About
            </Link>
            <Link className="text-sm font-medium text-slate-300 transition hover:text-teal-200" href="/contact">
              Contact
            </Link>
            <Link className="text-sm font-medium text-slate-300 transition hover:text-teal-200" href="/dashboard">
              Dashboard
            </Link>
          </nav>
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-28 lg:pt-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/25 bg-teal-300/10 px-4 py-2 text-sm font-medium text-teal-100">
              Hackathon-ready healthcare prototype
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">
              AI-powered emergency healthcare platform
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              In emergencies, patients lose critical time finding the right care. HealthConnect AI
              brings symptom guidance, hospital discovery, ambulance access, blood support, and care
              context into one fast assistive platform. Demonstration data is used in this
              hackathon prototype.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-12 bg-red-600 px-6 text-base shadow-lg shadow-red-950/30 hover:-translate-y-0.5 hover:bg-red-500">
                <Link href="/login">
                  <Siren className="h-5 w-5" />
                  Start Emergency
                </Link>
              </Button>
              <Button asChild className="h-12 bg-teal-500 px-6 text-base text-slate-950 shadow-lg shadow-teal-950/30 hover:-translate-y-0.5 hover:bg-teal-300">
                <Link href="/assistant?demo=1">
                  <PlayCircle className="h-5 w-5" />
                  Demo Mode
                </Link>
              </Button>
              <Button
                asChild
                className="h-12 border-white/15 bg-white/10 px-6 text-base text-white hover:-translate-y-0.5 hover:bg-white/15"
                variant="outline"
              >
                <Link href="/dashboard">
                  Explore Platform
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          <Card className="border-white/10 bg-white/[0.06] p-5 text-white shadow-2xl shadow-teal-950/30 backdrop-blur">
            <div className="rounded-lg border border-white/10 bg-slate-900/80 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">Emergency readiness</p>
                  <p className="mt-2 text-4xl font-semibold">Live care routing</p>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-400/15 text-teal-200">
                  <Activity className="h-7 w-7" />
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <DashboardTile label="AI triage" value="Assistive" icon={<Brain className="h-5 w-5" />} />
                <DashboardTile label="Hospital match" value="Smart" icon={<Hospital className="h-5 w-5" />} />
                <DashboardTile label="Ambulance" value="Ready" icon={<Ambulance className="h-5 w-5" />} />
                <DashboardTile label="Blood support" value="Finder" icon={<Droplets className="h-5 w-5" />} />
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="platform" className="bg-slate-50 px-5 py-16 text-slate-950 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
              Platform Features
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Built for emergency healthcare workflows
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-900/10"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50 text-teal-700 transition group-hover:bg-teal-600 group-hover:text-white">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 text-slate-950 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
              How It Works
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              A clear path from symptoms to support
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <Card key={step.title} className="border-slate-200 bg-slate-50 p-5 hover:-translate-y-1 hover:border-teal-200 hover:bg-white hover:shadow-xl hover:shadow-teal-900/10">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-16 text-white sm:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card
                key={stat.label}
                className="border-white/10 bg-white/[0.06] p-6 text-white transition duration-300 hover:-translate-y-1 hover:bg-white/[0.09]"
              >
                <p className="text-3xl font-semibold text-teal-200">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-300">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function DashboardTile({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.05] p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="text-teal-200">{icon}</div>
        <Sparkles className="h-4 w-4 text-slate-500" />
      </div>
      <p className="mt-5 text-sm text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
