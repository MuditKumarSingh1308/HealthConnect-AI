import Link from "next/link";
import { ArrowLeft, LayoutDashboard } from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(to_bottom,#f8fafc,#e2e8f0)] px-5 py-10 text-slate-950">
      <Card className="w-full max-w-2xl border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/70">
        <BrandLogo className="justify-center" showVersion />
        <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-teal-700">
          Page not found
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          This care route is unavailable.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-600">
          The page may have moved, or the route is not part of the current HealthConnect AI demo.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild className="h-11">
            <Link href="/dashboard">
              <LayoutDashboard className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <Button asChild className="h-11 border-slate-200" variant="outline">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </div>
      </Card>
    </main>
  );
}
