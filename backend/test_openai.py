#!/usr/bin/env python3
"""
Test script to verify OpenAI API key is working
"""

import os
from dotenv import load_dotenv

load_dotenv()

def test_openai_key():
    """Test if OpenAI API key is configured and working"""
    api_key = os.getenv('OPENAI_API_KEY')
    
    if not api_key:
        print("❌ OpenAI API key not found in .env file")
        print("Please add: OPENAI_API_KEY=sk-your-actual-key-here")
        return False
    
    if api_key == "sk-your-actual-key-here":
        print("❌ Please replace the placeholder with your actual OpenAI API key")
        return False
    
    if not api_key.startswith('sk-'):
        print("❌ OpenAI API key should start with 'sk-'")
        return False
    
    print(f"✅ OpenAI API key found: {api_key[:10]}...")
    
    # Test the API key with a simple request
    try:
        from openai import OpenAI
        client = OpenAI(api_key=api_key)
        
        # Simple test request
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": "Hello, this is a test."}],
            max_tokens=10
        )
        
        print("✅ OpenAI API key is working!")
        print(f"Test response: {response.choices[0].message.content}")
        return True
        
    except Exception as e:
        print(f"❌ OpenAI API test failed: {e}")
        return False

if __name__ == '__main__':
    print("🧪 Testing OpenAI API Key...")
    test_openai_key()
