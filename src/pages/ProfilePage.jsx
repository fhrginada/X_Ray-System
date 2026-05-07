import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ROLE_LABELS } from '../constants/roles';

export default function ProfilePage({ user }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="rounded-xl bg-[color:var(--bg-surface-subtle)] px-4 py-3">
          <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--text-secondary)]">Display Name</p>
          <p className="text-sm font-semibold text-[color:var(--text-primary)]">{user?.displayName}</p>
        </div>
        <div className="rounded-xl bg-[color:var(--bg-surface-subtle)] px-4 py-3">
          <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--text-secondary)]">Role</p>
          <p className="text-sm font-semibold text-[color:var(--text-primary)]">{ROLE_LABELS[user?.role]}</p>
        </div>
        <div className="rounded-xl bg-[color:var(--bg-surface-subtle)] px-4 py-3">
          <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--text-secondary)]">Session</p>
          <p className="text-sm font-semibold text-[color:var(--text-primary)]">Active</p>
        </div>
      </CardContent>
    </Card>
  );
}
