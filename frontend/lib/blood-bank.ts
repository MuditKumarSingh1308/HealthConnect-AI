import { apiClient } from "@/lib/api-client";

export type BloodBank = {
  name: string;
  distance_km: number;
  blood_group: string;
  available_units: number;
  contact: string;
  address: string;
  open_status: "Open" | "Limited" | "Closed";
};

export type BloodRequestPayload = {
  patient_name: string;
  blood_group: string;
  hospital: string;
  units_required: number;
};

export type BloodRequestResponse = {
  request_id: string;
  status: "Broadcast Sent";
  nearby_blood_banks: BloodBank[];
};

export async function searchBloodBanks({
  bloodGroup,
  city,
}: {
  bloodGroup: string;
  city: string;
}): Promise<BloodBank[]> {
  const params = new URLSearchParams({
    blood_group: bloodGroup,
    city,
  });
  return apiClient<BloodBank[]>(`/api/bloodbanks/search?${params.toString()}`, {
    errorMessage: "Unable to search blood banks",
  });
}

export async function sendBloodRequest(
  payload: BloodRequestPayload,
): Promise<BloodRequestResponse> {
  return apiClient<BloodRequestResponse>("/api/blood/request", {
    errorMessage: "Unable to send blood request",
    method: "POST",
    body: payload,
  });
}
