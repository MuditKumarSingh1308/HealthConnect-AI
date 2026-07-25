from fastapi.testclient import TestClient


def test_triage_critical_symptoms(client: TestClient) -> None:
    response = client.post(
        "/api/triage/analyze",
        json={
            "symptoms": "chest pain and breathing difficulty",
            "age": 55,
            "gender": "Male",
            "existing_conditions": "",
        },
    )

    data = response.json()

    assert response.status_code == 200
    assert data["severity"] == "Critical"
    assert 0 <= data["confidence"] <= 1
    assert data["ambulance_required"] is True
    assert "chest pain" in data["matched_keywords"]
    assert "breathing difficulty" in data["matched_keywords"]
    assert data["recommended_action"]
    assert data["recommended_hospital_type"]


def test_triage_low_symptoms(client: TestClient) -> None:
    response = client.post(
        "/api/triage/analyze",
        json={
            "symptoms": "mild headache and cold",
            "age": 28,
            "gender": "Female",
            "existing_conditions": "",
        },
    )

    data = response.json()

    assert response.status_code == 200
    assert data["severity"] == "Low"
    assert data["ambulance_required"] is False
    assert "headache" in data["matched_keywords"]
    assert data["recommended_action"]


def test_triage_invalid_request_returns_validation_error(client: TestClient) -> None:
    response = client.post(
        "/api/triage/analyze",
        json={
            "age": 200,
            "gender": "",
            "existing_conditions": "",
        },
    )

    assert response.status_code == 422
    assert "detail" in response.json()
