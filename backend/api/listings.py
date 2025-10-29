"""
Energy Listings API Endpoints
provides CRUD operations for energy listings
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from database.config import get_db_cursor
import logging
import os
import time
from werkzeug.utils import secure_filename

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
                id, title, energy_type, available_kwh, price_per_kwh, 
                status, location, description, image_url,
                created_at, updated_at
            FROM listings
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
        
        query += " ORDER BY COALESCE(created_at, '1970-01-01'::timestamp) DESC, id DESC"
        
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
                    'quantity': listing['available_kwh'],
                    'price': str(listing['price_per_kwh']),
                    'status': listing['status'],
                    'location': listing['location'],
                    'description': listing['description'],
                    'imageUrl': listing.get('image_url'),  # Add image URL
                    'createdAt': listing['created_at'].isoformat() if listing['created_at'] else None,
                    'updatedAt': listing['updated_at'].isoformat() if listing['updated_at'] else None
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
                    id, title, energy_type, available_kwh, price_per_kwh, 
                    status, location, description, image_url,
                    created_at, updated_at
                FROM listings 
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
                'quantity': listing['available_kwh'],
                'price': str(listing['price_per_kwh']),
                'status': listing['status'],
                'location': listing['location'],
                'description': listing['description'],
                'imageUrl': listing.get('image_url'),  # Add image URL
                'createdAt': listing['created_at'].isoformat() if listing['created_at'] else None,
                'updatedAt': listing['updated_at'].isoformat() if listing['updated_at'] else None
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
@jwt_required()
def create_listing():
    """
    Create a new energy listing
    Requires authentication
    """
    try:
        # Get authenticated user ID
        user_id = get_jwt_identity()
        logger.info(f"POST /api/listings endpoint called by user {user_id}")
        
        # Check if request is multipart/form-data (file upload) or JSON
        is_form_data = request.content_type and 'multipart/form-data' in request.content_type
        
        if is_form_data:
            # Handle FormData (file upload)
            data = {}
            data['title'] = request.form.get('title')
            data['energyType'] = request.form.get('energyType')
            data['quantity'] = request.form.get('quantity')
            data['price'] = request.form.get('price')
            data['location'] = request.form.get('location')
            data['status'] = request.form.get('status', 'active')
            data['description'] = request.form.get('description', '')
            
            # Handle image file upload
            image_file = request.files.get('image')
            image_url = None
            
            if image_file and image_file.filename:
                # Save file to disk and store only the file path
                upload_folder = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'uploads', 'listings')
                os.makedirs(upload_folder, exist_ok=True)  # Create directory if it doesn't exist
                
                filename = secure_filename(image_file.filename)
                # Add timestamp to make filename unique
                timestamp = int(time.time())
                unique_filename = f"{timestamp}_{filename}"
                file_path = os.path.join(upload_folder, unique_filename)
                
                image_file.save(file_path)
                # Store only the relative path, not full path or base64
                image_url = f"/uploads/listings/{unique_filename}"
                logger.info(f"Image file saved: {unique_filename}, size: {os.path.getsize(file_path)} bytes, path: {image_url}")
            
            logger.info(f"Received FormData with keys: {list(data.keys())}, image present: {image_file is not None}")
        else:
            # Handle JSON request (backward compatibility)
            data = request.get_json()
            logger.info(f"Received JSON data keys: {list(data.keys())}")
            
            # Debug: Check imageUrl in received data
            has_image = data.get('imageUrl') is not None and data.get('imageUrl') != '' and data.get('imageUrl') != 'null'
            logger.info(f"ImageUrl present in request: {has_image}")
            if has_image:
                img_len = len(str(data.get('imageUrl')))
                logger.info(f"ImageUrl length: {img_len} characters")
            image_url = data.get('imageUrl', None)
        
        # Validate required fields
        required_fields = ['title', 'energyType', 'quantity', 'price', 'location']
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
                INSERT INTO listings
                (user_id, title, energy_type, available_kwh, price_per_kwh, location, description, image_url, status)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id, created_at, updated_at
            """, (
                user_id,
                data['title'],
                data['energyType'],
                quantity,
                price,
                data['location'],
                data.get('description', ''),
                image_url,  # Use image_url from FormData or JSON
                data.get('status', 'active')
            ))
            
            result = cur.fetchone()
            conn.commit()
            
            # Debug: Log saved image status
            if image_url:
                logger.info(f"Listing {result['id']} created with image_url")
            else:
                logger.info(f"Listing {result['id']} created without image_url")
            
            return jsonify({
                'status': 'success',
                'message': 'Listing created successfully',
                'data': {
                    'id': result['id'],
                    'createdAt': result['created_at'].isoformat() if result['created_at'] else None,
                    'updatedAt': result['updated_at'].isoformat() if result['updated_at'] else None
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
            'quantity': 'available_kwh',
            'price': 'price_per_kwh',
            'status': 'status',
            'location': 'location',
            'description': 'description',
            'imageUrl': 'image_url'  # Add image URL support
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
            cur.execute("SELECT id FROM listings WHERE id = %s", (listing_id,))
            if not cur.fetchone():
                return jsonify({
                    'status': 'error',
                    'message': 'Listing not found'
                }), 404
            
            # Update the listing
            query = f"""
                UPDATE listings 
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
            cur.execute("SELECT id FROM listings WHERE id = %s", (listing_id,))
            if not cur.fetchone():
                return jsonify({
                    'status': 'error',
                    'message': 'Listing not found'
                }), 404
            
            # Delete the listing
            cur.execute("DELETE FROM listings WHERE id = %s", (listing_id,))
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



