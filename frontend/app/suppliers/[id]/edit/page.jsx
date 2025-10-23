'use client';

import Image from 'next/image';

export default function EditListingPage() {
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
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        {/* Main Card Container */}
        <div
          className="mx-auto"
          style={{
            width: '636px',
            height: '582px',
            backgroundColor: '#163466',
            borderRadius: '10px',
            padding: '32px',
          }}
        >
          {/* Header Section */}
          <div className="mb-4 text-center">
            <h1
              className="mb-1"
              style={{
                color: 'white',
                fontFamily: 'Lexend Deca, sans-serif',
                fontSize: '28px',
                fontWeight: 'normal',
              }}
            >
              Update Your Listing
            </h1>
            <p
              style={{
                color: '#D2AB17',
                fontFamily: 'Lexend Deca, sans-serif',
                fontSize: '18px',
                fontWeight: '300',
              }}
            >
              Fill in the details below to edit your renewable energy listing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
