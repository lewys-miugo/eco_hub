"""
Database Configuration and Utilities
This module provides database connection and utility functions
"""

import os
import psycopg as psycopg2
from psycopg.rows import dict_row
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv
from contextlib import contextmanager

load_dotenv()

class DatabaseConfig:
    """Database configuration class"""
    
    def __init__(self):
        self.DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://user:password@localhost:5432/eco_hub')
        self.POOL_SIZE = int(os.getenv('DB_POOL_SIZE', '5'))
        self.MAX_OVERFLOW = int(os.getenv('DB_MAX_OVERFLOW', '10'))

@contextmanager
def get_db_connection():
    """
    Context manager for database connections
    Automatically handles connection cleanup
    """
    conn = None
    try:
        config = DatabaseConfig()
        conn = psycopg2.connect(config.DATABASE_URL)
        yield conn
    except Exception as e:
        if conn:
            conn.rollback()
        raise e
    finally:
        if conn:
            conn.close()

@contextmanager
def get_db_cursor():
    """
    Context manager for database cursors
    Automatically handles cursor and connection cleanup
    """
    conn = None
    cur = None
    try:
        config = DatabaseConfig()
        conn = psycopg2.connect(config.DATABASE_URL)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        yield cur, conn
    except Exception as e:
        if conn:
            conn.rollback()
        raise e
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()

def test_connection():
    """Test database connection"""
    try:
        with get_db_connection() as conn:
            cur = conn.cursor()
            cur.execute('SELECT NOW() as current_time;')
            result = cur.fetchone()
            cur.close()
            return {
                'status': 'success',
                'message': 'Database connected successfully',
                'timestamp': str(result[0])
            }
    except Exception as e:
        return {
            'status': 'error',
            'message': f'Database connection failed: {str(e)}'
        }

def get_table_info():
    """Get information about database tables"""
    try:
        with get_db_cursor() as (cur, conn):
            cur.execute("""
                SELECT 
                    table_name,
                    column_name,
                    data_type,
                    is_nullable
                FROM information_schema.columns 
                WHERE table_schema = 'public'
                ORDER BY table_name, ordinal_position;
            """)
            columns = cur.fetchall()
            
            # Group by table
            tables = {}
            for col in columns:
                table_name = col['table_name']
                if table_name not in tables:
                    tables[table_name] = []
                tables[table_name].append({
                    'column': col['column_name'],
                    'type': col['data_type'],
                    'nullable': col['is_nullable'] == 'YES'
                })
            
            return {
                'status': 'success',
                'tables': tables
            }
    except Exception as e:
        return {
            'status': 'error',
            'message': f'Failed to get table info: {str(e)}'
        }



