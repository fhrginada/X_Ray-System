import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { patientHistory } from '../data/mockData';
import EmptyState from '../components/common/EmptyState';

export default function PatientHistoryPage({ patientId }) {
  const rows = patientId ? patientHistory.filter((r) => r.patientId === patientId) : patientHistory;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Timeline / History</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {rows.length === 0 ? (
          <EmptyState title="No history yet" subtitle="Once scans are completed, timeline entries appear here." />
        ) : (
          rows.slice(0, 8).map((row) => (
            <div key={row.id} className="surface-muted rounded-xl px-3 py-2">
              <p className="text-sm font-semibold text-[color:var(--text-primary)]">
                {row.visitDate} - {row.xrayType}
              </p>
              <p className="text-xs text-[color:var(--text-secondary)]">
                {row.patientName} | {row.doctor} | {row.clinicName}
              </p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
