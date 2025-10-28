'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchListings, deleteListing as deleteListingAPI } from '../../lib/api.js';
import { useToast } from '../../components/Toast';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function SuppliersPage() {
  const { showToast } = useToast();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  // Fetch listings from API
  useEffect(() => {
    async function loadListings() {
      try {
        setLoading(true);
        const data = await fetchListings();
        setListings(data);
        setError(null);
      } catch (err) {
        setError('Failed to load listings');
        console.error(err);
        setListings([]);
      } finally {
        setLoading(false);
      }
    }
    
    loadListings();
  }, []);

  // Open confirm before delete
  const confirmDelete = (id) => {
    setPendingDeleteId(id);
    setConfirmOpen(true);
  };

  // Perform delete after confirmation
  const handleConfirmDelete = async () => {
    if (!pendingDeleteId) return;
    const id = pendingDeleteId;
    setConfirmOpen(false);
    setPendingDeleteId(null);
    try {
      await deleteListingAPI(id);
      setListings(listings.filter(listing => listing.id !== id));
      showToast('Listing deleted successfully!', 'success');
    } catch (err) {
      showToast('Failed to delete listing', 'error');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading listings...</p>
        </div>
      </div>
    );
  }

  // Sample listings data (fallback)
  const fallbackListings = [
    {
      id: 1,
      title: 'I have 10KWh to sell daily',
      energyType: 'Solar',
      quantity: 500,
      price: '0.12',
      status: 'inactive',
      location: 'Plantinum Sqr Road',
    },
    {
      id: 2,
      title: 'Solar Energy Surplus',
      energyType: 'Solar',
      quantity: 500,
      price: '0.12',
      status: 'active',
      location: 'Tatu city Kiambu',
    },
    {
      id: 3,
      title: 'Wind Power Available',
      energyType: 'Wind',
      quantity: 750,
      price: '0.15',
      status: 'active',
      location: 'Ngong Hills Nairobi',
    },
    {
      id: 4,
      title: 'Hydroelectric Excess',
      energyType: 'Hydro',
      quantity: 1200,
      price: '0.10',
      status: 'active',
      location: 'Tana River Basin',
    },
    {
      id: 5,
      title: 'Biomass Energy Supply',
      energyType: 'Biomass',
      quantity: 300,
      price: '0.18',
      status: 'inactive',
      location: 'Kakamega County',
    },
  ];

  return (
    <div className="min-h-screen bg-white -mt-[72px]">
      {/* Header Section with Background Image */}
      <div className="relative w-full h-48 sm:h-64 md:h-[267px] pt-[72px]">
        {/* Background Image */}
        <Image
          src="/images/unsplash_JlhvFEVMwng.jpg"
          alt="Solar panels background"
          fill
          className="object-cover"
          priority
        />
        
        {/* Heading */}
        <div className="absolute top-0 left-0 right-0 h-full flex items-center px-4 sm:px-6 md:px-8">
          <h1 
            className="text-2xl sm:text-3xl md:text-5xl"
            style={{
              fontFamily: 'Lexend Deca, sans-serif',
              fontWeight: 'normal',
              color: '#163466',
            }}
          >
            Manage Listings
          </h1>
        </div>
      </div>

      {/* Table Section */}
      <div className="relative w-full px-4 sm:px-8 py-8">
        {/* New Listing Button */}
        <div className="flex justify-end mb-6">
          <Link href="/suppliers/new">
            <button
              className="hover:opacity-90 transition-opacity px-6 py-2 rounded-lg"
              style={{
                backgroundColor: '#D2AB17',
                fontFamily: 'Lexend Deca, sans-serif',
                fontSize: '16px',
                fontWeight: 'normal',
                color: '#000',
              }}
            >
              New Listing
            </button>
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-semibold">Error loading listings</p>
            <p>{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!error && !loading && listings.length === 0 && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
            <p className="font-semibold">No listings found</p>
            <p>Click "New Listing" to create your first energy listing</p>
          </div>
        )}

        {/* Table - Hidden on mobile, shown on desktop */}
        {!error && listings.length > 0 && (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <div 
                className="overflow-hidden shadow-lg w-full"
                style={{
                  backgroundColor: '#EDF9F9',
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px',
                }}
              >
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="px-4 sm:px-6 py-4 text-left text-sm sm:text-base md:text-lg lg:text-xl font-normal" style={{ color: '#163466', fontFamily: 'Lexend Deca, sans-serif' }}>Listing Title</th>
                        <th className="px-4 sm:px-6 py-4 text-left text-sm sm:text-base md:text-lg lg:text-xl font-normal" style={{ color: '#163466', fontFamily: 'Lexend Deca, sans-serif' }}>Energy Type</th>
                        <th className="px-4 sm:px-6 py-4 text-left text-sm sm:text-base md:text-lg lg:text-xl font-normal" style={{ color: '#163466', fontFamily: 'Lexend Deca, sans-serif' }}>Quantity (kWh)</th>
                        <th className="px-4 sm:px-6 py-4 text-left text-sm sm:text-base md:text-lg lg:text-xl font-normal" style={{ color: '#163466', fontFamily: 'Lexend Deca, sans-serif' }}>Price</th>
                        <th className="px-4 sm:px-6 py-4 text-left text-sm sm:text-base md:text-lg lg:text-xl font-normal" style={{ color: '#163466', fontFamily: 'Lexend Deca, sans-serif' }}>Status</th>
                        <th className="px-4 sm:px-6 py-4 text-left text-sm sm:text-base md:text-lg lg:text-xl font-normal" style={{ color: '#163466', fontFamily: 'Lexend Deca, sans-serif' }}>Actions</th>
                        <th className="px-4 sm:px-6 py-4 text-left text-sm sm:text-base md:text-lg lg:text-xl font-normal" style={{ color: '#163466', fontFamily: 'Lexend Deca, sans-serif' }}>Location</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listings.map((listing) => (
                        <tr key={listing.id} className="border-b border-gray-200 hover:bg-white/50 transition-colors">
                          <td className="px-4 sm:px-6 py-4 text-sm sm:text-base font-light" style={{ color: '#163466', fontFamily: 'Lexend Deca, sans-serif' }}>{listing.title}</td>
                          <td className="px-4 sm:px-6 py-4 text-sm sm:text-base font-light" style={{ color: '#163466', fontFamily: 'Lexend Deca, sans-serif' }}>{listing.energyType}</td>
                          <td className="px-4 sm:px-6 py-4 text-sm sm:text-base font-light" style={{ color: '#163466', fontFamily: 'Lexend Deca, sans-serif' }}>{listing.quantity}</td>
                          <td className="px-4 sm:px-6 py-4 text-sm sm:text-base font-light" style={{ color: '#163466', fontFamily: 'Lexend Deca, sans-serif' }}>{listing.price}</td>
                          <td className="px-4 sm:px-6 py-4">
                            {listing.status === 'active' ? (
                              <span className="text-green-600 text-xl">✓</span>
                            ) : (
                              <span className="text-red-600 text-xl">⊘</span>
                            )}
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex gap-3">
                              <Link href={`/suppliers/${listing.id}/edit`}>
                                <button className="text-blue-600 hover:text-blue-800 transition-colors" title="Edit">
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                  </svg>
                                </button>
                              </Link>
                              <button onClick={() => confirmDelete(listing.id)} className="text-red-600 hover:text-red-800 transition-colors" title="Delete">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                </svg>
                              </button>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-sm sm:text-base font-light" style={{ color: '#163466', fontFamily: 'Lexend Deca, sans-serif' }}>{listing.location}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {listings.map((listing) => (
                <div key={listing.id} className="bg-[#EDF9F9] rounded-lg p-4 shadow-md">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-[#163466] text-lg" style={{ fontFamily: 'Lexend Deca, sans-serif' }}>{listing.title}</h3>
                    <div className="flex gap-2">
                      <Link href={`/suppliers/${listing.id}/edit`}>
                        <button className="text-blue-600 hover:text-blue-800" title="Edit">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                      </Link>
                      <button onClick={() => confirmDelete(listing.id)} className="text-red-600 hover:text-red-800" title="Delete">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600" style={{ fontFamily: 'Lexend Deca, sans-serif' }}>Energy Type:</span>
                      <span className="font-medium text-[#163466]" style={{ fontFamily: 'Lexend Deca, sans-serif' }}>{listing.energyType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600" style={{ fontFamily: 'Lexend Deca, sans-serif' }}>Quantity:</span>
                      <span className="font-medium text-[#163466]" style={{ fontFamily: 'Lexend Deca, sans-serif' }}>{listing.quantity} kWh</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600" style={{ fontFamily: 'Lexend Deca, sans-serif' }}>Price:</span>
                      <span className="font-medium text-[#163466]" style={{ fontFamily: 'Lexend Deca, sans-serif' }}>Ksh {listing.price}/kWh</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600" style={{ fontFamily: 'Lexend Deca, sans-serif' }}>Status:</span>
                      {listing.status === 'active' ? (
                        <span className="text-green-600 text-xl">✓ Active</span>
                      ) : (
                        <span className="text-red-600 text-xl">⊘ Inactive</span>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600" style={{ fontFamily: 'Lexend Deca, sans-serif' }}>Location:</span>
                      <span className="font-medium text-[#163466] text-right" style={{ fontFamily: 'Lexend Deca, sans-serif' }}>{listing.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Confirm Delete Dialog */}
        <ConfirmDialog
          open={confirmOpen}
          title="Delete Listing"
          description="Are you sure you want to delete this listing? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleConfirmDelete}
          onCancel={() => { setConfirmOpen(false); setPendingDeleteId(null); }}
        />
      </div>
    </div>
  );
}