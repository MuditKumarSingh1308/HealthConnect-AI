from fastapi import APIRouter

from app.schemas.assistant import EmergencyPlanRequest, EmergencyPlanResponse
from app.services.assistant import create_emergency_plan

router = APIRouter()


@router.post("/emergency-plan", response_model=EmergencyPlanResponse)
def emergency_plan(request: EmergencyPlanRequest) -> EmergencyPlanResponse:
    return create_emergency_plan(request)
