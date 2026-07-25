from pydantic import BaseModel, Field


class SchemeRecommendRequest(BaseModel):
    disease: str = Field(min_length=2, max_length=120)
    state: str = Field(min_length=2, max_length=100)
    income_category: str = Field(min_length=2, max_length=80)
    age: int = Field(ge=0, le=120)


class EligibleScheme(BaseModel):
    name: str
    benefit: str
    eligibility_reason: str
    required_documents: list[str]
    application_steps: list[str]
    nearest_help_center: str


class SchemeRecommendResponse(BaseModel):
    eligible_schemes: list[EligibleScheme]
    summary: str
    disclaimer: str
