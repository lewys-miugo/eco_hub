'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function EditListingPage() {
  const [formData, setFormData] = useState({
    energyType: 'Solar',
    pricePerKwh: '0.12',
    amount: '500',
    sellerAccount: 'john.doe@email.com',
    location: 'Ruaraka Royke Apartments',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <Image
        src="/images/unsplash_Ilpf2eUPpUE.jpg"
        alt="Solar panel farm background"
        fill
        className="object-cover"
        priority
      />

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40"></div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        {/* Main Card Container */}
        <div
          className="mx-auto"
          style={{
            width: '636px',
            height: '582px',
            backgroundColor: '#163466',
            borderRadius: '10px',
            padding: '32px',
          }}
        >
          {/* Header Section */}
          <div className="mb-4 text-center">
            <h1
              className="mb-1"
              style={{
                color: 'white',
                fontFamily: 'Lexend Deca, sans-serif',
                fontSize: '28px',
                fontWeight: 'normal',
              }}
            >
              Update Your Listing
            </h1>
            <p
              style={{
                color: '#D2AB17',
                fontFamily: 'Lexend Deca, sans-serif',
                fontSize: '18px',
                fontWeight: '300',
              }}
            >
              Fill in the details below to edit your renewable energy listing
            </p>
          </div>

          {/* White Bordered Form Container */}
          <div
            className="mx-auto"
            style={{
              width: '544px',
              height: '446px',
              border: '2px solid white',
              borderRadius: '8px',
              padding: '20px',
            }}
          >
            {/* Form Fields */}
            <div className="space-y-2 mb-2">
              {/* Energy Type */}
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{
                    color: 'white',
                    fontFamily: 'Lexend Deca, sans-serif',
                  }}
                >
                  Energy Type
                </label>
                <input
                  type="text"
                  name="energyType"
                  value={formData.energyType}
                  onChange={handleInputChange}
                  placeholder="e.g., Solar"
                  className="w-full px-3 py-1 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    backgroundColor: '#041532',
                    border: '1px solid #374151',
                    fontFamily: 'Lexend Deca, sans-serif',
                  }}
                />
              </div>

              {/* Price per kWh */}
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{
                    color: 'white',
                    fontFamily: 'Lexend Deca, sans-serif',
                  }}
                >
                  Price per kWh (KSH)
                </label>
                <input
                  type="text"
                  name="pricePerKwh"
                  value={formData.pricePerKwh}
                  onChange={handleInputChange}
                  placeholder="0.12"
                  className="w-full px-3 py-1 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    backgroundColor: '#041532',
                    border: '1px solid #374151',
                    fontFamily: 'Lexend Deca, sans-serif',
                  }}
                />
              </div>

              {/* Amount */}
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{
                    color: 'white',
                    fontFamily: 'Lexend Deca, sans-serif',
                  }}
                >
                  Amount (KWh)
                </label>
                <input
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="500"
                  className="w-full px-3 py-1 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    backgroundColor: '#041532',
                    border: '1px solid #374151',
                    fontFamily: 'Lexend Deca, sans-serif',
                  }}
                />
              </div>

              {/* Seller Account */}
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{
                    color: 'white',
                    fontFamily: 'Lexend Deca, sans-serif',
                  }}
                >
                  Seller Account
                </label>
                <input
                  type="email"
                  name="sellerAccount"
                  value={formData.sellerAccount}
                  onChange={handleInputChange}
                  placeholder="john.doe@email.com"
                  className="w-full px-3 py-1 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    backgroundColor: '#041532',
                    border: '1px solid #374151',
                    fontFamily: 'Lexend Deca, sans-serif',
                  }}
                />
              </div>

              {/* Location */}
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{
                    color: 'white',
                    fontFamily: 'Lexend Deca, sans-serif',
                  }}
                >
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g. Ruaraka Royke Apartments"
                  className="w-full px-3 py-1 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    backgroundColor: '#041532',
                    border: '1px solid #374151',
                    fontFamily: 'Lexend Deca, sans-serif',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
