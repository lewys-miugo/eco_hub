'use client';

export default function DashboardPage() {
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
              1,500 kg
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
              2,500 kWh
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
              1,800 kWh
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
              156
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
              89
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
              ≈ to Planting 105 trees!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}