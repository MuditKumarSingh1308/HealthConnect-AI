"use client";

import { useState } from "react";
import Link from "next/link";
import { Ambulance, Phone, ShieldAlert, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function EmergencySOS() {
const [isOpen, setIsOpen] = useState(false);

return (
<>
<Button
type="button"
aria-haspopup="dialog"
aria-expanded={isOpen}
onClick={() => setIsOpen(true)}
className="h-14 min-w-40 whitespace-nowrap bg-red-600 px-6 text-base text-white hover:bg-red-700"
> <ShieldAlert className="mr-2 h-5 w-5" aria-hidden="true" />
Emergency SOS </Button>

  {isOpen && (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setIsOpen(false);
      }}
    >
      <Card
        role="dialog"
        aria-modal="true"
        aria-labelledby="emergency-sos-title"
        className="w-full max-w-lg border-red-200 bg-white p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-700">
              <ShieldAlert className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h2 id="emergency-sos-title" className="text-xl font-bold">
                Emergency assistance
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Choose your next action.
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close emergency dialog"
            onClick={() => setIsOpen(false)}
            className="rounded-md p-2 text-slate-500 hover:bg-slate-100"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="font-semibold text-red-800">
            If someone is in immediate danger, contact emergency services now.
          </p>
          <p className="mt-2 text-sm leading-6 text-red-700">
            This prototype does not transmit your location, notify emergency
            contacts, or dispatch an ambulance automatically.
          </p>
        </div>

        <div className="mt-5 grid gap-3">
          <a
            href="tel:112"
            className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call emergency number (112)
          </a>

          <Link
            href="/ambulance"
            onClick={() => setIsOpen(false)}
            className="flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-3 font-semibold text-slate-800 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
          >
            <Ambulance className="h-5 w-5" aria-hidden="true" />
            Open ambulance assistance
          </Link>

          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  )}
</>

);
}
