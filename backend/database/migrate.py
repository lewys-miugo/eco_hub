#!/usr/bin/env python3
"""
Database Migration Script for Eco Hub
This script sets up the database schema and initial data
"""

import os
import sys
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

# Add the backend directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

load_dotenv()

def get_db_connection():
    """Create a database connection"""
    DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://user:password@localhost:5432/eco_hub')
    try:
        conn = psycopg2.connect(DATABASE_URL)
        return conn
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

def run_migration():
    """Run the database migration"""
    conn = get_db_connection()
    if conn is None:
        print("❌ Failed to connect to database")
        return False
    
    try:
        cur = conn.cursor()
        
        # Read the schema file
        schema_file = os.path.join(os.path.dirname(__file__), 'schema.sql')
        with open(schema_file, 'r') as f:
            schema_sql = f.read()
        
        # Execute the schema
        cur.execute(schema_sql)
        conn.commit()
        
        print("✅ Database schema created successfully")
        
        # Verify tables were created
        cur.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name;
        """)
        tables = cur.fetchall()
        
        print("📋 Created tables:")
        for table in tables:
            print(f"   - {table[0]}")
        
        # Check initial data
        cur.execute("SELECT COUNT(*) FROM energy_listings;")
        listings_count = cur.fetchone()[0]
        
        cur.execute("SELECT COUNT(*) FROM dashboard_metrics;")
        metrics_count = cur.fetchone()[0]
        
        print(f"📊 Initial data loaded:")
        print(f"   - {listings_count} energy listings")
        print(f"   - {metrics_count} dashboard metrics")
        
        cur.close()
        conn.close()
        
        return True
        
    except Exception as e:
        print(f"❌ Migration failed: {e}")
        conn.rollback()
        cur.close()
        conn.close()
        return False

def check_database_status():
    """Check if database is properly set up"""
    conn = get_db_connection()
    if conn is None:
        print("❌ Database connection failed")
        return False
    
    try:
        cur = conn.cursor()
        
        # Check if tables exist
        cur.execute("""
            SELECT COUNT(*) 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name IN ('energy_listings', 'dashboard_metrics', 'performance_predictions');
        """)
        table_count = cur.fetchone()[0]
        
        if table_count == 3:
            print("✅ Database is properly set up")
            
            # Show sample data
            cur.execute("SELECT title, energy_type, status FROM energy_listings LIMIT 3;")
            listings = cur.fetchall()
            
            print("📋 Sample listings:")
            for listing in listings:
                print(f"   - {listing[0]} ({listing[1]}) - {listing[2]}")
            
            return True
        else:
            print("❌ Database is not properly set up")
            return False
            
    except Exception as e:
        print(f"❌ Database check failed: {e}")
        return False
    finally:
        cur.close()
        conn.close()

if __name__ == '__main__':
    print("🚀 Eco Hub Database Migration")
    print("=" * 40)
    
    if len(sys.argv) > 1 and sys.argv[1] == 'check':
        check_database_status()
    else:
        print("Setting up database...")
        if run_migration():
            print("\n🎉 Migration completed successfully!")
            print("\nNext steps:")
            print("1. Update your .env file with correct DATABASE_URL")
            print("2. Run: python backend/database/migrate.py check")
            print("3. Start implementing API endpoints")
        else:
            print("\n💥 Migration failed!")
            print("Please check your database connection and try again.")



