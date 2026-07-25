"use client";

import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  FileText,
  HeartPulse,
  Loader2,
  MessageCircleQuestion,
  RotateCcw,
  ShieldCheck,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  analyzeMedicalReport,
  type MedicalReportAnalyzeResponse,
} from "@/lib/medical-report";

const riskStyles: Record<MedicalReportAnalyzeResponse["risk_level"], string> = {
  High: "border-red-200 bg-red-50 text-red-700",
  Moderate: "border-amber-200 bg-amber-50 text-amber-700",
  Low: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

export default function MedicalReportPage() {
  const [reportText, setReportText] = useState(
    "CBC report shows low hemoglobin and mild infection markers. Glucose is elevated. Other values are stable.",
  );
  const [selectedFileName, setSelectedFileName] = useState("");
  const [result, setResult] = useState<MedicalReportAnalyzeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const analysis = await analyzeMedicalReport({
        report_text: reportText,
      });
      setResult(analysis);
    } catch {
      setError("Unable to analyze report. Make sure the FastAPI backend is running.");
    } finally {
      setIsLoading(false);
    }
  }

  function clearReportInput() {
    setReportText("");
    setSelectedFileName("");
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
                Medical Report AI
              </p>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                Explain medical reports in simple language
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Paste report text for a text-based report analysis prototype with summary,
                findings, risk level, next steps, and doctor questions.
              </p>
            </div>

            <Card className="border-white/10 bg-white/[0.06] p-5 text-white">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-8 w-8 text-teal-300" />
                <div>
                  <p className="text-sm text-slate-300">MVP mode</p>
                  <p className="text-xl font-semibold">Text-based report analysis prototype</p>
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
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Report input</h2>
              <p className="text-sm text-slate-500">Select a file reference or paste report text.</p>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5 transition hover:border-teal-200 hover:bg-white">
            <label
              className="flex cursor-pointer flex-col items-center justify-center gap-3 text-center"
              htmlFor="report-file"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-teal-700">
                <Upload className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-sm font-semibold">Upload PDF or image reference</span>
                <span className="mt-1 block text-xs text-slate-500">
                  Text extraction is not active. Paste text below for analysis.
                </span>
              </span>
            </label>
            <input
              accept=".pdf,image/*"
              className="sr-only"
              id="report-file"
              onChange={(event) => setSelectedFileName(event.target.files?.[0]?.name ?? "")}
              type="file"
            />
            {selectedFileName ? (
              <p className="mt-4 rounded-md bg-white px-3 py-2 text-sm text-slate-600">
                Selected file reference: {selectedFileName}
              </p>
            ) : null}
          </div>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium" htmlFor="reportText">
                Report text
              </label>
              <textarea
                className="mt-2 min-h-56 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                id="reportText"
                onChange={(event) => setReportText(event.target.value)}
                placeholder="Paste CBC, lipid profile, scan impression, discharge summary, or lab report text..."
                required
                value={reportText}
              />
            </div>

            {error ? (
              <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">
                {error}
              </p>
            ) : null}

            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <Button className="h-12 bg-teal-600 shadow-lg shadow-teal-900/10 hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-xl" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ClipboardList className="h-4 w-4" />}
                Analyze report
              </Button>
              <Button
                className="h-12 border-slate-200 px-5"
                disabled={isLoading || (!reportText && !selectedFileName && !result)}
                onClick={clearReportInput}
                title="Clear report text, selected file reference, and results"
                type="button"
                variant="outline"
              >
                <RotateCcw className="h-4 w-4" />
                Clear
              </Button>
            </div>
          </form>
        </Card>

        <div className="space-y-6" aria-live="polite">
          {result ? (
            <Card className="border-slate-200 bg-white shadow-2xl shadow-slate-200/80" role="region" aria-label="Medical report analysis result">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Prototype report explanation</p>
                  <h2 className="mt-2 text-3xl font-semibold">Report summary</h2>
                </div>
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${
                    riskStyles[result.risk_level]
                  }`}
                >
                  {result.risk_level} risk
                </span>
              </div>

              <div className="mt-6 grid gap-4">
                <ReportSection
                  icon={<FileText className="h-5 w-5" />}
                  label="Summary"
                  value={result.summary}
                />
                <ListSection
                  icon={<AlertTriangle className="h-5 w-5" />}
                  items={result.important_findings}
                  label="Important findings"
                />
                <ReportSection
                  icon={<CheckCircle2 className="h-5 w-5" />}
                  label="Recommended next step"
                  value={result.recommended_next_step}
                />
                <ListSection
                  icon={<MessageCircleQuestion className="h-5 w-5" />}
                  items={result.questions_to_ask_doctor}
                  label="Questions to ask doctor"
                />
              </div>
            </Card>
          ) : (
            <Card className="flex min-h-72 flex-col items-center justify-center border-dashed border-slate-300 bg-white/90 p-8 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-teal-700" />
              <h2 className="mt-4 text-2xl font-semibold">Report explanation will appear here</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Paste report text and run the analyzer to see summary, findings, risk level,
                recommended next step, and questions for your doctor.
              </p>
            </Card>
          )}

          <Card className="border-amber-200 bg-amber-50 text-amber-950">
            <p className="text-sm font-semibold">Medical disclaimer</p>
            <p className="mt-2 text-sm leading-6">
              {result?.medical_disclaimer ??
                "This is a prototype report explanation for a hackathon MVP and is not a medical diagnosis. Always review results with a qualified doctor."}
            </p>
          </Card>
        </div>
      </section>
    </main>
  );
}

function ReportSection({
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

function ListSection({
  icon,
  items,
  label,
}: {
  icon: ReactNode;
  items: string[];
  label: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-teal-200 hover:bg-white">
      <div className="flex gap-3">
        <div className="mt-0.5 text-teal-700">{icon}</div>
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-800">
            {items.map((item) => (
              <li className="flex gap-2" key={item}>
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
