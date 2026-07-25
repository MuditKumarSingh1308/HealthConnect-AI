from fastapi.testclient import TestClient


def test_blood_bank_search_returns_matching_results(client: TestClient) -> None:
    response = client.get(
        "/api/bloodbanks/search",
        params={"blood_group": "O+", "city": "Bengaluru"},
    )

    data = response.json()

    assert response.status_code == 200
    assert len(data) >= 1

    blood_bank = data[0]
    assert blood_bank["name"]
    assert blood_bank["blood_group"] == "O+"
    assert blood_bank["distance_km"] >= 0
    assert blood_bank["available_units"] >= 0
    assert blood_bank["contact"]
    assert blood_bank["address"]
    assert blood_bank["open_status"] in {"Open", "Limited", "Closed"}


def test_blood_request_returns_broadcast_confirmation(client: TestClient) -> None:
    response = client.post(
        "/api/blood/request",
        json={
            "patient_name": "Demo Patient",
            "blood_group": "O+",
            "hospital": "Apex Hospital Bengaluru",
            "units_required": 2,
        },
    )

    data = response.json()

    assert response.status_code == 200
    assert data["request_id"].startswith("BLD-")
    assert data["status"] == "Broadcast Sent"
    assert isinstance(data["nearby_blood_banks"], list)
    assert len(data["nearby_blood_banks"]) >= 1
