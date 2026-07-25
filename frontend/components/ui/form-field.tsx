import type { HTMLInputTypeAttribute } from "react";

import { cn } from "@/lib/utils";

type Tone = "teal" | "red";

const toneClasses: Record<Tone, string> = {
  teal: "focus:border-teal-500 focus:ring-teal-100",
  red: "focus:border-red-500 focus:ring-red-100",
};

type TextFieldProps = {
  error?: string;
  label: string;
  name: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  tone?: Tone;
  type?: HTMLInputTypeAttribute;
  value: string;
};

export function TextField({
  error,
  label,
  name,
  onChange,
  placeholder,
  required = false,
  tone = "teal",
  type = "text",
  value,
}: TextFieldProps) {
  return (
    <div>
      <label className="text-sm font-medium" htmlFor={name}>
        {label}
        {required ? <span className="ml-1 text-red-600" aria-hidden="true">*</span> : null}
      </label>
      <input
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(
          "mt-2 h-11 w-full rounded-md border bg-white px-3 text-sm outline-none transition focus:ring-2",
          error ? "border-red-300 focus:border-red-500 focus:ring-red-100" : "border-slate-200",
          !error && toneClasses[tone],
        )}
        id={name}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
      {error ? (
        <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

type SelectFieldProps = {
  error?: string;
  label: string;
  name: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
  tone?: Tone;
  value: string;
};

export function SelectField({
  error,
  label,
  name,
  onChange,
  options,
  required = false,
  tone = "teal",
  value,
}: SelectFieldProps) {
  return (
    <div>
      <label className="text-sm font-medium" htmlFor={name}>
        {label}
        {required ? <span className="ml-1 text-red-600" aria-hidden="true">*</span> : null}
      </label>
      <select
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(
          "mt-2 h-11 w-full rounded-md border bg-white px-3 text-sm outline-none transition focus:ring-2",
          error ? "border-red-300 focus:border-red-500 focus:ring-red-100" : "border-slate-200",
          !error && toneClasses[tone],
        )}
        id={name}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        value={value}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      {error ? (
        <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
