from fastapi import APIRouter, Query

from app.schemas.blood import BloodBank, BloodRequest, BloodRequestResponse
from app.services.blood import create_blood_request, search_blood_banks

router = APIRouter()


@router.get("/bloodbanks/search", response_model=list[BloodBank])
def search(
    blood_group: str = Query(default="O+", min_length=1, max_length=5),
    city: str = Query(default="Bengaluru", min_length=2, max_length=100),
) -> list[BloodBank]:
    return search_blood_banks(blood_group=blood_group, city=city)


@router.post("/blood/request", response_model=BloodRequestResponse)
def request_blood(request: BloodRequest) -> BloodRequestResponse:
    return create_blood_request(request)
