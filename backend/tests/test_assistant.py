from fastapi.testclient import TestClient


def test_ai_command_center_generates_critical_emergency_plan(client: TestClient) -> None:
    response = client.post(
        "/api/assistant/emergency-plan",
        json={
            "message": "My father has chest pain and difficulty breathing.",
            "patient_age": 55,
            "location": "Bengaluru",
        },
    )

    data = response.json()

    assert response.status_code == 200
    assert data["severity"] == "Critical"
    assert data["detected_emergency"]
    assert data["triage_summary"]
    assert data["recommended_action"]
    assert data["recommended_hospital"] is not None
    assert data["recommended_hospital"]["name"]
    assert data["ambulance_suggestion"] is not None
    assert data["ambulance_suggestion"]["eta_minutes"] > 0
    assert data["blood_bank_suggestion"] is not None
    assert data["blood_bank_suggestion"]["available_units"] >= 0
    assert data["scheme_suggestions"]
    assert data["step_by_step_plan"]
    assert data["disclaimer"]


def test_ai_command_center_invalid_request_returns_validation_error(client: TestClient) -> None:
    response = client.post(
        "/api/assistant/emergency-plan",
        json={
            "message": "",
            "patient_age": 200,
            "location": "",
        },
    )

    assert response.status_code == 422
    assert "detail" in response.json()
