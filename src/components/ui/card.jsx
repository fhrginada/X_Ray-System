import React from 'react';

export function Card({ className = '', children, ...props }) {
  return (
    <div
      className={`rounded-3xl border card-surface ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children, ...props }) {
  return (
    <div
      className={`flex items-center justify-between gap-3 border-b border-[color:var(--border-subtle)] px-6 py-5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ className = '', children, ...props }) {
  return (
    <h2
      className={`text-lg font-semibold tracking-tight text-[color:var(--text-primary)] ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
}

export function CardContent({ className = '', children, ...props }) {
  return (
    <div className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className = '', children, ...props }) {
  return (
    <div
      className={`flex items-center justify-end gap-3 border-t border-[color:var(--border-subtle)] px-6 py-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
