# Eco Hub Application



## Quick Start

### Prerequisites
- Python 3.8+
- Node.js 18+
- PostgreSQL 12+

### Verify Prerequisites
```bash
# Check Python version
python --version

# Check Node.js version
node --version
npm --version

# Check PostgreSQL version
psql --version
```


### Installation

1. **Backend Setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
python migrate.py
cp .env.example .env
# Edit .env with your database credentials
```

2. **Frontend Setup**
```bash
cd frontend
npm install
```

3. **Start Services**

Terminal 1:
```bash
cd backend
source venv/bin/activate
python app.py
```

Terminal 2:
```bash
cd frontend
npm run dev
```

4. **Open Browser**
```
http://localhost:3000
```

##  API Endpoints

### GET /api/hello
Returns hello world message with database status

**Response:**
```json
{
  "message": "Hello from Flask!",
  "database": "Connected",
  "timestamp": "2024-10-21 12:34:56.789012",
  "status": "success"
}
```

### GET /api/health
Health check endpoint

**Response:**
```json
{
  "status": "healthy"
}
```

## Connecting to DB

### Start PostgresSQL
Start postgres instance by running:
```bash
sudo systemctl start postgresql
```
