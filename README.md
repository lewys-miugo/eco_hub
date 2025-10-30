# Eco Hub

Eco Hub is an AI-powered renewable energy marketplace platform that connects energy consumers and suppliers. The platform provides personalized solar recommendations, facilitates peer-to-peer energy trading, and enables users to buy and sell surplus renewable energy within their communities.

## Introduction

Eco Hub (also known as EcoPower Hub) is a comprehensive renewable energy platform designed to democratize access to clean energy solutions. The platform combines artificial intelligence with a user-friendly marketplace to help users make informed decisions about renewable energy adoption, connect with local energy suppliers, and participate in sustainable energy trading.

Key capabilities include personalized AI-powered advice for solar installations, an interactive marketplace for buying and selling energy, dashboard analytics for tracking carbon savings, and intelligent matching algorithms that connect buyers with nearby suppliers.

## Features

### Core Functionality
- **User Authentication & Profiles**: Secure registration, login, and profile management with JWT-based authentication
- **AI-Powered Energy Advisor**: Personalized renewable energy recommendations based on location, roof size, and energy usage patterns
- **Energy Marketplace**: Create, browse, and manage energy listings with support for multiple energy types (Solar, Wind, Hydro, Biomass, Geothermal)
- **Smart Matchmaker**: AI-powered algorithm that ranks nearby energy suppliers by distance, price, and energy type
- **Transaction Management**: Complete purchase workflow for buying energy from marketplace listings
- **Dashboard Analytics**: Track carbon savings, energy consumption, and environmental impact metrics
- **Listing Generator**: AI-assisted content generation for creating attractive energy listings

### Additional Features
- Interactive map interface for visualizing energy listings by location
- Role-based user system (consumers and suppliers)
- Real-time dashboard metrics and performance predictions
- Energy type filtering and search capabilities
- Carbon savings estimation and tracking

## Technology Stack

### Backend
- **Framework**: Flask (Python)
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: Flask-JWT-Extended
- **AI Integration**: OpenAI API (GPT-3.5-turbo)
- **API Architecture**: RESTful API with Flask blueprints
- **Security**: Bcrypt for password hashing, JWT token blacklisting
- **Additional Libraries**: Flask-CORS, Flask-Migrate, python-dotenv

### Frontend
- **Framework**: Next.js 14 (React)
- **Styling**: Tailwind CSS 4
- **Language**: JavaScript/JSX
- **Features**: Server-side rendering, client-side routing, responsive design

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Python**: 3.8 or higher
- **Node.js**: 18 or higher
- **npm**: Comes with Node.js
- **PostgreSQL**: 12 or higher
- **Git**: For version control

### Verify Prerequisites

```bash
python --version
node --version
npm --version
psql --version
```

## Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd eco_hub
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Linux/macOS:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with your configuration
cp .env.example .env
# Edit .env with your database credentials and API keys

# Initialize database
python init_db.py

# Run database migrations (if needed)
python migrate.py
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
```

### 4. Environment Configuration

Create a `.env` file in the `backend` directory with the following variables:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/eco_hub_db
FLASK_ENV=development
FLASK_DEBUG=True
FLASK_SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here
OPENAI_API_KEY=your-openai-api-key-here
CARBON_INTERFACE_API_KEY=your-carbon-interface-api-key-here
```

### 5. Database Setup

Ensure PostgreSQL is running:

```bash
# Start PostgreSQL service (Linux)
sudo systemctl start postgresql

# Or using service command
sudo service postgresql start
```

### 6. Running the Application

#### Start Backend Server

```bash
cd backend
source venv/bin/activate  # Activate virtual environment if not already active
python app.py
```

The backend server will run on `http://localhost:5000`

#### Start Frontend Server

Open a new terminal:

```bash
cd frontend
npm run dev
```

The frontend application will run on `http://localhost:3000`

### 7. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## Deployment

### Production URLs

The application is deployed on Render:

- **Live Website**: [https://eco-hub-trvd.onrender.com/](https://eco-hub-trvd.onrender.com/)
- **Backend API**: https://eco-hub-backend.onrender.com/

### Health Check Endpoints

Backend health check endpoints:

- **Health Check**: [https://eco-hub-backend.onrender.com/api/hello](https://eco-hub-backend.onrender.com/api/hello)
- **API Health**: [https://eco-hub-backend.onrender.com/api/health](https://eco-hub-backend.onrender.com/api/health)

### Environment Variables

#### Frontend (.env.local or Render Environment Variables)

Set the following in your frontend deployment:

```env
NEXT_PUBLIC_API_URL=https://eco-hub-backend.onrender.com/api
```

Or for local development:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### Backend Environment Variables (Render)

Set these in your Render backend service:

```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET_KEY=your_jwt_secret_key_here
FLASK_SECRET_KEY=your_flask_secret_key_here
OPENAI_API_KEY=your_openai_api_key (optional)
CARBON_INTERFACE_API_KEY=your_carbon_interface_key (optional)
PORT=10000 (Render sets this automatically)
```

### CORS Configuration

The backend CORS is configured to allow requests from:
- `http://localhost:3000` (local development)
- `http://127.0.0.1:3000` (local development)
- `https://eco-hub-trvd.onrender.com` (production frontend)

### Backend Deployment (Render)

#### Build Command
```bash
cd backend && pip install -r requirements.txt
```

#### Start Command
```bash
cd backend && gunicorn --bind 0.0.0.0:$PORT app:app
```

#### Requirements
- Python 3.x
- PostgreSQL database
- All packages from `requirements.txt`

### Frontend Deployment (Render)

#### Build Command
```bash
cd frontend && npm install && npm run build
```

#### Start Command
```bash
cd frontend && npm start
```

#### Environment Variable
- Set `NEXT_PUBLIC_API_URL=https://eco-hub-backend.onrender.com/api` in Render environment variables

### Database Setup on Render

1. Create a PostgreSQL database on Render
2. Set the `DATABASE_URL` environment variable in your backend service
3. Run the schema setup:

```bash
psql $DATABASE_URL -f backend/database/schema.sql
```

Or use the setup script:
```bash
cd backend && python setup_database.py
```

### API Endpoints

All API endpoints are prefixed with `/api`:

- `https://eco-hub-backend.onrender.com/api/auth/login`
- `https://eco-hub-backend.onrender.com/api/auth/register`
- `https://eco-hub-backend.onrender.com/api/listings/`
- `https://eco-hub-backend.onrender.com/api/dashboard/`
- `https://eco-hub-backend.onrender.com/api/ai/chat`

### Troubleshooting

#### CORS Errors
If you see CORS errors, ensure:
1. Frontend URL is added to backend CORS origins
2. Backend is deployed and accessible
3. API URLs are correctly configured

#### Database Connection Issues
- Verify `DATABASE_URL` is set correctly
- Ensure PostgreSQL service is running
- Check database credentials

#### Image Loading Issues
- Images are stored as base64 data URLs in the database
- Ensure `image_url` column exists in `energy_listings` table

## Project Structure

```
eco_hub/
├── backend/
│   ├── api/                    # API blueprints
│   │   ├── ai.py               # AI service endpoints
│   │   ├── dashboard.py        # Dashboard metrics
│   │   ├── listings.py         # Energy listings CRUD
│   │   ├── profile.py          # User profile management
│   │   └── transactions.py     # Purchase transactions
│   ├── database/               # Database configuration
│   │   ├── config.py           # Database connection
│   │   └── schema.sql          # Database schema
│   ├── ai_service.py           # AI integration service
│   ├── app.py                  # Flask application entry point
│   ├── models.py               # SQLAlchemy models
│   ├── requirements.txt        # Python dependencies
│   ├── init_db.py              # Database initialization
│   └── migrate.py              # Database migrations
│
├── frontend/
│   ├── app/                    # Next.js app directory
│   │   ├── advisor/            # AI advisor page
│   │   ├── auth/               # Authentication pages
│   │   ├── dashboard/          # User dashboard
│   │   ├── marketplace/        # Energy marketplace
│   │   ├── profile/             # User profile page
│   │   └── suppliers/           # Supplier management
│   ├── components/             # React components
│   │   ├── Authentication/     # Auth components
│   │   ├── AIAdvisorContent.jsx
│   │   ├── EnergyInsightContent.jsx
│   │   ├── ListGeneratorContent.jsx
│   │   └── SmartMatchmakerContent.jsx
│   ├── lib/                    # Utility libraries
│   │   └── api.js              # API client functions
│   ├── public/                 # Static assets
│   ├── package.json            # Node.js dependencies
│   └── tailwind.config.js      # Tailwind configuration
│
└── README.md                   # This file
```

## Authors

This project was developed by:

- **Grace Eileen** - [@Grace-Eileen7](https://github.com/Grace-Eileen7)
- **Nicholas Obonyo** - [@duffymelancholic](https://github.com/duffymelancholic)
- **Lewis Wambugu** - [@lewys-miugo](https://github.com/lewys-miugo)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- OpenAI for providing the GPT API for AI-powered features
- Flask and Next.js communities for excellent documentation and tools
- Contributors and testers who helped improve the platform
- Renewable energy communities for inspiration and feedback
