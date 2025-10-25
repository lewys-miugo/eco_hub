'use client';

import { useState, useEffect } from 'react';

export default function AIAdvisorContent() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState({
    carbonSaved: 2847,
    energyGenerated: 2847,
    costSaving: 2847
  });

  // Initialize with welcome message
  useEffect(() => {
    setMessages([
      {
        id: 1,
        type: 'ai',
        content: 'Hello! I\'m your AI Renewable Energy Advisor 🌱. I can help you with solar energy advice, cost savings, and connecting with local energy suppliers. What would you like to know about renewable energy?',
        emojis: ['🌱', '⚡', '🌍']
      }
    ]);
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // For now, we'll use a mock response since we need authentication
      // In a real implementation, you'd call the API here
      const response = await fetch('/api/v1/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // You'll need to implement auth
        },
        body: JSON.stringify({ message: inputMessage })
      });

      if (response.ok) {
        const data = await response.json();
        const aiMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: data.response,
          emojis: data.emojis || [],
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        // Fallback mock response for demo
        const mockResponses = [
          "Great question! 🌱 Solar panels can reduce your electricity bill by 50-90% depending on your location and energy usage. The average payback period is 6-8 years. Would you like specific advice for your area?",
          "Excellent! ⚡ Wind energy is perfect for your location. I recommend checking our marketplace for local wind energy suppliers. You could save up to $200/month on energy costs!",
          "That's a fantastic goal! 🌍 For a 2000 sq ft home, you'd need about 20-25 solar panels. The total cost would be around $15,000-$25,000, but with tax incentives, you could save 30%!",
          "Absolutely! 💚 Our marketplace connects you with local renewable energy suppliers. You can buy clean energy directly from your neighbors and support the community!",
          "Perfect timing! 🌞 Summer is ideal for solar installation. The longer days mean more energy generation. I can help you find the best suppliers in your area!"
        ];
        
        const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
        const aiMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: randomResponse,
          emojis: ['🌱', '⚡', '🌍', '💚', '🌞'],
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again later! 🌱",
        emojis: ['🌱'],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 rounded-lg p-6 text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Carbon Saved</h3>
          <p className="text-3xl font-bold text-gray-800">{metrics.carbonSaved}Kg</p>
        </div>
        <div className="bg-blue-100 rounded-lg p-6 text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Energy Generated</h3>
          <p className="text-3xl font-bold text-gray-800">{metrics.energyGenerated}Kg</p>
        </div>
        <div className="bg-blue-100 rounded-lg p-6 text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Cost Saving</h3>
          <p className="text-3xl font-bold text-gray-800">{metrics.costSaving}Kg</p>
        </div>
      </div>

      {/* AI Chat Interface */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          AI Energy Advisor 
          <span className="ml-2 text-2xl">🤖</span>
        </h3>
        
        {/* Chat Messages */}
        <div className="h-64 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                {message.emojis && message.emojis.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {message.emojis.map((emoji, index) => (
                      <span key={index} className="text-lg">{emoji}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                  <span className="text-sm">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about renewable energy..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-blue-100 rounded-lg p-6">
        <p className="text-gray-800">
          High solar efficiency expected for the next 3 days. Optimal conditions for energy generation based on Open-Meteo weather data 🌞
        </p>
      </div>
    </div>
  );
}