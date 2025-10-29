'use client';

import { useEffect } from 'react';

export default function ConfirmDialog({ open, title = 'Confirm Action', description, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel }) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onCancel?.();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div
        className="relative w-full max-w-md mx-4 rounded-lg shadow-2xl"
        style={{ backgroundColor: '#163466', border: '2px solid #D2AB17', fontFamily: 'Lexend Deca, sans-serif' }}
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-xl" style={{ color: 'white' }}>{title}</h2>
            <button onClick={onCancel} className="opacity-80 hover:opacity-100" aria-label="Close">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          {description && (
            <p className="mb-6" style={{ color: '#E5E7EB' }}>{description}</p>
          )}
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-md transition-opacity"
              style={{ backgroundColor: 'transparent', color: '#E5E7EB', border: '1px solid #E5E7EB' }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-md transition-colors"
              style={{ backgroundColor: '#2FAA5B', color: 'white' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#15803d'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2FAA5B'}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


