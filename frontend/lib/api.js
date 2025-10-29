const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Fetch all energy listings
 */
export async function fetchListings(filters = {}) {
  try {
    const queryParams = new URLSearchParams();
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.energyType) queryParams.append('energy_type', filters.energyType);
    if (filters.limit) queryParams.append('limit', filters.limit);
    
    const url = `${API_BASE_URL}/listings/?${queryParams}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching listings:', error);
    return [];
  }
}

/**
 * Fetch a single listing by ID
 */
export async function fetchListingById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/listings/${id}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching listing:', error);
    return null;
  }
}

/**
 * Create a new listing
 */
export async function createListing(listingData) {
  try {
    console.log('Creating listing with data:', { ...listingData, imageUrl: listingData.imageUrl ? 'Image present (base64 data)' : 'No image' });
    const response = await fetch(`${API_BASE_URL}/listings/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listingData),
    });
    
    if (!response.ok) {
      let errorMessage = 'Failed to create listing';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (e) {
        const errorText = await response.text();
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating listing:', error);
    throw error;
  }
}

/**
 * Update an existing listing
 */
export async function updateListing(id, listingData) {
  try {
    const response = await fetch(`${API_BASE_URL}/listings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listingData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update listing');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating listing:', error);
    throw error;
  }
}

/**
 * Delete a listing
 */
export async function deleteListing(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/listings/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete listing');
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting listing:', error);
    throw error;
  }
}

/**
 * Auto-fill form using AI
 */
export async function autoFillForm(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/ai/auto-fill`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ currentData: formData }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to auto-fill form');
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error auto-filling form:', error);
    return null;
  }
}

/**
 * Fetch dashboard metrics
 */
export async function fetchDashboardMetrics() {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard/metrics`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    return null;
  }
}

/**
 * Fetch performance predictions
 */
export async function fetchPerformancePredictions() {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard/predictions`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching predictions:', error);
    return null;
  }
}
