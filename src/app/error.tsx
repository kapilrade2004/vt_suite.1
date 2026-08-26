'use client';

import React, { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: '20px', color: '#0f172a', marginBottom: '12px' }}>Something went wrong!</h2>
      <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
        {error?.message || 'An unexpected error occurred while rendering the page.'}
      </p>
      <button
        onClick={() => reset()}
        style={{
          background: '#1da851',
          color: '#ffffff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '8px',
          fontWeight: 700,
          cursor: 'pointer'
        }}
      >
        Try Again
      </button>
    </div>
  );
}
