import React from 'react';

export default function EmptyState({ title, subtitle }) {
  return (
    <div className="surface-muted rounded-2xl px-6 py-10 text-center">
      <p className="text-base font-semibold text-[color:var(--text-primary)]">{title}</p>
      <p className="mt-1 text-sm text-[color:var(--text-secondary)]">{subtitle}</p>
    </div>
  );
}
