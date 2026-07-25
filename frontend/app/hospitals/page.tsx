"use client";

import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bed,
  CheckCircle2,
  HeartPulse,
  Hospital,
  Loader2,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SelectField } from "@/components/ui/form-field";
import {
  getHospitalRecommendations,
  type HospitalRecommendation,
} from "@/lib/hospitals";

const emergencyTypes = ["Cardiac", "Trauma", "Breathing", "Neurology", "General emergency"];
const severities = ["Critical", "Moderate", "Low"];
const specialists = [
  "Cardiologist",
  "Emergency Physician",
  "Neurologist",
  "Orthopedic",
  "Pulmonologist",
  "General Physician",
];

export default function HospitalsPage() {
  const [emergencyType, setEmergencyType] = useState("Cardiac");
  const [severity, setSeverity] = useState("Critical");
  const [specialistNeeded, setSpecialistNeeded] = useState("Cardiologist");
  const [recommendations, setRecommendations] = useState<HospitalRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const results = await getHospitalRecommendations({
        emergency_type: emergencyType,
        severity,
        specialist_needed: specialistNeeded,
      });
      setRecommendations(results);
    } catch {
      setError("Unable to load hospital recommendations. Make sure the FastAPI backend is running.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fafc,#e2e8f0)] text-slate-950">
      <section className="border-b border-slate-200 bg-slate-950 px-5 py-8 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Link className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm font-medium text-teal-100 transition hover:bg-white/[0.1]" href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-1 text-sm text-teal-100">
                <HeartPulse className="h-4 w-4" />
                Smart Hospital Recommendation
              </p>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                Match patients to a recommended hospital
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Recommendations are ranked by emergency support, ICU availability for critical
                cases, specialist match, distance, and rating.
              </p>
            </div>
            <Card className="border-white/10 bg-white/[0.06] p-5 text-white">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-8 w-8 text-teal-300" />
                <div>
                  <p className="text-sm text-slate-300">MVP mode</p>
                  <p className="text-xl font-semibold">Demonstration healthcare dataset</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-8 lg:grid-cols-[0.78fr_1.22fr]">
        <Card className="h-fit border-slate-200 bg-white shadow-lg shadow-slate-200/70">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
              <Hospital className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Recommendation filters</h2>
              <p className="text-sm text-slate-500">
                Select emergency context for the prototype ranking engine.
              </p>
            </div>
          </div>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <SelectField
              label="Emergency type"
              name="emergencyType"
              onChange={setEmergencyType}
              options={emergencyTypes}
              value={emergencyType}
            />
            <SelectField
              label="Severity"
              name="severity"
              onChange={setSeverity}
              options={severities}
              value={severity}
            />
            <SelectField
              label="Specialist needed"
              name="specialistNeeded"
              onChange={setSpecialistNeeded}
              options={specialists}
              value={specialistNeeded}
            />

            {error ? (
              <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">
                {error}
              </p>
            ) : null}

            <Button className="h-12 w-full bg-teal-600 shadow-lg shadow-teal-900/10 hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-xl" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Hospital className="h-4 w-4" />}
              Recommend hospitals
            </Button>
          </form>
        </Card>

        <div className="space-y-4" aria-live="polite">
          {recommendations.length ? (
            recommendations.map((recommendation) => (
              <HospitalCard key={recommendation.hospital.id} recommendation={recommendation} />
            ))
          ) : (
            <Card className="flex min-h-72 flex-col items-center justify-center border-dashed border-slate-300 bg-white/90 p-8 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-teal-700" />
              <h2 className="mt-4 text-2xl font-semibold">Recommendations will appear here</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Choose filters and run the ranking engine to see hospital cards and recommendation
                reasons. Demonstration data is used in this hackathon prototype.
              </p>
            </Card>
          )}
        </div>
      </section>
    </main>
  );
}

function HospitalCard({ recommendation }: { recommendation: HospitalRecommendation }) {
  const hospital = recommendation.hospital;

  return (
    <Card
      className={`border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-900/10 ${
        recommendation.best_match ? "ring-2 ring-teal-500" : ""
      }`}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-2xl font-semibold">{hospital.name}</h3>
            {recommendation.best_match ? (
              <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                Best match
              </span>
            ) : null}
          </div>
          <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
            <MapPin className="h-4 w-4" />
            {hospital.address}
          </p>
          <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
            <Phone className="h-4 w-4" />
            {hospital.phone}
          </p>
        </div>

        <div className="rounded-lg bg-slate-950 px-4 py-3 text-white">
          <p className="text-xs text-slate-300">Score</p>
          <p className="text-2xl font-semibold">{recommendation.score}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric icon={<MapPin className="h-4 w-4" />} label="Distance" value={`${hospital.distance_km} km`} />
        <Metric icon={<Bed className="h-4 w-4" />} label="ICU beds" value={hospital.icu_beds} />
        <Metric icon={<Bed className="h-4 w-4" />} label="General beds" value={hospital.general_beds} />
        <Metric icon={<Star className="h-4 w-4" />} label="Rating" value={hospital.rating} />
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium">Why recommended</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {recommendation.reasons.map((reason) => (
            <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700" key={reason}>
              {reason}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {hospital.specialists.map((specialist) => (
          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700" key={specialist}>
            {specialist}
          </span>
        ))}
      </div>
    </Card>
  );
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: number | string;
}) {
  return (
    <div className="rounded-lg bg-slate-50 p-3">
      <div className="flex items-center gap-2 text-teal-700">{icon}</div>
      <p className="mt-3 text-xl font-semibold">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}
