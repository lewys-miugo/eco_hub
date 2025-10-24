"use client";

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Main Content */}
      <main className="pt-16">
        {/* Top Section with Cards */}
        <div className="bg-gray-100 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Advisor Cards */}
            <div className="flex flex-wrap gap-4 mb-8">
              {advisorCards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => setActiveCard(card.id)}
                  className={`px-6 py-4 rounded-lg font-medium transition-colors ${
                    card.isActive
                      ? 'bg-[#D4AF37] text-[#1A202C] shadow-md'
                      : 'bg-white text-gray-800 hover:bg-gray-50 shadow-sm'
                  }`}
                >
                  {card.name}
                </button>
              ))}
            </div>

            {/* Search/Input Bar */}
            <div className="flex items-center bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="w-6 h-6 bg-black rounded-full mr-4 flex-shrink-0"></div>
              <input
                type="text"
                placeholder="Ask me anything about renewable energy..."
                className="flex-1 text-gray-600 placeholder-gray-400 focus:outline-none bg-transparent"
              />
              <div className="w-6 h-6 bg-pink-500 rounded-full ml-4 flex-shrink-0"></div>
            </div>
          </div>
        </div>

        {/* Content Area - This will change based on active card */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeCard === 'ai-advisor' && <AIAdvisorContent />}
          {activeCard === 'smart-matchmaker' && <SmartMatchmakerContent />}
          {activeCard === 'energy-insight' && <EnergyInsightContent />}
          {activeCard === 'list-generator' && <ListGeneratorContent />}
        </div>
      </main>

      <Footer />
    </div>
  );
}
