import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/assistant", label: "AI Command Center" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 px-5 py-10 text-white sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <BrandLogo showVersion variant="light" />
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
            Hackathon-ready healthcare platform for emergency triage, care routing, and patient
            support workflows.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-[1fr_1.2fr]">
          <nav aria-label="Footer navigation">
            <p className="text-sm font-semibold text-white">Platform</p>
            <div className="mt-3 grid gap-2">
              {footerLinks.map((link) => (
                <Link
                  className="text-sm text-slate-400 transition hover:text-teal-200"
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-teal-100">
              <ShieldCheck className="h-4 w-4" />
              Medical disclaimer
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              This platform is an assistive tool and not a medical diagnosis system. In real
              emergencies, contact local emergency services immediately.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
