'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    const toast = { id, message, type };
    setToasts((prev) => [...prev, toast]);

    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-3 items-center">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onRemove={removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onRemove }) {
  const [isExiting, setIsExiting] = useState(false);

  const handleRemove = () => {
    setIsExiting(true);
    setTimeout(() => onRemove(toast.id), 300);
  };

  // Get colors based on type
  const getColors = () => {
    if (toast.type === 'error') {
      return {
        bg: '#7F1D1D',
        border: '#DC2626',
        iconBg: '#DC2626',
        text: 'white',
      };
    }
    // Default to success
    return {
      bg: '#163466',
      border: '#D2AB17',
      iconBg: '#D2AB17',
      text: 'white',
    };
  };

  const colors = getColors();

  return (
    <div
      className={`flex items-center gap-3 px-5 py-3 rounded-lg shadow-lg transition-all duration-300 ${
        isExiting
          ? '-translate-y-4 opacity-0'
          : 'translate-y-0 opacity-100'
      }`}
      style={{
        backgroundColor: colors.bg,
        border: `2px solid ${colors.border}`,
        fontFamily: 'Lexend Deca, sans-serif',
        minWidth: '320px',
        maxWidth: '400px',
      }}
    >
      {/* Icon */}
      <div
        className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
        style={{ backgroundColor: colors.iconBg }}
      >
        {toast.type === 'error' ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M15 9l-6 6M9 9l6 6" />
          </svg>
        ) : (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>

      {/* Message */}
      <p
        className="flex-1 text-sm font-medium"
        style={{ color: colors.text }}
      >
        {toast.message}
      </p>

      {/* Close Button */}
      <button
        onClick={handleRemove}
        className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Close"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.text}
          strokeWidth="2.5"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
