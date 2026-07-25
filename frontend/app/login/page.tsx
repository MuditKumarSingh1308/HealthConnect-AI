"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, ShieldCheck } from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TextField } from "@/components/ui/form-field";
import { roles, type UserRole } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>("Patient");
  const [email, setEmail] = useState("patient@demo.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required for demo login.");
      return;
    }

    setError("");
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <section>
            <Link href="/">
              <BrandLogo showVersion size="sm" variant="light" />
            </Link>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
              Sign in to continue emergency care coordination.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Choose a demonstration role and continue to the dashboard experience. Authentication
              is simulated for this hackathon prototype.
            </p>
          </section>

          <Card className="border-white/10 bg-white p-6 text-slate-950 shadow-2xl shadow-teal-950/30">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Demo Login</h2>
                <p className="text-sm text-slate-500">Role-based prototype access</p>
              </div>
            </div>

            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-medium" htmlFor="role">
                  Role
                </label>
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                  {roles.map((item) => (
                    <button
                      aria-pressed={role === item}
                      className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
                        role === item
                          ? "border-teal-600 bg-teal-50 text-teal-800"
                          : "border-slate-200 bg-white text-slate-600 hover:border-teal-200"
                      }`}
                      key={item}
                      onClick={() => setRole(item)}
                      type="button"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <TextField
                label="Email"
                name="email"
                onChange={setEmail}
                placeholder="you@example.com"
                required
                type="email"
                value={email}
              />
              <TextField
                label="Password"
                name="password"
                onChange={setPassword}
                placeholder="Enter password"
                required
                type="password"
                value={password}
              />

              {error ? (
                <p className="rounded-md bg-red-50 p-3 text-sm text-red-700" role="alert">
                  {error}
                </p>
              ) : null}

              <p className="rounded-md bg-slate-50 p-3 text-sm text-slate-600">
                Demo login note: any email and password will route to the dashboard.
              </p>

              <Button className="h-11 w-full">
                <LogIn className="h-4 w-4" />
                Login as {role}
              </Button>
            </form>

            <p className="mt-5 text-center text-sm text-slate-500">
              New to HealthConnect AI?{" "}
              <Link className="font-medium text-teal-700 hover:text-teal-800" href="/register">
                Create demo account
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
}
