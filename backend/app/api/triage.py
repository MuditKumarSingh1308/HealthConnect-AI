from fastapi import APIRouter

from app.schemas.triage import TriageAnalyzeRequest, TriageAnalyzeResponse
from app.services.triage import analyze_triage

router = APIRouter()


@router.post("/analyze", response_model=TriageAnalyzeResponse)
def analyze(request: TriageAnalyzeRequest) -> TriageAnalyzeResponse:
    return analyze_triage(request)
