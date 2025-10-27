"use client";

import { useState } from 'react';
import AIAdvisorContent from '../../components/AIAdvisorContent';
import SmartMatchmakerContent from '../../components/SmartMatchmakerContent';
import EnergyInsightContent from '../../components/EnergyInsightContent';
import ListGeneratorContent from '../../components/ListGeneratorContent';

export default function AdvisorPage() {
  const [activeCard, setActiveCard] = useState('ai-advisor');

  const advisorCards = [
    { id: 'ai-advisor', name: 'AI Advisor', isActive: activeCard === 'ai-advisor' },
    { id: 'smart-matchmaker', name: 'Smart Matchmaker', isActive: activeCard === 'smart-matchmaker' },
    { id: 'energy-insight', name: 'Energy Insight', isActive: activeCard === 'energy-insight' },
    { id: 'list-generator', name: 'List generator', isActive: activeCard === 'list-generator' },
  ];

  const renderContent = () => {
    switch (activeCard) {
      case 'ai-advisor':
        return <AIAdvisorContent />;
      case 'smart-matchmaker':
        return <SmartMatchmakerContent />;
      case 'energy-insight':
        return <EnergyInsightContent />;
      case 'list-generator':
        return <ListGeneratorContent />;
      default:
        return <AIAdvisorContent />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="pt-16">
        {/* Top Section with Cards */}
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Advisor</h1>
            
            {/* Advisor Cards Container */}
            <div className="bg-gray-200 rounded-lg p-4 shadow-sm mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {advisorCards.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => setActiveCard(card.id)}
                    className={`p-4 rounded-lg text-center transition-all duration-200 ${
                      card.isActive
                        ? 'bg-[#D4AF37] shadow-md'
                        : 'bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <h3 className={`font-semibold text-sm ${
                      card.isActive ? 'text-black' : 'text-black'
                    }`}>
                      {card.name}
                    </h3>
                  </button>
                ))}
              </div>
            </div>

                  {/* AI Chat Input - Now Functional */}
                  <div className="flex items-center space-x-4">
                    {/* AI Avatar - Black Circle with AI Icon */}
                    <div className="w-12 h-12 bg-black rounded-full flex-shrink-0 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    
                    {/* Chat Input Field */}
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Ask me anything about renewable energy ..."
                        className="w-full px-6 py-3 bg-white rounded-full border-2 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 text-black placeholder-gray-400"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            // This will trigger the AI chat functionality in the content area
                            console.log('AI Chat input:', e.target.value);
                          }
                        }}
                      />
                    </div>
                    {/* Send Button */}
                    <button className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium shadow-md">
                      Send
                    </button>
                  </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}