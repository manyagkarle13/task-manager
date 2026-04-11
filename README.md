# Task Manager — Full Stack Web Application

A full-stack Task Manager built with **Django REST Framework** (backend) and **React + Vite** (frontend). Supports daily and date-specific task scheduling with a clean calendar-based UI.

---

## 🔗 Live Demo

| | Link |
|---|---|
| 🌐 **Frontend** | [https://zippy-conkies-22815a.netlify.app](https://zippy-conkies-22815a.netlify.app) |
| ⚙️ **Backend API** | [https://task-manager-7yvm.onrender.com](https://task-manager-7yvm.onrender.com) |

---

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- React Router DOM
- Axios
- Plain CSS (inline styles)

### Backend
- Python / Django 4.x
- Django REST Framework
- SQLite
- Whitenoise (static files)
- Gunicorn

### Deployment
- **Backend** → Render (free tier)
- **Frontend** → Netlify (free tier)

---

## ✨ Features

- ✅ Create, update, and delete tasks
- 📅 Calendar view — click any date to see tasks for that day
- 🔁 Daily tasks — appear on every day
- 📌 Particular-day tasks — scoped to a specific date
- 🔘 Mark tasks as complete / incomplete
- 🔍 Filter tasks — All / Completed / Incomplete
- 📊 Task stats — total, done, for selected day
- 🌐 Full REST API integration
- 📱 Responsive UI

---

## 📁 Project Structure

```
task-manager/
├── backend/                  # Django backend
│   ├── backend/              # Project settings, urls, wsgi
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── tasks/                # Tasks app
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── manage.py
│   ├── requirements.txt
│   ├── Procfile
│   └── build.sh
│
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Calendar.jsx
│   │   │   └── TaskPanel.jsx
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   │   └── _redirects        # Netlify routing fix
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Local Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- Git

---

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend runs at → `http://127.0.0.1:8000`

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at → `http://localhost:3000`

---

### Environment Variables

Create a `.env` file inside the `frontend/` folder:

```env
VITE_API_URL=http://127.0.0.1:8000
```

For production, set:

```env
VITE_API_URL=https://task-manager-7yvm.onrender.com
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tasks/` | Return all tasks |
| `POST` | `/tasks/` | Create a new task |
| `PATCH` | `/tasks/:id/` | Update a task |
| `DELETE` | `/tasks/:id/` | Delete a task |

---

## 🗄️ Task Data Model

| Field | Type | Description |
|-------|------|-------------|
| `id` | Integer | Auto-generated primary key |
| `title` | String | Task title (required) |
| `completed` | Boolean | Completion status |
| `is_daily` | Boolean | Recurring daily task |
| `due_date` | Date | Optional date for task |
| `created_at` | Timestamp | Auto-set on creation |

---

## 🚀 Deployment

### Backend — Render

| Setting | Value |
|---------|-------|
| Root Directory | `backend` |
| Build Command | `bash build.sh` |
| Start Command | `gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT` |
| Environment: `SECRET_KEY` | your-secret-key |
| Environment: `DEBUG` | `False` |

---

### Frontend — Netlify

| Setting | Value |
|---------|-------|
| Base Directory | `frontend` |
| Build Command | `npm run build` |
| Publish Directory | `frontend/dist` |
| Environment: `VITE_API_URL` | `https://task-manager-7yvm.onrender.com` |

---

## 📝 Assumptions & Trade-offs

- **SQLite** is used for simplicity. Data may reset on Render free tier restarts. PostgreSQL is recommended for production.
- **CORS** is currently open (`CORS_ALLOW_ALL_ORIGINS = True`). Should be restricted to specific domains in production.
- **No authentication** — designed as a single-user task manager per assignment scope.
- **Daily tasks** appear on all calendar days. **Particular-day tasks** show only on their assigned date.

---

## 🔮 Future Improvements

- User authentication (login / signup)
- Task categories and priorities
- Push notification reminders
- Dark mode
- PostgreSQL database
- Docker containerization

---

## 👩‍💻 Author

**Manya G Karle**  

---

*Built as part of a Full Stack Developer technical assignment.*
