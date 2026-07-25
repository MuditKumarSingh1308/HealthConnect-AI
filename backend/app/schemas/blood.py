from typing import Literal

from pydantic import BaseModel, Field


OpenStatus = Literal["Open", "Limited", "Closed"]
BloodRequestStatus = Literal["Broadcast Sent"]


class BloodBank(BaseModel):
    name: str
    distance_km: float
    blood_group: str
    available_units: int
    contact: str
    address: str
    open_status: OpenStatus


class BloodRequest(BaseModel):
    patient_name: str = Field(min_length=2, max_length=100)
    blood_group: str = Field(min_length=1, max_length=5)
    hospital: str = Field(min_length=2, max_length=150)
    units_required: int = Field(ge=1, le=20)


class BloodRequestResponse(BaseModel):
    request_id: str
    status: BloodRequestStatus
    nearby_blood_banks: list[BloodBank]
