# HealthConnect AI

![Version](https://img.shields.io/badge/version-0.1.0-0f766e)
![Frontend](https://img.shields.io/badge/frontend-Next.js%20%2B%20TypeScript-111827)
![Backend](https://img.shields.io/badge/backend-FastAPI-009688)
![Status](https://img.shields.io/badge/status-Hackathon%20MVP-blue)
![License](https://img.shields.io/badge/license-MIT-green)

HealthConnect AI is an AI-powered emergency healthcare platform built as a full-stack hackathon MVP. It helps patients move from an emergency message or symptom input to an actionable care plan using mock AI logic, hospital recommendations, ambulance booking, blood bank discovery, medical report explanation, and government scheme guidance.

> This project uses mock data and rule-based logic for demonstration purposes. It is not connected to real hospitals, ambulances, blood banks, databases, or medical AI providers.

## Project Overview

HealthConnect AI demonstrates how emergency healthcare workflows can be coordinated through one modern web platform:

- Patients can describe symptoms or an emergency situation.
- The system estimates urgency using rule-based mock triage.
- Recommended hospitals, ambulances, blood banks, and schemes are surfaced through mock service layers.
- The UI is designed for a polished hackathon presentation with responsive pages, startup-level branding, and clear demo flows.

## Problem Statement

During medical emergencies, patients and families often lose critical time deciding:

- How serious the situation is.
- Whether an ambulance is needed.
- Which hospital can handle the emergency.
- Where blood may be available.
- What financial or government support may apply.
- How to understand medical reports quickly.

This fragmentation delays care decisions and creates stress during moments where clarity matters most.

## Solution

HealthConnect AI provides a unified emergency healthcare assistant that turns user input into structured next steps. The MVP combines a patient dashboard, AI Command Center, triage analysis, hospital recommendation, ambulance booking, blood bank search, medical report explanation, and government scheme assistant.

The current implementation uses mock JSON-style data and deterministic service logic so the product is easy to explain, reliable in demos, and ready for future integrations.

## Architecture

```text
User
  |
  v
Next.js Frontend
  - Landing page
  - Demo Mode
  - Patient dashboard
  - Feature pages
  - Reusable UI components
  |
  v
FastAPI Backend
  - API routers
  - Pydantic schemas
  - Service layer
  - Mock healthcare data
  |
  v
Future Integrations
  - PostgreSQL
  - Gemini/OpenAI
  - Hospital systems
  - Ambulance/map providers
  - Blood bank networks
```

## Features

- Premium healthcare landing page with Demo Mode.
- Mock login and registration flow.
- Patient dashboard with emergency care modules.
- AI Command Center that creates a complete emergency action plan.
- Rule-based AI Emergency Triage.
- Smart Hospital Recommendation using mock ranking logic.
- Ambulance Booking with simulated dispatch and tracking timeline.
- Blood Bank Network with search and emergency request flow.
- Medical Report AI with mock report explanation.
- Government Health Scheme Assistant with eligibility-style results.
- About, Contact, loading splash, favicon, 404 page, footer links, and versioned branding.

## Screenshots Placeholders

Add screenshots to `docs/screenshots/` when preparing the final submission.

| Screen | Placeholder |
| --- | --- |
| Landing Page | `docs/screenshots/landing.png` |
| Demo Mode / AI Command Center | `docs/screenshots/assistant.png` |
| Patient Dashboard | `docs/screenshots/dashboard.png` |
| Triage Result | `docs/screenshots/triage.png` |
| Hospital Recommendation | `docs/screenshots/hospitals.png` |
| Ambulance Tracking | `docs/screenshots/ambulance.png` |
| Blood Bank Finder | `docs/screenshots/blood-bank.png` |
| Medical Report AI | `docs/screenshots/medical-report.png` |
| Government Scheme Assistant | `docs/screenshots/schemes.png` |

## Tech Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui-style reusable components
- lucide-react icons

### Backend

- FastAPI
- Python
- Pydantic schemas
- Mock service layer

### Database

- PostgreSQL planned
- Mock data used for current MVP

### AI

- Gemini/OpenAI integration planned
- Rule-based mock AI service layer used for current MVP

## Folder Structure

```text
healthconnect-ai/
  ai/
    README.md                 AI integration placeholder

  backend/
    app/
      api/                    FastAPI route modules
      core/                   App configuration
      models/                 Domain model placeholder
      schemas/                Pydantic request/response schemas
      services/               Mock business logic and data services
      main.py                 FastAPI app entrypoint
    requirements.txt
    README.md

  database/
    README.md                 Database planning placeholder

  docs/
    README.md                 Documentation placeholder
    screenshots/              Screenshot placeholders

  frontend/
    app/                      Next.js App Router routes
      about/
      ambulance/
      assistant/
      blood-bank/
      contact/
      dashboard/
      hospitals/
      login/
      medical-report/
      register/
      schemes/
      triage/
      page.tsx
      layout.tsx
      loading.tsx
      not-found.tsx
      icon.svg
    components/
      ui/                     Reusable UI primitives
      brand-logo.tsx
      site-footer.tsx
    lib/                      Frontend utilities and API helpers
    package.json

  README.md
  CONTRIBUTING.md
  CHANGELOG.md
  LICENSE
  .env.example

  architecture/               Architecture diagrams and design notes
  screenshots/                Submission screenshots
  presentation/               Pitch deck and judging assets
  demo-video/                 Demo video assets or links
```

## API Endpoints

Base backend URL:

```text
http://localhost:8000
```

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/health` | Backend health check |
| POST | `/api/triage/analyze` | Analyze symptoms and return triage severity |
| GET | `/api/hospitals/recommend` | Recommend hospitals from mock data |
| GET | `/api/ambulances/available` | List available mock ambulances |
| POST | `/api/ambulances/book` | Book nearest available ambulance |
| GET | `/api/bloodbanks/search` | Search mock blood banks by blood group and city |
| POST | `/api/blood/request` | Create mock emergency blood request |
| POST | `/api/medical-report/analyze` | Analyze pasted medical report text using mock AI |
| POST | `/api/schemes/recommend` | Recommend mock government health schemes |
| POST | `/api/assistant/emergency-plan` | Generate a complete emergency action plan |

Interactive API documentation is available after starting the backend:

```text
http://localhost:8000/docs
```

## Installation

### Prerequisites

- Node.js 18 or later
- npm
- Python 3.12

### 1. Clone the Repository

```bash
git clone <repository-url>
cd healthconnect-ai
```

### 2. Configure Environment Variables

```bash
copy .env.example .env
```

On macOS or Linux:

```bash
cp .env.example .env
```

Important environment variables:

| Variable | Used by | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Frontend | Public URL of the FastAPI backend |
| `FRONTEND_ORIGIN` | Backend | Primary frontend origin allowed by CORS |
| `ALLOWED_ORIGINS` | Backend | Optional comma-separated CORS origins |
| `AI_PROVIDER` | Backend | Keep as `mock` for the MVP |
| `OPENAI_API_KEY` | Backend | Empty placeholder for future integration |
| `GEMINI_API_KEY` | Backend | Empty placeholder for future integration |
| `DATABASE_URL` | Backend | Placeholder for future PostgreSQL integration |

### 3. Install and Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:3000
```

### 4. Install and Run the Backend

Open a second terminal:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

On macOS or Linux, activate the virtual environment with:

```bash
source .venv/bin/activate
```

Backend URL:

```text
http://localhost:8000
```

## Validation

### Backend Smoke Tests

```bash
cd backend
.venv\Scripts\python.exe -m pip install -r requirements-dev.txt
.venv\Scripts\python.exe -m pytest -v
.venv\Scripts\python.exe -c "from app.main import app; print(app.title)"
```

### Frontend Checks

```bash
cd frontend
npm run lint
npx tsc --noEmit
npm run build
```

## Deployment Notes

Recommended simple hackathon deployment:

- Frontend: Vercel
- Backend: Render

Vercel configuration:

- Root directory: `frontend`
- Build command: `npm run build`
- Environment variable: `NEXT_PUBLIC_API_URL=https://<render-backend-url>`

Render configuration:

- Root directory: `backend`
- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Environment variables:
  - `APP_ENV=production`
  - `FRONTEND_ORIGIN=https://<vercel-frontend-url>`
  - `ALLOWED_ORIGINS=https://<vercel-frontend-url>`
  - `AI_PROVIDER=mock`
  - `DATABASE_URL=<safe-placeholder-or-managed-database-url>`
  - `OPENAI_API_KEY=`
  - `GEMINI_API_KEY=`

## Demo Flow

1. Open the landing page at `http://localhost:3000`.
2. Click `Demo Mode`.
3. Select one of the demo scenarios:
   - Heart Attack
   - Road Accident
   - Fever
4. Review the complete emergency action plan in the AI Command Center.
5. Open the dashboard from the navigation.
6. Explore individual modules:
   - Start Triage
   - Find Hospitals
   - Book Ambulance
   - Find Blood
   - Upload Report
   - Check Schemes
7. Use `http://localhost:8000/docs` to show the backend API during technical review.

## Future Scope

- Replace mock data with PostgreSQL-backed persistence.
- Add real authentication and role-based access control.
- Integrate Gemini/OpenAI for medical explanation and emergency planning.
- Add real-time ambulance tracking with maps.
- Integrate verified hospital bed availability APIs.
- Connect to real blood bank networks.
- Add multilingual patient support.
- Add audit logging and admin analytics.
- Add production deployment, monitoring, and security hardening.
- Add clinical safety review and medical compliance validation.

## Medical Disclaimer

HealthConnect AI is an assistive software prototype created for hackathon demonstration purposes only. It does not provide medical diagnosis, treatment, or professional medical advice. In a real emergency, users should contact local emergency services or a qualified healthcare professional immediately.

## Contributors

- Team Member 1 - Role
- Team Member 2 - Role
- Team Member 3 - Role
- Team Member 4 - Role

## License

This project is licensed under the MIT License. Replace this section with the final license file before public release if needed.
