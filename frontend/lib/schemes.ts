import { apiClient } from "@/lib/api-client";

export type SchemeRecommendRequest = {
  disease: string;
  state: string;
  income_category: string;
  age: number;
};

export type EligibleScheme = {
  name: string;
  benefit: string;
  eligibility_reason: string;
  required_documents: string[];
  application_steps: string[];
  nearest_help_center: string;
};

export type SchemeRecommendResponse = {
  eligible_schemes: EligibleScheme[];
  summary: string;
  disclaimer: string;
};

export async function recommendSchemes(
  payload: SchemeRecommendRequest,
): Promise<SchemeRecommendResponse> {
  return apiClient<SchemeRecommendResponse>("/api/schemes/recommend", {
    errorMessage: "Unable to recommend schemes",
    method: "POST",
    body: payload,
  });
}
