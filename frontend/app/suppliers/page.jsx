'use client';

import Image from 'next/image';

export default function SuppliersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section with Background Image */}
      <div className="relative w-full h-[267px]">
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
            top: '118px',
            fontSize: '45px',
            fontFamily: 'Lexend Deca, sans-serif',
            fontWeight: 'normal',
            color: '#163466',
          }}
        >
          Manage Listings
        </h1>
      </div>
    </div>
  );
}
