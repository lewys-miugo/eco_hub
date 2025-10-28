#!/usr/bin/env python3
"""
Database Seeder Script
Run this to populate database with sample data
"""

import sys
import os
from flask import Flask
from dotenv import load_dotenv

# Import the shared db instance and models
from auth_models import db, User

load_dotenv()

def create_app():
    """Create Flask app for seeding"""
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://lewys:43214321@localhost:5432/eco_hub_db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Initialize the shared db instance with this app
    db.init_app(app)
    return app

def seed_users():
    """Seed sample users"""
    print("🌱 Seeding users...")
    
    sample_users = [
        {
            'first_name': 'John',
            'last_name': 'Doe',
            'email': 'john.doe@example.com',
            'location': 'Nairobi, Kenya',
            'role': 'consumer',
            'password': 'password123'
        },
        {
            'first_name': 'Jane',
            'last_name': 'Smith',
            'email': 'jane.smith@example.com',
            'location': 'Mombasa, Kenya',
            'role': 'supplier',
            'password': 'password123'
        },
        {
            'first_name': 'Mike',
            'last_name': 'Johnson',
            'email': 'mike.johnson@example.com',
            'location': 'Kisumu, Kenya',
            'role': 'consumer',
            'password': 'password123'
        },
        {
            'first_name': 'Sarah',
            'last_name': 'Wilson',
            'email': 'sarah.wilson@example.com',
            'location': 'Nakuru, Kenya',
            'role': 'supplier',
            'password': 'password123'
        }
    ]
    
    created_count = 0
    for user_data in sample_users:
        # Check if user already exists
        if User.query.filter_by(email=user_data['email']).first():
            print(f"⚠️  User {user_data['email']} already exists, skipping...")
            continue
        
        user = User(
            first_name=user_data['first_name'],
            last_name=user_data['last_name'],
            email=user_data['email'],
            location=user_data['location'],
            role=user_data['role']
        )
        user.set_password(user_data['password'])
        
        db.session.add(user)
        created_count += 1
        print(f"✅ Created user: {user_data['first_name']} {user_data['last_name']} ({user_data['role']})")
    
    if created_count > 0:
        db.session.commit()
        print(f"🎉 Seeding completed! Created {created_count} users")
    else:
        print("ℹ️  No new users created")
    
    return True

def run_seeder(clear_first=False):
    """Run the seeder"""
    print("🌱 Starting database seeding...")
    
    app = create_app()
    
    try:
        with app.app_context():
            # Clear existing data if requested
            if clear_first:
                print("🗑️  Clearing existing users...")
                User.query.delete()
                db.session.commit()
                print("✅ Users cleared")
            
            # Seed users
            return seed_users()
            
    except Exception as e:
        print(f"❌ Seeding failed: {e}")
        return False

if __name__ == "__main__":
    # Check for --clear flag
    clear_first = '--clear' in sys.argv
    
    if clear_first:
        print("⚠️  Running with --clear flag: existing data will be deleted")
        confirm = input("Are you sure? (y/N): ")
        if confirm.lower() != 'y':
            print("❌ Seeding cancelled")
            sys.exit(1)
    
    success = run_seeder(clear_first)
    sys.exit(0 if success else 1)
