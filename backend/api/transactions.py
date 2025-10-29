"""
Transactions API Endpoints
Records consumer purchases and exposes buyer history and totals
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from database.config import get_db_cursor
import logging
from datetime import datetime

transactions_bp = Blueprint('transactions', __name__, url_prefix='/api/transactions')

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@transactions_bp.route('/', methods=['POST'])
@jwt_required()
def create_transaction():
    """
    Create a transaction for a purchase by the authenticated consumer
    Expected JSON: { listingId: number, kwh: number }
    """
    try:
        data = request.get_json() or {}
        buyer_id = get_jwt_identity()
        listing_id = data.get('listingId')
        kwh_amount = data.get('kwh')

        if not listing_id or not kwh_amount:
            return jsonify({'status': 'error', 'message': 'listingId and kwh are required'}), 400

        with get_db_cursor() as (cur, conn):
            # Fetch listing details to determine seller and price
            cur.execute(
                """
                SELECT l.id, l.user_id AS seller_id, l.price_per_kwh, l.location
                FROM listings l
                WHERE l.id = %s
                """,
                (listing_id,)
            )
            listing = cur.fetchone()
            if not listing:
                return jsonify({'status': 'error', 'message': 'Listing not found'}), 404

            total_price = float(listing['price_per_kwh']) * float(kwh_amount)

            # Insert transaction as completed now
            cur.execute(
                """
                INSERT INTO transactions (buyer_id, seller_id, listing_id, kwh_amount, total_price, status, created_at, completed_at)
                VALUES (%s, %s, %s, %s, %s, 'completed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                RETURNING id, created_at, completed_at
                """,
                (buyer_id, listing['seller_id'], listing_id, kwh_amount, total_price)
            )
            tx = cur.fetchone()
            conn.commit()

            return jsonify({
                'status': 'success',
                'data': {
                    'id': tx['id'],
                    'buyerId': buyer_id,
                    'sellerId': listing['seller_id'],
                    'listingId': listing_id,
                    'kwh': float(kwh_amount),
                    'totalPrice': total_price,
                    'createdAt': tx['created_at'].isoformat() if tx['created_at'] else None,
                    'completedAt': tx['completed_at'].isoformat() if tx['completed_at'] else None,
                }
            }), 201

    except Exception as e:
        logger.error(f"Error creating transaction: {str(e)}")
        return jsonify({'status': 'error', 'message': 'Failed to create transaction', 'error': str(e)}), 500


@transactions_bp.route('/me', methods=['GET'])
@jwt_required()
def get_my_transactions():
    """
    Get purchase history for the authenticated consumer (as buyer)
    """
    try:
        buyer_id = get_jwt_identity()
        with get_db_cursor() as (cur, conn):
            cur.execute(
                """
                SELECT t.id, t.kwh_amount, t.total_price, t.created_at,
                       l.location, l.energy_type
                FROM transactions t
                JOIN listings l ON l.id = t.listing_id
                WHERE t.buyer_id = %s
                ORDER BY t.created_at DESC, t.id DESC
                """,
                (buyer_id,)
            )
            rows = cur.fetchall()
            history = []
            for r in rows:
                history.append({
                    'id': r['id'],
                    'date': r['created_at'].isoformat() if r['created_at'] else None,
                    'location': r['location'],
                    'energyType': r['energy_type'],
                    'kwh': float(r['kwh_amount']),
                    'totalPrice': float(r['total_price']),
                })
            return jsonify({'status': 'success', 'data': history}), 200
    except Exception as e:
        logger.error(f"Error fetching transactions: {str(e)}")
        return jsonify({'status': 'error', 'message': 'Failed to fetch transactions', 'error': str(e)}), 500


@transactions_bp.route('/me/summary', methods=['GET'])
@jwt_required()
def get_my_summary():
    """
    Get aggregated totals for the authenticated consumer purchases
    Returns: { totalKwh, totalExpenditure }
    """
    try:
        buyer_id = get_jwt_identity()
        with get_db_cursor() as (cur, conn):
            cur.execute(
                """
                SELECT COALESCE(SUM(kwh_amount), 0) AS total_kwh,
                       COALESCE(SUM(total_price), 0) AS total_spend
                FROM transactions
                WHERE buyer_id = %s
                """,
                (buyer_id,)
            )
            row = cur.fetchone() or {'total_kwh': 0, 'total_spend': 0}
            return jsonify({
                'status': 'success',
                'data': {
                    'totalKwh': float(row['total_kwh'] or 0),
                    'totalExpenditure': float(row['total_spend'] or 0)
                }
            }), 200
    except Exception as e:
        logger.error(f"Error fetching purchase summary: {str(e)}")
        return jsonify({'status': 'error', 'message': 'Failed to fetch summary', 'error': str(e)}), 500


@transactions_bp.route('/sales', methods=['GET'])
@jwt_required()
def get_my_sales():
    """
    Get sales history for the authenticated supplier (as seller)
    """
    try:
        seller_id = get_jwt_identity()
        with get_db_cursor() as (cur, conn):
            cur.execute(
                """
                SELECT t.id, t.kwh_amount, t.total_price, t.created_at,
                       l.location, l.energy_type, l.title, l.id AS listing_id
                FROM transactions t
                JOIN listings l ON l.id = t.listing_id
                WHERE t.seller_id = %s
                ORDER BY t.created_at DESC, t.id DESC
                """,
                (seller_id,)
            )
            rows = cur.fetchall()
            sales = []
            for r in rows:
                sales.append({
                    'id': r['id'],
                    'date': r['created_at'].isoformat() if r['created_at'] else None,
                    'listingId': r['listing_id'],
                    'listingTitle': r['title'],
                    'location': r['location'],
                    'energyType': r['energy_type'],
                    'kwh': float(r['kwh_amount']),
                    'totalPrice': float(r['total_price']),
                })
            return jsonify({'status': 'success', 'data': sales}), 200
    except Exception as e:
        logger.error(f"Error fetching sales: {str(e)}")
        return jsonify({'status': 'error', 'message': 'Failed to fetch sales', 'error': str(e)}), 500


@transactions_bp.route('/sales/summary', methods=['GET'])
@jwt_required()
def get_my_sales_summary():
    """
    Get aggregated sales totals for the authenticated supplier
    Returns: { totalKwh, totalRevenue }
    """
    try:
        seller_id = get_jwt_identity()
        with get_db_cursor() as (cur, conn):
            cur.execute(
                """
                SELECT COALESCE(SUM(kwh_amount), 0) AS total_kwh,
                       COALESCE(SUM(total_price), 0) AS total_revenue
                FROM transactions
                WHERE seller_id = %s
                """,
                (seller_id,)
            )
            row = cur.fetchone() or {'total_kwh': 0, 'total_revenue': 0}
            return jsonify({
                'status': 'success',
                'data': {
                    'totalKwh': float(row['total_kwh'] or 0),
                    'totalRevenue': float(row['total_revenue'] or 0)
                }
            }), 200
    except Exception as e:
        logger.error(f"Error fetching sales summary: {str(e)}")
        return jsonify({'status': 'error', 'message': 'Failed to fetch sales summary', 'error': str(e)}), 500


