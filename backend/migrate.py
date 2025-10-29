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


# --- Ensure Core Tables ---
def ensure_core_tables():
    """Create essential tables (listings, dashboard_metrics) if they do not exist using SQLAlchemy connection."""
    try:
        with app.app_context():
            # Listings table used by API endpoints
            db.session.execute(text(
                """
                CREATE TABLE IF NOT EXISTS listings (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER,
                    title VARCHAR(255) NOT NULL,
                    energy_type VARCHAR(50) NOT NULL,
                    available_kwh NUMERIC,
                    price_per_kwh NUMERIC NOT NULL,
                    status VARCHAR(20) DEFAULT 'active',
                    location VARCHAR(255) NOT NULL,
                    description TEXT,
                    image_url VARCHAR(500),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
                """
            ))
            # Helpful indexes
            db.session.execute(text("CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(status);"))
            db.session.execute(text("CREATE INDEX IF NOT EXISTS idx_listings_energy_type ON listings(energy_type);"))
            db.session.execute(text("CREATE INDEX IF NOT EXISTS idx_listings_created_at ON listings(created_at);"))

            # Dashboard metrics table for AI/metrics
            db.session.execute(text(
                """
                CREATE TABLE IF NOT EXISTS dashboard_metrics (
                    id SERIAL PRIMARY KEY,
                    metric_name VARCHAR(100) UNIQUE NOT NULL,
                    metric_value VARCHAR(64) NOT NULL,
                    metric_unit VARCHAR(20),
                    description TEXT,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
                """
            ))
            db.session.execute(text("CREATE INDEX IF NOT EXISTS idx_dashboard_metrics_name ON dashboard_metrics(metric_name);"))

            db.session.commit()
            print("Ensured core tables (listings, dashboard_metrics)")
            return True
    except Exception as e:
        with app.app_context():
            db.session.rollback()
        print(f"Failed ensuring core tables: {e}")
        return False


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

            # Ensure tables used by raw SQL API endpoints exist
            ensure_core_tables()

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


# --- Fix Foreign Key Constraints ---
def fix_transaction_foreign_key():
    """Fix the transactions.listing_id foreign key to point to listings instead of energy_listings"""
    conn = get_db_connection()
    if conn is None:
        print("Failed to connect to database when fixing foreign key")
        return False
    
    try:
        with conn.cursor() as cur:
            # Check if constraint exists and what it references
            cur.execute("""
                SELECT constraint_name
                FROM information_schema.table_constraints
                WHERE table_name = 'transactions'
                AND constraint_type = 'FOREIGN KEY'
                AND constraint_name LIKE '%listing_id%'
            """)
            constraints = cur.fetchall()
            
            # Drop existing constraint if it points to energy_listings
            for constraint in constraints:
                constraint_name = constraint[0]
                cur.execute(f"ALTER TABLE transactions DROP CONSTRAINT IF EXISTS {constraint_name};")
                print(f"Dropped old constraint: {constraint_name}")
            
            # Create new constraint pointing to listings
            cur.execute("""
                ALTER TABLE transactions
                ADD CONSTRAINT transactions_listing_id_fkey
                FOREIGN KEY (listing_id) REFERENCES listings(id);
            """)
            print("Created new foreign key constraint: transactions_listing_id_fkey -> listings(id)")
        
        conn.commit()
        return True
    except Exception as e:
        conn.rollback()
        print(f"Failed to fix foreign key constraint: {e}")
        return False
    finally:
        conn.close()


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
    elif len(sys.argv) > 1 and sys.argv[1] == 'fix-fk':
        print("Fixing foreign key constraints...")
        if fix_transaction_foreign_key():
            print("\nForeign key constraint fixed successfully.")
        else:
            print("\nFailed to fix foreign key constraint.")
    else:
        print("Setting up database (drop + recreate)...")
        # First run ORM migrations (drops and recreates base schema)
        migrations_ok = run_migrations()
        # Then layer raw schema tables (e.g., dashboard_metrics, energy_listings)
        schema_ok = run_raw_schema()
        # Fix foreign key constraint after tables are created
        if migrations_ok:
            fix_transaction_foreign_key()
        if migrations_ok and schema_ok:
            print("\nMigration completed successfully.")
        else:
            print("\nMigration failed! Please check your setup and try again.")
