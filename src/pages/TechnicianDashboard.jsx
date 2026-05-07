import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { REQUEST_STATUS } from '../constants/workflow';

export default function TechnicianDashboard({ requests = [] }) {
  const cards = [
    ['Incoming', requests.filter((r) => r.status === REQUEST_STATUS.PENDING).length],
    ['Assigned', requests.filter((r) => r.status === REQUEST_STATUS.ACCEPTED).length],
    ['In Progress', requests.filter((r) => r.status === REQUEST_STATUS.IN_PROGRESS).length],
    ['Completed', requests.filter((r) => r.status === REQUEST_STATUS.COMPLETED).length],
  ];

  return (
    <div className="grid gap-3 md:grid-cols-4">
      {cards.map(([label, value]) => (
        <Card key={label}>
          <CardContent>
            <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--text-secondary)]">{label}</p>
            <p className="mt-1 text-2xl font-semibold text-[color:var(--text-primary)]">{value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
