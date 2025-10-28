#!/usr/bin/env python3
"""
Eco Hub Database Migration Script
---------------------------------
Drops all tables, recreates them, optionally runs schema.sql,
and inserts test data.
"""

import os
import sys
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv
from sqlalchemy import text

# Import the actual Flask app and db from your app package
from app import app, db
from models import User, Category, Listing, Transaction  # adjust imports as needed

# Initialize Flask app
# app = create_app()

# --- Raw SQL Utility ---
def get_db_connection():
    """Create a psycopg2 database connection"""
    DATABASE_URL = os.getenv(
        'DATABASE_URL',
        'postgresql://user:password@localhost:5432/eco_hub'
    )
    try:
        return psycopg2.connect(DATABASE_URL)
    except Exception as e:
        print(f"Database connection error: {e}")
        return None


# --- Migration Logic ---
def run_migrations():
    """Drop existing tables and recreate them"""
    print("Starting Eco Hub migrations...")

    try:
        with app.app_context():
            print("Dropping all tables (cascade)...")
            db.session.execute(text('DROP SCHEMA public CASCADE;'))
            db.session.execute(text('CREATE SCHEMA public;'))
            db.session.commit()
            print("All tables dropped successfully")

            print("Creating new tables...")
            db.create_all()
            db.session.commit()
            print("Database tables created successfully")

            seed_data()
            return True

    except Exception as e:
        print(f"Migration failed: {e}")
        with app.app_context():
            db.session.rollback()
        return False


# --- Optional Schema Execution ---
def run_raw_schema():
    """Run raw SQL schema from schema.sql if available"""
    conn = get_db_connection()
    if conn is None:
        print("Failed to connect to database")
        return False

    try:
        cur = conn.cursor()
        schema_file = os.path.join(os.path.dirname(__file__), 'schema.sql')

        if not os.path.exists(schema_file):
            print("No schema.sql file found — skipping raw SQL setup")
            return True

        with open(schema_file, 'r') as f:
            schema_sql = f.read()

        cur.execute(schema_sql)
        conn.commit()
        print("Raw SQL schema executed successfully")
        return True

    except Exception as e:
        print(f"Raw schema execution failed: {e}")
        conn.rollback()
        return False

    finally:
        cur.close()
        conn.close()


# --- Seed Data ---
def seed_data():
    """Insert initial data into the database"""
    print("Seeding database with initial data...")
    try:
        # Example user
        test_user = User.query.filter_by(email='test@example.com').first()
        if not test_user:
            test_user = User(
                first_name='Test',
                last_name='User',
                email='test@example.com',
                role='consumer',
                location='Nairobi, Kenya'
            )
            test_user.set_password('test123')
            db.session.add(test_user)
            print("Added test user")

        # Example categories
        if 'Category' in globals():
            categories = ['Solar Panels', 'Wind Turbines', 'Eco Packaging', 'Recycling']
            for name in categories:
                existing = Category.query.filter_by(name=name).first()
                if not existing:
                    db.session.add(Category(name=name))
            print("Added categories")

        db.session.commit()
        print("Database seeding completed successfully")

    except Exception as e:
        db.session.rollback()
        print(f"Seeding failed: {e}")


# --- Verification ---
def check_database_status():
    """Check if database tables exist and show sample data"""
    conn = get_db_connection()
    if conn is None:
        print("Database connection failed")
        return False

    try:
        cur = conn.cursor()
        cur.execute("""
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'public'
            ORDER BY table_name;
        """)
        tables = cur.fetchall()

        if tables:
            print("Database is properly set up")
            print("Existing tables:")
            for table in tables:
                print(f"  - {table[0]}")
        else:
            print("No tables found in database")
        return True

    except Exception as e:
        print(f"Database check failed: {e}")
        return False

    finally:
        cur.close()
        conn.close()


# --- Entry Point ---
if __name__ == '__main__':
    print("Eco Hub Database Migration Utility")
    print("=" * 45)

    if len(sys.argv) > 1 and sys.argv[1] == 'check':
        check_database_status()
    else:
        print("Setting up database (drop + recreate)...")
        schema_ok = run_raw_schema()
        if run_migrations() and schema_ok:
            print("\nMigration completed successfully.")
        else:
            print("\nMigration failed! Please check your setup and try again.")
