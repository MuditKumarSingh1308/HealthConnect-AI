from fastapi.testclient import TestClient


def test_hospital_recommendations_return_ranked_results(client: TestClient) -> None:
    response = client.get(
        "/api/hospitals/recommend",
        params={
            "emergency_type": "Cardiac",
            "severity": "Critical",
            "specialist_needed": "Cardiologist",
        },
    )

    data = response.json()

    assert response.status_code == 200
    assert len(data) >= 1

    first = data[0]
    hospital = first["hospital"]

    assert first["rank"] == 1
    assert first["best_match"] is True
    assert first["score"] >= 0
    assert first["reasons"]
    assert hospital["id"]
    assert hospital["name"]
    assert hospital["distance_km"] >= 0
    assert hospital["rating"] > 0
    assert "icu_beds" in hospital
    assert "general_beds" in hospital
    assert isinstance(hospital["specialists"], list)
