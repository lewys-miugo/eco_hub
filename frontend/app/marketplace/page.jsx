'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchListings } from '../../lib/api.js';
import { useToast } from '../../components/Toast';

export default function MarketplacePage() {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedListing, setSelectedListing] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Filter states
  const [selectedEnergyType, setSelectedEnergyType] = useState('');
  const [sortBy, setSortBy] = useState('price'); // price, distance, newest

  // Fetch listings from API
  useEffect(() => {
      async function loadListings() {
      try {
        setLoading(true);
        const data = await fetchListings({ status: 'active' });
        console.log('Marketplace listings loaded:', data);
        // Debug: Log each listing's imageUrl
        data.forEach(listing => {
          console.log(`Listing ${listing.id} - imageUrl:`, listing.imageUrl);
        });
        setListings(data);
        setError(null);
      } catch (err) {
        console.error('Error loading listings:', err);
        setError('Failed to load listings');
        setListings([]);
      } finally {
        setLoading(false);
      }
    }
    
    loadListings();
  }, []);

  const handleBuyContact = (listing) => {
    setSelectedListing(listing);
  };

  const handleCloseModal = () => {
    setSelectedListing(null);
    setContactForm({ name: '', email: '', phone: '', message: '' });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // TODO: Send contact form to backend
    showToast('Contact form submitted! We will connect you with the seller soon.', 'success');
    handleCloseModal();
  };

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  // Filter listings based on search query, energy type, and sort
  const filteredListings = listings
    .filter(listing => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = (
          listing.title?.toLowerCase().includes(query) ||
          listing.energyType?.toLowerCase().includes(query) ||
          listing.location?.toLowerCase().includes(query)
        );
        if (!matchesSearch) return false;
      }
      
      // Energy type filter
      if (selectedEnergyType && listing.energyType !== selectedEnergyType) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price') {
        return parseFloat(a.price) - parseFloat(b.price);
      }
      // Default to newest first
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  // Helper function to get image based on energy type
  const getImageForEnergyType = (energyType) => {
    const imageMap = {
      'Solar': '/images/unsplash_sWvDK3EO3eo.jpg',
      'Wind': '/images/unsplash_Ja8t8nJN2I4.jpg',
      'Hydro': '/images/unsplash_U13RrgO6f7g.jpg',
      'Biomass': '/images/unsplash_Ilpf2eUPpUE.jpg',
      'Geothermal': '/images/unsplash_JlhvFEVMwng.jpg'
    };
    return imageMap[energyType] || '/images/unsplash_sWvDK3EO3eo.jpg';
  };

  return (
    <div className="min-h-screen bg-white -mt-[72px]">
      {/* Video Section */}
      <section className="relative w-full h-[650px] bg-gray-100 pt-[72px] overflow-hidden">
        <div className="absolute top-8 left-8 z-10 w-80">
          <input
            type="text"
            placeholder="Search nearest solar to you..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#163466]"
          />
        </div>
        
        {/* Background Video */}
        <video
          src="/images/backgroundvid.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        />
      </section>

      {/* Marketplace Section */}
      <section className="container mx-auto px-8" style={{ paddingTop: '24px' }}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
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
                fontFamily: 'Lexend Deca, sans-serif'
              }}
            >
              Solar Energy closest to you for you at affordable price!
            </p>
          </div>
          
          {/* Filters */}
          <div className="flex gap-3" style={{ fontFamily: 'Lexend Deca, sans-serif' }}>
            {/* Energy Type Filter */}
            <select
              value={selectedEnergyType}
              onChange={(e) => setSelectedEnergyType(e.target.value)}
              className="px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#163466]"
              style={{
                backgroundColor: 'white',
                color: '#163466',
                minWidth: '150px',
                border: '1px solid #D1D5DB',
                borderRadius: '10px'
              }}
            >
              <option value="">All Energy Types</option>
              <option value="Solar">Solar</option>
              <option value="Wind">Wind</option>
              <option value="Hydro">Hydro</option>
              <option value="Biomass">Biomass</option>
              <option value="Geothermal">Geothermal</option>
            </select>
            
            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#163466]"
              style={{
                backgroundColor: 'white',
                color: '#163466',
                minWidth: '140px',
                border: '1px solid #D1D5DB',
                borderRadius: '10px'
              }}
            >
              <option value="newest">Newest First</option>
              <option value="price">Lowest Price</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#163466] mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading listings...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Cards Grid */}
        {!loading && !error && (
          <>
            {filteredListings.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No listings available at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
                {filteredListings.map((listing) => (
                  <div 
                    key={listing.id}
                    className="rounded-lg shadow-lg overflow-hidden"
                    style={{ 
                      width: '405px', 
                      height: '424px',
                      backgroundColor: '#EDF9FD'
                    }}
                  >
                    {/* Image */}
                    <div className="relative w-full h-[304px]">
                      {listing.imageUrl && listing.imageUrl.trim() !== '' && listing.imageUrl !== 'null' ? (
                        <img
                          src={listing.imageUrl}
                          alt="Energy installation"
                          className="w-full h-full object-cover"
                          style={{ borderRadius: '8px 8px 0 0' }}
                          onError={(e) => {
                            console.error('Failed to load uploaded image for listing:', listing.id);
                            // Hide this img and show fallback
                            const container = e.target.parentElement;
                            const fallback = container.querySelector('.fallback-image');
                            if (fallback) {
                              e.target.style.display = 'none';
                              fallback.style.display = 'block';
                            }
                          }}
                        />
                      ) : null}
                      <div className="fallback-image" style={{ display: listing.imageUrl && listing.imageUrl.trim() !== '' && listing.imageUrl !== 'null' ? 'none' : 'block', width: '100%', height: '100%' }}>
                        <Image
                          src={getImageForEnergyType(listing.energyType)}
                          alt="Energy installation"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Details Section */}
                    <div className="relative" style={{ padding: '16px' }}>
                      {/* Two-column grid for details */}
                      <div 
                        className="grid grid-cols-2 gap-x-4 gap-y-2"
                        style={{ fontFamily: 'Lexend Deca, sans-serif' }}
                      >
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Type:</span> {listing.energyType}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Quantity:</span> {listing.quantity} kWh
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Location:</span> {listing.location}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Price:</span> {listing.price} Ksh/kWh
                        </p>
                      </div>

                      {/* Button - positioned at x=241, y=377 (from card top) */}
                      <button 
                        onClick={() => handleBuyContact(listing)}
                        className="hover:opacity-90 transition-opacity absolute"
                        style={{ 
                          backgroundColor: '#D2AB17',
                          borderRadius: '10px',
                          width: '154px',
                          height: '41px',
                          fontFamily: 'Lexend Deca, sans-serif',
                          fontSize: '18px',
                          fontWeight: 'normal',
                          color: '#000',
                          left: '241px',
                          top: '73px'
                        }}
                      >
                        Buy/Contact
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* Contact Modal */}
      {selectedListing && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-lg p-8 max-w-md w-full mx-4"
            style={{ fontFamily: 'Lexend Deca, sans-serif' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold mb-4 text-[#163466]">
              Contact Seller
            </h2>
            
            <div className="mb-4">
              <p className="text-gray-600">
                Energy Type: <span className="font-semibold">{selectedListing.energyType}</span>
              </p>
              <p className="text-gray-600">
                Price: <span className="font-semibold">{selectedListing.price} KSH/kWh</span>
              </p>
              <p className="text-gray-600">
                Distance: <span className="font-semibold">{selectedListing.distance} miles</span>
              </p>
            </div>

            <form onSubmit={handleContactSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#163466]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#163466]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={contactForm.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#163466]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#163466]"
                  placeholder="Your message to the seller..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-md text-white transition-colors"
                  style={{ backgroundColor: '#D2AB17' }}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}