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
        <div className="bg-gray-100 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Advisor</h1>
            
            {/* Advisor Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {advisorCards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => setActiveCard(card.id)}
                  className={`p-4 rounded-lg text-left transition-all duration-200 ${
                    card.isActive
                      ? 'bg-white shadow-md border-2 border-blue-500'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  <h3 className={`font-semibold ${
                    card.isActive ? 'text-blue-600' : 'text-gray-700'
                  }`}>
                    {card.name}
                  </h3>
                </button>
              ))}
            </div>

            {/* Search/Input Bar */}
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Ask me anything about renewable energy..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Ask
                </button>
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