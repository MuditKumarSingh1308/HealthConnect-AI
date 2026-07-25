import { apiClient } from "@/lib/api-client";

export type TriageAnalyzeRequest = {
  symptoms: string;
  age: number;
  gender: string;
  existing_conditions: string;
};

export type TriageAnalyzeResponse = {
  severity: "Critical" | "Moderate" | "Low";
  confidence: number;
  recommended_action: string;
  recommended_hospital_type: string;
  ambulance_required: boolean;
  matched_keywords: string[];
};

export async function analyzeTriage(
  payload: TriageAnalyzeRequest,
): Promise<TriageAnalyzeResponse> {
  return apiClient<TriageAnalyzeResponse>("/api/triage/analyze", {
    errorMessage: "Unable to analyze symptoms",
    method: "POST",
    body: payload,
  });
}
