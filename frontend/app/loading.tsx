import { Activity } from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 text-white">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.06] p-8 text-center shadow-2xl shadow-teal-950/30">
        <BrandLogo className="justify-center" showVersion variant="light" />
        <div className="mx-auto mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-teal-400/15 text-teal-200">
          <Activity className="h-7 w-7 animate-pulse" />
        </div>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight">Preparing HealthConnect AI</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Loading the emergency healthcare prototype.
        </p>
      </section>
    </main>
  );
}
