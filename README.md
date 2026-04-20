# TinyGood 🌱

A full-stack web app that generates one AI-powered kind act per day. Users can mark acts as complete, track their streak, and view their history.

## Tech Stack

**Backend:** Django, Django REST Framework, PostgreSQL, JWT Authentication, Anthropic API  
**Frontend:** React, React Router

## Features

- Custom user authentication with bcrypt password hashing
- AI-generated daily kind act via Anthropic Claude
- JWT-based authentication
- Streak tracking
- Completion history

## Setup

### Backend
```bash
git clone https://github.com/Astrophel66/TinyGood
cd TinyGood
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create `.env` file:
```
SECRET_KEY=your-secret-key
DB_NAME=tinygood
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_HOST=localhost
DB_PORT=5432
ANTHROPIC_API_KEY=your-api-key
```

```bash
python manage.py migrate
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register/ | Register new user |
| POST | /api/auth/login/ | Login and get JWT tokens |
| GET | /api/auth/profile/ | Get user profile |
| GET | /api/acts/today/ | Get today's kind act |
| POST | /api/completion/complete/ | Mark act as complete |
| GET | /api/completion/history/ | Get completion history |
| GET | /api/completion/streak/ | Get current streak |
