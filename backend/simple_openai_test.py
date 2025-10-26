#!/usr/bin/env python3
"""
Simple OpenAI API test without proxy issues
"""

import os
from dotenv import load_dotenv

load_dotenv()

def test_openai_simple():
    """Simple OpenAI API test"""
    api_key = os.getenv('OPENAI_API_KEY')
    
    if not api_key or api_key == "sk-your-actual-key-here":
        print("❌ OpenAI API key not configured")
        return False
    
    try:
        from openai import OpenAI
        
        # Create client with minimal config
        client = OpenAI(api_key=api_key)
        
        # Simple test
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": "Say 'Hello from EcoPower Hub!'"}],
            max_tokens=20
        )
        
        print("✅ OpenAI API is working!")
        print(f"Response: {response.choices[0].message.content}")
        return True
        
    except Exception as e:
        print(f"❌ OpenAI test failed: {e}")
        return False

if __name__ == '__main__':
    print("🧪 Simple OpenAI Test...")
    test_openai_simple()
