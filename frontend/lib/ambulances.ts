import { apiClient } from "@/lib/api-client";

export type Ambulance = {
  id: string;
  driver_name: string;
  vehicle_number: string;
  distance_km: number;
  eta_minutes: number;
  status: string;
  phone: string;
  ambulance_type: string;
};

export type AmbulanceBookingRequest = {
  patient_name: string;
  location: string;
  emergency_type: string;
  severity: string;
};

export type AmbulanceBookingResponse = {
  booking_id: string;
  assigned_ambulance: Ambulance;
  eta_minutes: number;
  status: "Dispatched";
  tracking_steps: string[];
};

export async function getAvailableAmbulances(): Promise<Ambulance[]> {
  return apiClient<Ambulance[]>("/api/ambulances/available", {
    errorMessage: "Unable to load available ambulances",
  });
}

export async function bookAmbulance(
  payload: AmbulanceBookingRequest,
): Promise<AmbulanceBookingResponse> {
  return apiClient<AmbulanceBookingResponse>("/api/ambulances/book", {
    errorMessage: "Unable to book ambulance",
    method: "POST",
    body: payload,
  });
}
