# EcoPower Hub - AI Integration Backend

## 🤖 AI-Powered Renewable Energy Advisor

This backend implements the AI integration features for EcoPower Hub, providing personalized renewable energy advice, intelligent marketplace matching, and automated listing generation.

## 🚀 Features Implemented

### Core AI Features
- **AI Renewable Energy Advisor** - Personalized climate and energy recommendations
- **AI Smart Matchmaker** - Ranks nearby energy sellers based on distance, price, and source type
- **AI Energy Insights Dashboard** - Tracks carbon savings and predicts renewable energy performance
- **AI Listing Generator** - Auto-generates attractive surplus energy listings

### API Endpoints

#### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login and get JWT token
- `GET /api/v1/users/:id` - Get user profile
- `PUT /api/v1/users/:id` - Update user profile

#### AI Endpoints
- `POST /api/v1/ai/advice` - Get personalized renewable energy advice
- `POST /api/v1/ai/listing-helper` - Generate AI-powered listing content
- `GET /api/v1/ai/match` - Get AI-ranked nearby energy sellers
- `GET /api/v1/ai/interactions` - Get user's AI interaction history

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Environment Configuration
Create a `.env` file with the following variables:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/eco_hub_db
FLASK_ENV=development
FLASK_DEBUG=True
FLASK_SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here
OPENAI_API_KEY=your-openai-api-key-here
CARBON_INTERFACE_API_KEY=your-carbon-interface-api-key-here
```

### 3. Database Setup
```bash
# Initialize database tables
python init_db.py
```

### 4. Run the Application
```bash
python app.py
```

### 5. Test AI Endpoints
```bash
# Run comprehensive AI endpoint tests
python test_ai_endpoints.py
```

## 📊 Database Schema

### Models
- **User** - User authentication and profile management
- **Listing** - Energy marketplace listings with geolocation
- **AIInteraction** - Logs all AI queries and responses
- **Transaction** - Buyer-seller trade records (MVP+)

### Key Relationships
- User → AIInteraction (One-to-Many)
- User → Listing (One-to-Many)
- User → Transaction (Many-to-Many)

## 🔧 AI Service Architecture

### AIService Class
The `AIService` class handles all AI integrations:

```python
# Renewable energy advice
advice = ai_service.get_renewable_energy_advice(user_data)

# Generate listing content
listing_content = ai_service.generate_listing_content(listing_data)

# Rank nearby sellers
ranked_sellers = ai_service.rank_nearby_sellers(user_location, listings)
```

### AI Scoring Algorithm
The AI ranking system uses multiple factors:
- **Price Score** (40%) - Lower prices get higher scores
- **Availability Score** (30%) - More available energy gets higher scores
- **Energy Type Score** (30%) - Solar gets highest score, others get good scores

## 🔐 Security Features

- JWT-based authentication for all AI endpoints
- Password hashing with Flask-Bcrypt
- Input validation and sanitization
- Error handling without exposing sensitive information

## 📈 AI Integration Progress

### ✅ Completed
- [x] Database models (User, Listing, AIInteraction, Transaction)
- [x] AI service layer with OpenAI integration
- [x] Authentication endpoints with JWT
- [x] AI advice endpoint with carbon savings tracking
- [x] AI listing helper for content generation
- [x] AI match endpoint with intelligent ranking
- [x] User interaction history tracking
- [x] Database initialization and testing utilities

### 🔄 In Progress
- [ ] Carbon Interface API integration
- [ ] Comprehensive test suite
- [ ] API documentation with Swagger
- [ ] Performance optimization

### 📋 Next Steps
- [ ] Frontend integration
- [ ] Real-time features
- [ ] Advanced AI features
- [ ] Production deployment

## 🧪 Testing

### Manual Testing
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Register a user
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","role":"consumer"}'

# Get AI advice (requires JWT token)
curl -X POST http://localhost:5000/api/v1/ai/advice \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"location":"New York, NY","roof_size":"2000 sq ft","energy_usage":"1000 kWh/month"}'
```

### Automated Testing
```bash
python test_ai_endpoints.py
```

## 🔗 Integration Points

### Frontend Integration
The AI endpoints are designed to work seamlessly with the React frontend:
- JWT tokens for authentication
- JSON responses for easy parsing
- Error handling with user-friendly messages
- Pagination support for large datasets

### Team Collaboration
- **Member 1 (Lewis)** - Can use authentication endpoints
- **Member 3 (Grace)** - Can integrate with marketplace endpoints
- **All Members** - Can use AI endpoints for enhanced features

## 📚 API Documentation

### Request/Response Examples

#### AI Advice Request
```json
{
  "location": "New York, NY",
  "roof_size": "2000 sq ft",
  "energy_usage": "1000 kWh/month",
  "budget": "$15000"
}
```

#### AI Advice Response
```json
{
  "advice": "Based on your location and roof size, I recommend...",
  "carbon_savings_estimate": 500.0,
  "metadata": {
    "location": "New York, NY",
    "roof_size": "2000 sq ft"
  },
  "interaction_id": 123
}
```

## 🚨 Important Notes

1. **API Keys Required** - OpenAI and Carbon Interface API keys must be configured
2. **Database Setup** - PostgreSQL must be running and accessible
3. **JWT Tokens** - All AI endpoints require valid JWT authentication
4. **Error Handling** - Comprehensive error handling for production use
5. **Team Integration** - Designed to work with other team members' features

## 🎯 Next Actions

1. **Configure API Keys** - Add your OpenAI and Carbon Interface API keys
2. **Test Endpoints** - Run the test script to verify functionality
3. **Frontend Integration** - Connect with React frontend
4. **Team Collaboration** - Coordinate with other team members
5. **Deployment** - Prepare for production deployment

---

**Created by**: Nicholas Obonyo (AI Integration Team Member)  
**Project**: EcoPower Hub - AI Climate Action App  
**Timeline**: Week 2 of 3-week development cycle
