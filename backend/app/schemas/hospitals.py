from pydantic import BaseModel, Field


class Hospital(BaseModel):
    id: str
    name: str
    distance_km: float
    rating: float
    emergency_support: bool
    icu_beds: int
    general_beds: int
    specialists: list[str]
    address: str
    phone: str


class HospitalRecommendation(BaseModel):
    hospital: Hospital
    score: float = Field(ge=0)
    rank: int
    best_match: bool
    reasons: list[str]
