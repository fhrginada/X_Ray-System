import React from 'react';
import { Button } from '../components/ui/button';

export default function UnauthorizedPage({ onGoBack }) {
  return (
    <div className="surface-panel rounded-3xl p-8 text-center">
      <h2 className="text-2xl font-semibold text-[color:var(--text-primary)]">Unauthorized</h2>
      <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
        You do not have permission to access this section.
      </p>
      <Button className="mt-4" onClick={onGoBack}>
        Back to dashboard
      </Button>
    </div>
  );
}
