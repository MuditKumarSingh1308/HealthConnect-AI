from app.schemas.hospitals import Hospital, HospitalRecommendation

MOCK_HOSPITALS = [
    Hospital(
        id="hosp-001",
        name="Apex Emergency Institute",
        distance_km=1.8,
        rating=4.8,
        emergency_support=True,
        icu_beds=9,
        general_beds=28,
        specialists=["Cardiologist", "Emergency Physician", "Neurologist"],
        address="14 Health Avenue, Central District",
        phone="+91 90000 11001",
    ),
    Hospital(
        id="hosp-002",
        name="CityCare Multispecialty Hospital",
        distance_km=3.4,
        rating=4.6,
        emergency_support=True,
        icu_beds=5,
        general_beds=42,
        specialists=["General Physician", "Orthopedic", "Pediatrician"],
        address="88 Wellness Road, East Block",
        phone="+91 90000 11002",
    ),
    Hospital(
        id="hosp-003",
        name="Metro Trauma Center",
        distance_km=5.1,
        rating=4.7,
        emergency_support=True,
        icu_beds=7,
        general_beds=31,
        specialists=["Orthopedic", "Neurologist", "Emergency Physician"],
        address="22 Metro Link Road, Northside",
        phone="+91 90000 11003",
    ),
    Hospital(
        id="hosp-004",
        name="Lotus Community Clinic",
        distance_km=1.2,
        rating=4.4,
        emergency_support=False,
        icu_beds=0,
        general_beds=16,
        specialists=["General Physician", "ENT"],
        address="7 Lotus Street, Market Area",
        phone="+91 90000 11004",
    ),
    Hospital(
        id="hosp-005",
        name="Pulse Heart and Critical Care",
        distance_km=6.2,
        rating=4.9,
        emergency_support=True,
        icu_beds=12,
        general_beds=24,
        specialists=["Cardiologist", "Pulmonologist", "Critical Care"],
        address="41 Cardiac Care Lane, West District",
        phone="+91 90000 11005",
    ),
]


def recommend_hospitals(
    emergency_type: str,
    severity: str,
    specialist_needed: str,
) -> list[HospitalRecommendation]:
    severity_normalized = severity.lower()
    specialist_normalized = specialist_needed.lower()
    recommendations: list[HospitalRecommendation] = []

    for hospital in MOCK_HOSPITALS:
        score = 0.0
        reasons: list[str] = []

        if hospital.emergency_support:
            score += 40
            reasons.append("24/7 emergency support available")
        else:
            reasons.append("Limited emergency support")

        if severity_normalized == "critical":
            score += hospital.icu_beds * 3
            if hospital.icu_beds > 0:
                reasons.append(f"{hospital.icu_beds} ICU beds available for critical cases")
            else:
                reasons.append("No ICU beds available")
        else:
            score += min(hospital.general_beds, 40) * 0.4
            reasons.append(f"{hospital.general_beds} general beds available")

        if _has_specialist(hospital, specialist_normalized):
            score += 25
            reasons.append(f"Matches requested specialist: {specialist_needed}")
        elif specialist_needed:
            reasons.append(f"Does not directly match specialist: {specialist_needed}")

        distance_score = max(0, 20 - hospital.distance_km * 2)
        score += distance_score
        reasons.append(f"{hospital.distance_km} km away")

        score += hospital.rating * 2
        reasons.append(f"{hospital.rating} patient rating")

        if emergency_type:
            reasons.append(f"Evaluated for {emergency_type} emergency")

        recommendations.append(
            HospitalRecommendation(
                hospital=hospital,
                score=round(score, 1),
                rank=0,
                best_match=False,
                reasons=reasons,
            )
        )

    ranked = sorted(recommendations, key=lambda item: item.score, reverse=True)
    return [
        item.model_copy(update={"rank": index + 1, "best_match": index == 0})
        for index, item in enumerate(ranked)
    ]


def _has_specialist(hospital: Hospital, specialist_needed: str) -> bool:
    if not specialist_needed:
        return False

    return any(specialist.lower() == specialist_needed for specialist in hospital.specialists)
