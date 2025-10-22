import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv
from models import User, Listing, AIInteraction, Transaction, db
from ai_service import AIService
from config import config

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configuration
config_name = os.getenv('FLASK_ENV', 'development')
app.config.from_object(config[config_name])

# Initialize extensions
CORS(app)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
db.init_app(app)

# Initialize AI service
ai_service = AIService()

def get_db_connection():
    """Create a database connection"""
    try:
        conn = psycopg2.connect(DATABASE_URL)
        return conn
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

@app.route('/api/hello', methods=['GET'])
def hello_world():
    """Hello world endpoint"""
    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({
                'message': 'Hello from Flask!',
                'database': 'Not connected',
                'status': 'warning'
            }), 200
        
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute('SELECT NOW() as current_time;')
        result = cur.fetchone()
        cur.close()
        conn.close()
        
        return jsonify({
            'message': 'Hello from Flask!',
            'database': 'Connected',
            'timestamp': str(result['current_time']),
            'status': 'success'
        }), 200
    except Exception as e:
        return jsonify({
            'message': 'Hello from Flask!',
            'error': str(e),
            'status': 'error'
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy'}), 200

# ==================== AUTHENTICATION ENDPOINTS ====================

@app.route('/api/v1/auth/register', methods=['POST'])
def register():
    """Register a new user"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'password', 'role']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Check if user already exists
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'User already exists'}), 400
        
        # Create new user
        user = User(
            name=data['name'],
            email=data['email'],
            role=data['role'],
            latitude=data.get('latitude'),
            longitude=data.get('longitude')
        )
        user.set_password(data['password'])
        
        db.session.add(user)
        db.session.commit()
        
        # Create access token
        access_token = create_access_token(identity=user.id)
        
        return jsonify({
            'message': 'User created successfully',
            'user': user.to_dict(),
            'access_token': access_token
        }), 201
        
    except Exception as e:
        return jsonify({'error': f'Registration error: {str(e)}'}), 500

@app.route('/api/v1/auth/login', methods=['POST'])
def login():
    """Login user and return JWT token"""
    try:
        data = request.get_json()
        
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email and password required'}), 400
        
        # Find user
        user = User.query.filter_by(email=data['email']).first()
        
        if not user or not user.check_password(data['password']):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Create access token
        access_token = create_access_token(identity=user.id)
        
        return jsonify({
            'message': 'Login successful',
            'user': user.to_dict(),
            'access_token': access_token
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Login error: {str(e)}'}), 500

@app.route('/api/v1/users/<int:user_id>', methods=['GET', 'PUT'])
@jwt_required()
def user_profile(user_id):
    """Get or update user profile"""
    try:
        current_user_id = get_jwt_identity()
        
        # Users can only access their own profile
        if current_user_id != user_id:
            return jsonify({'error': 'Access denied'}), 403
        
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        if request.method == 'GET':
            return jsonify({'user': user.to_dict()}), 200
        
        elif request.method == 'PUT':
            data = request.get_json()
            
            # Update allowed fields
            if 'name' in data:
                user.name = data['name']
            if 'latitude' in data:
                user.latitude = data['latitude']
            if 'longitude' in data:
                user.longitude = data['longitude']
            
            db.session.commit()
            
            return jsonify({
                'message': 'Profile updated successfully',
                'user': user.to_dict()
            }), 200
            
    except Exception as e:
        return jsonify({'error': f'Profile error: {str(e)}'}), 500

# ==================== AI ENDPOINTS ====================

@app.route('/api/v1/ai/advice', methods=['POST'])
@jwt_required()
def get_ai_advice():
    """Get AI-powered renewable energy advice"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['location', 'roof_size', 'energy_usage']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Get AI advice
        ai_response = ai_service.get_renewable_energy_advice(data)
        
        # Save interaction to database
        interaction = AIInteraction(
            user_id=user_id,
            interaction_type='advice',
            prompt=str(data),
            response=ai_response.get('advice', ''),
            carbon_savings_estimate=ai_response.get('carbon_savings_estimate', 0),
            metadata=ai_response.get('metadata', {})
        )
        
        db.session.add(interaction)
        db.session.commit()
        
        return jsonify({
            'advice': ai_response.get('advice'),
            'carbon_savings_estimate': ai_response.get('carbon_savings_estimate'),
            'metadata': ai_response.get('metadata'),
            'interaction_id': interaction.id
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'AI advice error: {str(e)}'}), 500

@app.route('/api/v1/ai/listing-helper', methods=['POST'])
@jwt_required()
def generate_listing_content():
    """Generate AI-powered listing content"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['energy_type', 'price_per_kwh', 'available_kwh', 'latitude', 'longitude']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Generate listing content
        ai_response = ai_service.generate_listing_content(data)
        
        # Save interaction to database
        interaction = AIInteraction(
            user_id=user_id,
            interaction_type='listing_helper',
            prompt=str(data),
            response=str(ai_response),
            metadata=data
        )
        
        db.session.add(interaction)
        db.session.commit()
        
        return jsonify({
            'title': ai_response.get('title'),
            'description': ai_response.get('description'),
            'suggested_price': ai_response.get('suggested_price'),
            'interaction_id': interaction.id
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Listing helper error: {str(e)}'}), 500

@app.route('/api/v1/ai/match', methods=['GET'])
@jwt_required()
def get_ai_ranked_sellers():
    """Get AI-ranked list of nearby energy sellers"""
    try:
        user_id = get_jwt_identity()
        
        # Get user location
        user = User.query.get(user_id)
        if not user or not user.latitude or not user.longitude:
            return jsonify({'error': 'User location not set'}), 400
        
        user_location = (user.latitude, user.longitude)
        
        # Get query parameters
        energy_type = request.args.get('energy_type')
        max_distance = float(request.args.get('max_distance', 50))  # km
        limit = int(request.args.get('limit', 20))
        
        # Build query
        query = Listing.query.filter_by(is_active=True)
        if energy_type:
            query = query.filter_by(energy_type=energy_type)
        
        listings = query.all()
        
        # Convert to dictionaries
        listings_data = [listing.to_dict() for listing in listings]
        
        # Get AI-ranked results
        ranked_listings = ai_service.rank_nearby_sellers(user_location, listings_data)
        
        # Filter by distance and limit results
        filtered_listings = [
            listing for listing in ranked_listings 
            if listing['distance_km'] <= max_distance
        ][:limit]
        
        # Save interaction to database
        interaction = AIInteraction(
            user_id=user_id,
            interaction_type='match',
            prompt=f"energy_type={energy_type}, max_distance={max_distance}",
            response=f"Found {len(filtered_listings)} ranked listings",
            metadata={
                'energy_type': energy_type,
                'max_distance': max_distance,
                'results_count': len(filtered_listings)
            }
        )
        
        db.session.add(interaction)
        db.session.commit()
        
        return jsonify({
            'listings': filtered_listings,
            'total_found': len(filtered_listings),
            'user_location': user_location,
            'interaction_id': interaction.id
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'AI matching error: {str(e)}'}), 500

@app.route('/api/v1/ai/interactions', methods=['GET'])
@jwt_required()
def get_user_ai_interactions():
    """Get user's AI interaction history"""
    try:
        user_id = get_jwt_identity()
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 10))
        
        interactions = AIInteraction.query.filter_by(user_id=user_id)\
            .order_by(AIInteraction.created_at.desc())\
            .paginate(page=page, per_page=per_page, error_out=False)
        
        return jsonify({
            'interactions': [interaction.to_dict() for interaction in interactions.items],
            'total': interactions.total,
            'pages': interactions.pages,
            'current_page': page
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Error fetching interactions: {str(e)}'}), 500

# ==================== DATABASE INITIALIZATION ====================

@app.before_first_request
def create_tables():
    """Create database tables"""
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
