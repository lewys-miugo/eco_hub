"""
Dashboard API Endpoints
This module provides endpoints for dashboard metrics computed from live database tables
ONLY queries: users, transactions, listings tables - NO dashboard_metrics table
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
    Get all dashboard metrics computed from live user activity data in database tables
    ONLY computes from: users, transactions, listings tables
    NO dashboard_metrics table is used or required
    """
    try:
        with get_db_cursor() as (cur, conn):
            result = {}
            
            # 1. Active Community Members: all users with accounts (consumers + suppliers)
            try:
                cur.execute("SELECT COUNT(*) AS count FROM users")
                row = cur.fetchone()
                count = int(row['count']) if row and row.get('count') is not None else 0
                logger.info(f"✅ Active community members: {count}")
                result['active_community_members'] = {
                    'value': str(count)
                }
            except Exception as e:
                logger.error(f"❌ Failed to compute active_community_members: {e}", exc_info=True)
                result['active_community_members'] = {'value': '0'}
            
            # 2. Households Powered by Clean Energy: number of consumers who have bought energy
            try:
                cur.execute("""
                    SELECT COUNT(DISTINCT buyer_id) AS count 
                    FROM transactions 
                    WHERE buyer_id IS NOT NULL
                """)
                row = cur.fetchone()
                count = int(row['count']) if row and row.get('count') is not None else 0
                logger.info(f"✅ Households powered: {count}")
                result['households_powered'] = {
                    'value': str(count)
                }
            except Exception as e:
                logger.error(f"❌ Failed to compute households_powered: {e}", exc_info=True)
                result['households_powered'] = {'value': '0'}
            
            # 3. Energy Bought: total amount of energy (kWh) bought by consumers
            try:
                cur.execute("""
                    SELECT COALESCE(SUM(kwh_amount), 0) AS total 
                    FROM transactions
                """)
                row = cur.fetchone()
                total = float(row['total']) if row and row.get('total') is not None else 0.0
                logger.info(f"✅ Energy bought: {total} kWh")
                # Format with comma for display
                formatted_value = f"{int(total):,} kWh"
                result['energy_bought'] = {
                    'value': formatted_value,
                    'unit': 'kWh'
                }
            except Exception as e:
                logger.error(f"❌ Failed to compute energy_bought: {e}", exc_info=True)
                result['energy_bought'] = {'value': '0 kWh', 'unit': 'kWh'}
            
            # 4. Energy Saved: all energy (kWh) listed by suppliers (bought or not)
            try:
                # Sum all energy from listings table (use available_kwh or quantity_kwh)
                cur.execute("""
                    SELECT COALESCE(
                        SUM(COALESCE(available_kwh, quantity_kwh, 0)), 
                        0
                    ) AS total 
                    FROM listings
                """)
                row = cur.fetchone()
                total = float(row['total']) if row and row.get('total') is not None else 0.0
                logger.info(f"✅ Energy saved (listed): {total} kWh")
                # Format with comma for display
                formatted_value = f"{int(total):,} kWh"
                result['energy_saved'] = {
                    'value': formatted_value,
                    'unit': 'kWh'
                }
            except Exception as e:
                logger.error(f"❌ Failed to compute energy_saved: {e}", exc_info=True)
                # Try alternative table name if listings doesn't exist
                try:
                    cur.execute("""
                        SELECT COALESCE(
                            SUM(COALESCE(quantity_kwh, 0)), 
                            0
                        ) AS total 
                        FROM energy_listings
                    """)
                    row = cur.fetchone()
                    total = float(row['total']) if row and row.get('total') is not None else 0.0
                    formatted_value = f"{int(total):,} kWh"
                    result['energy_saved'] = {
                        'value': formatted_value,
                        'unit': 'kWh'
                    }
                    logger.info(f"✅ Energy saved (from energy_listings): {total} kWh")
                except Exception as e2:
                    logger.error(f"❌ Fallback query for energy_saved also failed: {e2}", exc_info=True)
                    result['energy_saved'] = {'value': '0 kWh', 'unit': 'kWh'}
            
            # 5. CO2 Savings: calculated from Energy Bought (1 kWh renewable = ~0.5 kg CO2 saved)
            try:
                # Get energy_bought value from previous calculation
                energy_bought_value = result.get('energy_bought', {}).get('value', '0 kWh')
                # Extract numeric value
                energy_kwh = float(energy_bought_value.replace(' kWh', '').replace(',', '')) if 'kWh' in energy_bought_value else 0.0
                if energy_kwh == 0:
                    # Recalculate if we don't have the value
                    cur.execute("SELECT COALESCE(SUM(kwh_amount), 0) AS total FROM transactions")
                    row = cur.fetchone()
                    energy_kwh = float(row['total']) if row and row.get('total') is not None else 0.0
                
                co2_saved_kg = int(energy_kwh * 0.5)  # Approximate conversion
                logger.info(f"✅ CO2 savings: {co2_saved_kg} kg from {energy_kwh} kWh")
                result['co2_savings'] = {
                    'value': f"{co2_saved_kg:,} kg"
                }
            except Exception as e:
                logger.error(f"❌ Failed to compute co2_savings: {e}", exc_info=True)
                result['co2_savings'] = {'value': '0 kg'}
            
            # 6. Environmental Impact (Trees): calculated from CO2 Savings (1 tree offsets ~21 kg CO2/year)
            try:
                co2_value = result.get('co2_savings', {}).get('value', '0 kg')
                co2_kg_string = co2_value.replace(' kg', '').replace(',', '')
                co2_kg = int(co2_kg_string) if co2_kg_string and co2_kg_string != '0' else 0
                trees_equivalent = int(co2_kg / 21) if co2_kg > 0 else 0
                logger.info(f"✅ Environmental impact: {trees_equivalent} trees")
                result['environmental_impact_trees'] = {
                    'value': f"≈ to Planting {trees_equivalent:,} trees!"
                }
            except Exception as e:
                logger.error(f"❌ Failed to compute environmental_impact_trees: {e}", exc_info=True)
                result['environmental_impact_trees'] = {'value': '≈ to Planting 0 trees!'}
            
            logger.info(f"✅ Dashboard metrics computed successfully: {list(result.keys())}")
            return jsonify({
                'status': 'success',
                'data': result
            }), 200
            
    except Exception as e:
        logger.error(f"❌ Error getting dashboard metrics: {str(e)}", exc_info=True)
        import traceback
        logger.error(f"Full traceback: {traceback.format_exc()}")
        # Return valid structure with zeros instead of error
        return jsonify({
            'status': 'error',
            'message': 'Failed to retrieve dashboard metrics',
            'error': str(e),
            'data': {
                'active_community_members': {'value': '0'},
                'households_powered': {'value': '0'},
                'energy_bought': {'value': '0 kWh', 'unit': 'kWh'},
                'energy_saved': {'value': '0 kWh', 'unit': 'kWh'},
                'co2_savings': {'value': '0 kg'},
                'environmental_impact_trees': {'value': '≈ to Planting 0 trees!'}
            }
        }), 200

@dashboard_bp.route('/predictions', methods=['GET'])
def get_performance_predictions():
    """
    Get performance predictions data for charts
    If table doesn't exist, return empty arrays
    """
    try:
        with get_db_cursor() as (cur, conn):
            # Initialize result with empty arrays
            result = {
                'months': [],
                'consumptionForecast': [],
                'renewableGeneration': [],
                'lastUpdated': None
            }
            
            # Try to fetch predictions (table may not exist - that's OK)
            try:
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
                for pred in predictions:
                    result['months'].append(pred['month'])
                    result['consumptionForecast'].append(float(pred['consumption_forecast']))
                    result['renewableGeneration'].append(float(pred['renewable_generation']))
                    
                    if not result['lastUpdated'] or pred['created_at'] > result['lastUpdated']:
                        result['lastUpdated'] = pred['created_at'].isoformat()
            except Exception as e:
                # Table doesn't exist - return empty result (this is OK)
                logger.warning(f"⚠️ performance_predictions table doesn't exist: {str(e)}")
            
            return jsonify({
                'status': 'success',
                'data': result
            }), 200
            
    except Exception as e:
        logger.error(f"Error getting performance predictions: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': 'Failed to retrieve performance predictions',
            'error': str(e),
            'data': {
                'months': [],
                'consumptionForecast': [],
                'renewableGeneration': [],
                'lastUpdated': None
            }
        }), 200

@dashboard_bp.route('/stats', methods=['GET'])
def get_dashboard_stats():
    """
    Get additional dashboard statistics
    If table doesn't exist, return empty object
    """
    try:
        with get_db_cursor() as (cur, conn):
            result = {}
            # Try to fetch stats (table may not exist - that's OK)
            try:
                cur.execute("""
                    SELECT 
                        stat_name, stat_value, updated_at
                    FROM dashboard_stats
                    ORDER BY stat_name
                """)
                stats = cur.fetchall()
                for stat in stats:
                    result[stat['stat_name']] = {
                        'value': stat['stat_value'],
                        'updatedAt': stat.get('updated_at').isoformat() if stat.get('updated_at') else None
                    }
            except Exception as e:
                # Table doesn't exist - return empty result (this is OK)
                logger.warning(f"⚠️ dashboard_stats table doesn't exist: {str(e)}")
            
            return jsonify({'status': 'success', 'data': result}), 200
    except Exception as e:
        logger.error(f"Error getting dashboard stats: {str(e)}")
        return jsonify({'status': 'error', 'message': 'Failed to retrieve stats', 'error': str(e), 'data': {}}), 200
