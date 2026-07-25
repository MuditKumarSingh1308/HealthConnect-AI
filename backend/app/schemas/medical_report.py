from typing import Literal

from pydantic import BaseModel, Field


RiskLevel = Literal["Low", "Moderate", "High"]


class MedicalReportAnalyzeRequest(BaseModel):
    report_text: str = Field(min_length=3, max_length=6000)


class MedicalReportAnalyzeResponse(BaseModel):
    summary: str
    important_findings: list[str]
    risk_level: RiskLevel
    recommended_next_step: str
    questions_to_ask_doctor: list[str]
    medical_disclaimer: str
