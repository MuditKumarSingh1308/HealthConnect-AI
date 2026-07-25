"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus } from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TextField } from "@/components/ui/form-field";
import { roles, type UserRole } from "@/lib/auth";

type RegisterErrors = Partial<Record<"name" | "email" | "password" | "roleField", string>>;

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>("Patient");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleField, setRoleField] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});

  const roleFieldLabel = useMemo(() => {
    if (role === "Hospital") return "Hospital name";
    if (role === "Admin") return "Admin invite code";
    return "Emergency contact";
  }, [role]);

  const roleFieldPlaceholder = useMemo(() => {
    if (role === "Hospital") return "CityCare Hospital";
    if (role === "Admin") return "INVITE-123";
    return "+1 555 0100";
  }, [role]);

  function handleRoleChange(nextRole: UserRole) {
    setRole(nextRole);
    setRoleField("");
    setErrors({});
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: RegisterErrors = {};

    if (!name.trim()) nextErrors.name = "Name is required.";
    if (!email.includes("@")) nextErrors.email = "Enter a valid email address.";
    if (password.length < 6) nextErrors.password = "Password must be at least 6 characters.";
    if (!roleField.trim()) nextErrors.roleField = `${roleFieldLabel} is required for ${role}.`;

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      router.push("/dashboard");
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 text-slate-950 sm:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <section>
          <Link href="/">
            <BrandLogo showVersion size="sm" />
          </Link>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            Create a healthcare demo workspace.
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
            Register as a patient, hospital, or admin for the role-based prototype flow.
          </p>
        </section>

        <Card className="border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
          <h2 className="text-2xl font-semibold">Demo Register</h2>
          <p className="mt-1 text-sm text-slate-500">Validation is local to this page.</p>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <TextField
              error={errors.name}
              label="Name"
              name="name"
              onChange={setName}
              placeholder="Your full name"
              required
              type="text"
              value={name}
            />
            <TextField
              error={errors.email}
              label="Email"
              name="email"
              onChange={setEmail}
              placeholder="you@example.com"
              required
              type="email"
              value={email}
            />
            <TextField
              error={errors.password}
              label="Password"
              name="password"
              onChange={setPassword}
              placeholder="Minimum 6 characters"
              required
              type="password"
              value={password}
            />

            <fieldset>
              <legend className="text-sm font-medium">Role</legend>
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
                    onClick={() => handleRoleChange(item)}
                    type="button"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>

            <TextField
              error={errors.roleField}
              label={roleFieldLabel}
              name="roleField"
              onChange={setRoleField}
              placeholder={roleFieldPlaceholder}
              required
              type="text"
              value={roleField}
            />

            <Button className="h-11 w-full">
              <UserPlus className="h-4 w-4" />
              Register as {role}
            </Button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-500">
            Already have a demo account?{" "}
            <Link className="font-medium text-teal-700 hover:text-teal-800" href="/login">
              Login
            </Link>
          </p>
        </Card>
      </div>
    </main>
  );
}
