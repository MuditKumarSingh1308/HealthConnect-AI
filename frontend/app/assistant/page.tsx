"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Ambulance,
  ArrowLeft,
  Banknote,
  Bot,
  CheckCircle2,
  ClipboardList,
  Droplets,
  HeartPulse,
  Hospital,
  Loader2,
  MapPin,
  MessageCircle,
  RotateCcw,
  Phone,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TextField } from "@/components/ui/form-field";
import {
  generateEmergencyPlan,
  type EmergencyPlanResponse,
} from "@/lib/assistant";

const demoExamples = [
  {
    label: "🚑 Heart Attack",
    message: "My father has chest pain and difficulty breathing.",
    age: "62",
    location: "Bengaluru",
  },
  {
    label: "🩸 Road Accident",
    message: "My brother met with an accident and is bleeding heavily.",
    age: "28",
    location: "Bengaluru",
  },
  {
    label: "🤒 Fever",
    message: "My child has fever and vomiting for two days.",
    age: "8",
    location: "Delhi",
  },
];

const demoScenarioLabels = ["Heart Attack", "Road Accident", "Fever"];

const severityStyles: Record<EmergencyPlanResponse["severity"], string> = {
  Critical: "border-red-200 bg-red-50 text-red-700",
  Moderate: "border-amber-200 bg-amber-50 text-amber-700",
  Low: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

export default function AssistantPage() {
  const [message, setMessage] = useState(demoExamples[0].message);
  const [patientAge, setPatientAge] = useState(demoExamples[0].age);
  const [location, setLocation] = useState(demoExamples[0].location);
  const [result, setResult] = useState<EmergencyPlanResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    setIsDemoMode(new URLSearchParams(window.location.search).get("demo") === "1");
  }, []);

  async function runEmergencyPlan(nextMessage: string, nextAge: string, nextLocation: string) {
    setError("");
    setIsLoading(true);

    try {
      const plan = await generateEmergencyPlan({
        message: nextMessage,
        patient_age: Number(nextAge),
        location: nextLocation,
      });
      setResult(plan);
    } catch {
      setError("Unable to generate action plan. Make sure the FastAPI backend is running.");
    } finally {
      setIsLoading(false);
    }
  }

  async function applyExample(example: (typeof demoExamples)[number]) {
    setMessage(example.message);
    setPatientAge(example.age);
    setLocation(example.location);
    setIsDemoMode(true);
    await runEmergencyPlan(example.message, example.age, example.location);
  }

  function resetDemo() {
    setMessage(demoExamples[0].message);
    setPatientAge(demoExamples[0].age);
    setLocation(demoExamples[0].location);
    setResult(null);
    setError("");
    setIsDemoMode(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await runEmergencyPlan(message, patientAge, location);
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fafc,#e2e8f0)] text-slate-950">
      <section className="border-b border-slate-200 bg-slate-950 px-5 py-8 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Link className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm font-medium text-teal-100 transition hover:bg-white/[0.1]" href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-1 text-sm text-teal-100">
                <Sparkles className="h-4 w-4" />
                AI Command Center
              </p>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                Turn one emergency message into a full action plan
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                The command center orchestrates prototype triage, hospital, ambulance, blood bank,
                and scheme services into one coordinated emergency response plan.
              </p>
            </div>

            <Card className="border-white/10 bg-white/[0.06] p-5 text-white">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-8 w-8 text-teal-300" />
                <div>
                  <p className="text-sm text-slate-300">Flagship demo</p>
                  <p className="text-xl font-semibold">Prototype emergency orchestration engine</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-8 lg:grid-cols-[0.82fr_1.18fr]">
        <Card className="h-fit border-slate-200 bg-white shadow-lg shadow-slate-200/70">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Emergency assistant</h2>
              <p className="text-sm text-slate-500">Describe the emergency in one sentence.</p>
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-slate-50 p-4">
            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white">
                <MessageCircle className="h-4 w-4" />
              </div>
              <p className="text-sm leading-6 text-slate-700">
                Tell me what happened, the patient age, and location. I will generate a prototype
                emergency action plan using existing HealthConnect AI modules.
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-teal-100 bg-teal-50/70 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-teal-800">Demo Mode scenarios</p>
                <p className="mt-1 text-xs leading-5 text-teal-700">
                  Click one scenario to fill the input and instantly generate the action plan.
                </p>
              </div>
              <Button
                className="h-10 border border-teal-200 bg-white text-teal-800 hover:bg-teal-100"
                onClick={resetDemo}
                type="button"
                variant="outline"
              >
                <RotateCcw className="h-4 w-4" />
                Reset Demo
              </Button>
            </div>

            {isDemoMode ? (
              <p className="mt-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-teal-700">
                Demo Mode active
              </p>
            ) : null}
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {demoExamples.map((example, index) => (
              <button
                className="rounded-lg border border-slate-200 bg-white px-3 py-3 text-left text-xs font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700 hover:shadow-md disabled:pointer-events-none disabled:opacity-60"
                disabled={isLoading}
                key={example.message}
                onClick={() => applyExample(example)}
                type="button"
              >
                <span className="block text-sm font-semibold text-slate-900">
                  {demoScenarioLabels[index]}
                </span>
                <span className="mt-1 block leading-5">{example.message}</span>
              </button>
            ))}
          </div>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium" htmlFor="message">
                Emergency message
              </label>
              <textarea
                className="mt-2 min-h-40 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                id="message"
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Example: My father has chest pain and difficulty breathing."
                required
                value={message}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label="Patient age"
                name="patientAge"
                onChange={setPatientAge}
                required
                type="number"
                value={patientAge}
              />
              <TextField
                label="Location"
                name="location"
                onChange={setLocation}
                placeholder="Bengaluru, Delhi, Mumbai..."
                required
                value={location}
              />
            </div>

            {error ? (
              <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">
                {error}
              </p>
            ) : null}

            <Button className="h-12 w-full bg-teal-600 shadow-lg shadow-teal-900/10 hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-xl" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Generate Action Plan
            </Button>
          </form>
        </Card>

        <div className="space-y-6" aria-live="polite">
          {isLoading ? (
            <Card className="flex min-h-72 flex-col items-center justify-center border-dashed border-slate-300 bg-white/90 p-8 text-center" role="status">
              <Loader2 className="mx-auto h-10 w-10 animate-spin text-teal-700" />
              <h2 className="mt-4 text-2xl font-semibold">Building emergency action plan</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Coordinating prototype triage, hospital, ambulance, blood bank, and scheme modules.
              </p>
            </Card>
          ) : result ? (
            <EmergencyPlan result={result} />
          ) : (
            <Card className="flex min-h-72 flex-col items-center justify-center border-dashed border-slate-300 bg-white/90 p-8 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-teal-700" />
              <h2 className="mt-4 text-2xl font-semibold">Action plan will appear here</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter one emergency sentence and generate a coordinated prototype response plan.
              </p>
            </Card>
          )}

          <Card className="border-amber-200 bg-amber-50 text-amber-950">
            <p className="text-sm font-semibold">Medical disclaimer</p>
            <p className="mt-2 text-sm leading-6">
              {result?.disclaimer ??
                "This is a prototype emergency assistant for a hackathon MVP and is not a medical diagnosis. For real emergencies, call local emergency services immediately."}
            </p>
          </Card>
        </div>
      </section>
    </main>
  );
}

function EmergencyPlan({ result }: { result: EmergencyPlanResponse }) {
  return (
    <Card className="border-slate-200 bg-white shadow-2xl shadow-slate-200/80" role="region" aria-label="Emergency action plan result">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-teal-700">Detected emergency</p>
          <h2 className="mt-2 text-3xl font-semibold">{result.detected_emergency}</h2>
        </div>
        <span
          className={`inline-flex w-fit rounded-full border px-3 py-1 text-sm font-semibold ${
            severityStyles[result.severity]
          }`}
        >
          {result.severity}
        </span>
      </div>

      <div className="mt-6 grid gap-4">
        <InfoSection
          icon={<ShieldAlert className="h-5 w-5" />}
          label="Triage summary"
          value={result.triage_summary}
        />
        <InfoSection
          icon={<ClipboardList className="h-5 w-5" />}
          label="Recommended action"
          value={result.recommended_action}
        />
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-3">
        <RecommendationCard
          icon={<Hospital className="h-5 w-5" />}
          title="Recommended hospital"
          value={result.recommended_hospital?.name ?? "No hospital match"}
          details={[
            result.recommended_hospital
              ? `${result.recommended_hospital.distance_km} km away`
              : "Run hospital recommendation separately for more options.",
            result.recommended_hospital
              ? `${result.recommended_hospital.icu_beds} ICU beds`
              : "No demonstration hospital returned.",
            result.recommended_hospital?.phone ?? "",
          ]}
        />
        <RecommendationCard
          icon={<Ambulance className="h-5 w-5" />}
          title="Ambulance recommendation"
          value={result.ambulance_suggestion?.ambulance_type ?? "Ambulance not required"}
          details={[
            result.ambulance_suggestion
              ? `${result.ambulance_suggestion.driver_name} - ${result.ambulance_suggestion.eta_minutes} min ETA`
              : "The triage result did not require ambulance dispatch.",
            result.ambulance_suggestion?.vehicle_number ?? "",
            result.ambulance_suggestion?.phone ?? "",
          ]}
        />
        <RecommendationCard
          icon={<Droplets className="h-5 w-5" />}
          title="Blood bank suggestion"
          value={result.blood_bank_suggestion?.name ?? "No blood bank match"}
          details={[
            result.blood_bank_suggestion
              ? `${result.blood_bank_suggestion.blood_group} - ${result.blood_bank_suggestion.available_units} units`
              : "No matching demonstration blood bank found for the default group/location.",
            result.blood_bank_suggestion
              ? `${result.blood_bank_suggestion.distance_km} km away`
              : "",
            result.blood_bank_suggestion?.contact ?? "",
          ]}
        />
      </div>

      <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center gap-2 text-teal-700">
          <Banknote className="h-5 w-5" />
          <p className="text-sm font-semibold">Government scheme suggestions</p>
        </div>
        <div className="mt-4 grid gap-3">
          {result.scheme_suggestions.map((scheme) => (
            <div className="rounded-lg bg-white p-3" key={scheme.name}>
              <p className="font-semibold">{scheme.name}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{scheme.benefit}</p>
            </div>
          ))}
        </div>
      </div>

      <WhyRecommendation result={result} />

      <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center gap-2 text-teal-700">
          <CheckCircle2 className="h-5 w-5" />
          <p className="text-sm font-semibold">Step-by-step emergency action plan</p>
        </div>
        <div className="mt-4 space-y-3">
          {result.step_by_step_plan.map((step, index) => (
            <div className="flex gap-3" key={step}>
              <div className="flex flex-col items-center">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-600 text-xs font-semibold text-white">
                  {index + 1}
                </span>
                {index < result.step_by_step_plan.length - 1 ? (
                  <span className="h-6 w-px bg-teal-200" />
                ) : null}
              </div>
              <p className="pt-1 text-sm leading-6 text-slate-700">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function WhyRecommendation({ result }: { result: EmergencyPlanResponse }) {
  const hospital = result.recommended_hospital;
  const ambulance = result.ambulance_suggestion;
  const bloodBank = result.blood_bank_suggestion;

  return (
    <details className="group mt-5 rounded-lg border border-teal-200 bg-teal-50/70 p-4">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
        <div>
          <p className="text-sm font-semibold text-teal-900">Why this recommendation?</p>
          <p className="mt-1 text-xs leading-5 text-teal-700">
            Review the existing prototype signals used to assemble this emergency action plan.
          </p>
        </div>
        <span className="rounded-full border border-teal-200 bg-white px-3 py-1 text-xs font-semibold text-teal-800 transition group-open:bg-teal-700 group-open:text-white">
          Details
        </span>
      </summary>

      <div className="mt-4 grid gap-3">
        <ReasonRow label="Symptoms detected" value={result.triage_summary} />
        <ReasonRow
          label="Severity reasoning"
          value={`${result.severity} severity was selected from the existing triage response. Recommended action: ${result.recommended_action}`}
        />
        <ReasonRow
          label="Hospital recommendation reasoning"
          value={
            hospital
              ? `${hospital.name} was selected from the demonstration healthcare dataset using emergency support, ${hospital.icu_beds} ICU beds, ${hospital.general_beds} general beds, ${hospital.distance_km} km distance, ${hospital.rating} rating, and specialists including ${hospital.specialists.join(", ")}.`
              : "No hospital was returned by the existing recommendation service."
          }
        />
        <ReasonRow
          label="Ambulance reasoning"
          value={
            ambulance
              ? `${ambulance.ambulance_type} was suggested because the triage result required ambulance support. The selected demonstration ambulance is ${ambulance.distance_km} km away with a ${ambulance.eta_minutes} minute ETA.`
              : "The current triage result did not require ambulance dispatch, so no ambulance was suggested."
          }
        />
        <ReasonRow
          label="Blood bank reasoning"
          value={
            bloodBank
              ? `${bloodBank.name} was shown from the demonstration blood bank dataset with ${bloodBank.available_units} units of ${bloodBank.blood_group} available and ${bloodBank.distance_km} km distance.`
              : "No blood bank suggestion was returned by the existing blood bank service."
          }
        />
        <ReasonRow
          label="Government scheme reasoning"
          value={
            result.scheme_suggestions.length
              ? result.scheme_suggestions
                  .map((scheme) => `${scheme.name}: ${scheme.eligibility_reason}`)
                  .join(" ")
              : "No government scheme suggestions were returned by the existing scheme service."
          }
        />
      </div>
    </details>
  );
}

function ReasonRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-teal-100 bg-white p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">{label}</p>
      <p className="mt-2 text-sm leading-6 text-slate-700">{value}</p>
    </div>
  );
}

function InfoSection({
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

function RecommendationCard({
  details,
  icon,
  title,
  value,
}: {
  details: string[];
  icon: ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-teal-200 hover:bg-white">
      <div className="text-teal-700">{icon}</div>
      <p className="mt-3 text-sm font-medium text-slate-500">{title}</p>
      <h3 className="mt-1 text-lg font-semibold">{value}</h3>
      <div className="mt-3 space-y-2 text-sm text-slate-600">
        {details.filter(Boolean).map((detail) => (
          <p className="flex items-center gap-2" key={detail}>
            {detail.includes("+91") ? <Phone className="h-4 w-4 text-teal-700" /> : <MapPin className="h-4 w-4 text-teal-700" />}
            {detail}
          </p>
        ))}
      </div>
    </div>
  );
}
