from app.schemas.triage import TriageAnalyzeRequest, TriageAnalyzeResponse

CRITICAL_KEYWORDS = [
    "chest pain",
    "breathing difficulty",
    "unconscious",
    "severe bleeding",
    "stroke",
    "heart attack",
    "seizure",
]

MODERATE_KEYWORDS = [
    "fever",
    "vomiting",
    "fracture",
    "high pain",
    "infection",
    "dizziness",
    "dehydration",
]

LOW_KEYWORDS = [
    "cough",
    "headache",
    "mild pain",
    "cold",
    "sore throat",
    "weakness",
]


def analyze_triage(request: TriageAnalyzeRequest) -> TriageAnalyzeResponse:
    text = f"{request.symptoms} {request.existing_conditions}".lower()

    critical_matches = _matched_keywords(text, CRITICAL_KEYWORDS)
    if critical_matches:
        return TriageAnalyzeResponse(
            severity="Critical",
            confidence=_confidence(critical_matches, base=0.9),
            recommended_action="Seek emergency care immediately. Call local emergency services if symptoms are active or worsening.",
            recommended_hospital_type="Emergency hospital with ICU and trauma support",
            ambulance_required=True,
            matched_keywords=critical_matches,
        )

    moderate_matches = _matched_keywords(text, MODERATE_KEYWORDS)
    if moderate_matches:
        return TriageAnalyzeResponse(
            severity="Moderate",
            confidence=_confidence(moderate_matches, base=0.76),
            recommended_action="Book an urgent consultation today and monitor symptoms closely.",
            recommended_hospital_type="Multi-specialty hospital or urgent care clinic",
            ambulance_required=False,
            matched_keywords=moderate_matches,
        )

    low_matches = _matched_keywords(text, LOW_KEYWORDS)
    if low_matches:
        return TriageAnalyzeResponse(
            severity="Low",
            confidence=_confidence(low_matches, base=0.68),
            recommended_action="Schedule a routine consultation and continue basic symptom care.",
            recommended_hospital_type="Primary care clinic or general physician",
            ambulance_required=False,
            matched_keywords=low_matches,
        )

    return TriageAnalyzeResponse(
        severity="Low",
        confidence=0.5,
        recommended_action="No emergency keyword was detected. Consult a clinician if symptoms persist, worsen, or feel concerning.",
        recommended_hospital_type="Primary care clinic or general physician",
        ambulance_required=False,
        matched_keywords=[],
    )


def _matched_keywords(text: str, keywords: list[str]) -> list[str]:
    return [keyword for keyword in keywords if keyword in text]


def _confidence(matches: list[str], base: float) -> float:
    return min(0.98, round(base + (len(matches) - 1) * 0.03, 2))
