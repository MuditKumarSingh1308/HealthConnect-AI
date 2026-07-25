from typing import Literal

from pydantic import BaseModel, Field


AmbulanceStatus = Literal["Available", "Busy", "Dispatched"]
BookingStatus = Literal["Dispatched"]


class Ambulance(BaseModel):
    id: str
    driver_name: str
    vehicle_number: str
    distance_km: float
    eta_minutes: int
    status: AmbulanceStatus
    phone: str
    ambulance_type: str


class AmbulanceBookingRequest(BaseModel):
    patient_name: str = Field(min_length=2, max_length=100)
    location: str = Field(min_length=3, max_length=200)
    emergency_type: str = Field(min_length=2, max_length=100)
    severity: str = Field(min_length=2, max_length=50)


class AmbulanceBookingResponse(BaseModel):
    booking_id: str
    assigned_ambulance: Ambulance
    eta_minutes: int
    status: BookingStatus
    tracking_steps: list[str]
