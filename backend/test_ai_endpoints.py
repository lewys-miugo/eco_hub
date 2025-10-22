#!/usr/bin/env python3
"""
Test script for AI endpoints
Run this to test the AI integration functionality
"""

import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

BASE_URL = "http://localhost:5000"

def test_health():
    """Test health endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/api/health")
        print(f"✅ Health check: {response.status_code} - {response.json()}")
        return True
    except Exception as e:
        print(f"❌ Health check failed: {e}")
        return False

def register_test_user():
    """Register a test user"""
    try:
        user_data = {
            "name": "AI Test User",
            "email": "ai_test@example.com",
            "password": "testpassword123",
            "role": "consumer",
            "latitude": 40.7128,
            "longitude": -74.0060
        }
        
        response = requests.post(f"{BASE_URL}/api/v1/auth/register", json=user_data)
        
        if response.status_code == 201:
            data = response.json()
            print(f"✅ User registered: {data['user']['name']}")
            return data['access_token']
        else:
            print(f"❌ Registration failed: {response.status_code} - {response.json()}")
            return None
            
    except Exception as e:
        print(f"❌ Registration error: {e}")
        return None

def test_ai_advice(token):
    """Test AI advice endpoint"""
    try:
        headers = {"Authorization": f"Bearer {token}"}
        advice_data = {
            "location": "New York, NY",
            "roof_size": "2000 sq ft",
            "energy_usage": "1000 kWh/month",
            "budget": "$15000"
        }
        
        response = requests.post(f"{BASE_URL}/api/v1/ai/advice", json=advice_data, headers=headers)
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ AI Advice received:")
            print(f"   Advice: {data['advice'][:100]}...")
            print(f"   Carbon Savings: {data['carbon_savings_estimate']} kg CO2")
            return True
        else:
            print(f"❌ AI Advice failed: {response.status_code} - {response.json()}")
            return False
            
    except Exception as e:
        print(f"❌ AI Advice error: {e}")
        return False

def test_ai_listing_helper(token):
    """Test AI listing helper endpoint"""
    try:
        headers = {"Authorization": f"Bearer {token}"}
        listing_data = {
            "energy_type": "solar",
            "price_per_kwh": 0.12,
            "available_kwh": 300.0,
            "latitude": 40.7128,
            "longitude": -74.0060
        }
        
        response = requests.post(f"{BASE_URL}/api/v1/ai/listing-helper", json=listing_data, headers=headers)
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ AI Listing Helper:")
            print(f"   Title: {data['title']}")
            print(f"   Description: {data['description']}")
            return True
        else:
            print(f"❌ AI Listing Helper failed: {response.status_code} - {response.json()}")
            return False
            
    except Exception as e:
        print(f"❌ AI Listing Helper error: {e}")
        return False

def test_ai_match(token):
    """Test AI match endpoint"""
    try:
        headers = {"Authorization": f"Bearer {token}"}
        params = {
            "energy_type": "solar",
            "max_distance": 25,
            "limit": 10
        }
        
        response = requests.get(f"{BASE_URL}/api/v1/ai/match", params=params, headers=headers)
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ AI Match:")
            print(f"   Found {data['total_found']} listings")
            if data['listings']:
                print(f"   Top listing: {data['listings'][0]['title']}")
            return True
        else:
            print(f"❌ AI Match failed: {response.status_code} - {response.json()}")
            return False
            
    except Exception as e:
        print(f"❌ AI Match error: {e}")
        return False

def main():
    """Run all tests"""
    print("🧪 Testing EcoPower Hub AI Integration...")
    print("=" * 50)
    
    # Test health
    if not test_health():
        print("❌ Server not running. Please start the Flask app first.")
        return
    
    # Register user
    token = register_test_user()
    if not token:
        print("❌ Cannot proceed without authentication token")
        return
    
    print("\n🤖 Testing AI Endpoints...")
    print("-" * 30)
    
    # Test AI endpoints
    test_ai_advice(token)
    test_ai_listing_helper(token)
    test_ai_match(token)
    
    print("\n🎉 AI Integration testing completed!")
    print("\n📝 Note: Some tests may fail if OpenAI API key is not configured.")
    print("   This is expected for development without API keys.")

if __name__ == '__main__':
    main()
