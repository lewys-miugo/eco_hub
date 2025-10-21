# Eco Hub - Hello World Application Setup Guide

A full-stack hello world application built with **Flask**, **PostgreSQL**, **Next.js**, and **Tailwind CSS**.

## 📋 Table of Contents

1. [Project Structure](#project-structure)
2. [Prerequisites](#prerequisites)
3. [Installation Steps](#installation-steps)
4. [Running the Application](#running-the-application)
5. [Project Architecture](#project-architecture)
6. [API Endpoints](#api-endpoints)
7. [Troubleshooting](#troubleshooting)

---

## 📁 Project Structure

```
eco_hub/
├── backend/                 # Flask backend
│   ├── app.py              # Main Flask application
│   ├── requirements.txt     # Python dependencies
│   └── .env.example         # Environment variables template
│
├── frontend/               # Next.js frontend
│   ├── app/
│   │   ├── page.tsx        # Main page component
│   │   ├── layout.tsx      # Root layout
│   │   └── globals.css     # Global styles
│   ├── package.json        # Node dependencies
│   ├── tailwind.config.ts  # Tailwind configuration
│   └── tsconfig.json       # TypeScript configuration
│
└── SETUP_GUIDE.md          # This file
```

---

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- **Python 3.8+** - [Download](https://www.python.org/downloads/)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **PostgreSQL 12+** - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)

### Verify Installation
```bash
# Check Python version
python --version

# Check Node.js version
node --version
npm --version

# Check PostgreSQL version
psql --version
```

---

## 📦 Installation Steps

### Step 1: Clone or Navigate to Project

```bash
cd eco_hub
```

### Step 2: Set Up PostgreSQL Database

```bash
# Start PostgreSQL service (if not already running)
# On macOS with Homebrew:
brew services start postgresql

# On Linux:
sudo systemctl start postgresql

# On Windows:
# PostgreSQL should start automatically

# Create a new database
psql -U postgres -c "CREATE DATABASE eco_hub;"

# Verify the database was created
psql -U postgres -l | grep eco_hub
```

### Step 3: Set Up Backend (Flask)

```bash
# Navigate to backend directory
cd backend

# Create a Python virtual environment
python -m venv venv

# Activate the virtual environment
# On macOS/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Create .env file from template
cp .env.example .env

# Edit .env file with your database credentials
# DATABASE_URL=postgresql://postgres:your_password@localhost:5432/eco_hub
```

### Step 4: Set Up Frontend (Next.js)

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install Node dependencies
npm install

# Verify installation
npm list
```

---

## 🚀 Running the Application

### Terminal 1: Start Flask Backend

```bash
cd backend

# Activate virtual environment (if not already active)
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate     # Windows

# Run Flask application
python app.py
```

Expected output:
```
 * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://0.0.0.0:5000
```

### Terminal 2: Start Next.js Frontend

```bash
cd frontend

# Start development server
npm run dev
```

Expected output:
```
  ▲ Next.js 15.x.x
  - Local:        http://localhost:3000
  - Environments: .env.local
```

### Step 3: Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

You should see the Eco Hub hello world page with:
- ✅ Message from Flask backend
- ✅ Database connection status
- ✅ Server timestamp
- ✅ Application status

---

## 🏗️ Project Architecture

### Backend Architecture (Flask)

```
Flask Application
├── CORS Enabled (allows requests from frontend)
├── Database Connection (PostgreSQL)
└── API Endpoints
    ├── GET /api/hello (main endpoint)
    └── GET /api/health (health check)
```

### Frontend Architecture (Next.js)

```
Next.js Application
├── App Router (app directory)
├── Client Component (page.tsx)
├── API Integration (fetch from Flask)
├── Tailwind CSS Styling
└── Dark Mode Support
```

### Data Flow

```
User Browser
    ↓
Next.js Frontend (Port 3000)
    ↓
Fetch Request to Flask API
    ↓
Flask Backend (Port 5000)
    ↓
PostgreSQL Database
    ↓
Response with Data
    ↓
Display in UI
```

---

## 📡 API Endpoints

### 1. Hello World Endpoint

**Endpoint:** `GET /api/hello`

**Description:** Returns a hello world message with database status

**Request:**
```bash
curl http://localhost:5000/api/hello
```

**Response (with database):**
```json
{
  "message": "Hello from Flask!",
  "database": "Connected",
  "timestamp": "2024-10-21 12:34:56.789012",
  "status": "success"
}
```

**Response (without database):**
```json
{
  "message": "Hello from Flask!",
  "database": "Not connected",
  "status": "warning"
}
```

### 2. Health Check Endpoint

**Endpoint:** `GET /api/health`

**Description:** Simple health check endpoint

**Request:**
```bash
curl http://localhost:5000/api/health
```

**Response:**
```json
{
  "status": "healthy"
}
```

---

## 🔍 Troubleshooting

### Issue: "Connection refused" when accessing frontend

**Solution:**
- Ensure Flask backend is running on port 5000
- Check if port 5000 is not blocked by firewall
- Verify Flask is listening on `0.0.0.0:5000`

### Issue: "Failed to fetch data" error on frontend

**Solution:**
- Check Flask backend is running
- Verify CORS is enabled in Flask (it is by default)
- Check browser console for specific error messages
- Ensure both services are running on correct ports

### Issue: PostgreSQL connection error

**Solution:**
```bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT 1;"

# Verify database exists
psql -U postgres -l | grep eco_hub

# Check DATABASE_URL in .env file
cat backend/.env
```

### Issue: Port already in use

**Solution:**
```bash
# Find process using port 5000 (Flask)
lsof -i :5000

# Find process using port 3000 (Next.js)
lsof -i :3000

# Kill process (replace PID with actual process ID)
kill -9 <PID>
```

### Issue: Module not found errors

**Solution:**
```bash
# For Python
cd backend
pip install -r requirements.txt

# For Node.js
cd frontend
npm install
```

---

## 📝 Environment Variables

### Backend (.env)

```env
# Database connection string
DATABASE_URL=postgresql://postgres:password@localhost:5432/eco_hub

# Flask configuration
FLASK_ENV=development
FLASK_DEBUG=True
```

### Frontend

No environment variables needed for basic setup. The frontend connects to `http://localhost:5000` by default.

---

## 🛠️ Development Commands

### Backend

```bash
# Run Flask app
python app.py

# Run with specific port
python app.py --port 5001

# Run tests (if added)
pytest
```

### Frontend

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run type checking
npm run type-check
```

---

## 📚 Technology Stack Details

### Backend
- **Flask 2.3.3** - Lightweight Python web framework
- **Flask-CORS 4.0.0** - Cross-Origin Resource Sharing support
- **psycopg2-binary 2.9.7** - PostgreSQL adapter for Python
- **python-dotenv 1.0.0** - Environment variable management

### Frontend
- **Next.js 15.x** - React framework with server-side rendering
- **React 19.x** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 3.x** - Utility-first CSS framework

### Database
- **PostgreSQL 12+** - Relational database

---

## 🎯 Next Steps

After successfully running the application, you can:

1. **Add More Endpoints** - Extend the Flask API with more functionality
2. **Add Database Models** - Use SQLAlchemy for ORM
3. **Add Authentication** - Implement user login/registration
4. **Add Tests** - Write unit and integration tests
5. **Deploy** - Deploy to production (Vercel for frontend, Heroku/AWS for backend)

---

## 📞 Support

For issues or questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review the official documentation:
   - [Flask Documentation](https://flask.palletsprojects.com/)
   - [Next.js Documentation](https://nextjs.org/docs)
   - [PostgreSQL Documentation](https://www.postgresql.org/docs/)
   - [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## 📄 License

This project is open source and available under the MIT License.

---

**Happy coding! 🚀**

