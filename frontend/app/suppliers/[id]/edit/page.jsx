'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { fetchListingById, updateListing } from '../../../../lib/api';
import { useRouter } from 'next/navigation';
import { useToast } from '../../../../components/Toast';

export default function EditListingPage({ params }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    energyType: '',
    pricePerKwh: '',
    amount: '',
    sellerAccount: '',
    location: '',
    status: 'active'
  });

  // Fetch listing data when page loads
  useEffect(() => {
    async function loadListing() {
      try {
        const listing = await fetchListingById(params.id);
        if (listing) {
          setFormData({
            title: listing.title || '',
            energyType: listing.energyType || '',
            pricePerKwh: listing.price || '',
            amount: listing.quantity || '',
            sellerAccount: listing.sellerAccount || '',
            location: listing.location || '',
            status: listing.status || 'active'
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
        title: formData.title,
        energyType: formData.energyType,
        quantity: formData.amount,
        price: formData.pricePerKwh,
        sellerAccount: formData.sellerAccount,
        location: formData.location,
        status: formData.status
      });
      showToast('Listing updated successfully!', 'success');
      setTimeout(() => {
        router.push('/suppliers');
      }, 500);
    } catch (error) {
      showToast('Failed to update listing: ' + error.message, 'error');
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
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-8">
        {loading ? (
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading listing data...</p>
          </div>
        ) : (
          /* Main Content Card */
          <div 
            className="mx-auto w-full max-w-2xl"
            style={{
              minHeight: '650px',
              backgroundColor: '#163466',
              borderRadius: '10px',
              padding: '24px'
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
            className="mx-auto w-full max-w-xl"
            style={{
              minHeight: '486px',
              border: '2px solid white',
              borderRadius: '8px',
              padding: '16px'
            }}
          >
            {/* Form Fields */}
            <div className="space-y-3 mb-4">
              {/* Listing Title */}
              <div>
                <label 
                  className="block text-sm font-medium mb-1"
                  style={{ 
                    color: 'white',
                    fontFamily: 'Lexend Deca, sans-serif'
                  }}
                >
                  Listing Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Solar Energy Available"
                  className="w-full px-3 py-1 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    backgroundColor: '#041532',
                    border: '1px solid #374151',
                    fontFamily: 'Lexend Deca, sans-serif'
                  }}
                />
              </div>

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

              {/* Status */}
              <div>
                <label 
                  className="block text-sm font-medium mb-1"
                  style={{ 
                    color: 'white',
                    fontFamily: 'Lexend Deca, sans-serif'
                  }}
                >
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    backgroundColor: '#041532',
                    border: '1px solid #374151',
                    fontFamily: 'Lexend Deca, sans-serif',
                    color: 'white',
                    minHeight: '32px'
                  }}
                >
                  <option value="active" style={{ backgroundColor: '#041532' }}>Active (Available)</option>
                  <option value="inactive" style={{ backgroundColor: '#041532' }}>Inactive (Not Available)</option>
                </select>
              </div>
            </div>

            {/* Action Buttons - Inside white frame */}
            <div className="flex gap-4 justify-center mt-4 flex-wrap">
              {/* Cancel Update Button */}
              <button
                onClick={handleCancel}
                className="rounded-md font-medium transition-colors"
                style={{
                  minWidth: '120px',
                  width: '100%',
                  maxWidth: '150px',
                  height: '35px',
                  backgroundColor: '#2FAA5B',
                  color: 'white',
                  fontFamily: 'Lexend Deca, sans-serif'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#15803d'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#2FAA5B'}
              >
                Cancel
              </button>

              {/* Update Listing Button */}
              <button
                onClick={handleUpdate}
                className="rounded-md font-medium transition-colors"
                  style={{
                    minWidth: '120px',
                    width: '100%',
                    maxWidth: '150px',
                    height: '35px',
                  backgroundColor: '#2FAA5B',
                  color: 'white',
                  fontFamily: 'Lexend Deca, sans-serif'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#15803d'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#2FAA5B'}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}