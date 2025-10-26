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
                
                # Map database metric names to frontend display names
                display_mapping = {
                    'co2_savings': 'CO₂ Savings',
                    'energy_saved': 'Energy Saved',
                    'energy_bought': 'Energy Bought',
                    'active_community_members': 'Active Community Members',
                    'households_powered': 'Households Powered by Clean Energy',
                    'environmental_impact_trees': 'Environmental Impact'
                }
                
                display_name = display_mapping.get(metric_name, metric_name)
                
                # Format values based on metric type
                if metric_name == 'environmental_impact_trees':
                    value = f"≈ to Planting {int(metric['metric_value'])} trees!"
                elif metric_name in ['co2_savings', 'energy_saved', 'energy_bought']:
                    value = f"{int(metric['metric_value']):,} {metric['metric_unit']}"
                else:
                    value = f"{int(metric['metric_value'])}"
                
                result[metric_name] = {
                    'displayName': display_name,
                    'value': value,
                    'unit': metric['metric_unit'],
                    'description': metric['description'],
                    'updatedAt': metric['updated_at'].isoformat()
                }
            
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
            # Get listing statistics
            cur.execute("""
                SELECT 
                    COUNT(*) as total_listings,
                    COUNT(CASE WHEN status = 'active' THEN 1 END) as active_listings,
                    COUNT(CASE WHEN status = 'inactive' THEN 1 END) as inactive_listings,
                    AVG(price_per_kwh) as avg_price,
                    SUM(quantity_kwh) as total_capacity
                FROM energy_listings
            """)
            
            listing_stats = cur.fetchone()
            
            # Get energy type distribution
            cur.execute("""
                SELECT 
                    energy_type,
                    COUNT(*) as count,
                    SUM(quantity_kwh) as total_capacity
                FROM energy_listings
                WHERE status = 'active'
                GROUP BY energy_type
                ORDER BY count DESC
            """)
            
            energy_distribution = cur.fetchall()
            
            result = {
                'listings': {
                    'total': listing_stats['total_listings'],
                    'active': listing_stats['active_listings'],
                    'inactive': listing_stats['inactive_listings'],
                    'averagePrice': float(listing_stats['avg_price']) if listing_stats['avg_price'] else 0,
                    'totalCapacity': int(listing_stats['total_capacity']) if listing_stats['total_capacity'] else 0
                },
                'energyDistribution': [
                    {
                        'type': dist['energy_type'],
                        'count': dist['count'],
                        'capacity': int(dist['total_capacity'])
                    }
                    for dist in energy_distribution
                ]
            }
            
            return jsonify({
                'status': 'success',
                'data': result
            }), 200
            
    except Exception as e:
        logger.error(f"Error getting dashboard stats: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': 'Failed to retrieve dashboard statistics',
            'error': str(e)
        }), 500



