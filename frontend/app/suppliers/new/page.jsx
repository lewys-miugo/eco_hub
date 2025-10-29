'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { createListing } from '../../../lib/api';
import { useRouter } from 'next/navigation';
import { useToast } from '../../../components/Toast';

export default function NewListingPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      showToast('Please log in to create a listing', 'error');
      router.push('/auth');
    } else {
      setIsAuthenticated(true);
    }
  }, [router, showToast]);
  
  const [formData, setFormData] = useState({
    title: '',
    energyType: '',
    pricePerKwh: '',
    amount: '',
    location: '',
    status: 'active'
  });
  
  // Image upload state
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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
    // Don't clear imagePreview here - keep it for the form submission
    // Only clear if user explicitly cancels
  };

  const handleConfirmImage = () => {
    // User confirmed they want to use this image
    setShowImageModal(false);
    // Keep imagePreview and selectedImage - don't clear them
  };

  const handleRemoveImage = () => {
    // User wants to remove the image
    setSelectedImage(null);
    setImagePreview(null);
    setShowImageModal(true); // Reopen modal to allow new upload
  };

  const handleContinueWithoutImage = () => {
    setShowImageModal(false);
    // Clear image if user chooses to skip
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleCapturePhoto = () => {
    // This would use the device camera
    // For now, just trigger file input
    document.getElementById('hidden-file-input')?.click();
  };

  const handleCancel = () => {
    // Navigate back to suppliers page
    router.push('/suppliers');
  };

  const handleCreate = async () => {
    // Double check authentication before submitting
    const token = localStorage.getItem('access_token');
    if (!token) {
      showToast('Please log in to create a listing', 'error');
      router.push('/auth');
      return;
    }
    
    try {
      // Validate required fields (removed sellerAccount as it's no longer required)
      if (!formData.title || !formData.energyType || !formData.pricePerKwh || !formData.amount || 
          !formData.location) {
        showToast('Please fill in all fields', 'error');
        return;
      }
      
      // Verify selectedImage is a File object
      console.log('Creating listing - selectedImage:', selectedImage);
      console.log('selectedImage type:', selectedImage instanceof File ? 'File object ✓' : typeof selectedImage);
      
      // Create FormData for file upload
      const listingData = new FormData();
      listingData.append('title', formData.title);
      listingData.append('energyType', formData.energyType);
      listingData.append('quantity', formData.amount);
      listingData.append('price', formData.pricePerKwh);
      listingData.append('location', formData.location);
      listingData.append('status', formData.status);
      
      // Only append image if it's a File object
      if (selectedImage && selectedImage instanceof File) {
        listingData.append('image', selectedImage);
        console.log('Added image file to FormData:', selectedImage.name, selectedImage.size, 'bytes');
      }
      
      await createListing(listingData);
      
      showToast('Listing created successfully!', 'success');
      setTimeout(() => {
      router.push('/suppliers');
      }, 500);
    } catch (error) {
      showToast('Failed to create listing: ' + error.message, 'error');
      console.error('Error creating listing:', error);
    }
  };

  // Don't render form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative -mt-[72px]">
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
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-8 pt-20 sm:pt-[80px]">
        {/* Main Content Card */}
        <div 
          className="mx-auto w-full max-w-2xl"
          style={{
            minHeight: '650px',
            backgroundColor: '#163466',
            borderRadius: '10px',
            padding: '24px',
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
              Create New Listing
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
              minHeight: '520px',
              border: '2px solid white',
              borderRadius: '8px',
              padding: '16px'
            }}
          >
            {/* Form Fields */}
            <div className="space-y-2 mb-2">
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

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-3">
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ 
                      color: 'white',
                      fontFamily: 'Lexend Deca, sans-serif'
                    }}
                  >
                    Selected Image
                  </label>
                  <div className="relative w-full h-32 rounded-md overflow-hidden">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mt-4">
              {/* Upload Photo Button */}
              <button
                onClick={() => setShowImageModal(true)}
                className="w-full py-1 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
                style={{
                  backgroundColor: 'rgba(210, 171, 23, 0.8)',
                  color: '#000',
                  fontFamily: 'Lexend Deca, sans-serif'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(210, 171, 23, 1)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(210, 171, 23, 0.8)'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                Upload Photo
              </button>

              {/* Cancel and Create Buttons */}
              <div className="flex gap-4 justify-center flex-wrap">
                {/* Cancel Button */}
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

                {/* Create Listing Button */}
                <button
                  onClick={handleCreate}
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
                  Create Listing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Upload Modal */}
      {showImageModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={(e) => {
            // Only close if clicking the backdrop, not if there's an image preview
            if (e.target === e.currentTarget && !imagePreview) {
              handleCloseImageModal();
            }
          }}
        >
          <div 
            className="bg-white rounded-lg p-8 max-w-md w-full mx-4"
            style={{ fontFamily: 'Lexend Deca, sans-serif' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold mb-4 text-[#163466]">
              Add Listing Image
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
                    onClick={handleConfirmImage}
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
                  Add a photo of your energy installation
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
                    Skip for now
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}