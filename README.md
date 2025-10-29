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

[Add author names and contact information here]

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- OpenAI for providing the GPT API for AI-powered features
- Flask and Next.js communities for excellent documentation and tools
- Contributors and testers who helped improve the platform
- Renewable energy communities for inspiration and feedback
