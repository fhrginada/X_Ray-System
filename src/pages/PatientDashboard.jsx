import React from 'react';
import { Card, CardContent } from '../components/ui/card';

export default function PatientDashboard({ requests = [] }) {
  const upcoming = requests.filter((r) => r.status !== 'completed').length;
  const completed = requests.filter((r) => r.status === 'completed').length;

  return (
    <div className="grid gap-3 md:grid-cols-4">
      <Card>
        <CardContent>
          <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--text-secondary)]">Upcoming</p>
          <p className="mt-1 text-2xl font-semibold text-[color:var(--text-primary)]">{upcoming}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--text-secondary)]">Recent Scans</p>
          <p className="mt-1 text-2xl font-semibold text-[color:var(--text-primary)]">{completed}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--text-secondary)]">Reports</p>
          <p className="mt-1 text-2xl font-semibold text-[color:var(--text-primary)]">{completed}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--text-secondary)]">Notifications</p>
          <p className="mt-1 text-2xl font-semibold text-[color:var(--text-primary)]">3</p>
        </CardContent>
      </Card>
    </div>
  );
}
