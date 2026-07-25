from app.schemas.medical_report import (
    MedicalReportAnalyzeRequest,
    MedicalReportAnalyzeResponse,
)


HIGH_RISK_KEYWORDS = [
    "critical",
    "severe",
    "markedly elevated",
    "very high",
    "positive troponin",
    "malignant",
]

MODERATE_RISK_KEYWORDS = [
    "elevated",
    "low hemoglobin",
    "high glucose",
    "infection",
    "abnormal",
    "deficiency",
]

LOW_RISK_KEYWORDS = [
    "normal",
    "within range",
    "stable",
    "mild",
]

DISCLAIMER = (
    "This is a mock AI explanation for a hackathon MVP and is not a medical diagnosis. "
    "Always review results with a qualified doctor."
)


def analyze_medical_report(
    request: MedicalReportAnalyzeRequest,
) -> MedicalReportAnalyzeResponse:
    report_text = request.report_text.strip()
    normalized_text = report_text.lower()
    high_matches = _matched_keywords(normalized_text, HIGH_RISK_KEYWORDS)
    moderate_matches = _matched_keywords(normalized_text, MODERATE_RISK_KEYWORDS)
    low_matches = _matched_keywords(normalized_text, LOW_RISK_KEYWORDS)

    if high_matches:
        risk_level = "High"
        recommended_next_step = (
            "Contact your doctor urgently or visit an emergency department if symptoms are present."
        )
    elif moderate_matches:
        risk_level = "Moderate"
        recommended_next_step = (
            "Schedule a doctor consultation soon to review the abnormal or borderline findings."
        )
    else:
        risk_level = "Low"
        recommended_next_step = (
            "Discuss the report during a routine consultation and continue monitoring symptoms."
        )

    findings = _findings(high_matches, moderate_matches, low_matches)

    return MedicalReportAnalyzeResponse(
        summary=_summary(report_text, risk_level),
        important_findings=findings,
        risk_level=risk_level,
        recommended_next_step=recommended_next_step,
        questions_to_ask_doctor=_questions(risk_level),
        medical_disclaimer=DISCLAIMER,
    )


def _matched_keywords(text: str, keywords: list[str]) -> list[str]:
    return [keyword for keyword in keywords if keyword in text]


def _findings(
    high_matches: list[str],
    moderate_matches: list[str],
    low_matches: list[str],
) -> list[str]:
    findings: list[str] = []

    if high_matches:
        findings.append(f"Potential high-risk terms detected: {', '.join(high_matches)}.")
    if moderate_matches:
        findings.append(f"Abnormal or follow-up terms detected: {', '.join(moderate_matches)}.")
    if low_matches:
        findings.append(f"Reassuring terms detected: {', '.join(low_matches)}.")

    if not findings:
        findings.append("No predefined risk keyword was detected in the pasted report text.")

    return findings


def _summary(report_text: str, risk_level: str) -> str:
    trimmed_text = " ".join(report_text.split())
    preview = trimmed_text[:180]
    suffix = "..." if len(trimmed_text) > 180 else ""

    return (
        f"Mock analysis reviewed the pasted report text and categorized the overall risk as "
        f"{risk_level}. Key excerpt reviewed: {preview}{suffix}"
    )


def _questions(risk_level: str) -> list[str]:
    base_questions = [
        "Which values are outside the normal range?",
        "Do these results need repeat testing or follow-up scans?",
        "Are any medicines, diet changes, or lifestyle changes recommended?",
    ]

    if risk_level == "High":
        return [
            "Do any findings require urgent treatment today?",
            "Should I go to an emergency department based on these results?",
            *base_questions,
        ]

    if risk_level == "Moderate":
        return [
            "How soon should I schedule a follow-up appointment?",
            "Could these findings explain my current symptoms?",
            *base_questions,
        ]

    return [
        "Are these findings normal for my age and medical history?",
        *base_questions,
    ]
