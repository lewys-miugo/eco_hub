'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/hello');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white">
      <div className="w-full max-w-2xl">
        <div className="rounded-lg shadow-2xl bg-white p-8">
          <h1 className="text-4xl font-bold text-center mb-2 text-[#163466]">
            Eco Hub
          </h1>
          <p className="text-center text-gray-600 dark:text-[#163466] mb-8">
            Eco Hub Application with Flask, PostgreSQL, Next.js & Tailwind
          </p>

          <div className="space-y-6">
            {loading && (
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">Loading data...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-800 dark:text-red-500">
                  <span className="font-semibold">Error:</span> {error}
                </p>
                <p className="text-sm text-red-700 dark:text-red-500 mt-2">
                  Make sure the Flask backend is running on http://localhost:5000
                </p>
              </div>
            )}

            {data && !loading && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-6 border border-blue-200 dark:border-gray-600">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Message
                  </h2>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {data.message}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">
                      Database Status
                    </h3>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {data.database}
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">
                      Status
                    </h3>
                    <p
                      className={`text-lg font-bold ${
                        data.status === 'success'
                          ? 'text-green-600 dark:text-green-400'
                          : data.status === 'warning'
                          ? 'text-yellow-600 dark:text-yellow-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                    </p>
                  </div>
                </div>

                {data.timestamp && (
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">
                      Server Timestamp
                    </h3>
                    <p className="text-gray-900 dark:text-white font-mono text-sm">
                      {data.timestamp}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-[#163466] mb-4">
              Tech Stack
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Flask', 'PostgreSQL', 'Next.js', 'Tailwind CSS'].map((tech) => (
                <div
                  key={tech}
                  className="bg-indigo-50 dark:bg-[#163466] rounded px-3 py-2 text-center text-sm font-medium text-indigo-700 dark:text-white border border-indigo-200 dark:border-indigo-800"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
