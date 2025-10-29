'use client';

import { useState, useEffect } from 'react';
import { fetchDashboardMetrics } from '../../lib/api.js';

export default function DashboardPage() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMetrics() {
      try {
        const data = await fetchDashboardMetrics();
        console.log('Dashboard metrics loaded:', data);
        setMetrics(data);
      } catch (error) {
        console.error('Error loading dashboard metrics:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadMetrics();
  }, []);

  // Get metric values (fallback to default if not loaded)
  const getMetricValue = (key, defaultValue) => {
    if (!metrics || loading) return defaultValue;
    return metrics[key]?.value || defaultValue;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#163466' }}>
      {/* Header Section */}
      <div className="px-8 py-12">
        <h1 
          className="text-5xl font-normal mb-8"
          style={{ 
            color: 'white',
            fontFamily: 'Lexend Deca, sans-serif',
            fontSize: '40px'
          }}
        >
          AI Insights Dashboard
        </h1>

        {/* Metrics Cards Grid */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {/* Row 1 */}
          <div 
            className="rounded-lg p-6"
            style={{ 
              backgroundColor: '#041532',
              color: 'white',
              boxShadow: 'inset 0 -2px 4px rgba(255, 255, 255, 0.1)'
            }}
          >
            <h3 
              className="text-lg font-light mb-2"
              style={{ 
                fontFamily: 'Lexend Deca, sans-serif',
                color: '#BEC1C6'
              }}
            >
              CO₂ Savings
            </h3>
            <p 
              className="text-4xl font-normal"
              style={{ 
                fontFamily: 'Lexend Deca, sans-serif',
                fontSize: '32px'
              }}
            >
              {getMetricValue('co2_savings', '1,500 kg')}
            </p>
          </div>

          <div 
            className="rounded-lg p-6"
            style={{ 
              backgroundColor: '#041532',
              color: 'white',
              boxShadow: 'inset 0 -2px 4px rgba(255, 255, 255, 0.1)'
            }}
          >
            <h3 
              className="text-lg font-light mb-2"
              style={{ 
                fontFamily: 'Lexend Deca, sans-serif',
                color: '#BEC1C6'
              }}
            >
              Energy Saved
            </h3>
            <p 
              className="text-4xl font-normal"
              style={{ 
                fontFamily: 'Lexend Deca, sans-serif',
                fontSize: '32px'
              }}
            >
              {getMetricValue('energy_saved', '2,500 kWh')}
            </p>
          </div>

          <div 
            className="rounded-lg p-6"
            style={{ 
              backgroundColor: '#041532',
              color: 'white',
              boxShadow: 'inset 0 -2px 4px rgba(255, 255, 255, 0.1)'
            }}
          >
            <h3 
              className="text-lg font-light mb-2"
              style={{ 
                fontFamily: 'Lexend Deca, sans-serif',
                color: '#BEC1C6'
              }}
            >
              Energy Bought
            </h3>
            <p 
              className="text-4xl font-normal"
              style={{ 
                fontFamily: 'Lexend Deca, sans-serif',
                fontSize: '32px'
              }}
            >
              {getMetricValue('energy_bought', '1,800 kWh')}
            </p>
          </div>

          {/* Row 2 */}
          <div 
            className="rounded-lg p-6"
            style={{ 
              backgroundColor: '#041532',
              color: 'white',
              boxShadow: 'inset 0 -2px 4px rgba(255, 255, 255, 0.1)'
            }}
          >
            <h3 
              className="text-lg font-light mb-2"
              style={{ 
                fontFamily: 'Lexend Deca, sans-serif',
                color: '#BEC1C6'
              }}
            >
              Active Community Members
            </h3>
            <p 
              className="text-4xl font-normal"
              style={{ 
                fontFamily: 'Lexend Deca, sans-serif',
                fontSize: '32px'
              }}
            >
              {getMetricValue('active_community_members', '156')}
            </p>
          </div>

          <div 
            className="rounded-lg p-6"
            style={{ 
              backgroundColor: '#041532',
              color: 'white',
              boxShadow: 'inset 0 -2px 4px rgba(255, 255, 255, 0.1)'
            }}
          >
            <h3 
              className="text-lg font-light mb-2"
              style={{ 
                fontFamily: 'Lexend Deca, sans-serif',
                color: '#BEC1C6'
              }}
            >
              Households Powered by Clean Energy
            </h3>
            <p 
              className="text-4xl font-normal"
              style={{ 
                fontFamily: 'Lexend Deca, sans-serif',
                fontSize: '32px'
              }}
            >
              {getMetricValue('households_powered', '89')}
            </p>
          </div>

          <div 
            className="rounded-lg p-6"
            style={{ 
              backgroundColor: '#041532',
              color: 'white',
              boxShadow: 'inset 0 -2px 4px rgba(255, 255, 255, 0.1)'
            }}
          >
            <h3 
              className="text-lg font-light mb-2"
              style={{ 
                fontFamily: 'Lexend Deca, sans-serif',
                color: '#BEC1C6'
              }}
            >
              Environmental Impact
            </h3>
            <p 
              className="text-4xl font-normal"
              style={{ 
                fontFamily: 'Lexend Deca, sans-serif',
                fontSize: '32px'
              }}
            >
              {getMetricValue('environmental_impact_trees', '≈ to Planting 105 trees!')}
            </p>
          </div>
        </div>

        {/* Performance Predictions Section */}
        <div className="mt-12">
          <h2 
            className="text-3xl font-normal mb-6"
            style={{ 
              color: 'white',
              fontFamily: 'Lexend Deca, sans-serif',
              fontSize: '30px'
            }}
          >
            Performance Predictions
          </h2>

          {/* Chart Container */}
          <div 
            className="rounded-lg p-8"
            style={{ 
              backgroundColor: '#041532',
              color: 'white',
              minHeight: '400px'
            }}
          >
            {/* Chart Title */}
            <div className="mb-6">
              <h3 
                className="text-2xl font-light"
                style={{ fontFamily: 'Lexend Deca, sans-serif' }}
              >
                Energy Forecast vs. Generation
              </h3>
            </div>

            {/* Legend */}
            <div className="flex justify-end space-x-8 mb-6">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: '#10b981' }}
                ></div>
                <span 
                  className="font-light"
                  style={{ fontFamily: 'Lexend Deca, sans-serif' }}
                >
                  Consumption Forecast
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: '#f59e0b' }}
                ></div>
                <span 
                  className="font-light"
                  style={{ fontFamily: 'Lexend Deca, sans-serif' }}
                >
                  Renewable Generation
                </span>
              </div>
            </div>

            {/* Chart Placeholder */}
            <div className="flex items-center justify-center h-80 mb-6">
              <div 
                className="w-full h-full border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center"
                style={{ borderColor: '#6b7280' }}
              >
                <p 
                  className="text-xl"
                  style={{ fontFamily: 'Lexend Deca, sans-serif' }}
                >
                  Line Graph Placeholder
                </p>
              </div>
            </div>

            {/* Axis Labels */}
            <div className="mt-4 flex justify-between">
              <span 
                className="text-sm"
                style={{ fontFamily: 'Lexend Deca, sans-serif' }}
              >
                Jan
              </span>
              <span 
                className="text-sm"
                style={{ fontFamily: 'Lexend Deca, sans-serif' }}
              >
                Feb
              </span>
              <span 
                className="text-sm"
                style={{ fontFamily: 'Lexend Deca, sans-serif' }}
              >
                Mar
              </span>
              <span 
                className="text-sm"
                style={{ fontFamily: 'Lexend Deca, sans-serif' }}
              >
                Apr
              </span>
              <span 
                className="text-sm"
                style={{ fontFamily: 'Lexend Deca, sans-serif' }}
              >
                May
              </span>
              <span 
                className="text-sm"
                style={{ fontFamily: 'Lexend Deca, sans-serif' }}
              >
                Jun
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}