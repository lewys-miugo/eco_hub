'use client';

import { useState } from 'react';
import LoginForm from './LoginForm'; // assumes you have this
// import RegisterForm from './RegisterForm';

export default function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // toggle this to false to test login redirect

  if (!isLoggedIn) {
    return (
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative"
        style={{ backgroundImage: "url('./solar_bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative w-full max-w-md backdrop-blur-xs rounded-xl shadow-lg p-2">
          <LoginForm />
        </div>
      </div>
    );
  }

  // If logged in → render profile
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-10"
      style={{ backgroundImage: "url('./solar_bg.jpg')" }}
    >
      <div className="bg-[#0e2a57]/95 w-full max-w-5xl rounded-2xl shadow-xl overflow-hidden text-white relative">
        {/* Header Section */}
        <div className="relative h-48 w-full">
          <img
            src="./images/profile_header.png"
            alt="Header background"
            className="object-cover w-full h-full"
          />
          <div className="absolute -bottom-12 left-10 flex items-center space-x-4">
            <img
              src="./images/profile_picture.png"
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white"
            />
            <div>
              <h2 className="text-2xl font-semibold">Kamau Ochieng</h2>
              <p className="text-sm text-gray-300">kamauochieng7@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="pt-16 px-10 pb-10">
          {/* Stats Row */}
          <div className="flex flex-wrap gap-8 border-b border-gray-600 pb-4 mb-6">
            <div>
              <p className="text-gray-400 text-sm">First Seen</p>
              <p className="font-semibold">1 Mar, 2025</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">First Purchase</p>
              <p className="font-semibold">1 May, 2025</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Installed Capacity</p>
              <p className="font-semibold">10 KWh</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Revenue</p>
              <p className="font-semibold">Kes. 1,110,000.00</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">MRR</p>
              <p className="font-semibold">Kes. 11,573.00</p>
            </div>
          </div>

          {/* Purchases Section */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#112d5c] rounded-xl p-4 border border-gray-700">
              <p className="text-gray-400 text-sm">Purchase date</p>
              <p className="font-semibold">2 - 03 - 2025</p>
              <p className="text-sm text-gray-300 mt-1">
                Kahawa West, Nairobi
              </p>
              <p className="mt-2">
                <span className="font-semibold">Capacity:</span> 10 KWh
                <span className="text-gray-300 ml-1">@Kes.1.5</span>
              </p>
              <p className="font-semibold mt-1">Total Cost: Kes. 15,000</p>
            </div>

            <div className="bg-[#112d5c] rounded-xl p-4 border border-gray-700">
              <p className="text-gray-400 text-sm">Purchase date</p>
              <p className="font-semibold">2 - 05 - 2025</p>
              <p className="text-sm text-gray-300 mt-1">
                Kahawa West, Nairobi
              </p>
              <p className="mt-2">
                <span className="font-semibold">Capacity:</span> 10 KWh
                <span className="text-gray-300 ml-1">@Kes.1.5</span>
              </p>
              <p className="font-semibold mt-1">Total Cost: Kes. 15,000</p>
            </div>
          </div>

          {/* Editable Details */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <label className="w-28 text-gray-400">Name:</label>
              <p>
                <span className="font-semibold">Kamau</span> Ochieng
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <label className="w-28 text-gray-400">Email:</label>
              <p className="font-semibold">kamauochieng7@gmail.com</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <label className="w-28 text-gray-400">Location:</label>
              <p className="font-semibold">
                Kings Apartments, Nairobi, Kenya
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-8 space-x-4">
            <button className="px-6 py-2 rounded-lg border border-gray-500 hover:bg-gray-700 transition">
              Cancel
            </button>
            <button className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
