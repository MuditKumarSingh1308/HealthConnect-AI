from typing import Literal

from pydantic import BaseModel, Field

from app.schemas.ambulances import Ambulance
from app.schemas.blood import BloodBank
from app.schemas.hospitals import Hospital
from app.schemas.schemes import EligibleScheme


Severity = Literal["Critical", "Moderate", "Low"]


class EmergencyPlanRequest(BaseModel):
    message: str = Field(min_length=3, max_length=2000)
    patient_age: int = Field(ge=0, le=120)
    location: str = Field(min_length=2, max_length=200)


class EmergencyPlanResponse(BaseModel):
    detected_emergency: str
    severity: Severity
    triage_summary: str
    recommended_action: str
    recommended_hospital: Hospital | None
    ambulance_suggestion: Ambulance | None
    blood_bank_suggestion: BloodBank | None
    scheme_suggestions: list[EligibleScheme]
    step_by_step_plan: list[str]
    disclaimer: str
