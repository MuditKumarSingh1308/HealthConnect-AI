from fastapi import APIRouter

from app.schemas.ambulances import (
    Ambulance,
    AmbulanceBookingRequest,
    AmbulanceBookingResponse,
)
from app.services.ambulances import book_nearest_ambulance, get_available_ambulances

router = APIRouter()


@router.get("/available", response_model=list[Ambulance])
def available() -> list[Ambulance]:
    return get_available_ambulances()


@router.post("/book", response_model=AmbulanceBookingResponse)
def book(request: AmbulanceBookingRequest) -> AmbulanceBookingResponse:
    return book_nearest_ambulance(request)
