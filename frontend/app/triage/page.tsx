"use client";

import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Ambulance,
  ArrowLeft,
  Brain,
  CheckCircle2,
  HeartPulse,
  Hospital,
  Loader2,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { analyzeTriage, type TriageAnalyzeResponse } from "@/lib/triage";

const severityStyles: Record<TriageAnalyzeResponse["severity"], string> = {
  Critical: "border-red-200 bg-red-50 text-red-700",
  Moderate: "border-amber-200 bg-amber-50 text-amber-700",
  Low: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

export default function TriagePage() {
  const [symptoms, setSymptoms] = useState("chest pain and breathing difficulty");
  const [age, setAge] = useState("32");
  const [gender, setGender] = useState("Female");
  const [existingConditions, setExistingConditions] = useState("Asthma");
  const [result, setResult] = useState<TriageAnalyzeResponse | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const analysis = await analyzeTriage({
        symptoms,
        age: Number(age),
        gender,
        existing_conditions: existingConditions,
      });
      setResult(analysis);
    } catch {
      setError("Unable to analyze symptoms. Make sure the FastAPI backend is running.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fafc,#e2e8f0)] text-slate-950">
      <section className="border-b border-slate-200 bg-slate-950 px-5 py-8 text-white sm:px-8">
        <div className="mx-auto max-w-6xl">
          <Link className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm font-medium text-teal-100 transition hover:bg-white/[0.1]" href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-1 text-sm text-teal-100">
                <HeartPulse className="h-4 w-4" />
                AI Emergency Triage
              </p>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                Rule-based emergency triage for hackathon MVP
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Enter symptoms and patient context to receive prototype severity, recommended
                action, hospital type, ambulance guidance, and matched keywords.
              </p>
            </div>
            <Card className="border-white/10 bg-white/[0.06] p-5 text-white">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-8 w-8 text-teal-300" />
                <div>
                  <p className="text-sm text-slate-300">MVP mode</p>
                  <p className="text-xl font-semibold">Rule-based decision engine</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-10 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="border-slate-200 bg-white shadow-lg shadow-slate-200/70">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Patient symptoms</h2>
              <p className="text-sm text-slate-500">
                Demonstration data is used in this hackathon prototype.
              </p>
            </div>
          </div>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium" htmlFor="symptoms">
                Symptom input
              </label>
              <textarea
                className="mt-2 min-h-36 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                id="symptoms"
                onChange={(event) => setSymptoms(event.target.value)}
                placeholder="Describe symptoms like chest pain, fever, cough, dizziness..."
                required
                value={symptoms}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium" htmlFor="age">
                  Age
                </label>
                <input
                  className="mt-2 h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                  id="age"
                  max={120}
                  min={0}
                  onChange={(event) => setAge(event.target.value)}
                  required
                  type="number"
                  value={age}
                />
              </div>

              <div>
                <label className="text-sm font-medium" htmlFor="gender">
                  Gender
                </label>
                <select
                  className="mt-2 h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                  id="gender"
                  onChange={(event) => setGender(event.target.value)}
                  value={gender}
                >
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium" htmlFor="conditions">
                Existing conditions
              </label>
              <input
                className="mt-2 h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                id="conditions"
                onChange={(event) => setExistingConditions(event.target.value)}
                placeholder="Asthma, diabetes, hypertension..."
                value={existingConditions}
              />
            </div>

            {error ? (
              <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">
                {error}
              </p>
            ) : null}

            <Button className="h-12 w-full bg-teal-600 shadow-lg shadow-teal-900/10 hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-xl" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Brain className="h-4 w-4" />}
              Analyze symptoms
            </Button>
          </form>
        </Card>

        <div className="space-y-6" aria-live="polite">
          {result ? (
            <Card className="border-slate-200 bg-white shadow-2xl shadow-slate-200/80" role="region" aria-label="Triage analysis result">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Triage result</p>
                  <h2 className="mt-2 text-3xl font-semibold">{result.severity}</h2>
                </div>
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${
                    severityStyles[result.severity]
                  }`}
                >
                  {Math.round(result.confidence * 100)}% confidence
                </span>
              </div>

              <div className="mt-6 grid gap-4">
                <ResultRow
                  icon={<AlertTriangle className="h-5 w-5" />}
                  label="Recommended action"
                  value={result.recommended_action}
                />
                <ResultRow
                  icon={<Hospital className="h-5 w-5" />}
                  label="Recommended hospital type"
                  value={result.recommended_hospital_type}
                />
                <ResultRow
                  icon={<Ambulance className="h-5 w-5" />}
                  label="Ambulance required"
                  value={result.ambulance_required ? "Yes" : "No"}
                />
              </div>

              <div className="mt-6">
                <p className="text-sm font-medium">Matched keywords</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {result.matched_keywords.length ? (
                    result.matched_keywords.map((keyword) => (
                      <span
                        className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700"
                        key={keyword}
                      >
                        {keyword}
                      </span>
                    ))
                  ) : (
                    <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                      No keyword match
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ) : (
            <Card className="flex min-h-72 flex-col items-center justify-center border-dashed border-slate-300 bg-white/90 p-8 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-teal-700" />
              <h2 className="mt-4 text-2xl font-semibold">Result will appear here</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Submit symptoms to see severity, confidence, care recommendation, ambulance status,
                and matched rule keywords.
              </p>
            </Card>
          )}

          <Card className="border-amber-200 bg-amber-50 text-amber-950">
            <p className="text-sm font-semibold">Medical disclaimer</p>
            <p className="mt-2 text-sm leading-6">
              This triage tool is an assistive hackathon MVP and not a medical diagnosis system. For
              severe, worsening, or emergency symptoms, contact local emergency services immediately.
            </p>
          </Card>
        </div>
      </section>
    </main>
  );
}

function ResultRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-teal-200 hover:bg-white">
      <div className="flex gap-3">
        <div className="mt-0.5 text-teal-700">{icon}</div>
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-1 text-sm leading-6 text-slate-800">{value}</p>
        </div>
      </div>
    </div>
  );
}
