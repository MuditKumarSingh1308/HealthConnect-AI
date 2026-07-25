"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Banknote,
  Bot,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  HeartPulse,
  Loader2,
  MapPin,
  MessageCircle,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SelectField, TextField } from "@/components/ui/form-field";
import {
  recommendSchemes,
  type EligibleScheme,
  type SchemeRecommendResponse,
} from "@/lib/schemes";

const states = ["Karnataka", "Maharashtra", "Delhi", "Tamil Nadu", "Gujarat"];
const incomeCategories = ["Low income", "Below poverty line", "Middle income", "High income"];

export default function SchemesPage() {
  const [disease, setDisease] = useState("cardiac surgery");
  const [state, setState] = useState("Karnataka");
  const [incomeCategory, setIncomeCategory] = useState("Low income");
  const [age, setAge] = useState("62");
  const [result, setResult] = useState<SchemeRecommendResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await recommendSchemes({
        disease,
        state,
        income_category: incomeCategory,
        age: Number(age),
      });
      setResult(response);
    } catch {
      setError("Unable to recommend schemes. Make sure the FastAPI backend is running.");
    } finally {
      setIsLoading(false);
    }
  }

  function resetSchemeForm() {
    setDisease("cardiac surgery");
    setState("Karnataka");
    setIncomeCategory("Low income");
    setAge("62");
    setResult(null);
    setError("");
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
                Government Scheme Assistant
              </p>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                Discover relevant health schemes
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Enter patient context to receive prototype scheme matches, benefits, documents,
                application steps, and nearest help center guidance.
              </p>
            </div>

            <Card className="border-white/10 bg-white/[0.06] p-5 text-white">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-8 w-8 text-teal-300" />
                <div>
                  <p className="text-sm text-slate-300">MVP mode</p>
                  <p className="text-xl font-semibold">Demonstration scheme knowledge base</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-10 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="border-slate-200 bg-white shadow-lg shadow-slate-200/70">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Assistant input</h2>
              <p className="text-sm text-slate-500">Answer the assistant prompts below.</p>
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-slate-50 p-4">
            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white">
                <MessageCircle className="h-4 w-4" />
              </div>
              <p className="text-sm leading-6 text-slate-700">
                Share disease, state, income category, and age. I will match demonstration
                government health scheme rules and explain next steps.
              </p>
            </div>
          </div>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <TextField
              label="Disease"
              name="disease"
              onChange={setDisease}
              placeholder="Cardiac surgery, diabetes, kidney treatment..."
              required
              value={disease}
            />
            <SelectField
              label="State"
              name="state"
              onChange={setState}
              options={states}
              value={state}
            />
            <SelectField
              label="Income category"
              name="incomeCategory"
              onChange={setIncomeCategory}
              options={incomeCategories}
              value={incomeCategory}
            />
            <TextField
              label="Age"
              name="age"
              onChange={setAge}
              required
              type="number"
              value={age}
            />

            {error ? (
              <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">
                {error}
              </p>
            ) : null}

            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <Button className="h-12 bg-teal-600 shadow-lg shadow-teal-900/10 hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-xl" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Banknote className="h-4 w-4" />}
                Recommend schemes
              </Button>
              <Button
                className="h-12 border-slate-200 px-5"
                disabled={isLoading}
                onClick={resetSchemeForm}
                title="Reset scheme form to demo values"
                type="button"
                variant="outline"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </form>
        </Card>

        <div className="space-y-6" aria-live="polite">
          {isLoading ? (
            <Card className="flex min-h-72 flex-col items-center justify-center border-dashed border-slate-300 bg-white/90 p-8 text-center" role="status">
              <Loader2 className="mx-auto h-10 w-10 animate-spin text-teal-700" />
              <h2 className="mt-4 text-2xl font-semibold">Checking prototype eligibility</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                The assistant is matching the submitted details to the demonstration scheme
                knowledge base.
              </p>
            </Card>
          ) : result ? (
            <>
              <Card className="border-slate-200 bg-white">
                <p className="text-sm font-medium text-teal-700">Assistant summary</p>
                <h2 className="mt-2 text-2xl font-semibold">{result.summary}</h2>
              </Card>

              {result.eligible_schemes.map((scheme) => (
                <SchemeCard key={scheme.name} scheme={scheme} />
              ))}
            </>
          ) : (
            <Card className="flex min-h-72 flex-col items-center justify-center border-dashed border-slate-300 bg-white/90 p-8 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-teal-700" />
              <h2 className="mt-4 text-2xl font-semibold">Scheme results will appear here</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Submit patient details to view relevant scheme matches, documents, application
                steps, and nearest help center guidance.
              </p>
            </Card>
          )}

          <Card className="border-amber-200 bg-amber-50 text-amber-950">
            <p className="text-sm font-semibold">Medical/government disclaimer</p>
            <p className="mt-2 text-sm leading-6">
              {result?.disclaimer ??
                "This is a prototype government scheme assistant for a hackathon MVP. Verify eligibility and benefits through official government sources."}
            </p>
          </Card>
        </div>
      </section>
    </main>
  );
}

function SchemeCard({ scheme }: { scheme: EligibleScheme }) {
  return (
    <Card className="border-slate-200 bg-white shadow-2xl shadow-slate-200/80">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-teal-700">Eligible scheme</p>
          <h3 className="mt-2 text-3xl font-semibold">{scheme.name}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">{scheme.eligibility_reason}</p>
        </div>
        <span className="inline-flex w-fit rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
          Prototype match
        </span>
      </div>

      <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="flex gap-3">
          <div className="mt-0.5 text-teal-700">
            <Banknote className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Benefit</p>
            <p className="mt-1 text-sm leading-6 text-slate-800">{scheme.benefit}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-teal-700">
            <FileCheck2 className="h-5 w-5" />
            <p className="text-sm font-semibold">Required documents</p>
          </div>
          <div className="mt-4 space-y-3">
            {scheme.required_documents.map((document) => (
              <label className="flex items-center gap-3 text-sm text-slate-700" key={document}>
                <input className="h-4 w-4 rounded border-slate-300 text-teal-600" readOnly type="checkbox" />
                {document}
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-teal-700">
            <ClipboardCheck className="h-5 w-5" />
            <p className="text-sm font-semibold">Application steps</p>
          </div>
          <div className="mt-4 space-y-3">
            {scheme.application_steps.map((step, index) => (
              <div className="flex gap-3" key={step}>
                <div className="flex flex-col items-center">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-600 text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  {index < scheme.application_steps.length - 1 ? (
                    <span className="h-6 w-px bg-teal-200" />
                  ) : null}
                </div>
                <p className="pt-1 text-sm leading-6 text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-lg bg-teal-50 p-4 text-teal-950">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <MapPin className="h-4 w-4" />
          Nearest help center
        </p>
        <p className="mt-2 text-sm">{scheme.nearest_help_center}</p>
      </div>
    </Card>
  );
}
