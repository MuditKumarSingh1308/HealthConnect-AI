"use client";

import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Droplets,
  HeartPulse,
  Loader2,
  MapPin,
  Phone,
  RadioTower,
  ShieldAlert,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SelectField, TextField } from "@/components/ui/form-field";
import {
  searchBloodBanks,
  sendBloodRequest,
  type BloodBank,
  type BloodRequestResponse,
} from "@/lib/blood-bank";

const bloodGroups = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
const cities = ["Bengaluru", "Mumbai", "Delhi"];

export default function BloodBankPage() {
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [city, setCity] = useState("Bengaluru");
  const [patientName, setPatientName] = useState("Demo Patient");
  const [hospital, setHospital] = useState("Apex Hospital Bengaluru");
  const [unitsRequired, setUnitsRequired] = useState("2");
  const [bloodBanks, setBloodBanks] = useState<BloodBank[]>([]);
  const [requestConfirmation, setRequestConfirmation] = useState<BloodRequestResponse | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSearching(true);
    setError("");
    setRequestConfirmation(null);

    try {
      const results = await searchBloodBanks({ bloodGroup, city });
      setBloodBanks(results);
    } catch {
      setError("Unable to search blood banks. Make sure the FastAPI backend is running.");
    } finally {
      setIsSearching(false);
    }
  }

  async function handleEmergencyRequest() {
    setIsRequesting(true);
    setError("");

    try {
      const response = await sendBloodRequest({
        patient_name: patientName,
        blood_group: bloodGroup,
        hospital,
        units_required: Number(unitsRequired),
      });
      setRequestConfirmation(response);
      setBloodBanks(response.nearby_blood_banks);
    } catch {
      setError("Unable to send emergency blood request. Please verify the backend is running.");
    } finally {
      setIsRequesting(false);
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
                Blood Bank Network
              </p>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                Find blood availability fast
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Search demonstration blood bank availability by group and city, then broadcast an
                emergency request to nearby matching centers.
              </p>
            </div>

            <Card className="border-white/10 bg-white/[0.06] p-5 text-white">
              <div className="flex items-center gap-3">
                <Droplets className="h-8 w-8 text-red-300" />
                <div>
                  <p className="text-sm text-slate-300">MVP mode</p>
                  <p className="text-xl font-semibold">Demonstration blood bank dataset</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-6">
          <Card className="border-slate-200 bg-white shadow-lg shadow-slate-200/70">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-50 text-red-700">
                <Droplets className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Search blood banks</h2>
                <p className="text-sm text-slate-500">Filter by blood group and city.</p>
              </div>
            </div>

            <form className="mt-6 space-y-5" onSubmit={handleSearch}>
              <SelectField
                label="Blood group"
                name="bloodGroup"
                onChange={setBloodGroup}
                options={bloodGroups}
                tone="red"
                value={bloodGroup}
              />
              <SelectField
                label="City"
                name="city"
                onChange={setCity}
                options={cities}
                tone="red"
                value={city}
              />

              {error ? (
                <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">
                  {error}
                </p>
              ) : null}

              <Button className="h-12 w-full bg-red-600 shadow-lg shadow-red-900/10 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-xl" disabled={isSearching}>
                {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Droplets className="h-4 w-4" />}
                Search availability
              </Button>
            </form>
          </Card>

          <Card className="border-red-100 bg-white shadow-lg shadow-slate-200/70">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-50 text-red-700">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Emergency request</h2>
                <p className="text-sm text-slate-500">Broadcast to matching demonstration centers.</p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <TextField
                label="Patient name"
                name="patientName"
                onChange={setPatientName}
                required
                tone="red"
                value={patientName}
              />
              <TextField
                label="Hospital"
                name="hospital"
                onChange={setHospital}
                required
                tone="red"
                value={hospital}
              />
              <TextField
                label="Units required"
                name="unitsRequired"
                onChange={setUnitsRequired}
                required
                tone="red"
                type="number"
                value={unitsRequired}
              />

              <Button
                className="h-12 w-full bg-slate-950 shadow-lg shadow-slate-900/10 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-xl"
                disabled={isRequesting}
                onClick={handleEmergencyRequest}
                type="button"
              >
                {isRequesting ? <Loader2 className="h-4 w-4 animate-spin" /> : <RadioTower className="h-4 w-4" />}
                Request Blood
              </Button>
            </div>
          </Card>
        </div>

        <div className="space-y-6" aria-live="polite">
          <Card className="border-slate-200 bg-white">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-red-700">Blood Bank Results</p>
                <h2 className="mt-1 text-2xl font-semibold">Available demonstration units</h2>
              </div>
              <Droplets className="h-7 w-7 text-red-700" />
            </div>

            <div className="mt-5 grid gap-4">
              {isSearching ? (
                <div
                  className="flex min-h-44 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-slate-300 bg-white/70 p-8"
                  role="status"
                >
                  <Loader2 className="h-6 w-6 animate-spin text-red-700" />
                  <span className="sr-only">Searching blood banks</span>
                </div>
              ) : bloodBanks.length ? (
                bloodBanks.map((bloodBank, index) => (
                  <BloodBankCard
                    bloodBank={bloodBank}
                    isNearest={index === 0}
                    key={`${bloodBank.name}-${bloodBank.blood_group}`}
                  />
                ))
              ) : (
                <Card className="flex min-h-72 flex-col items-center justify-center border-dashed border-slate-300 bg-white/90 p-8 text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-red-700" />
                  <h3 className="mt-4 text-2xl font-semibold">Search results will appear here</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Choose a blood group and city to find matching demonstration blood bank
                    availability.
                  </p>
                </Card>
              )}
            </div>
          </Card>

          {requestConfirmation ? (
            <Card className="border-red-100 bg-white shadow-2xl shadow-slate-200/80" role="region" aria-label="Blood request confirmation">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-medium text-red-700">Emergency request confirmation</p>
                  <h2 className="mt-2 text-3xl font-semibold">{requestConfirmation.request_id}</h2>
                </div>
                <span className="inline-flex rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">
                  {requestConfirmation.status}
                </span>
              </div>

              <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-900">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <AlertTriangle className="h-4 w-4" />
                  Broadcast sent to {requestConfirmation.nearby_blood_banks.length} nearby
                  demonstration centers.
                </p>
              </div>
            </Card>
          ) : null}
        </div>
      </section>
    </main>
  );
}

function BloodBankCard({
  bloodBank,
  isNearest,
}: {
  bloodBank: BloodBank;
  isNearest: boolean;
}) {
  return (
    <div
      className={`rounded-lg border bg-slate-50 p-4 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/10 ${
        isNearest ? "border-red-300 ring-2 ring-red-100" : "border-slate-200"
      }`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-semibold">{bloodBank.name}</h3>
            {isNearest ? (
              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                Nearest
              </span>
            ) : null}
          </div>
          <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
            <MapPin className="h-4 w-4" />
            {bloodBank.address}
          </p>
          <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
            <Phone className="h-4 w-4" />
            {bloodBank.contact}
          </p>
        </div>
        <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
          {bloodBank.open_status}
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Metric icon={<Droplets className="h-4 w-4" />} label="Blood group" value={bloodBank.blood_group} />
        <Metric icon={<CheckCircle2 className="h-4 w-4" />} label="Units" value={bloodBank.available_units} />
        <Metric icon={<MapPin className="h-4 w-4" />} label="Distance" value={`${bloodBank.distance_km} km`} />
      </div>
    </div>
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
    <div className="rounded-lg bg-white p-3">
      <div className="flex items-center gap-2 text-red-700">{icon}</div>
      <p className="mt-3 text-xl font-semibold">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}
