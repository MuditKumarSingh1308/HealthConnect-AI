from typing import Literal

from fastapi import APIRouter, Query

from app.schemas.hospitals import HospitalRecommendation
from app.services.hospitals import recommend_hospitals

router = APIRouter()


@router.get("/recommend", response_model=list[HospitalRecommendation])
def recommend(
    emergency_type: str = Query(default="General emergency", max_length=100),
    severity: Literal["Critical", "Moderate", "Low"] = Query(default="Moderate"),
    specialist_needed: str = Query(default="General Physician", max_length=100),
) -> list[HospitalRecommendation]:
    return recommend_hospitals(
        emergency_type=emergency_type,
        severity=severity,
        specialist_needed=specialist_needed,
    )
