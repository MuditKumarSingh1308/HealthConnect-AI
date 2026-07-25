from fastapi.testclient import TestClient


def test_medical_report_analysis_returns_expected_sections(client: TestClient) -> None:
    response = client.post(
        "/api/medical-report/analyze",
        json={
            "report_text": (
                "CBC report shows low hemoglobin and mild infection markers. "
                "Glucose is elevated. Other values are stable."
            )
        },
    )

    data = response.json()

    assert response.status_code == 200
    assert data["summary"]
    assert data["important_findings"]
    assert data["risk_level"] in {"Low", "Moderate", "High"}
    assert data["recommended_next_step"]
    assert data["questions_to_ask_doctor"]
    assert data["medical_disclaimer"]
