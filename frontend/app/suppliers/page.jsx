'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchListings, deleteListing as deleteListingAPI } from '../../lib/api.js';

export default function SuppliersPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Handle delete action
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this listing?')) {
      return;
    }

    try {
      await deleteListingAPI(id);
      // Remove from local state
      setListings(listings.filter(listing => listing.id !== id));
    } catch (err) {
      alert('Failed to delete listing');
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
      <div className="relative w-full h-[267px] pt-[72px]">
        {/* Background Image */}
        <Image
          src="/images/unsplash_JlhvFEVMwng.jpg"
          alt="Solar panels background"
          fill
          className="object-cover"
          priority
        />
        
        {/* Heading */}
        <h1 
          className="absolute"
          style={{
            left: '46px',
            top: '160px',
            fontSize: '45px',
            fontFamily: 'Lexend Deca, sans-serif',
            fontWeight: 'normal',
            color: '#163466',
          }}
        >
          Manage Listings
        </h1>
      </div>

      {/* Table Section */}
      <div 
        className="relative w-full"
        style={{
          height: '732px',
        }}
      >
        {/* New Listing Button */}
        <div className="flex justify-end mb-2 px-8" style={{ marginTop: '-50px' }}>
          <Link href="/suppliers/new">
            <button
              style={{
                backgroundColor: '#D2AB17',
                width: '139px',
                height: '41px',
                borderRadius: '10px',
                fontFamily: 'Lexend Deca, sans-serif',
                fontSize: '20px',
                fontWeight: 'normal',
                color: '#000',
              }}
              className="hover:opacity-90 transition-opacity"
            >
              New Listing
            </button>
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mx-8">
            <p className="font-semibold">Error loading listings</p>
            <p>{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!error && !loading && listings.length === 0 && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4 mx-8">
            <p className="font-semibold">No listings found</p>
            <p>Click "New Listing" to create your first energy listing</p>
          </div>
        )}

        {/* Table */}
        {!error && listings.length > 0 && (
        <div 
          className="overflow-hidden shadow-lg w-full"
          style={{
            backgroundColor: '#EDF9F9',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
          }}
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-300">
                <th 
                  className="px-6 py-4 text-left"
                  style={{ 
                    fontFamily: 'Lexend Deca, sans-serif', 
                    fontSize: '20px',
                    fontWeight: 'normal',
                    color: '#163466' 
                  }}
                >
                  Listing Title
                </th>
                <th 
                  className="px-6 py-4 text-left"
                  style={{ 
                    fontFamily: 'Lexend Deca, sans-serif', 
                    fontSize: '20px',
                    fontWeight: 'normal',
                    color: '#163466' 
                  }}
                >
                  Energy Type
                </th>
                <th 
                  className="px-6 py-4 text-left"
                  style={{ 
                    fontFamily: 'Lexend Deca, sans-serif', 
                    fontSize: '20px',
                    fontWeight: 'normal',
                    color: '#163466' 
                  }}
                >
                  Quantity (kWh)
                </th>
                <th 
                  className="px-6 py-4 text-left"
                  style={{ 
                    fontFamily: 'Lexend Deca, sans-serif', 
                    fontSize: '20px',
                    fontWeight: 'normal',
                    color: '#163466' 
                  }}
                >
                  Price (Ksh/kWh)
                </th>
                <th 
                  className="px-6 py-4 text-left"
                  style={{ 
                    fontFamily: 'Lexend Deca, sans-serif', 
                    fontSize: '20px',
                    fontWeight: 'normal',
                    color: '#163466' 
                  }}
                >
                  Status
                </th>
                <th 
                  className="px-6 py-4 text-left"
                  style={{ 
                    fontFamily: 'Lexend Deca, sans-serif', 
                    fontSize: '20px',
                    fontWeight: 'normal',
                    color: '#163466' 
                  }}
                >
                  Actions
                </th>
                <th 
                  className="px-6 py-4 text-left"
                  style={{ 
                    fontFamily: 'Lexend Deca, sans-serif', 
                    fontSize: '20px',
                    fontWeight: 'normal',
                    color: '#163466' 
                  }}
                >
                  Location
                </th>
              </tr>
            </thead>
            <tbody>
              {listings.map((listing) => (
                <tr key={listing.id} className="border-b border-gray-200 hover:bg-white/50 transition-colors">
                  <td 
                    className="px-6 py-4"
                    style={{ 
                      fontFamily: 'Lexend Deca, sans-serif',
                      fontSize: '18px',
                      fontWeight: '300',
                      color: '#163466'
                    }}
                  >
                    {listing.title}
                  </td>
                  <td 
                    className="px-6 py-4"
                    style={{ 
                      fontFamily: 'Lexend Deca, sans-serif',
                      fontSize: '18px',
                      fontWeight: '300',
                      color: '#163466'
                    }}
                  >
                    {listing.energyType}
                  </td>
                  <td 
                    className="px-6 py-4"
                    style={{ 
                      fontFamily: 'Lexend Deca, sans-serif',
                      fontSize: '18px',
                      fontWeight: '300',
                      color: '#163466'
                    }}
                  >
                    {listing.quantity}
                  </td>
                  <td 
                    className="px-6 py-4"
                    style={{ 
                      fontFamily: 'Lexend Deca, sans-serif',
                      fontSize: '18px',
                      fontWeight: '300',
                      color: '#163466'
                    }}
                  >
                    {listing.price}
                  </td>
                  <td className="px-6 py-4">
                    {listing.status === 'active' ? (
                      <span className="text-green-600 text-xl">✓</span>
                    ) : (
                      <span className="text-red-600 text-xl">⊘</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <Link href={`/suppliers/${listing.id}/edit`}>
                        <button 
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="Edit"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                      </Link>
                      <button 
                        onClick={() => handleDelete(listing.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Delete"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td 
                    className="px-6 py-4"
                    style={{ 
                      fontFamily: 'Lexend Deca, sans-serif',
                      fontSize: '18px',
                      fontWeight: '300',
                      color: '#163466'
                    }}
                  >
                    {listing.location}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </div>
  );
}