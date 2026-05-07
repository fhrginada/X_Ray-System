import React from 'react';

const variants = {
  default: 'badge-surface border',
  success:
    'bg-emerald-500/15 text-emerald-600 border border-emerald-500/30 shadow-soft-card dark:text-emerald-300',
  warning:
    'bg-amber-500/15 text-amber-600 border border-amber-500/30 shadow-soft-card dark:text-amber-200',
  danger:
    'bg-rose-500/15 text-rose-600 border border-rose-500/30 shadow-soft-card dark:text-rose-200',
  info:
    'bg-sky-500/15 text-sky-700 border border-sky-500/30 shadow-soft-card dark:text-sky-200',
};

export function Badge({ variant = 'default', className = '', ...props }) {
  const variantClasses = variants[variant] || variants.default;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide ${variantClasses} ${className}`}
      {...props}
    />
  );
}
