from fastapi import APIRouter

from app.schemas.schemes import SchemeRecommendRequest, SchemeRecommendResponse
from app.services.schemes import recommend_schemes

router = APIRouter()


@router.post("/recommend", response_model=SchemeRecommendResponse)
def recommend(request: SchemeRecommendRequest) -> SchemeRecommendResponse:
    return recommend_schemes(request)
