"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Ambulance,
  ArrowLeft,
  CheckCircle2,
  Clock,
  HeartPulse,
  Loader2,
  MapPin,
  Phone,
  RefreshCw,
  ShieldAlert,
  Siren,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SelectField, TextField } from "@/components/ui/form-field";
import {
  bookAmbulance,
  getAvailableAmbulances,
  type Ambulance as AmbulanceType,
  type AmbulanceBookingResponse,
} from "@/lib/ambulances";

const emergencyTypes = ["Cardiac", "Trauma", "Breathing difficulty", "Accident", "General emergency"];
const severities = ["Critical", "Moderate", "Low"];

export default function AmbulancePage() {
  const [patientName, setPatientName] = useState("Demo Patient");
  const [location, setLocation] = useState("Current demo location");
  const [emergencyType, setEmergencyType] = useState("Cardiac");
  const [severity, setSeverity] = useState("Critical");
  const [ambulances, setAmbulances] = useState<AmbulanceType[]>([]);
  const [booking, setBooking] = useState<AmbulanceBookingResponse | null>(null);
  const [isLoadingAmbulances, setIsLoadingAmbulances] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState("");

  async function loadAmbulances() {
    setIsLoadingAmbulances(true);
    setError("");

    try {
      const available = await getAvailableAmbulances();
      setAmbulances(available);
    } catch {
      setError("Unable to load available ambulances. Make sure the FastAPI backend is running.");
    } finally {
      setIsLoadingAmbulances(false);
    }
  }

  useEffect(() => {
    void loadAmbulances();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsBooking(true);
    setError("");

    try {
      const response = await bookAmbulance({
        patient_name: patientName,
        location,
        emergency_type: emergencyType,
        severity,
      });
      setBooking(response);
    } catch {
      setError("Unable to book ambulance. Please retry after confirming the backend is running.");
    } finally {
      setIsBooking(false);
    }
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fafc,#e2e8f0)] text-slate-950">
      <section className="border-b border-red-950/20 bg-slate-950 px-5 py-8 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Link className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm font-medium text-red-100 transition hover:bg-white/[0.1]" href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-red-300/20 bg-red-300/10 px-3 py-1 text-sm text-red-100">
                <HeartPulse className="h-4 w-4" />
                Ambulance Booking
              </p>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                Book the nearest available ambulance
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Demo-ready booking flow with demonstration ambulance availability, assigned driver
                details, ETA, and simulated tracking steps.
              </p>
            </div>

            <Card className="border-white/10 bg-white/[0.06] p-5 text-white">
              <div className="flex items-center gap-3">
                <Siren className="h-8 w-8 text-red-300" />
                <div>
                  <p className="text-sm text-slate-300">MVP mode</p>
                  <p className="text-xl font-semibold">Simulated tracking view</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <Card className="border-slate-200 bg-white shadow-lg shadow-slate-200/70">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-50 text-red-700">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Booking form</h2>
                <p className="text-sm text-slate-500">Nearest available ambulance is assigned.</p>
              </div>
            </div>

            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              <TextField
                label="Patient name"
                name="patientName"
                onChange={setPatientName}
                placeholder="Patient name"
                required
                tone="red"
                value={patientName}
              />
              <TextField
                label="Location"
                name="location"
                onChange={setLocation}
                placeholder="Pickup location"
                required
                tone="red"
                value={location}
              />
              <SelectField
                label="Emergency type"
                name="emergencyType"
                onChange={setEmergencyType}
                options={emergencyTypes}
                tone="red"
                value={emergencyType}
              />
              <SelectField
                label="Severity"
                name="severity"
                onChange={setSeverity}
                options={severities}
                tone="red"
                value={severity}
              />

              {error ? (
                <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">
                  {error}
                </p>
              ) : null}

              <Button className="h-12 w-full bg-red-600 shadow-lg shadow-red-900/10 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-xl" disabled={isBooking}>
                {isBooking ? <Loader2 className="h-4 w-4 animate-spin" /> : <Ambulance className="h-4 w-4" />}
                Book nearest ambulance
              </Button>
            </form>
          </Card>

          <Card className="border-amber-200 bg-amber-50 text-amber-950">
            <p className="text-sm font-semibold">Emergency contact note</p>
            <p className="mt-2 text-sm leading-6">
              This demo does not contact real emergency services. In a real emergency, call your
              local emergency number immediately.
            </p>
          </Card>
        </div>

        <div className="space-y-6" aria-live="polite">
          <Card className="border-slate-200 bg-white">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-red-700">Available Ambulances</p>
                <h2 className="mt-1 text-2xl font-semibold">Nearest demonstration units</h2>
              </div>
              <Button
                className="border-red-100 text-red-700 hover:bg-red-50"
                disabled={isLoadingAmbulances}
                onClick={() => void loadAmbulances()}
                title="Refresh available ambulances"
                type="button"
                variant="outline"
              >
                {isLoadingAmbulances ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                Refresh
              </Button>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {isLoadingAmbulances ? (
                <div
                  className="col-span-full flex min-h-44 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-slate-300 bg-white/70 p-8"
                  role="status"
                >
                  <Loader2 className="h-6 w-6 animate-spin text-red-700" />
                  <span className="sr-only">Loading available ambulances</span>
                </div>
              ) : ambulances.length ? (
                ambulances.map((ambulance) => (
                  <AmbulanceCard ambulance={ambulance} key={ambulance.id} />
                ))
              ) : (
                <div className="col-span-full rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
                  No available ambulances found in the demonstration dataset.
                </div>
              )}
            </div>
          </Card>

          {booking ? (
            <Card className="border-red-100 bg-white shadow-2xl shadow-slate-200/80" role="region" aria-label="Ambulance booking confirmation">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-medium text-red-700">Booking confirmation</p>
                  <h2 className="mt-2 text-3xl font-semibold">{booking.booking_id}</h2>
                </div>
                <span className="inline-flex rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">
                  {booking.status}
                </span>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <InfoTile icon={<UserRound className="h-5 w-5" />} label="Driver" value={booking.assigned_ambulance.driver_name} />
                <InfoTile icon={<Clock className="h-5 w-5" />} label="ETA" value={`${booking.eta_minutes} minutes`} />
                <InfoTile icon={<Ambulance className="h-5 w-5" />} label="Vehicle" value={booking.assigned_ambulance.vehicle_number} />
                <InfoTile icon={<Phone className="h-5 w-5" />} label="Phone" value={booking.assigned_ambulance.phone} />
              </div>

              <div className="mt-6 rounded-lg bg-slate-50 p-4">
                <p className="text-sm font-semibold">Simulated tracking timeline</p>
                <div className="mt-4 space-y-3">
                  {booking.tracking_steps.map((step, index) => (
                    <div className="flex gap-3" key={step}>
                      <div className="flex flex-col items-center">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-xs font-semibold text-white">
                          {index + 1}
                        </span>
                        {index < booking.tracking_steps.length - 1 ? (
                          <span className="h-6 w-px bg-red-200" />
                        ) : null}
                      </div>
                      <p className="pt-1 text-sm text-slate-700">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ) : (
            <Card className="flex min-h-72 flex-col items-center justify-center border-dashed border-slate-300 bg-white/90 p-8 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-red-700" />
              <h2 className="mt-4 text-2xl font-semibold">Booking confirmation appears here</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Submit the booking form to assign the nearest available demonstration ambulance and
                show driver details with tracking steps.
              </p>
            </Card>
          )}
        </div>
      </section>
    </main>
  );
}

function AmbulanceCard({ ambulance }: { ambulance: AmbulanceType }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-1 hover:border-red-200 hover:bg-white hover:shadow-lg hover:shadow-red-900/10">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{ambulance.ambulance_type}</h3>
          <p className="mt-1 text-sm text-slate-500">{ambulance.vehicle_number}</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          {ambulance.status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <MiniMetric label="Distance" value={`${ambulance.distance_km} km`} />
        <MiniMetric label="ETA" value={`${ambulance.eta_minutes} min`} />
      </div>

      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p className="flex items-center gap-2">
          <UserRound className="h-4 w-4 text-red-700" />
          {ambulance.driver_name}
        </p>
        <p className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-red-700" />
          {ambulance.phone}
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-red-700" />
          Simulated route view - live maps are not connected
        </p>
      </div>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-white p-3">
      <p className="font-semibold">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}

function InfoTile({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <div className="text-red-700">{icon}</div>
      <p className="mt-3 text-xs text-slate-500">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}
