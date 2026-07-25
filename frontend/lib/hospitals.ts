import { apiClient } from "@/lib/api-client";

export type Hospital = {
  id: string;
  name: string;
  distance_km: number;
  rating: number;
  emergency_support: boolean;
  icu_beds: number;
  general_beds: number;
  specialists: string[];
  address: string;
  phone: string;
};

export type HospitalRecommendation = {
  hospital: Hospital;
  score: number;
  rank: number;
  best_match: boolean;
  reasons: string[];
};

export type HospitalRecommendationFilters = {
  emergency_type: string;
  severity: string;
  specialist_needed: string;
};

export async function getHospitalRecommendations(
  filters: HospitalRecommendationFilters,
): Promise<HospitalRecommendation[]> {
  const params = new URLSearchParams(filters);
  return apiClient<HospitalRecommendation[]>(`/api/hospitals/recommend?${params.toString()}`, {
    errorMessage: "Unable to load hospital recommendations",
  });
}
