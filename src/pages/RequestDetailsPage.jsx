import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import StatusBadge from '../components/common/StatusBadge';
import { REQUEST_STATUS } from '../constants/workflow';

export default function RequestDetailsPage({ request, onBack, onStatusChange }) {
  if (!request) return null;

  const nextActionByStatus = {
    [REQUEST_STATUS.PENDING]: REQUEST_STATUS.ACCEPTED,
    [REQUEST_STATUS.ACCEPTED]: REQUEST_STATUS.IN_PROGRESS,
    [REQUEST_STATUS.IN_PROGRESS]: REQUEST_STATUS.COMPLETED,
  };

  const nextStatus = nextActionByStatus[request.status];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Details - {request.id}</CardTitle>
        <Button variant="ghost" size="sm" onClick={onBack}>
          Back
        </Button>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-2">
        <div className="surface-muted rounded-xl p-3">
          <p className="text-xs text-[color:var(--text-secondary)]">Patient</p>
          <p className="text-sm font-medium text-[color:var(--text-primary)]">
            {request.patientName} ({request.patientId})
          </p>
        </div>
        <div className="surface-muted rounded-xl p-3">
          <p className="text-xs text-[color:var(--text-secondary)]">X-ray Type</p>
          <p className="text-sm font-medium text-[color:var(--text-primary)]">{request.type}</p>
        </div>
        <div className="surface-muted rounded-xl p-3">
          <p className="text-xs text-[color:var(--text-secondary)]">Priority</p>
          <p className="text-sm font-medium text-[color:var(--text-primary)]">{request.priority}</p>
        </div>
        <div className="surface-muted rounded-xl p-3">
          <p className="text-xs text-[color:var(--text-secondary)]">Status</p>
          <StatusBadge status={request.status} />
        </div>
        <div className="surface-muted rounded-xl p-3 md:col-span-2">
          <p className="text-xs text-[color:var(--text-secondary)]">Notes</p>
          <p className="text-sm text-[color:var(--text-primary)]">{request.notes || 'No notes provided'}</p>
        </div>
      </CardContent>
      {nextStatus && (
        <div className="px-6 pb-5">
          <Button onClick={() => onStatusChange(request.id, nextStatus)}>
            Move to {nextStatus.replace('-', ' ')}
          </Button>
        </div>
      )}
    </Card>
  );
}
