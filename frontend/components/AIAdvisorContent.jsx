'use client';

import { useState, useEffect, useRef } from 'react';

export default function AIAdvisorContent() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [metrics, setMetrics] = useState({
    carbonSaved: 2847,
    energyGenerated: 2847,
    costSaving: 2847
  });

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Initialize with welcome message
  useEffect(() => {
    setMessages([
      {
        id: 1,
        type: 'ai',
        content: 'Hello! I\'m your AI Renewable Energy Advisor. I can help you with solar energy advice, cost savings, and connecting with local energy suppliers. What would you like to know about renewable energy?',
        icons: ['leaf', 'zap', 'globe']
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
      // Get authentication token
      const token = localStorage.getItem('access_token');
      if (!token) {
        const errorMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: "Please log in to use the AI advisor. You can log in from the navigation menu.",
          icons: ['alert-circle'],
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsLoading(false);
        return;
      }
      
      // Call AI chat API
      const response = await fetch('http://localhost:5000/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: inputMessage })
      });

      if (response.ok) {
        const data = await response.json();
        const aiMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: data.response || data.advice || 'I received your message!',
          emojis: data.emojis || [],
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        // Try to get error message from response
        let errorMessage = '';
        let shouldPromptLogin = false;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || `Error ${response.status}`;
          
          // Check if it's an authentication error
          if (response.status === 401 || response.status === 422) {
            shouldPromptLogin = true;
            
            // Clear invalid token from localStorage
            if (errorMessage.toLowerCase().includes('token') || response.status === 422) {
              localStorage.removeItem('access_token');
              localStorage.removeItem('user');
              window.dispatchEvent(new Event('storage'));
            }
          }
        } catch (e) {
          const text = await response.text();
          errorMessage = text || `Error ${response.status}: Unknown error`;
          if (response.status === 401 || response.status === 422) {
            shouldPromptLogin = true;
          }
        }
        
        console.error('API Error:', errorMessage, response.status);
        
        // Show appropriate error message
        const finalErrorMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: shouldPromptLogin 
            ? `${errorMessage}. Please log out and log back in to refresh your session.`
            : `Sorry, I encountered an error: ${errorMessage}. Please try again later.`,
          icons: ['alert-circle'],
          timestamp: new Date()
        };
        setMessages(prev => [...prev, finalErrorMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: `I'm sorry, I'm having trouble connecting right now. Error: ${error.message}. Please check your connection and try again.`,
        icons: ['alert-circle'],
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
          <svg className="ml-2 w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
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
                {message.icons && message.icons.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {message.icons.map((icon, index) => (
                      <div key={index} className="w-5 h-5 text-gray-600">
                        {icon === 'leaf' && (
                          <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75S7 14 17 8z"/>
                          </svg>
                        )}
                        {icon === 'zap' && (
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        )}
                        {icon === 'globe' && (
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                        )}
                        {icon === 'heart' && (
                          <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                          </svg>
                        )}
                        {icon === 'sun' && (
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        )}
                        {icon === 'alert-circle' && (
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                        )}
                      </div>
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
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about renewable energy..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-400"
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
        <div className="flex items-center">
          <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <p className="text-gray-800">
            High solar efficiency expected for the next 3 days. Optimal conditions for energy generation based on Open-Meteo weather data
          </p>
        </div>
      </div>
    </div>
  );
}