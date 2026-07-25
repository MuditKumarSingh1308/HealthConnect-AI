from app.schemas.schemes import SchemeRecommendRequest
from app.schemas.triage import TriageAnalyzeRequest
from app.schemas.assistant import EmergencyPlanRequest, EmergencyPlanResponse
from app.services.ambulances import get_available_ambulances
from app.services.blood import search_blood_banks
from app.services.hospitals import recommend_hospitals
from app.services.schemes import recommend_schemes
from app.services.triage import analyze_triage


DISCLAIMER = (
    "This is a mock emergency action plan for a hackathon MVP and is not a medical diagnosis. "
    "For real emergencies, call local emergency services immediately."
)


def create_emergency_plan(request: EmergencyPlanRequest) -> EmergencyPlanResponse:
    triage = analyze_triage(
        TriageAnalyzeRequest(
            symptoms=request.message,
            age=request.patient_age,
            gender="Not specified",
            existing_conditions="",
        )
    )
    emergency_type = _detect_emergency_type(request.message)
    specialist = _specialist_for_message(request.message)
    hospital_recommendations = recommend_hospitals(
        emergency_type=emergency_type,
        severity=triage.severity,
        specialist_needed=specialist,
    )
    recommended_hospital = hospital_recommendations[0].hospital if hospital_recommendations else None
    ambulances = get_available_ambulances()
    ambulance_suggestion = ambulances[0] if triage.ambulance_required and ambulances else None
    blood_bank_suggestions = search_blood_banks(
        blood_group=_blood_group_for_message(request.message),
        city=_city_from_location(request.location),
    )
    scheme_response = recommend_schemes(
        SchemeRecommendRequest(
            disease=emergency_type,
            state=_state_from_location(request.location),
            income_category="Low income",
            age=request.patient_age,
        )
    )

    return EmergencyPlanResponse(
        detected_emergency=emergency_type,
        severity=triage.severity,
        triage_summary=_triage_summary(triage.matched_keywords, triage.confidence),
        recommended_action=triage.recommended_action,
        recommended_hospital=recommended_hospital,
        ambulance_suggestion=ambulance_suggestion,
        blood_bank_suggestion=blood_bank_suggestions[0] if blood_bank_suggestions else None,
        scheme_suggestions=scheme_response.eligible_schemes[:2],
        step_by_step_plan=_step_by_step_plan(
            severity=triage.severity,
            ambulance_required=triage.ambulance_required,
            hospital_name=recommended_hospital.name if recommended_hospital else "nearest emergency hospital",
            location=request.location,
        ),
        disclaimer=DISCLAIMER,
    )


def _detect_emergency_type(message: str) -> str:
    text = message.lower()
    if any(keyword in text for keyword in ("chest pain", "heart", "breathing")):
        return "Cardiac emergency"
    if any(keyword in text for keyword in ("accident", "bleeding", "fracture", "trauma")):
        return "Trauma emergency"
    if any(keyword in text for keyword in ("fever", "vomiting", "dehydration", "infection")):
        return "Infection or dehydration"
    if any(keyword in text for keyword in ("stroke", "seizure", "unconscious")):
        return "Neurological emergency"
    return "General emergency"


def _specialist_for_message(message: str) -> str:
    text = message.lower()
    if any(keyword in text for keyword in ("chest pain", "heart", "cardiac")):
        return "Cardiologist"
    if any(keyword in text for keyword in ("breathing", "respiratory", "asthma")):
        return "Pulmonologist"
    if any(keyword in text for keyword in ("accident", "fracture", "bleeding", "trauma")):
        return "Emergency Physician"
    if any(keyword in text for keyword in ("stroke", "seizure", "unconscious")):
        return "Neurologist"
    return "General Physician"


def _blood_group_for_message(message: str) -> str:
    text = message.upper()
    for blood_group in ("AB-", "AB+", "O-", "O+", "A-", "A+", "B-", "B+"):
        if blood_group in text:
            return blood_group
    return "O+"


def _city_from_location(location: str) -> str:
    normalized = location.lower()
    for city in ("bengaluru", "mumbai", "delhi"):
        if city in normalized:
            return city
    return "Bengaluru"


def _state_from_location(location: str) -> str:
    normalized = location.lower()
    if "mumbai" in normalized or "maharashtra" in normalized:
        return "Maharashtra"
    if "delhi" in normalized:
        return "Delhi"
    if "tamil" in normalized or "chennai" in normalized:
        return "Tamil Nadu"
    if "gujarat" in normalized or "ahmedabad" in normalized:
        return "Gujarat"
    return "Karnataka"


def _triage_summary(matched_keywords: list[str], confidence: float) -> str:
    if matched_keywords:
        return (
            f"Matched emergency indicators: {', '.join(matched_keywords)}. "
            f"Mock triage confidence is {round(confidence * 100)}%."
        )
    return f"No direct emergency keyword matched. Mock triage confidence is {round(confidence * 100)}%."


def _step_by_step_plan(
    severity: str,
    ambulance_required: bool,
    hospital_name: str,
    location: str,
) -> list[str]:
    steps = [
        "Keep the patient seated or lying down and avoid unnecessary movement.",
        "Check breathing, consciousness, and visible bleeding while staying with the patient.",
    ]

    if severity == "Critical":
        steps.append("Call local emergency services immediately.")
    else:
        steps.append("Contact a doctor or urgent care service for guided next steps.")

    if ambulance_required:
        steps.append(f"Book or dispatch the nearest available ambulance to {location}.")
    else:
        steps.append("Arrange safe transport if symptoms remain stable.")

    steps.extend(
        [
            f"Proceed to {hospital_name} or the nearest suitable emergency facility.",
            "Carry ID proof, current medicines, allergies, and previous reports if available.",
            "Share this mock action plan with the care team and follow clinician instructions.",
        ]
    )

    return steps
