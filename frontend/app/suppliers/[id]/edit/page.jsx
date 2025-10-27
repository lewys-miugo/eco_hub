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
    location: '',
    status: 'active'
  });
  
  // Image upload state
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCloseImageModal = () => {
    setShowImageModal(false);
  };

  const handleContinueWithoutImage = () => {
    setShowImageModal(false);
  };

  const handleCapturePhoto = () => {
    // This would use the device camera
    // For now, just trigger file input
    document.getElementById('hidden-file-input')?.click();
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
        location: formData.location,
        status: formData.status
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
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8 pt-24">
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
              height: '750px',
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
              height: '580px',
              border: '2px solid white',
              borderRadius: '8px',
              padding: '20px'
            }}
          >
            {/* Form Fields */}
            <div className="space-y-3 mb-4">
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

            {/* Upload Photo Button */}
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setShowImageModal(true)}
                className="w-full py-2 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
                style={{
                  backgroundColor: 'rgba(210, 171, 23, 0.8)',
                  color: '#000',
                  fontFamily: 'Lexend Deca, sans-serif',
                  border: '2px solid white'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(210, 171, 23, 1)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(210, 171, 23, 0.8)'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                Update Photo
              </button>
              
              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-3 relative">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-32 object-cover rounded-md"
                    style={{ border: '2px solid white' }}
                  />
                  <button
                    onClick={() => {
                      setImagePreview(null);
                      setSelectedImage(null);
                      setShowImageModal(true);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            {/* Action Buttons - Inside white frame */}
            <div className="flex gap-4 justify-center mt-4">
              {/* Cancel Update Button */}
              <button
                onClick={handleCancel}
                className="rounded-md font-medium transition-colors"
                style={{
                  width: '150px',
                  height: '35px',
                  backgroundColor: '#2FAA5B',
                  color: 'white',
                  fontFamily: 'Lexend Deca, sans-serif'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#15803d'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#2FAA5B'}
              >
                Cancel Update
              </button>

              {/* Update Listing Button */}
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
                onMouseEnter={(e) => e.target.style.backgroundColor = '#15803d'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#2FAA5B'}
              >
                Update Listing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Upload Modal */}
      {showImageModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={handleCloseImageModal}
        >
          <div 
            className="bg-white rounded-lg p-8 max-w-md w-full mx-4"
            style={{ fontFamily: 'Lexend Deca, sans-serif' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold mb-4 text-[#163466]">
              Update Listing Image
            </h2>
            
            {imagePreview ? (
              <>
                <div className="mb-4">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => document.getElementById('hidden-file-input')?.click()}
                    className="flex-1 py-2 px-4 rounded-md font-medium transition-colors"
                    style={{
                      backgroundColor: '#D2AB17',
                      color: '#000'
                    }}
                  >
                    Change Image
                  </button>
                  <button
                    onClick={handleCloseImageModal}
                    className="flex-1 py-2 px-4 rounded-md font-medium transition-colors"
                    style={{
                      backgroundColor: '#2FAA5B',
                      color: 'white'
                    }}
                  >
                    Use This Image
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-600 mb-4">
                  Upload a new photo for your energy listing
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleCapturePhoto}
                    className="w-full py-3 px-4 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: '#D2AB17',
                      color: '#000'
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                    Take Photo
                  </button>
                  
                  <label className="w-full">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="hidden-file-input"
                    />
                    <span 
                      className="block w-full py-3 px-4 rounded-md font-medium text-center cursor-pointer transition-colors"
                      style={{
                        backgroundColor: '#163466',
                        color: 'white'
                      }}
                      onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                      onMouseLeave={(e) => e.target.style.opacity = '1'}
                    >
                      Upload from Computer
                    </span>
                  </label>
                  
                  <button
                    onClick={handleContinueWithoutImage}
                    className="w-full py-2 px-4 rounded-md font-medium transition-colors"
                    style={{
                      backgroundColor: 'transparent',
                      color: '#666'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}