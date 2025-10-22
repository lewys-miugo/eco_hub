'use client';

import { useState } from 'react';

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-white">
      {/* Map Section */}
      <section className="relative w-full h-[650px] bg-gray-100">
        <div className="absolute top-8 left-8 z-10 w-80">
          <input
            type="text"
            placeholder="Search nearest solar to you..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#163466]"
          />
        </div>
        
        {/* Map Embed - Google Maps */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127641.11277277838!2d36.94825730000001!3d-1.130495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi!5e0!3m2!1sen!2ske!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        ></iframe>
      </section>

      {/* Marketplace Section */}
      <section className="container mx-auto px-8" style={{ paddingTop: '24px' }}>
        {/* Header */}
        <div>
          <h1 
            className="text-[35px] font-normal"
            style={{ 
              color: '#163466', 
              fontFamily: 'Lexend Deca, sans-serif',
              marginBottom: '8px'
            }}
          >
            Marketplace
          </h1>
          <p 
            className="text-[24px] font-light"
            style={{ 
              color: '#163466', 
              fontFamily: 'Lexend Deca, sans-serif',
              marginBottom: '24px'
            }}
          >
            Solar Energy closest to you for you at affordable price!
          </p>
        </div>
      </section>
    </div>
  );
}