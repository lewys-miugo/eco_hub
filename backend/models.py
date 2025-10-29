from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    """Unified User model for authentication and profile management"""
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=True)
    last_name = db.Column(db.String(100), nullable=True)
    name = db.Column(db.String(100), nullable=True)  # optional combined name
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='consumer')  # 'supplier' or 'consumer'
    location = db.Column(db.String(255), nullable=True)
    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    listings = db.relationship('Listing', backref='user', lazy=True, cascade='all, delete-orphan')
    ai_interactions = db.relationship('AIInteraction', backref='user', lazy=True, cascade='all, delete-orphan')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def generate_token(self):
        """Generate JWT token for authentication"""
        return create_access_token(identity=self.id)

    def to_dict(self):
        """Convert user to dictionary for JSON serialization"""
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'name': self.name or f"{self.first_name or ''} {self.last_name or ''}".strip(),
            'email': self.email,
            'role': self.role,
            'location': self.location,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)

    def __repr__(self):
        return f"<Category {self.name}>"
    
class Listing(db.Model):
    """Energy listing model for marketplace"""
    __tablename__ = 'listings'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    energy_type = db.Column(db.String(50), nullable=False)  # 'solar', 'wind', etc.
    price_per_kwh = db.Column(db.Float, nullable=False)
    quantity_kwh = db.Column(db.Integer, nullable=True)  # API expects this
    available_kwh = db.Column(db.Float, nullable=True)  # Keep for backward compatibility
    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(20), default='active')  # API expects this
    is_active = db.Column(db.Boolean, default=True)  # Keep for backward compatibility
    location = db.Column(db.String(255), nullable=True)  # API expects this
    seller_account = db.Column(db.String(255), nullable=True)  # API expects this
    image_url = db.Column(db.String(500), nullable=True)  # API expects this
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'energy_type': self.energy_type,
            'price_per_kwh': self.price_per_kwh,
            'available_kwh': self.available_kwh,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'title': self.title,
            'description': self.description,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'user_name': self.user.name if self.user else None
        }


class AIInteraction(db.Model):
    """Logs AI queries and responses"""
    __tablename__ = 'ai_interactions'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    interaction_type = db.Column(db.String(50), nullable=False)
    prompt = db.Column(db.Text, nullable=False)
    response = db.Column(db.Text, nullable=False)
    carbon_savings_estimate = db.Column(db.Float, nullable=True)
    ai_metadata = db.Column(db.JSON, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'interaction_type': self.interaction_type,
            'prompt': self.prompt,
            'response': self.response,
            'carbon_savings_estimate': self.carbon_savings_estimate,
            'metadata': self.ai_metadata,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class Transaction(db.Model):
    """Buyer-seller transaction records"""
    __tablename__ = 'transactions'
    
    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    seller_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'), nullable=False)
    kwh_amount = db.Column(db.Float, nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default='pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    completed_at = db.Column(db.DateTime, nullable=True)
    
    buyer = db.relationship('User', foreign_keys=[buyer_id], backref='purchases')
    seller = db.relationship('User', foreign_keys=[seller_id], backref='sales')
    listing = db.relationship('Listing', backref='transactions')
    
    def to_dict(self):
        return {
            'id': self.id,
            'buyer_id': self.buyer_id,
            'seller_id': self.seller_id,
            'listing_id': self.listing_id,
            'kwh_amount': self.kwh_amount,
            'total_price': self.total_price,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'completed_at': self.completed_at.isoformat() if self.completed_at else None
        }
