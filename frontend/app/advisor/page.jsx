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
            <div className="bg-white rounded-lg p-4 shadow-sm mb-8 border border-gray-200">
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

            {/* AI Chat Input */}
            <div className="flex items-center space-x-4">
              {/* AI Avatar - Black Circle Placeholder */}
              <div className="w-12 h-12 bg-black rounded-full flex-shrink-0">
                {/* This will be replaced with AI avatar image later */}
              </div>
              
              {/* Chat Input Field */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Ask me anything about renewable energy ..."
                  className="w-full px-6 py-3 bg-gray-200 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-500"
                />
              </div>
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