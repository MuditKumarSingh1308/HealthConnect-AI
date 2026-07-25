import { apiClient } from "@/lib/api-client";

export type MedicalReportAnalyzeRequest = {
  report_text: string;
};

export type MedicalReportAnalyzeResponse = {
  summary: string;
  important_findings: string[];
  risk_level: "Low" | "Moderate" | "High";
  recommended_next_step: string;
  questions_to_ask_doctor: string[];
  medical_disclaimer: string;
};

export async function analyzeMedicalReport(
  payload: MedicalReportAnalyzeRequest,
): Promise<MedicalReportAnalyzeResponse> {
  return apiClient<MedicalReportAnalyzeResponse>("/api/medical-report/analyze", {
    errorMessage: "Unable to analyze medical report",
    method: "POST",
    body: payload,
  });
}
