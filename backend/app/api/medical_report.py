from fastapi import APIRouter

from app.schemas.medical_report import (
    MedicalReportAnalyzeRequest,
    MedicalReportAnalyzeResponse,
)
from app.services.medical_report import analyze_medical_report

router = APIRouter()


@router.post("/analyze", response_model=MedicalReportAnalyzeResponse)
def analyze(request: MedicalReportAnalyzeRequest) -> MedicalReportAnalyzeResponse:
    return analyze_medical_report(request)
