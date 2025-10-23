'use client';

import Image from 'next/image';

export default function SuppliersPage() {
  // Sample listings data
  const listings = [
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

  // Placeholder delete function
  const handleDelete = (id) => {
    console.log('Delete listing:', id);
    // TODO: Implement delete functionality
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="relative w-full h-[267px]">
        <Image
          src="/images/unsplash_JlhvFEVMwng.jpg"
          alt="Solar panels background"
          fill
          className="object-cover"
          priority
        />
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

      {/* Sample listings data and delete handler are defined above */}
    </div>
  );
}
