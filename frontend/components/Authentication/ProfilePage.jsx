'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useToast } from '../Toast';

export default function ProfilePage() {
  const { showToast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    location: ''
  });
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [metrics, setMetrics] = useState({
    firstSeen: '',
    firstPurchase: '',
    installedCapacity: '0 KWh',
    totalRevenue: 'Kes. 0.00',
    mrr: 'Kes. 0.00'
  });

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    const token = localStorage.getItem('access_token');
    const userStr = localStorage.getItem('user');
    
    if (!token && !userStr) {
      setIsLoggedIn(false);
      setLoading(false);
      window.location.href = '/auth';
      return;
    }

    setIsLoggedIn(true);
    
    // Load user data from localStorage
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserData(user);
        setFormData({
          firstName: user.first_name || '',
          lastName: user.last_name || '',
          email: user.email || '',
          location: user.location || ''
        });
        
        // Format dates
        if (user.created_at) {
          const firstSeen = new Date(user.created_at);
          setMetrics(prev => ({
            ...prev,
            firstSeen: formatDate(firstSeen)
          }));
        }
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }

    // Load purchase history and metrics (mock for now)
    loadUserMetrics();
    setLoading(false);
  };

  const loadUserMetrics = async () => {
    // TODO: Replace with actual API call
    // For now, use mock data
    setPurchaseHistory([
      {
        date: '2 - 03 - 2025',
        location: 'Kahawa West, Nairobi',
        capacity: '10 KWh @Kes.1.5',
        totalCost: 'Kes. 15,000'
      },
      {
        date: '2 - 05 - 2025',
        location: 'Kahawa West, Nairobi',
        capacity: '10 KWh @Kes.1.5',
        totalCost: 'Kes. 15,000'
      }
    ]);
    
    setMetrics({
      firstSeen: userData?.created_at ? formatDate(new Date(userData.created_at)) : '1 Mar, 2025',
      firstPurchase: purchaseHistory.length > 0 ? purchaseHistory[0].date : '1 May, 2025',
      installedCapacity: '10 KWh',
      totalRevenue: 'Kes. 1,110,000.00',
      mrr: 'Kes. 11,573.00'
    });
  };

  const formatDate = (date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        showToast('You must be logged in to update your profile', 'error');
        return;
      }

      // TODO: Call API to update profile
      // const response = await fetch(`${API_BASE_URL}/users/${userData.id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     first_name: formData.firstName,
      //     last_name: formData.lastName,
      //     location: formData.location
      //   })
      // });

      // For now, just update local state
      showToast('Profile updated successfully!', 'success');
      setIsEditing(false);
      
      // Update localStorage
      if (userData) {
        const updatedUser = {
          ...userData,
          first_name: formData.firstName,
          last_name: formData.lastName,
          location: formData.location
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUserData(updatedUser);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      showToast('Failed to update profile', 'error');
    }
  };

  const handleCancel = () => {
    // Reset form data
    if (userData) {
      setFormData({
        firstName: userData.first_name || '',
        lastName: userData.last_name || '',
        email: userData.email || '',
        location: userData.location || ''
      });
    }
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/images/unsplash_sWvDK3EO3eo.jpg')" }}>
        <div className="text-white text-xl">Loading profile...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null; // Will redirect
  }

  const displayName = userData 
    ? `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || userData.name || 'User'
    : 'User';
  const displayEmail = userData?.email || 'user@example.com';

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <Image
        src="/images/unsplash_sWvDK3EO3eo.jpg"
        alt="Solar panel farm background"
        fill
        className="object-cover"
        priority
      />
      
      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40"></div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-8 py-20">
        <div 
          className="w-full max-w-5xl rounded-2xl shadow-xl overflow-hidden"
          style={{
            backgroundColor: '#163466',
            fontFamily: 'Lexend Deca, sans-serif'
          }}
        >
          {/* Header Section with Banner */}
          <div className="relative h-48 w-full">
            {/* Banner Image */}
            <Image
              src="/images/unsplash_sWvDK3EO3eo.jpg"
              alt="Solar panel banner"
              fill
              className="object-cover"
            />
            {/* Profile Picture */}
            <div className="absolute -bottom-12 left-10 flex items-end">
              <div 
                className="w-32 h-32 rounded-full border-4 border-white flex items-center justify-center text-white text-4xl font-bold"
                style={{ backgroundColor: '#FF5733' }}
              >
                {getInitials(displayName)}
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-16 px-8 sm:px-10 pb-8">
            {/* User Name and Email */}
            <div className="mb-6">
              <h1 className="text-3xl font-semibold text-white mb-1">
                {displayName}
              </h1>
              <p className="text-gray-300 text-lg">{displayEmail}</p>
            </div>

            {/* Key Metrics Section */}
            <div className="flex flex-wrap gap-8 border-b border-gray-600 pb-4 mb-6">
              <div className="flex-1 min-w-[120px]">
                <p className="text-gray-400 text-sm mb-1">First Seen</p>
                <p className="font-semibold text-white">{metrics.firstSeen}</p>
              </div>
              <div className="border-l border-gray-600 pl-8 flex-1 min-w-[120px]">
                <p className="text-gray-400 text-sm mb-1">First Purchase</p>
                <p className="font-semibold text-white">{metrics.firstPurchase}</p>
              </div>
              <div className="border-l border-gray-600 pl-8 flex-1 min-w-[120px]">
                <p className="text-gray-400 text-sm mb-1">Installed Capacity</p>
                <p className="font-semibold text-white">{metrics.installedCapacity}</p>
              </div>
              <div className="border-l border-gray-600 pl-8 flex-1 min-w-[120px]">
                <p className="text-gray-400 text-sm mb-1">Total Revenue</p>
                <p className="font-semibold text-white">{metrics.totalRevenue}</p>
              </div>
              <div className="border-l border-gray-600 pl-8 flex-1 min-w-[120px]">
                <p className="text-gray-400 text-sm mb-1">MRR</p>
                <p className="font-semibold text-white">{metrics.mrr}</p>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Purchase History (Left Column) */}
              <div>
                <h2 className="text-white font-semibold mb-4">Purchase History</h2>
                <div className="space-y-4">
                  {purchaseHistory.map((purchase, idx) => (
                    <div key={idx} className="text-white">
                      <p className="text-sm text-gray-400 mb-1">Purchase date</p>
                      <p className="font-semibold mb-1">{purchase.date}</p>
                      <p className="text-sm mb-2" style={{ color: '#2FAA5B' }}>
                        {purchase.location}
                      </p>
                      <p className="text-sm mb-1">
                        <span className="font-semibold">Capacity:</span> {purchase.capacity}
                      </p>
                      <p className="font-semibold">Total Cost: {purchase.totalCost}</p>
                    </div>
                  ))}
                  {purchaseHistory.length === 0 && (
                    <p className="text-gray-400 text-sm">No purchase history available</p>
                  )}
                </div>
              </div>

              {/* Editable User Information (Right Column) */}
              <div>
                <h2 className="text-white font-semibold mb-4">User Information</h2>
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="text-gray-400 text-sm block mb-1">Name :</label>
                    {isEditing ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="First name"
                          className="flex-1 px-3 py-2 rounded-md bg-[#041532] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Last name"
                          className="flex-1 px-3 py-2 rounded-md bg-[#041532] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    ) : (
                      <p className="text-white">
                        <span className="font-semibold">{formData.firstName || 'First'}</span>{' '}
                        {formData.lastName || 'Last'}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-gray-400 text-sm block mb-1">Email Address :</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled
                        className="w-full px-3 py-2 rounded-md bg-[#041532] border border-gray-600 text-gray-400 cursor-not-allowed"
                      />
                    ) : (
                      <p className="text-white font-semibold">{formData.email}</p>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <label className="text-gray-400 text-sm block mb-1">Location :</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Enter your location"
                        className="w-full px-3 py-2 rounded-md bg-[#041532] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-white font-semibold">
                        {formData.location || 'Not specified'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-8">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 rounded-lg border border-white text-white hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 rounded-lg border border-white text-white hover:bg-white/10 transition-colors"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 rounded-lg border border-white text-white hover:bg-white/10 transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
