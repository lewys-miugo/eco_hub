import os
import requests
import openai
from typing import Dict, List, Optional, Tuple
import json

class AIService:
    """Service class for AI integrations with OpenAI and Carbon Interface"""
    
    def __init__(self):
        self.openai_api_key = os.getenv('OPENAI_API_KEY')
        self.carbon_interface_api_key = os.getenv('CARBON_INTERFACE_API_KEY')
        self.carbon_interface_base_url = "https://www.carboninterface.com/api/v1"
        
        # Initialize OpenAI client
        if self.openai_api_key:
            try:
                from openai import OpenAI
                self.openai_client = OpenAI(api_key=self.openai_api_key)
                print("✅ OpenAI client initialized successfully")
            except Exception as e:
                print(f"Warning: OpenAI client initialization failed: {e}")
                self.openai_client = None
        else:
            print("Warning: OpenAI API key not found")
            self.openai_client = None
    
    def get_renewable_energy_advice(self, user_input: Dict) -> Dict:
        """
        Get personalized renewable energy advice using OpenAI with emojis and climate action focus
        
        Args:
            user_input: Dictionary containing user details like location, roof_size, energy_usage, etc.
        
        Returns:
            Dictionary with AI advice, carbon savings estimate, and emojis
        """
        try:
            # Construct the prompt for OpenAI
            prompt = self._build_advice_prompt(user_input)
            
            # Call OpenAI API
            if not self.openai_client:
                raise Exception("OpenAI client not initialized")
                
            response = self.openai_client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are an expert renewable energy advisor for EcoPower Hub, an AI-powered renewable energy platform. Provide personalized, actionable advice for transitioning to clean energy. Always include relevant emojis to make the advice engaging and climate-focused. Focus on SDG 13 (Climate Action) and emphasize environmental impact."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=600,
                temperature=0.7
            )
            
            ai_response = response.choices[0].message.content
            
            # Get carbon savings estimate
            carbon_savings = self._estimate_carbon_savings(user_input)
            
            # Extract emojis from response
            emojis = self._extract_emojis(ai_response)
            
            return {
                'advice': ai_response,
                'carbon_savings_estimate': carbon_savings,
                'emojis': emojis,
                'metadata': {
                    'location': user_input.get('location'),
                    'roof_size': user_input.get('roof_size'),
                    'energy_usage': user_input.get('energy_usage'),
                    'budget': user_input.get('budget')
                }
            }
            
        except Exception as e:
            error_msg = str(e)
            if "quota" in error_msg.lower() or "insufficient_quota" in error_msg.lower():
                print("OpenAI quota exceeded - using fallback response")
                return {
                    'advice': "I'm currently experiencing high demand. Here's some general renewable energy advice: Consider solar panels for your roof, they can reduce your electricity bill by 50-90%. Wind energy is great for open areas. Check our marketplace for local suppliers!",
                    'carbon_savings_estimate': 500,
                    'emojis': ['☀️', '💡', '🌱'],
                    'metadata': {
                        'location': user_input.get('location'),
                        'roof_size': user_input.get('roof_size'),
                        'energy_usage': user_input.get('energy_usage'),
                        'budget': user_input.get('budget'),
                        'fallback': True
                    }
                }
            else:
                return {
                    'error': f"AI service error: {str(e)}",
                    'advice': "I'm sorry, I'm having trouble providing advice right now. Please try again later. 🌱",
                    'carbon_savings_estimate': 0,
                    'emojis': ['🌱']
                }
    
    def generate_listing_content(self, listing_data: Dict) -> Dict:
        """
        Generate attractive listing content using OpenAI with emojis
        
        Args:
            listing_data: Dictionary containing energy_type, price, location, etc.
        
        Returns:
            Dictionary with generated title, description, and emojis
        """
        try:
            prompt = self._build_listing_prompt(listing_data)
            
            if not self.openai_client:
                raise Exception("OpenAI client not initialized")
                
            response = self.openai_client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a marketing expert for EcoPower Hub renewable energy marketplace. Create compelling, clear listings that attract buyers. Always include relevant emojis to make listings engaging and climate-focused. Focus on environmental benefits and community impact."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=400,
                temperature=0.8
            )
            
            ai_response = response.choices[0].message.content
            
            # Parse the response to extract title and description
            title, description = self._parse_listing_response(ai_response)
            
            # Extract emojis from the generated content
            emojis = self._extract_emojis(ai_response)
            
            return {
                'title': title,
                'description': description,
                'suggested_price': listing_data.get('price_per_kwh'),
                'emojis': emojis,
                'metadata': listing_data
            }
            
        except Exception as e:
            error_msg = str(e)
            if "quota" in error_msg.lower() or "insufficient_quota" in error_msg.lower():
                print("OpenAI quota exceeded - using fallback listing content")
                energy_type = listing_data.get('energy_type', 'Renewable')
                return {
                    'title': f"Premium {energy_type} Energy - Clean & Reliable",
                    'description': f"High-quality {energy_type.lower()} energy available for purchase. Reduce your carbon footprint and save money!",
                    'emojis': ['☀️', '🌱', '💡'],
                    'fallback': True
                }
            else:
                return {
                    'error': f"AI service error: {str(e)}",
                    'title': f"🌱 {listing_data.get('energy_type', 'Renewable')} Energy Available",
                    'description': f"Clean {listing_data.get('energy_type', 'renewable')} energy available for purchase. 🌍",
                    'emojis': ['🌱', '🌍']
                }
    
    def rank_nearby_sellers(self, user_location: Tuple[float, float], listings: List[Dict]) -> List[Dict]:
        """
        AI-powered ranking of nearby energy sellers
        
        Args:
            user_location: Tuple of (latitude, longitude)
            listings: List of listing dictionaries
        
        Returns:
            List of ranked listings with AI scores
        """
        try:
            # Calculate distance and other factors
            ranked_listings = []
            
            for listing in listings:
                # Calculate distance (simple Euclidean distance for MVP)
                distance = self._calculate_distance(user_location, (listing['latitude'], listing['longitude']))
                
                # AI scoring factors
                price_score = self._calculate_price_score(listing['price_per_kwh'])
                availability_score = self._calculate_availability_score(listing['available_kwh'])
                energy_type_score = self._calculate_energy_type_score(listing['energy_type'])
                
                # Combined AI score
                ai_score = (price_score * 0.4 + availability_score * 0.3 + energy_type_score * 0.3)
                
                ranked_listing = {
                    **listing,
                    'distance_km': round(distance, 2),
                    'ai_score': round(ai_score, 2),
                    'price_score': price_score,
                    'availability_score': availability_score,
                    'energy_type_score': energy_type_score
                }
                
                ranked_listings.append(ranked_listing)
            
            # Sort by AI score (highest first)
            ranked_listings.sort(key=lambda x: x['ai_score'], reverse=True)
            
            return ranked_listings
            
        except Exception as e:
            # Fallback to distance-based ranking
            return self._fallback_distance_ranking(user_location, listings)
    
    def get_carbon_footprint_data(self, location: str, energy_type: str = "solar") -> Dict:
        """
        Get carbon footprint data from Carbon Interface API
        
        Args:
            location: Location string (city, state, country)
            energy_type: Type of renewable energy
        
        Returns:
            Dictionary with carbon footprint data
        """
        try:
            if not self.carbon_interface_api_key:
                return {'error': 'Carbon Interface API key not configured'}
            
            # This is a simplified example - you'd need to implement actual Carbon Interface API calls
            # based on their documentation
            headers = {
                'Authorization': f'Bearer {self.carbon_interface_api_key}',
                'Content-Type': 'application/json'
            }
            
            # Example API call (you'll need to adjust based on Carbon Interface documentation)
            response = requests.get(
                f"{self.carbon_interface_base_url}/estimates",
                headers=headers,
                params={'location': location, 'energy_type': energy_type}
            )
            
            if response.status_code == 200:
                return response.json()
            else:
                return {'error': f'Carbon Interface API error: {response.status_code}'}
                
        except Exception as e:
            return {'error': f'Carbon Interface service error: {str(e)}'}
    
    def _build_advice_prompt(self, user_input: Dict) -> str:
        """Build the prompt for renewable energy advice with climate action focus"""
        # Check if this is a chat message or structured advice request
        if user_input.get('message'):
            # Chat message - use the user's message directly with context
            message = user_input.get('message', '')
            location = user_input.get('location', '')
            role = user_input.get('role', 'consumer')
            
            context_parts = []
            if location:
                context_parts.append(f"User location: {location}")
            context_parts.append(f"User role: {role}")
            
            context = " | ".join(context_parts) if context_parts else ""
            
            return f"""
            The user asked: "{message}"
            {f"Context: {context}" if context else ""}
            
            Provide a helpful, conversational response about renewable energy. Include:
            - Practical advice related to their question
            - Relevant emojis to make it engaging
            - Focus on climate action (SDG 13) and environmental benefits
            - Reference to the EcoPower Hub marketplace if relevant
            - Keep it conversational and friendly
            
            Respond naturally as an AI Renewable Energy Advisor for EcoPower Hub.
            """
        else:
            # Structured advice request
            location = user_input.get('location', 'your area')
            roof_size = user_input.get('roof_size', 'unknown')
            energy_usage = user_input.get('energy_usage', 'unknown')
            budget = user_input.get('budget', 'flexible')
            
            return f"""
            I'm looking for renewable energy advice for my home through EcoPower Hub. Here are my details:
            - Location: {location}
            - Roof size: {roof_size}
            - Current energy usage: {energy_usage} kWh/month
            - Budget: {budget}
            
            Please provide personalized recommendations for:
            1. Best renewable energy options for my situation (solar, wind, etc.)
            2. Estimated costs and savings with ROI timeline
            3. Environmental impact and CO2 reduction potential
            4. Timeline for implementation
            5. Any specific considerations for my location
            6. How to connect with local energy suppliers through our marketplace
            
            Focus on climate action (SDG 13) and make the advice engaging with relevant emojis. 
            Emphasize the environmental benefits and community impact of renewable energy adoption.
            Keep the advice practical, actionable, and inspiring for climate action.
            """
    
    def _build_listing_prompt(self, listing_data: Dict) -> str:
        """Build the prompt for listing generation with climate focus"""
        energy_type = listing_data.get('energy_type', 'renewable')
        price = listing_data.get('price_per_kwh', 'competitive')
        location = listing_data.get('location', 'our location')
        available_kwh = listing_data.get('available_kwh', 'various amounts')
        
        return f"""
        Create an attractive listing for selling {energy_type} energy on EcoPower Hub marketplace:
        - Energy type: {energy_type}
        - Price per kWh: ${price}
        - Location: {location}
        - Available amount: {available_kwh} kWh
        
        Generate:
        1. A compelling title (max 60 characters) with relevant emojis
        2. A clear description (max 250 characters) emphasizing environmental benefits
        
        Focus on:
        - Climate action and environmental impact
        - Community benefits of renewable energy
        - Clean, sustainable energy for neighbors
        - SDG 13 (Climate Action) alignment
        
        Include relevant emojis like 🌱, 🌍, ⚡, 🌞, 💚, etc.
        Format as: TITLE: [title] | DESCRIPTION: [description]
        """
    
    def _parse_listing_response(self, ai_response: str) -> Tuple[str, str]:
        """Parse AI response to extract title and description"""
        try:
            lines = ai_response.split('\n')
            title = "Renewable Energy Available"
            description = "Clean renewable energy available for purchase."
            
            for line in lines:
                if line.startswith('TITLE:'):
                    title = line.replace('TITLE:', '').strip()
                elif line.startswith('DESCRIPTION:'):
                    description = line.replace('DESCRIPTION:', '').strip()
            
            return title, description
        except:
            return "Renewable Energy Available", "Clean renewable energy available for purchase."
    
    def _estimate_carbon_savings(self, user_input: Dict) -> float:
        """Estimate carbon savings based on user input"""
        # Simplified calculation - in real implementation, you'd use Carbon Interface API
        energy_usage = user_input.get('energy_usage', 0)
        if isinstance(energy_usage, str):
            try:
                energy_usage = float(energy_usage)
            except:
                energy_usage = 0
        
        # Rough estimate: 0.5 kg CO2 per kWh saved
        return energy_usage * 0.5
    
    def _calculate_distance(self, point1: Tuple[float, float], point2: Tuple[float, float]) -> float:
        """Calculate distance between two points in kilometers"""
        from math import radians, cos, sin, asin, sqrt
        
        lat1, lon1 = point1
        lat2, lon2 = point2
        
        # Haversine formula
        R = 6371  # Earth's radius in kilometers
        
        dlat = radians(lat2 - lat1)
        dlon = radians(lon2 - lon1)
        a = sin(dlat/2)**2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon/2)**2
        c = 2 * asin(sqrt(a))
        
        return R * c
    
    def _calculate_price_score(self, price: float) -> float:
        """Calculate price score (lower price = higher score)"""
        # Normalize price score (0-1, where 1 is best)
        # Assuming $0.10-$0.50 per kWh range
        if price <= 0.10:
            return 1.0
        elif price >= 0.50:
            return 0.0
        else:
            return 1.0 - ((price - 0.10) / 0.40)
    
    def _calculate_availability_score(self, available_kwh: float) -> float:
        """Calculate availability score"""
        # More available energy = higher score
        if available_kwh >= 1000:
            return 1.0
        elif available_kwh >= 500:
            return 0.8
        elif available_kwh >= 100:
            return 0.6
        else:
            return 0.4
    
    def _calculate_energy_type_score(self, energy_type: str) -> float:
        """Calculate energy type preference score"""
        # Solar gets highest score, others get good scores too
        energy_scores = {
            'solar': 1.0,
            'wind': 0.9,
            'hydro': 0.8,
            'geothermal': 0.9,
            'biomass': 0.7
        }
        return energy_scores.get(energy_type.lower(), 0.5)
    
    def _extract_emojis(self, text: str) -> List[str]:
        """Extract emojis from text"""
        import re
        # Unicode ranges for emojis
        emoji_pattern = re.compile(
            "["
            "\U0001F600-\U0001F64F"  # emoticons
            "\U0001F300-\U0001F5FF"  # symbols & pictographs
            "\U0001F680-\U0001F6FF"  # transport & map symbols
            "\U0001F1E0-\U0001F1FF"  # flags (iOS)
            "\U00002702-\U000027B0"  # dingbats
            "\U000024C2-\U0001F251"  # enclosed characters
            "]+", flags=re.UNICODE)
        
        emojis = emoji_pattern.findall(text)
        return list(set(emojis))  # Remove duplicates
    
    def _fallback_distance_ranking(self, user_location: Tuple[float, float], listings: List[Dict]) -> List[Dict]:
        """Fallback to simple distance-based ranking"""
        ranked_listings = []
        
        for listing in listings:
            distance = self._calculate_distance(user_location, (listing['latitude'], listing['longitude']))
            ranked_listing = {
                **listing,
                'distance_km': round(distance, 2),
                'ai_score': round(1.0 / (distance + 1), 2),  # Inverse distance score
                'price_score': 0.5,
                'availability_score': 0.5,
                'energy_type_score': 0.5
            }
            ranked_listings.append(ranked_listing)
        
        ranked_listings.sort(key=lambda x: x['ai_score'], reverse=True)
        return ranked_listings
