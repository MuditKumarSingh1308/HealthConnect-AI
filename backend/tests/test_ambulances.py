from fastapi.testclient import TestClient


def test_available_ambulances_return_essential_fields(client: TestClient) -> None:
    response = client.get("/api/ambulances/available")

    data = response.json()

    assert response.status_code == 200
    assert len(data) >= 1

    ambulance = data[0]
    assert ambulance["id"]
    assert ambulance["driver_name"]
    assert ambulance["vehicle_number"]
    assert ambulance["distance_km"] >= 0
    assert ambulance["eta_minutes"] > 0
    assert ambulance["status"] == "Available"
    assert ambulance["phone"]
    assert ambulance["ambulance_type"]


def test_book_nearest_ambulance_returns_confirmation(client: TestClient) -> None:
    response = client.post(
        "/api/ambulances/book",
        json={
            "patient_name": "Demo Patient",
            "location": "Bengaluru",
            "emergency_type": "Cardiac",
            "severity": "Critical",
        },
    )

    data = response.json()

    assert response.status_code == 200
    assert data["booking_id"].startswith("AMB-")
    assert data["status"] == "Dispatched"
    assert data["eta_minutes"] > 0
    assert data["tracking_steps"]
    assert data["assigned_ambulance"]["status"] == "Dispatched"
    assert data["assigned_ambulance"]["driver_name"]
