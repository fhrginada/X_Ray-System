import React from 'react';
import { useAppContext } from '../../context/AppContext';

const colorByType = {
  success: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
  error: 'border-rose-500/40 bg-rose-500/10 text-rose-300',
  info: 'border-sky-500/40 bg-sky-500/10 text-sky-300',
  warning: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
};

export default function ToastStack() {
  const { notifications } = useAppContext();
  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 flex w-[330px] max-w-[92vw] flex-col gap-2">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`rounded-xl border px-3 py-2 text-sm shadow-soft-elevated ${colorByType[n.type] || colorByType.info}`}
        >
          {n.message}
        </div>
      ))}
    </div>
  );
}
