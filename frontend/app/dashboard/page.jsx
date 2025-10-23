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
      </div>
    </div>
  );
}