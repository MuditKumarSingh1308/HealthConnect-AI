from fastapi.testclient import TestClient


def test_scheme_recommendation_returns_eligible_schemes(client: TestClient) -> None:
    response = client.post(
        "/api/schemes/recommend",
        json={
            "disease": "cardiac surgery",
            "state": "Karnataka",
            "income_category": "Low income",
            "age": 62,
        },
    )

    data = response.json()

    assert response.status_code == 200
    assert data["summary"]
    assert data["disclaimer"]
    assert len(data["eligible_schemes"]) >= 1

    scheme = data["eligible_schemes"][0]
    assert scheme["name"]
    assert scheme["benefit"]
    assert scheme["eligibility_reason"]
    assert scheme["required_documents"]
    assert scheme["application_steps"]
    assert scheme["nearest_help_center"]
