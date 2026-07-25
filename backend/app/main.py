from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.ambulances import router as ambulances_router
from app.api.assistant import router as assistant_router
from app.api.blood import router as blood_router
from app.api.hospitals import router as hospitals_router
from app.api.medical_report import router as medical_report_router
from app.api.schemes import router as schemes_router
from app.api.triage import router as triage_router
from app.core.config import settings

app = FastAPI(
    title=settings.app_name,
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ambulances_router, prefix="/api/ambulances", tags=["ambulances"])
app.include_router(assistant_router, prefix="/api/assistant", tags=["assistant"])
app.include_router(blood_router, prefix="/api", tags=["blood"])
app.include_router(hospitals_router, prefix="/api/hospitals", tags=["hospitals"])
app.include_router(medical_report_router, prefix="/api/medical-report", tags=["medical report"])
app.include_router(schemes_router, prefix="/api/schemes", tags=["schemes"])
app.include_router(triage_router, prefix="/api/triage", tags=["triage"])


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}
