# Task Manager — Full Stack Web Application

A full-stack Task Manager application built using **Django REST Framework** for the backend and **React (Vite)** for the frontend.
The application allows users to create, update, and delete tasks with support for daily and date-specific scheduling.

This project demonstrates full-stack development, REST API integration, and cloud deployment.

---

# Live Demo

Frontend (User Interface):
https://zippy-conkies-22815a.netlify.app/

Backend API:
https://task-manager-7yvm.onrender.com/

---

# Tech Stack

Frontend

* React 18
* Vite
* React Router
* Axios
* CSS

Backend

* Django 4.x
* Django REST Framework
* SQLite

Deployment

* Backend hosted on Render
* Frontend hosted on Netlify

---

# Features

* Create tasks
* Update task status
* Delete tasks
* Support for daily tasks
* Support for particular-day tasks
* Calendar-based task management
* REST API integration
* Full-stack deployment
* Responsive user interface

---

# Project Structure

task-manager
│
├── backend
│   ├── manage.py
│   ├── requirements.txt
│   └── tasks app
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
└── README.md

---

# Local Setup

## Backend Setup

cd backend

Install dependencies:

pip install -r requirements.txt

Run database migrations:

python manage.py migrate

Start the backend server:

python manage.py runserver

Backend runs at:

http://127.0.0.1:8000

---

## Frontend Setup

cd frontend

Install dependencies:

npm install

Start development server:

npm run dev

Frontend runs at:

http://localhost:5173

---

# Environment Variables

## Frontend (.env file inside frontend folder)

Create a file named:

.env

Add:

VITE_API_URL=http://127.0.0.1:8000

For production:

VITE_API_URL=https://task-manager-7yym.onrender.com

---

# API Endpoints

GET /tasks/
Returns list of all tasks

POST /tasks/
Creates a new task

PATCH /tasks/:id/
Updates an existing task

DELETE /tasks/:id/
Deletes a task

---

# Task Model

Field | Type | Description
id | Integer | Auto-generated primary key
title | String | Task title (required)
completed | Boolean | Task completion status
is_daily | Boolean | Indicates daily recurring task
due_date | Date | Optional date for task
created_at | Timestamp | Task creation time

---

# Deployment

## Backend Deployment (Render)

Build command:

pip install -r requirements.txt && python manage.py collectstatic --no-input && python manage.py migrate

Start command:

gunicorn backend.wsgi:application

Environment variables:

SECRET_KEY=your-secret-key
DEBUG=False

Live backend URL:

https://task-manager-7yym.onrender.com

---

## Frontend Deployment (Netlify)

Build command:

npm install && npm run build

Publish directory:

dist

Environment variable:

VITE_API_URL=https://task-manager-7yym.onrender.com

Live frontend URL:

https://frabjous-torrone-7c13f0.netlify.app

---

# Assumptions and Trade-offs

SQLite database is used for simplicity and quick setup.
On free hosting plans, data may reset if the service restarts.
For production-scale systems, PostgreSQL is recommended.

CORS is currently open:

CORS_ALLOW_ALL_ORIGINS=True

In production, this should be restricted to specific domains.

Authentication is not implemented because the application is designed as a single-user task manager according to assignment scope.

Daily tasks appear on all days.
Particular-day tasks are shown only on their assigned date.

---

# Future Improvements

User authentication (login and signup)
Task categories and priorities
Reminder notifications
Dark mode support
PostgreSQL database integration
Docker containerization

---

# Author

Manya G Karle

Computer Science Engineering Student
Full Stack Developer

GitHub Repository:
https://github.com/manyagkarle13/task-manager

---
