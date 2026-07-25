from app.schemas.blood import BloodBank, BloodRequest, BloodRequestResponse


MOCK_BLOOD_BANKS = [
    BloodBank(
        name="CityLife Blood Centre",
        distance_km=1.2,
        blood_group="O+",
        available_units=18,
        contact="+91 90000 33001",
        address="12 Medical Road, Bengaluru",
        open_status="Open",
    ),
    BloodBank(
        name="Metro Emergency Blood Bank",
        distance_km=2.4,
        blood_group="A+",
        available_units=11,
        contact="+91 90000 33002",
        address="44 Trauma Care Avenue, Bengaluru",
        open_status="Open",
    ),
    BloodBank(
        name="RedCare Donor Network",
        distance_km=3.1,
        blood_group="B+",
        available_units=7,
        contact="+91 90000 33003",
        address="8 Health Park, Bengaluru",
        open_status="Limited",
    ),
    BloodBank(
        name="Apex Hospital Blood Storage",
        distance_km=4.6,
        blood_group="AB+",
        available_units=5,
        contact="+91 90000 33004",
        address="91 Apex Hospital Campus, Bengaluru",
        open_status="Open",
    ),
    BloodBank(
        name="Northside Blood Support Unit",
        distance_km=5.3,
        blood_group="O-",
        available_units=4,
        contact="+91 90000 33005",
        address="22 North Clinic Street, Bengaluru",
        open_status="Limited",
    ),
    BloodBank(
        name="Community Plasma & Blood Bank",
        distance_km=6.0,
        blood_group="A-",
        available_units=3,
        contact="+91 90000 33006",
        address="17 Donor Circle, Bengaluru",
        open_status="Closed",
    ),
    BloodBank(
        name="Lifeline Blood Services",
        distance_km=2.9,
        blood_group="B-",
        available_units=6,
        contact="+91 90000 33007",
        address="33 Lifeline Square, Mumbai",
        open_status="Open",
    ),
    BloodBank(
        name="Hope Blood Network",
        distance_km=4.2,
        blood_group="AB-",
        available_units=2,
        contact="+91 90000 33008",
        address="5 Hope Clinic Road, Delhi",
        open_status="Open",
    ),
]


def search_blood_banks(blood_group: str, city: str) -> list[BloodBank]:
    normalized_group = blood_group.strip().upper()
    normalized_city = city.strip().lower()

    matches = [
        blood_bank
        for blood_bank in MOCK_BLOOD_BANKS
        if blood_bank.blood_group.upper() == normalized_group
        and normalized_city in blood_bank.address.lower()
    ]

    return sorted(matches, key=lambda blood_bank: (blood_bank.distance_km, -blood_bank.available_units))


def create_blood_request(request: BloodRequest) -> BloodRequestResponse:
    nearby_blood_banks = search_blood_banks(
        blood_group=request.blood_group,
        city=_city_from_hospital(request.hospital),
    )

    if not nearby_blood_banks:
        nearby_blood_banks = sorted(
            [
                blood_bank
                for blood_bank in MOCK_BLOOD_BANKS
                if blood_bank.blood_group.upper() == request.blood_group.upper()
            ],
            key=lambda blood_bank: blood_bank.distance_km,
        )

    return BloodRequestResponse(
        request_id=_request_id(request),
        status="Broadcast Sent",
        nearby_blood_banks=nearby_blood_banks[:3],
    )


def _request_id(request: BloodRequest) -> str:
    patient_code = "".join(char for char in request.patient_name.upper() if char.isalnum())[:4]
    group_code = request.blood_group.replace("+", "P").replace("-", "N").upper()
    return f"BLD-{patient_code or 'DEMO'}-{group_code}-1001"


def _city_from_hospital(hospital: str) -> str:
    normalized = hospital.lower()
    for city in ("bengaluru", "mumbai", "delhi"):
        if city in normalized:
            return city
    return "bengaluru"
