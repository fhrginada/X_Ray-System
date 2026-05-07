import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import StatusBadge from '../components/common/StatusBadge';
import { REQUEST_STATUS } from '../constants/workflow';

export default function DoctorDashboard({ requests = [], onOpenDetails }) {
  const pending = requests.filter((r) => r.status === REQUEST_STATUS.PENDING).length;
  const completed = requests.filter((r) => r.status === REQUEST_STATUS.COMPLETED).length;
  const urgent = requests.filter((r) => r.priority === 'urgent').length;
  const recent = requests.slice(0, 5);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-4">
        {[
          ['Total Requests', requests.length],
          ['Pending', pending],
          ['Completed', completed],
          ['Urgent', urgent],
        ].map(([label, value]) => (
          <Card key={label}>
            <CardContent>
              <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--text-secondary)]">{label}</p>
              <p className="mt-1 text-2xl font-semibold text-[color:var(--text-primary)]">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardContent>
          <h3 className="mb-3 text-base font-semibold text-[color:var(--text-primary)]">Recent Requests</h3>
          <div className="space-y-2">
            {recent.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onOpenDetails(item)}
                className="surface-muted flex w-full items-center justify-between rounded-xl px-3 py-2 text-left"
              >
                <div>
                  <p className="text-sm font-medium text-[color:var(--text-primary)]">
                    {item.patientName} - {item.type}
                  </p>
                  <p className="text-xs text-[color:var(--text-secondary)]">{item.id}</p>
                </div>
                <StatusBadge status={item.status} />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
