'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchListings } from '../../lib/api.js';

export default function MarketplacePage() {
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

  // Fetch listings from API
  useEffect(() => {
    async function loadListings() {
      try {
        setLoading(true);
        const data = await fetchListings({ status: 'active' });
        console.log('Marketplace listings loaded:', data);
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
    alert('Contact form submitted! We will connect you with the seller soon.');
    handleCloseModal();
  };

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  // Filter listings based on search query
  const filteredListings = listings.filter(listing => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      listing.title?.toLowerCase().includes(query) ||
      listing.energyType?.toLowerCase().includes(query) ||
      listing.location?.toLowerCase().includes(query)
    );
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
                      <Image
                        src={getImageForEnergyType(listing.energyType)}
                        alt="Energy installation"
                        fill
                        className="object-cover"
                      />
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