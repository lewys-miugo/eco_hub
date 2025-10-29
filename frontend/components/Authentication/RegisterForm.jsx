'use client';

import { useState } from 'react';
import { useToast } from '../Toast';

export default function RegisterForm({ onToggle }) {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    role: 'consumer',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          location: formData.location,
          role: formData.role,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Auto-login after successful registration
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        // Dispatch event to update navbar immediately
        window.dispatchEvent(new Event('storage'));
        showToast('Registration successful! Welcome aboard!', 'success');
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[#163466] p-8 rounded-lg shadow-md">
      <img className='mx-auto' src='/eco_hub_logo.png' alt="Eco Hub Logo"/>
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block  text-sm font-bold mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder='e.g Ochieng'
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500"
              required
            />
          </div>
          <div>
            <label className="block  text-sm font-bold mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder='e.g Kamau'
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2">
            Email
          </label>
          <input 
            type="email"
            name="email"
            value={formData.email}
            placeholder='e.g ochiengkamau.gmail.com'
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
              placeholder='e.g Riara springs, Nairobi'
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2">
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500 bg-[#163466]"
            required
          >
            <option value="consumer ">Consumer</option>
            <option value="supplier ">Supplier</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder='e.g ochiengkamau!1234'
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block  text-sm font-bold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder='e.g ochiengkamau!1234'
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#2FAA5B] text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-1 focus:ring-green-500 disabled:opacity-50"
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>

      <p className="text-center mt-4">
        Already have an account?{' '}
        <button
          onClick={onToggle}
          className="text-green-600 hover:text-green-800 font-medium"
        >
          Login
        </button>
      </p>
    </div>
  );
}