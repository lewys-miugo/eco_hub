// Edit Listing Page - Form for editing an existing energy listing
export default function EditListingPage({ params }) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold"> Edit Listing</h1>
      <p>Form for editing listing ID: {params.id}</p>
    </div>
  );
}

