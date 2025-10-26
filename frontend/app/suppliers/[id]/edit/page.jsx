'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { fetchListingById, updateListing } from '../../../../lib/api';
import { useRouter } from 'next/navigation';

export default function EditListingPage({ params }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    energyType: '',
    pricePerKwh: '',
    amount: '',
    sellerAccount: '',
    location: ''
  });

  // Fetch listing data when page loads
  useEffect(() => {
    async function loadListing() {
      try {
        const listing = await fetchListingById(params.id);
        if (listing) {
          setFormData({
            energyType: listing.energyType || '',
            pricePerKwh: listing.price || '',
            amount: listing.quantity || '',
            sellerAccount: listing.sellerAccount || '',
            location: listing.location || ''
          });
        }
      } catch (error) {
        console.error('Error loading listing:', error);
      } finally {
        setLoading(false);
      }
    }
    
    if (params.id) {
      loadListing();
    }
  }, [params.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancel = () => {
    // Navigate back to suppliers page
    window.history.back();
  };

  const handleUpdate = async () => {
    try {
      await updateListing(params.id, {
        energyType: formData.energyType,
        quantity: formData.amount,
        price: formData.pricePerKwh,
        sellerAccount: formData.sellerAccount,
        location: formData.location
      });
      alert('Listing updated successfully!');
      router.push('/suppliers');
    } catch (error) {
      alert('Failed to update listing: ' + error.message);
    }
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
        {loading ? (
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading listing data...</p>
          </div>
        ) : (
          /* Main Content Card */
          <div 
            className="mx-auto"
            style={{
              width: '636px',
              height: '582px',
              backgroundColor: '#163466',
              borderRadius: '10px',
              padding: '32px'
            }}
          >
          {/* Card Header */}
          <div className="mb-4 text-center">
            <h1 
              className="mb-1"
              style={{ 
                color: 'white',
                fontFamily: 'Lexend Deca, sans-serif',
                fontSize: '28px',
                fontWeight: 'normal'
              }}
            >
              Update You're Listing
            </h1>
            <p 
              className=""
              style={{ 
                color: '#D2AB17',
                fontFamily: 'Lexend Deca, sans-serif',
                fontSize: '18px',
                fontWeight: '300'
              }}
            >
              Fill in the details below to list your renewable energy supply
            </p>
          </div>

          {/* White Frame Container */}
          <div 
            className="mx-auto"
            style={{
              width: '544px',
              height: '446px',
              border: '2px solid white',
              borderRadius: '8px',
              padding: '20px'
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
                    fontFamily: 'Lexend Deca, sans-serif'
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
                    fontFamily: 'Lexend Deca, sans-serif'
                  }}
                />
              </div>

              {/* Price per kWh */}
              <div>
                <label 
                  className="block text-sm font-medium mb-1"
                  style={{ 
                    color: 'white',
                    fontFamily: 'Lexend Deca, sans-serif'
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
                    fontFamily: 'Lexend Deca, sans-serif'
                  }}
                />
              </div>

              {/* Amount */}
              <div>
                <label 
                  className="block text-sm font-medium mb-1"
                  style={{ 
                    color: 'white',
                    fontFamily: 'Lexend Deca, sans-serif'
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
                    fontFamily: 'Lexend Deca, sans-serif'
                  }}
                />
              </div>

              {/* Seller Account */}
              <div>
                <label 
                  className="block text-sm font-medium mb-1"
                  style={{ 
                    color: 'white',
                    fontFamily: 'Lexend Deca, sans-serif'
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
                    fontFamily: 'Lexend Deca, sans-serif'
                  }}
                />
              </div>

              {/* Location */}
              <div>
                <label 
                  className="block text-sm font-medium mb-1"
                  style={{ 
                    color: 'white',
                    fontFamily: 'Lexend Deca, sans-serif'
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
                    fontFamily: 'Lexend Deca, sans-serif'
                  }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Cancel Update Button */}
              <button
                onClick={handleCancel}
                className="w-full py-1 rounded-md font-medium transition-colors"
                style={{
                  backgroundColor: 'rgba(47, 170, 91, 0.5)',
                  color: 'white',
                  fontFamily: 'Lexend Deca, sans-serif'
                }}
              >
                Cancel Update
              </button>

              {/* Update Listing Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleUpdate}
                  className="rounded-md font-medium transition-colors"
                  style={{
                    width: '150px',
                    height: '35px',
                    backgroundColor: '#2FAA5B',
                    color: 'white',
                    fontFamily: 'Lexend Deca, sans-serif'
                  }}
                >
                  Update Listing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}