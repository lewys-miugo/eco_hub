import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Database configuration
DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://abala:password123@localhost:5432/eco_hub_db')

# SQLAlchemy setup
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

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

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
