"""
Dashboard API Endpoints
This module provides endpoints for dashboard metrics and AI insights
"""

from flask import Blueprint, jsonify
from database.config import get_db_cursor
import logging

# Create blueprint for dashboard API
dashboard_bp = Blueprint('dashboard', __name__, url_prefix='/api/dashboard')

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dashboard_bp.route('/metrics', methods=['GET'])
def get_dashboard_metrics():
    """
    Get all dashboard metrics for AI insights
    """
    try:
        with get_db_cursor() as (cur, conn):
            cur.execute("""
                SELECT 
                    metric_name, metric_value, metric_unit, description, updated_at
                FROM dashboard_metrics
                ORDER BY metric_name
            """)
            
            metrics = cur.fetchall()
            
            # Convert to frontend format
            result = {}
            for metric in metrics:
                metric_name = metric['metric_name']
                result[metric_name] = {
                    'value': metric['metric_value'],
                    'unit': metric.get('metric_unit'),
                    'description': metric.get('description'),
                    'updatedAt': metric.get('updated_at').isoformat() if metric.get('updated_at') else None
                }
            
            # Add live-computed metrics without altering existing ones
            # Active community members: total registered users
            try:
                cur.execute("SELECT COUNT(*) AS count FROM users")
                row = cur.fetchone()
                result['active_community_members'] = {
                    'value': str(row['count'])
                }
            except Exception as e:
                logger.warning(f"Failed to compute active_community_members: {e}")
            
            # Households powered: distinct buyers with at least one transaction
            try:
                cur.execute("SELECT COUNT(DISTINCT buyer_id) AS count FROM transactions")
                row = cur.fetchone()
                result['households_powered'] = {
                    'value': str(row['count'])
                }
            except Exception as e:
                logger.warning(f"Failed to compute households_powered: {e}")
            
            return jsonify({
                'status': 'success',
                'data': result
            }), 200
            
    except Exception as e:
        logger.error(f"Error getting dashboard metrics: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': 'Failed to retrieve dashboard metrics',
            'error': str(e)
        }), 500

@dashboard_bp.route('/predictions', methods=['GET'])
def get_performance_predictions():
    """
    Get performance predictions data for charts
    """
    try:
        with get_db_cursor() as (cur, conn):
            cur.execute("""
                SELECT 
                    month, consumption_forecast, renewable_generation, created_at
                FROM performance_predictions
                ORDER BY 
                    CASE month
                        WHEN 'Jan' THEN 1
                        WHEN 'Feb' THEN 2
                        WHEN 'Mar' THEN 3
                        WHEN 'Apr' THEN 4
                        WHEN 'May' THEN 5
                        WHEN 'Jun' THEN 6
                        ELSE 7
                    END
            """)
            
            predictions = cur.fetchall()
            
            # Format data for frontend chart
            result = {
                'months': [],
                'consumptionForecast': [],
                'renewableGeneration': [],
                'lastUpdated': None
            }
            
            for pred in predictions:
                result['months'].append(pred['month'])
                result['consumptionForecast'].append(float(pred['consumption_forecast']))
                result['renewableGeneration'].append(float(pred['renewable_generation']))
                
                if not result['lastUpdated'] or pred['created_at'] > result['lastUpdated']:
                    result['lastUpdated'] = pred['created_at'].isoformat()
            
            return jsonify({
                'status': 'success',
                'data': result
            }), 200
            
    except Exception as e:
        logger.error(f"Error getting performance predictions: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': 'Failed to retrieve performance predictions',
            'error': str(e)
        }), 500

@dashboard_bp.route('/stats', methods=['GET'])
def get_dashboard_stats():
    """
    Get additional dashboard statistics
    """
    try:
        with get_db_cursor() as (cur, conn):
            cur.execute("""
                SELECT 
                    stat_name, stat_value, updated_at
                FROM dashboard_stats
                ORDER BY stat_name
            """)
            stats = cur.fetchall()
            result = {}
            for stat in stats:
                result[stat['stat_name']] = {
                    'value': stat['stat_value'],
                    'updatedAt': stat.get('updated_at').isoformat() if stat.get('updated_at') else None
                }
            return jsonify({'status': 'success', 'data': result}), 200
    except Exception as e:
        logger.error(f"Error getting dashboard stats: {str(e)}")
        return jsonify({'status': 'error', 'message': 'Failed to retrieve stats', 'error': str(e)}), 500



