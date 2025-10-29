import os
from flask import Flask, jsonify, request, send_from_directory
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
from dotenv import load_dotenv
import psycopg2
from psycopg2.extras import RealDictCursor


# Import the shared db instance and User model
from models import db, User

# Import API blueprints
from api.listings import listings_bp
from api.dashboard import dashboard_bp
from api.ai import ai_bp
from api.transactions import transactions_bp

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL") 

app = Flask(__name__)

# CORS configuration
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000", "http://127.0.0.1:3000"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

# Configuration
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-secret-key')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://lewys:43214321@localhost:5432/eco_hub_db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions with the app
db.init_app(app)
with app.app_context():
    db.create_all()
    
jwt = JWTManager(app)
migrate = Migrate(app, db)

# JWT token blacklist (for logout)
blacklisted_tokens = set()

@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload):
    """Check if token is blacklisted"""
    return jwt_payload['jti'] in blacklisted_tokens

@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    """Handle expired token"""
    return jsonify({
        'status': 'error',
        'message': 'Token has expired. Please log in again.'
    }), 401

@jwt.invalid_token_loader
def invalid_token_callback(error):
    """Handle invalid token"""
    import logging
    logger = logging.getLogger(__name__)
    logger.warning(f"Invalid token error: {error}")
    return jsonify({
        'status': 'error',
        'message': 'Invalid token. Please log in again.',
        'error': str(error)
    }), 422

@jwt.unauthorized_loader
def missing_token_callback(error):
    """Handle missing token"""
    return jsonify({
        'status': 'error',
        'message': 'Authorization token is missing. Please log in.',
        'error': str(error)
    }), 401

# Register blueprints
app.register_blueprint(listings_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(ai_bp)
app.register_blueprint(transactions_bp)

# Serve uploaded files
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')

@app.route('/uploads/listings/<path:filename>')
def serve_listing_image(filename):
    """Serve uploaded listing images from the uploads/listings directory"""
    try:
        listings_folder = os.path.join(UPLOAD_FOLDER, 'listings')
        return send_from_directory(listings_folder, filename)
    except FileNotFoundError:
        return jsonify({'error': 'File not found'}), 404

# Authentication Routes
@app.route('/api/auth/register', methods=['POST'])
def register():
    """User registration endpoint"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['firstName', 'lastName', 'email', 'password', 'role']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Check if user already exists
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'User with this email already exists'}), 400
        
        # Create new user
        # Combine first_name and last_name for the name field (required by database)
        full_name = f"{data['firstName']} {data['lastName']}".strip()
        user = User(
            first_name=data['firstName'],
            last_name=data['lastName'],
            name=full_name,  # Set name from first_name + last_name
            email=data['email'],
            role=data['role'],
            location=data.get('location', '')
        )
        user.set_password(data['password'])
        
        db.session.add(user)
        db.session.commit()
        
        # Generate token
        access_token = user.generate_token()
        
        return jsonify({
            'message': 'User registered successfully',
            'access_token': access_token,
            'user': user.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    """User login endpoint"""
    try:
        data = request.get_json()
        
        if not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email and password are required'}), 400
        
        user = User.query.filter_by(email=data['email']).first()
        
        if user and user.check_password(data['password']):
            access_token = user.generate_token()
            return jsonify({
                'message': 'Login successful',
                'access_token': access_token,
                'user': user.to_dict()
            }), 200
        else:
            return jsonify({'error': 'Invalid email or password'}), 401
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/logout', methods=['POST'])
@jwt_required()
def logout():
    """User logout endpoint"""
    try:
        jti = get_jwt()['jti']
        blacklisted_tokens.add(jti)
        return jsonify({'message': 'Successfully logged out'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/profile', methods=['GET'])
@jwt_required()
def get_profile():
    """Get current user profile"""
    try:
        current_user_id_str = get_jwt_identity()
        current_user_id = int(current_user_id_str) if current_user_id_str else None
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    """Update current user profile"""
    try:
        current_user_id_str = get_jwt_identity()
        current_user_id = int(current_user_id_str) if current_user_id_str else None
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        data = request.get_json()
        
        # Update allowed fields
        if 'firstName' in data:
            user.first_name = data['firstName']
        if 'lastName' in data:
            user.last_name = data['lastName']
        if 'location' in data:
            user.location = data['location']
        if 'role' in data:
            user.role = data['role']
        
        db.session.commit()
        
        return jsonify({
            'message': 'Profile updated successfully',
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Protected route example
@app.route('/api/users', methods=['GET'])
@jwt_required()
def get_users():
    """Get all users (protected route)"""
    try:
        users = User.query.all()
        return jsonify({
            'users': [user.to_dict() for user in users],
            'count': len(users)
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def get_db_connection():
    """Create a database connection"""
    try:
        conn = psycopg2.connect(DATABASE_URL)
        return conn, None
    except Exception as e:
        error_message = f"Database connection error: {e}"
        print(error_message)
        return None, error_message
    
@app.route('/api/hello', methods=['GET'])
def hello_world():
    """Hello world endpoint"""
    try:
        conn, error_message = get_db_connection()  # ✅ unpack both values

        if conn is None:
            return jsonify({
                'message': 'Hello from Flask!',
                'database': 'Not connected',
                'error': error_message,
                'db_url': DATABASE_URL,
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

@app.route('/api', methods=['GET'])
def api_info():
    """API information endpoint"""
    return jsonify({
        'name': 'Eco Hub API',
        'version': '1.0.0',
        'description': 'Renewable Energy Marketplace API',
        'endpoints': {
            'auth': '/api/auth',
            'listings': '/api/listings',
            'dashboard': '/api/dashboard',
            'ai': '/api/ai'
        }
    }), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    with app.app_context():
        db.create_all()
    app.run(debug=False, host='0.0.0.0', port=port)
