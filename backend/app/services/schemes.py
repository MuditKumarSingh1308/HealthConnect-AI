from app.schemas.schemes import (
    EligibleScheme,
    SchemeRecommendRequest,
    SchemeRecommendResponse,
)


DISCLAIMER = (
    "This is a mock government scheme assistant for a hackathon MVP. Eligibility, benefits, "
    "documents, and application steps must be verified on official government portals or with an "
    "authorized help center."
)

MOCK_SCHEMES = [
    {
        "name": "Ayushman Bharat PM-JAY",
        "benefit": "Cashless secondary and tertiary hospitalization support at empaneled hospitals.",
        "conditions": ["cancer", "cardiac", "kidney", "surgery", "trauma", "general"],
        "income_categories": ["Low income", "Below poverty line"],
        "age_min": 0,
        "required_documents": ["Aadhaar card", "Ration card", "Income certificate", "Hospital referral"],
        "application_steps": [
            "Check family eligibility at the nearest PM-JAY help desk.",
            "Verify identity and household details.",
            "Select an empaneled hospital for treatment approval.",
            "Keep admission and discharge documents for claim support.",
        ],
    },
    {
        "name": "State Health Assurance Support",
        "benefit": "State-level financial assistance for eligible low-income patients.",
        "conditions": ["diabetes", "infection", "fever", "respiratory", "general"],
        "income_categories": ["Low income", "Below poverty line", "Middle income"],
        "age_min": 0,
        "required_documents": ["Aadhaar card", "State residence proof", "Income certificate", "Doctor prescription"],
        "application_steps": [
            "Visit the district health help center.",
            "Submit disease proof and income category documents.",
            "Request scheme pre-authorization if hospitalization is needed.",
            "Track approval status through the help center.",
        ],
    },
    {
        "name": "Senior Citizen Health Assistance",
        "benefit": "Additional medical support and guided help desk assistance for senior citizens.",
        "conditions": ["cardiac", "kidney", "diabetes", "respiratory", "general"],
        "income_categories": ["Low income", "Middle income"],
        "age_min": 60,
        "required_documents": ["Aadhaar card", "Age proof", "Income certificate", "Recent medical report"],
        "application_steps": [
            "Confirm senior citizen eligibility with the local health office.",
            "Submit medical report and age proof.",
            "Collect referral letter for the nearest participating hospital.",
            "Schedule follow-up through the assigned help desk.",
        ],
    },
]


def recommend_schemes(request: SchemeRecommendRequest) -> SchemeRecommendResponse:
    disease = request.disease.lower()
    income_category = request.income_category.lower()
    eligible_schemes: list[EligibleScheme] = []

    for scheme in MOCK_SCHEMES:
        condition_match = any(condition in disease for condition in scheme["conditions"])
        income_match = any(
            category.lower() == income_category
            for category in scheme["income_categories"]
        )
        age_match = request.age >= scheme["age_min"]

        if condition_match and income_match and age_match:
            eligible_schemes.append(
                EligibleScheme(
                    name=scheme["name"],
                    benefit=scheme["benefit"],
                    eligibility_reason=_eligibility_reason(request, scheme["name"]),
                    required_documents=scheme["required_documents"],
                    application_steps=scheme["application_steps"],
                    nearest_help_center=f"{request.state} District Health Scheme Help Center",
                )
            )

    if not eligible_schemes:
        eligible_schemes.append(
            EligibleScheme(
                name="General Government Health Help Desk",
                benefit="Guidance for available state and central healthcare assistance options.",
                eligibility_reason=(
                    "No exact mock scheme match was found, but the patient can still verify "
                    "available options through a government help center."
                ),
                required_documents=["Aadhaar card", "Residence proof", "Income certificate", "Medical prescription"],
                application_steps=[
                    "Visit the nearest district health scheme help center.",
                    "Share disease details, income category, age, and current hospital documents.",
                    "Ask the help desk to verify central and state scheme eligibility.",
                ],
                nearest_help_center=f"{request.state} District Health Scheme Help Center",
            )
        )

    return SchemeRecommendResponse(
        eligible_schemes=eligible_schemes,
        summary=(
            f"Found {len(eligible_schemes)} mock scheme recommendation"
            f"{'' if len(eligible_schemes) == 1 else 's'} for {request.disease} in {request.state}."
        ),
        disclaimer=DISCLAIMER,
    )


def _eligibility_reason(request: SchemeRecommendRequest, scheme_name: str) -> str:
    return (
        f"{scheme_name} matched because the submitted disease, {request.income_category} "
        f"income category, age {request.age}, and state context fit this mock rule set."
    )
