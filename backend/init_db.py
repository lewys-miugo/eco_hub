#!/usr/bin/env python3
"""
Database initialization script for EcoPower Hub
Run this script to create all database tables
"""

import os
import sys
from flask import Flask
from dotenv import load_dotenv

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import app, db
from models import User, Listing, AIInteraction, Transaction

def init_database():
    """Initialize the database with all tables"""
    try:
        print("🚀 Initializing EcoPower Hub Database...")
        
        # Create all tables
        with app.app_context():
            db.create_all()
            print("✅ Database tables created successfully!")
            
            # Create a test user for development
            test_user = User.query.filter_by(email='test@example.com').first()
            if not test_user:
                test_user = User(
                    name='Test User',
                    email='test@example.com',
                    role='consumer',
                    latitude=40.7128,
                    longitude=-74.0060
                )
                test_user.set_password('testpassword')
                db.session.add(test_user)
                
                # Create a test listing
                test_listing = Listing(
                    user_id=test_user.id,
                    energy_type='solar',
                    price_per_kwh=0.15,
                    available_kwh=500.0,
                    latitude=40.7128,
                    longitude=-74.0060,
                    title='Solar Energy Available',
                    description='Clean solar energy from rooftop panels',
                    is_active=True
                )
                db.session.add(test_listing)
                
                db.session.commit()
                print("✅ Test data created successfully!")
            else:
                print("ℹ️  Test user already exists, skipping...")
        
        print("🎉 Database initialization completed!")
        print("\n📋 Available endpoints:")
        print("  - POST /api/v1/auth/register")
        print("  - POST /api/v1/auth/login")
        print("  - GET/PUT /api/v1/users/:id")
        print("  - POST /api/v1/ai/advice")
        print("  - POST /api/v1/ai/listing-helper")
        print("  - GET /api/v1/ai/match")
        print("  - GET /api/v1/ai/interactions")
        
    except Exception as e:
        print(f"❌ Database initialization failed: {str(e)}")
        sys.exit(1)

if __name__ == '__main__':
    init_database()
