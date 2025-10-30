const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://eco-hub-backend.onrender.com/api';

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
    // Check for authentication token
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('You must be logged in to create a listing. Please log in first.');
    }
    
    // Check if listingData is FormData (file upload) or regular object
    const isFormData = listingData instanceof FormData;
    
    if (isFormData) {
      console.log('Creating listing with FormData (file upload)');
      // Don't set Content-Type header - browser will set it automatically with boundary for FormData
    } else {
      console.log('Creating listing with JSON data:', { ...listingData, imageUrl: listingData.imageUrl ? 'Image present' : 'No image' });
    }
    
    // Build headers - always include Authorization, conditionally include Content-Type
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    
    // Only set Content-Type for JSON, not for FormData (browser sets it automatically with boundary)
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }
    
    const response = await fetch(`${API_BASE_URL}/listings/`, {
      method: 'POST',
      headers: headers,
      body: isFormData ? listingData : JSON.stringify(listingData),
    });
    
    if (!response.ok) {
      let errorMessage = 'Failed to create listing';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
        
        // If authentication error, clear token and redirect
        if (response.status === 422 || response.status === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
          window.dispatchEvent(new Event('storage'));
          errorMessage = 'Please log in to create a listing';
        }
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
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${API_BASE_URL}/listings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
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

/**
 * Fetch the logged-in user's purchase history
 */
export async function fetchMyPurchases() {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('Not authenticated');
    const response = await fetch(`${API_BASE_URL}/transactions/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to load purchases');
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching purchases:', error);
    return [];
  }
}

/**
 * Fetch aggregate purchase summary for logged-in user
 */
export async function fetchMyPurchaseSummary() {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('Not authenticated');
    const response = await fetch(`${API_BASE_URL}/transactions/me/summary`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to load summary');
    const data = await response.json();
    return data.data || { totalKwh: 0, totalExpenditure: 0 };
  } catch (error) {
    console.error('Error fetching purchase summary:', error);
    return { totalKwh: 0, totalExpenditure: 0 };
  }
}

/**
 * Create a purchase transaction
 */
export async function createPurchase(listingId, kwh) {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('You must be logged in to purchase energy');
    const response = await fetch(`${API_BASE_URL}/transactions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ listingId, kwh })
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to complete purchase');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error creating purchase:', error);
    throw error;
  }
}
