"""
Energy Listings API Endpoints
provides CRUD operations for energy listings
"""

from flask import Blueprint, request, jsonify
from database.config import get_db_cursor
import logging

# Create blueprint for listings API
listings_bp = Blueprint('listings', __name__, url_prefix='/api/listings')

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@listings_bp.route('/', methods=['GET'])
def get_all_listings():
    """
    Get all energy listings
    Supports filtering by status and energy_type
    """
    try:
        # Get query parameters
        status = request.args.get('status')
        energy_type = request.args.get('energy_type')
        limit = request.args.get('limit', type=int)
        
        # Build query
        query = """
            SELECT 
                id, title, energy_type, quantity_kwh, price_per_kwh, 
                status, location, seller_account, description,
                created_at, updated_at
            FROM energy_listings
        """
        
        conditions = []
        params = []
        
        if status:
            conditions.append("status = %s")
            params.append(status)
        
        if energy_type:
            conditions.append("energy_type = %s")
            params.append(energy_type)
        
        if conditions:
            query += " WHERE " + " AND ".join(conditions)
        
        query += " ORDER BY created_at DESC"
        
        if limit:
            query += " LIMIT %s"
            params.append(limit)
        
        with get_db_cursor() as (cur, conn):
            cur.execute(query, params)
            listings = cur.fetchall()
            
            # Convert to list of dictionaries
            result = []
            for listing in listings:
                result.append({
                    'id': listing['id'],
                    'title': listing['title'],
                    'energyType': listing['energy_type'],
                    'quantity': listing['quantity_kwh'],
                    'price': str(listing['price_per_kwh']),
                    'status': listing['status'],
                    'location': listing['location'],
                    'sellerAccount': listing['seller_account'],
                    'description': listing['description'],
                    'createdAt': listing['created_at'].isoformat(),
                    'updatedAt': listing['updated_at'].isoformat()
                })
            
            return jsonify({
                'status': 'success',
                'data': result,
                'count': len(result)
            }), 200
            
    except Exception as e:
        logger.error(f"Error getting listings: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': 'Failed to retrieve listings',
            'error': str(e)
        }), 500

@listings_bp.route('/<int:listing_id>', methods=['GET'])
def get_listing_by_id(listing_id):
    """
    Get a specific energy listing by ID
    """
    try:
        with get_db_cursor() as (cur, conn):
            cur.execute("""
                SELECT 
                    id, title, energy_type, quantity_kwh, price_per_kwh, 
                    status, location, seller_account, description,
                    created_at, updated_at
                FROM energy_listings 
                WHERE id = %s
            """, (listing_id,))
            
            listing = cur.fetchone()
            
            if not listing:
                return jsonify({
                    'status': 'error',
                    'message': 'Listing not found'
                }), 404
            
            result = {
                'id': listing['id'],
                'title': listing['title'],
                'energyType': listing['energy_type'],
                'quantity': listing['quantity_kwh'],
                'price': str(listing['price_per_kwh']),
                'status': listing['status'],
                'location': listing['location'],
                'sellerAccount': listing['seller_account'],
                'description': listing['description'],
                'createdAt': listing['created_at'].isoformat(),
                'updatedAt': listing['updated_at'].isoformat()
            }
            
            return jsonify({
                'status': 'success',
                'data': result
            }), 200
            
    except Exception as e:
        logger.error(f"Error getting listing {listing_id}: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': 'Failed to retrieve listing',
            'error': str(e)
        }), 500

@listings_bp.route('/', methods=['POST'])
def create_listing():
    """
    Create a new energy listing
    """
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['title', 'energyType', 'quantity', 'price', 'location', 'sellerAccount']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({
                    'status': 'error',
                    'message': f'Missing required field: {field}'
                }), 400
        
        # Validate energy type
        valid_energy_types = ['Solar', 'Wind', 'Hydro', 'Biomass', 'Geothermal']
        if data['energyType'] not in valid_energy_types:
            return jsonify({
                'status': 'error',
                'message': f'Invalid energy type. Must be one of: {", ".join(valid_energy_types)}'
            }), 400
        
        # Validate numeric fields
        try:
            quantity = int(data['quantity'])
            price = float(data['price'])
            
            if quantity <= 0:
                return jsonify({
                    'status': 'error',
                    'message': 'Quantity must be greater than 0'
                }), 400
            
            if price <= 0:
                return jsonify({
                    'status': 'error',
                    'message': 'Price must be greater than 0'
                }), 400
                
        except (ValueError, TypeError):
            return jsonify({
                'status': 'error',
                'message': 'Quantity must be an integer and price must be a number'
            }), 400
        
        with get_db_cursor() as (cur, conn):
            cur.execute("""
                INSERT INTO energy_listings 
                (title, energy_type, quantity_kwh, price_per_kwh, status, location, seller_account, description)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id, created_at, updated_at
            """, (
                data['title'],
                data['energyType'],
                quantity,
                price,
                data.get('status', 'active'),
                data['location'],
                data['sellerAccount'],
                data.get('description', '')
            ))
            
            result = cur.fetchone()
            conn.commit()
            
            return jsonify({
                'status': 'success',
                'message': 'Listing created successfully',
                'data': {
                    'id': result['id'],
                    'createdAt': result['created_at'].isoformat(),
                    'updatedAt': result['updated_at'].isoformat()
                }
            }), 201
            
    except Exception as e:
        logger.error(f"Error creating listing: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': 'Failed to create listing',
            'error': str(e)
        }), 500

@listings_bp.route('/<int:listing_id>', methods=['PUT'])
def update_listing(listing_id):
    """
    Update an existing energy listing
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'status': 'error',
                'message': 'No data provided'
            }), 400
        
        # Build dynamic update query
        update_fields = []
        params = []
        
        # Map frontend field names to database column names
        field_mapping = {
            'title': 'title',
            'energyType': 'energy_type',
            'quantity': 'quantity_kwh',
            'price': 'price_per_kwh',
            'status': 'status',
            'location': 'location',
            'sellerAccount': 'seller_account',
            'description': 'description'
        }
        
        for frontend_field, db_field in field_mapping.items():
            if frontend_field in data:
                update_fields.append(f"{db_field} = %s")
                params.append(data[frontend_field])
        
        if not update_fields:
            return jsonify({
                'status': 'error',
                'message': 'No valid fields to update'
            }), 400
        
        # Validate energy type if provided
        if 'energyType' in data:
            valid_energy_types = ['Solar', 'Wind', 'Hydro', 'Biomass', 'Geothermal']
            if data['energyType'] not in valid_energy_types:
                return jsonify({
                    'status': 'error',
                    'message': f'Invalid energy type. Must be one of: {", ".join(valid_energy_types)}'
                }), 400
        
        # Validate numeric fields if provided
        if 'quantity' in data:
            try:
                quantity = int(data['quantity'])
                if quantity <= 0:
                    return jsonify({
                        'status': 'error',
                        'message': 'Quantity must be greater than 0'
                    }), 400
            except (ValueError, TypeError):
                return jsonify({
                    'status': 'error',
                    'message': 'Quantity must be an integer'
                }), 400
        
        if 'price' in data:
            try:
                price = float(data['price'])
                if price <= 0:
                    return jsonify({
                        'status': 'error',
                        'message': 'Price must be greater than 0'
                    }), 400
            except (ValueError, TypeError):
                return jsonify({
                    'status': 'error',
                    'message': 'Price must be a number'
                }), 400
        
        params.append(listing_id)
        
        with get_db_cursor() as (cur, conn):
            # Check if listing exists
            cur.execute("SELECT id FROM energy_listings WHERE id = %s", (listing_id,))
            if not cur.fetchone():
                return jsonify({
                    'status': 'error',
                    'message': 'Listing not found'
                }), 404
            
            # Update the listing
            query = f"""
                UPDATE energy_listings 
                SET {', '.join(update_fields)}, updated_at = CURRENT_TIMESTAMP
                WHERE id = %s
                RETURNING updated_at
            """
            
            cur.execute(query, params)
            result = cur.fetchone()
            conn.commit()
            
            return jsonify({
                'status': 'success',
                'message': 'Listing updated successfully',
                'data': {
                    'updatedAt': result['updated_at'].isoformat()
                }
            }), 200
            
    except Exception as e:
        logger.error(f"Error updating listing {listing_id}: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': 'Failed to update listing',
            'error': str(e)
        }), 500

@listings_bp.route('/<int:listing_id>', methods=['DELETE'])
def delete_listing(listing_id):
    """
    Delete an energy listing
    """
    try:
        with get_db_cursor() as (cur, conn):
            # Check if listing exists
            cur.execute("SELECT id FROM energy_listings WHERE id = %s", (listing_id,))
            if not cur.fetchone():
                return jsonify({
                    'status': 'error',
                    'message': 'Listing not found'
                }), 404
            
            # Delete the listing
            cur.execute("DELETE FROM energy_listings WHERE id = %s", (listing_id,))
            conn.commit()
            
            return jsonify({
                'status': 'success',
                'message': 'Listing deleted successfully'
            }), 200
            
    except Exception as e:
        logger.error(f"Error deleting listing {listing_id}: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': 'Failed to delete listing',
            'error': str(e)
        }), 500



