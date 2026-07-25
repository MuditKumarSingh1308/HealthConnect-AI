from app.schemas.ambulances import (
    Ambulance,
    AmbulanceBookingRequest,
    AmbulanceBookingResponse,
)

MOCK_AMBULANCES = [
    Ambulance(
        id="amb-001",
        driver_name="Ravi Kumar",
        vehicle_number="HC 12 AB 2045",
        distance_km=0.9,
        eta_minutes=6,
        status="Available",
        phone="+91 90000 22001",
        ambulance_type="Advanced Life Support",
    ),
    Ambulance(
        id="amb-002",
        driver_name="Nisha Patel",
        vehicle_number="HC 14 CD 6721",
        distance_km=2.1,
        eta_minutes=11,
        status="Available",
        phone="+91 90000 22002",
        ambulance_type="Basic Life Support",
    ),
    Ambulance(
        id="amb-003",
        driver_name="Arjun Singh",
        vehicle_number="HC 09 EF 8840",
        distance_km=1.4,
        eta_minutes=8,
        status="Busy",
        phone="+91 90000 22003",
        ambulance_type="Advanced Life Support",
    ),
    Ambulance(
        id="amb-004",
        driver_name="Farah Khan",
        vehicle_number="HC 21 GH 1198",
        distance_km=3.0,
        eta_minutes=14,
        status="Available",
        phone="+91 90000 22004",
        ambulance_type="Patient Transport",
    ),
]


def get_available_ambulances() -> list[Ambulance]:
    available = [
        ambulance
        for ambulance in MOCK_AMBULANCES
        if ambulance.status.lower() == "available"
    ]
    return sorted(available, key=lambda ambulance: (ambulance.distance_km, ambulance.eta_minutes))


def book_nearest_ambulance(request: AmbulanceBookingRequest) -> AmbulanceBookingResponse:
    available = get_available_ambulances()
    assigned = available[0]
    dispatched = assigned.model_copy(update={"status": "Dispatched"})

    return AmbulanceBookingResponse(
        booking_id=_booking_id(request),
        assigned_ambulance=dispatched,
        eta_minutes=assigned.eta_minutes,
        status="Dispatched",
        tracking_steps=[
            "Booking confirmed",
            "Nearest available ambulance assigned",
            f"Driver notified for {request.emergency_type} emergency",
            f"Ambulance dispatched to {request.location}",
            "Live map tracking will be added in a future sprint",
        ],
    )


def _booking_id(request: AmbulanceBookingRequest) -> str:
    patient_code = "".join(char for char in request.patient_name.upper() if char.isalnum())[:4]
    severity_code = request.severity.upper()[:3]
    return f"AMB-{patient_code or 'DEMO'}-{severity_code}-1001"
