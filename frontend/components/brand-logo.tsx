import { HeartPulse } from "lucide-react";

import { cn } from "@/lib/utils";

export const APP_VERSION = "0.1.0";

type BrandLogoProps = {
  className?: string;
  showVersion?: boolean;
  size?: "sm" | "md";
  variant?: "dark" | "light";
};

export function BrandLogo({
  className,
  showVersion = false,
  size = "md",
  variant = "dark",
}: BrandLogoProps) {
  const isLight = variant === "light";

  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-xl border shadow-sm",
          size === "sm" ? "h-9 w-9" : "h-11 w-11",
          isLight
            ? "border-white/15 bg-white/10 text-teal-200 shadow-slate-950/20"
            : "border-teal-100 bg-teal-50 text-teal-700 shadow-teal-900/5",
        )}
      >
        <HeartPulse className={size === "sm" ? "h-5 w-5" : "h-6 w-6"} />
      </span>
      <span className="leading-tight">
        <span
          className={cn(
            "block font-semibold tracking-tight",
            size === "sm" ? "text-base" : "text-lg",
            isLight ? "text-white" : "text-slate-950",
          )}
        >
          HealthConnect AI
        </span>
        {showVersion ? (
          <span className={cn("block text-xs", isLight ? "text-slate-400" : "text-slate-500")}>
            v{APP_VERSION}
          </span>
        ) : null}
      </span>
    </div>
  );
}
