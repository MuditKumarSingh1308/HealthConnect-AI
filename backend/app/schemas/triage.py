from typing import Literal

from pydantic import BaseModel, Field


Severity = Literal["Critical", "Moderate", "Low"]


class TriageAnalyzeRequest(BaseModel):
    symptoms: str = Field(min_length=3, max_length=2000)
    age: int = Field(ge=0, le=120)
    gender: str = Field(min_length=1, max_length=50)
    existing_conditions: str = Field(default="", max_length=1000)


class TriageAnalyzeResponse(BaseModel):
    severity: Severity
    confidence: float = Field(ge=0, le=1)
    recommended_action: str
    recommended_hospital_type: str
    ambulance_required: bool
    matched_keywords: list[str]
