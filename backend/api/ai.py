"""
AI Auto-fill API Endpoints
This module provides AI-powered auto-fill functionality for forms
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from database.config import get_db_cursor
from ai_service import AIService
import logging
import random

# Create blueprint for AI API
ai_bp = Blueprint('ai', __name__, url_prefix='/api/ai')

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize AI Service
ai_service = AIService()

@ai_bp.route('/chat', methods=['POST'])
@jwt_required()
def ai_chat():
    """
    AI Chat endpoint for conversational renewable energy advice
    """
    try:
        user_id_str = get_jwt_identity()
        # Convert string ID back to integer for database queries
        user_id = int(user_id_str) if user_id_str else None
        data = request.get_json()
        
        if not data or not data.get('message'):
            return jsonify({
                'status': 'error',
                'message': 'Message is required'
            }), 400
        
        user_message = data['message']
        logger.info(f"AI chat request from user {user_id}: {user_message[:50]}...")
        
        # Get user data for context
        user_location = ''
        user_role = 'consumer'
        try:
            with get_db_cursor() as (cur, conn):
                cur.execute("SELECT email, location, role FROM users WHERE id = %s", (user_id,))
                user = cur.fetchone()
                if user:
                    user_location = user.get('location', '') if isinstance(user, dict) else (user[2] if len(user) > 2 else '')
                    user_role = user.get('role', 'consumer') if isinstance(user, dict) else (user[3] if len(user) > 3 else 'consumer')
        except Exception as db_error:
            logger.warning(f"Could not fetch user data: {str(db_error)}")
        
        # Prepare user input for AI service
        user_input = {
            'message': user_message,
            'location': user_location,
            'role': user_role
        }
        
        # Get AI response
        try:
            ai_response = ai_service.get_renewable_energy_advice(user_input)
            
            # Extract response details
            response_text = ai_response.get('advice', '')
            emojis = ai_response.get('emojis', [])
            
            # Log interaction to database
            with get_db_cursor() as (cur, conn):
                cur.execute("""
                    INSERT INTO ai_interactions (user_id, interaction_type, prompt, response, carbon_savings_estimate)
                    VALUES (%s, %s, %s, %s, %s)
                """, (
                    user_id,
                    'chat',
                    user_message,
                    response_text,
                    ai_response.get('carbon_savings_estimate')
                ))
                conn.commit()
            
            return jsonify({
                'status': 'success',
                'response': response_text,
                'emojis': emojis
            }), 200
            
        except Exception as ai_error:
            logger.error(f"AI service error: {str(ai_error)}")
            # Return fallback response if AI service fails
            return jsonify({
                'status': 'success',
                'response': "I'm your AI Renewable Energy Advisor! 🌱⚡ I can help you with solar energy advice, cost savings, and finding local energy suppliers. What would you like to know about renewable energy?",
                'emojis': ['🌱', '⚡', '🌍']
            }), 200
            
    except Exception as e:
        logger.error(f"Error in AI chat: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': 'Failed to process chat request',
            'error': str(e)
        }), 500

@ai_bp.route('/auto-fill', methods=['POST'])
def auto_fill_form():
    """
    Auto-fill form fields using AI (simulated for now)
    This endpoint analyzes existing data patterns and suggests values
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'status': 'error',
                'message': 'No data provided'
            }), 400
        
        # Get current form data
        current_data = data.get('currentData', {})
        location = current_data.get('location', '')
        
        # Simulate AI analysis based on location and existing patterns
        suggestions = generate_ai_suggestions(location)
        
        return jsonify({
            'status': 'success',
            'message': 'AI suggestions generated',
            'data': suggestions
        }), 200
        
    except Exception as e:
        logger.error(f"Error generating AI suggestions: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': 'Failed to generate AI suggestions',
            'error': str(e)
        }), 500

def generate_ai_suggestions(location):
    """
    Generate AI-powered suggestions based on location and market data
    """
    try:
        with get_db_cursor() as (cur, conn):
            # Get market data for similar locations
            cur.execute("""
                SELECT 
                    energy_type,
                    AVG(price_per_kwh) as avg_price,
                    AVG(quantity_kwh) as avg_quantity,
                    COUNT(*) as frequency
                FROM energy_listings
                WHERE status = 'active'
                GROUP BY energy_type
                ORDER BY frequency DESC
            """)
            
            market_data = cur.fetchall()
            
            # Get location-specific data if available
            location_data = None
            if location:
                cur.execute("""
                    SELECT 
                        energy_type,
                        AVG(price_per_kwh) as avg_price,
                        AVG(quantity_kwh) as avg_quantity
                    FROM energy_listings
                    WHERE LOWER(location) LIKE LOWER(%s) AND status = 'active'
                    GROUP BY energy_type
                    ORDER BY COUNT(*) DESC
                    LIMIT 1
                """, (f'%{location}%',))
                
                location_data = cur.fetchone()
            
            # Generate suggestions
            suggestions = {}
            
            if market_data:
                # Most popular energy type
                most_popular = market_data[0]
                suggestions['energyType'] = most_popular['energy_type']
                
                # Price suggestion (with some variation)
                base_price = float(most_popular['avg_price'])
                price_variation = base_price * 0.1  # 10% variation
                suggested_price = round(base_price + random.uniform(-price_variation, price_variation), 2)
                suggestions['price'] = str(suggested_price)
                
                # Quantity suggestion
                base_quantity = int(most_popular['avg_quantity'])
                quantity_variation = base_quantity * 0.2  # 20% variation
                suggested_quantity = int(base_quantity + random.uniform(-quantity_variation, quantity_variation))
                suggestions['quantity'] = str(max(100, suggested_quantity))  # Minimum 100 kWh
            
            # Location-specific suggestions
            if location_data:
                suggestions['energyType'] = location_data['energy_type']
                suggestions['price'] = str(round(float(location_data['avg_price']), 2))
                suggestions['quantity'] = str(int(location_data['avg_quantity']))
            
            # Generate smart title based on energy type and quantity
            if 'energyType' in suggestions:
                energy_type = suggestions['energyType']
                quantity = suggestions.get('quantity', '500')
                
                title_templates = {
                    'Solar': [
                        f"Solar Energy Surplus - {quantity} kWh Daily",
                        f"Clean Solar Power Available - {quantity} kWh",
                        f"Daily Solar Energy Supply - {quantity} kWh"
                    ],
                    'Wind': [
                        f"Wind Power Generation - {quantity} kWh",
                        f"Clean Wind Energy Available - {quantity} kWh",
                        f"Renewable Wind Power - {quantity} kWh"
                    ],
                    'Hydro': [
                        f"Hydropower Surplus - {quantity} kWh",
                        f"Clean Hydroelectric Energy - {quantity} kWh",
                        f"Renewable Hydro Power - {quantity} kWh"
                    ],
                    'Biomass': [
                        f"Biomass Energy Supply - {quantity} kWh",
                        f"Clean Biomass Power - {quantity} kWh",
                        f"Renewable Biomass Energy - {quantity} kWh"
                    ]
                }
                
                templates = title_templates.get(energy_type, [f"{energy_type} Energy - {quantity} kWh"])
                suggestions['title'] = random.choice(templates)
            
            # Add confidence scores
            suggestions['_confidence'] = {
                'energyType': 0.85,
                'price': 0.75,
                'quantity': 0.80,
                'title': 0.70
            }
            
            return suggestions
            
    except Exception as e:
        logger.error(f"Error in generate_ai_suggestions: {str(e)}")
        # Return fallback suggestions
        return {
            'energyType': 'Solar',
            'price': '0.12',
            'quantity': '500',
            'title': 'Solar Energy Surplus - 500 kWh',
            '_confidence': {
                'energyType': 0.50,
                'price': 0.50,
                'quantity': 0.50,
                'title': 0.50
            }
        }

@ai_bp.route('/analyze-market', methods=['GET'])
def analyze_market():
    """
    Analyze market trends and provide insights
    """
    try:
        with get_db_cursor() as (cur, conn):
            # Get market trends
            cur.execute("""
                SELECT 
                    energy_type,
                    COUNT(*) as listing_count,
                    AVG(price_per_kwh) as avg_price,
                    SUM(quantity_kwh) as total_capacity,
                    COUNT(CASE WHEN status = 'active' THEN 1 END) as active_count
                FROM energy_listings
                GROUP BY energy_type
                ORDER BY listing_count DESC
            """)
            
            trends = cur.fetchall()
            
            # Get recent activity
            cur.execute("""
                SELECT 
                    DATE(created_at) as date,
                    COUNT(*) as new_listings
                FROM energy_listings
                WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
                GROUP BY DATE(created_at)
                ORDER BY date DESC
                LIMIT 7
            """)
            
            recent_activity = cur.fetchall()
            
            # Generate insights
            insights = {
                'marketTrends': [
                    {
                        'energyType': trend['energy_type'],
                        'listingCount': trend['listing_count'],
                        'averagePrice': round(float(trend['avg_price']), 2),
                        'totalCapacity': int(trend['total_capacity']),
                        'activeListings': trend['active_count'],
                        'marketShare': round((trend['listing_count'] / sum(t['listing_count'] for t in trends)) * 100, 1)
                    }
                    for trend in trends
                ],
                'recentActivity': [
                    {
                        'date': activity['date'].isoformat(),
                        'newListings': activity['new_listings']
                    }
                    for activity in recent_activity
                ],
                'recommendations': generate_market_recommendations(trends)
            }
            
            return jsonify({
                'status': 'success',
                'data': insights
            }), 200
            
    except Exception as e:
        logger.error(f"Error analyzing market: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': 'Failed to analyze market',
            'error': str(e)
        }), 500

def generate_market_recommendations(trends):
    """
    Generate market recommendations based on trends
    """
    recommendations = []
    
    if not trends:
        return recommendations
    
    # Find most popular energy type
    most_popular = max(trends, key=lambda x: x['listing_count'])
    recommendations.append({
        'type': 'popular_energy',
        'message': f"{most_popular['energy_type']} is the most popular energy type with {most_popular['listing_count']} listings",
        'priority': 'high'
    })
    
    # Find best pricing opportunity
    best_price = min(trends, key=lambda x: x['avg_price'])
    recommendations.append({
        'type': 'pricing',
        'message': f"Consider {best_price['energy_type']} energy - lowest average price at {best_price['avg_price']:.2f} KSH/kWh",
        'priority': 'medium'
    })
    
    # Find capacity gaps
    total_capacity = sum(trend['total_capacity'] for trend in trends)
    for trend in trends:
        capacity_share = (trend['total_capacity'] / total_capacity) * 100
        if capacity_share < 10:  # Less than 10% market share
            recommendations.append({
                'type': 'opportunity',
                'message': f"{trend['energy_type']} has low market presence ({capacity_share:.1f}%) - potential opportunity",
                'priority': 'low'
            })
    
    return recommendations


