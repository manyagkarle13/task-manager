# Task Manager — Full Stack App

Django REST Framework backend + React (Vite) frontend.

## Stack
- **Backend**: Django 4.x + Django REST Framework + SQLite
- **Frontend**: React 18 + Vite + React Router + Axios

---

## Local Setup

### Backend

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
API runs at `http://127.0.0.1:8000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```
App runs at `http://localhost:3000`

> Set `VITE_API_URL` env variable to point to your backend URL for deployment.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /tasks/ | List all tasks |
| POST | /tasks/ | Create a task |
| PATCH | /tasks/:id/ | Update a task |
| DELETE | /tasks/:id/ | Delete a task |

## Task Model

| Field | Type |
|-------|------|
| id | Auto int |
| title | String (required) |
| completed | Boolean |
| is_daily | Boolean |
| due_date | Date (optional) |
| created_at | Timestamp |

---

## Deployment (Render)

### Backend
- Build command: `pip install -r requirements.txt && python manage.py collectstatic --no-input && python manage.py migrate`
- Start command: `gunicorn backend.wsgi:application`
- Add env var: `SECRET_KEY`, `DEBUG=False`

### Frontend
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Add env var: `VITE_API_URL=https://your-backend.onrender.com`

---

## Assumptions & Trade-offs
- SQLite used for simplicity (no extra DB setup needed)
- CORS is open (`CORS_ALLOW_ALL_ORIGINS=True`) — restrict in production
- `is_daily` tasks appear on all days; particular-day tasks are date-scoped
- No auth — single-user app as per assignment scope
