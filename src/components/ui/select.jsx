import React from 'react';

export function Select({ className = '', children, ...props }) {
  return (
    <select
      className={`w-full rounded-xl border input-surface px-3.5 py-2.5 text-sm text-[color:var(--text-primary)] shadow-soft-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent transition-colors ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

