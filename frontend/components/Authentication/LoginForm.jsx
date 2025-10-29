'use client';

import { useState } from 'react';

export default function LoginForm({ onToggle }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        // Dispatch event to update navbar immediately
        window.dispatchEvent(new Event('storage'));
        window.location.href = '/';
      } else {
        setError(data.error || 'Login failed');
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
      <h2 className="text-2xl font-bold text-center mb-6 text-white">GOOD TO SEE YOU AGAIN!</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-white px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder='e.g ochiengkamau.gmail.com'
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:opacity-40 placeholder:text-white"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder='e.g ochiengkamau!1234'
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:opacity-40 placeholder:text-white"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className=" cursor-pointer w-full bg-[#2FAA5B] font-bold text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className='flex text-sm justify-between'>
        <p className="text-center mt-4 underline underline-offset-4">
          Don't have an account?{' '}
          <button
            onClick={onToggle}
            className="text-green-600 hover:text-green-800 font-medium cursor-pointer "
          >
            Sign up
          </button>
        </p>
        
        <button
          onClick={onToggle}
          className="text-white hover:text-green-800 font-medium cursor-pointer text-center mt-4 underline underline-offset-4"
        >
          Forgot password?
        </button>
      </div>
    </div>
  );
}