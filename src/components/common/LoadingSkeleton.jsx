import React from 'react';

export default function LoadingSkeleton({ rows = 3 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, idx) => (
        <div key={idx} className="h-10 animate-pulse rounded-xl bg-[color:var(--bg-surface-subtle)]" />
      ))}
    </div>
  );
}
