import type { Ambulance } from "@/lib/ambulances";
import { apiClient } from "@/lib/api-client";
import type { BloodBank } from "@/lib/blood-bank";
import type { Hospital } from "@/lib/hospitals";
import type { EligibleScheme } from "@/lib/schemes";

export type EmergencyPlanRequest = {
  message: string;
  patient_age: number;
  location: string;
};

export type EmergencyPlanResponse = {
  detected_emergency: string;
  severity: "Critical" | "Moderate" | "Low";
  triage_summary: string;
  recommended_action: string;
  recommended_hospital: Hospital | null;
  ambulance_suggestion: Ambulance | null;
  blood_bank_suggestion: BloodBank | null;
  scheme_suggestions: EligibleScheme[];
  step_by_step_plan: string[];
  disclaimer: string;
};

export async function generateEmergencyPlan(
  payload: EmergencyPlanRequest,
): Promise<EmergencyPlanResponse> {
  return apiClient<EmergencyPlanResponse>("/api/assistant/emergency-plan", {
    errorMessage: "Unable to generate emergency plan",
    method: "POST",
    body: payload,
  });
}
