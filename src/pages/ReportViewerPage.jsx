import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

export default function ReportViewerPage({ request }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Viewer</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[color:var(--text-secondary)]">
          Diagnostic report for {request?.patientName || 'selected patient'}.
        </p>
        <div className="mt-4 rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--bg-surface-subtle)] p-4">
          <p className="text-sm text-[color:var(--text-primary)]">
            Findings: Placeholder clinical findings and impressions. This section is FHIR `DiagnosticReport`
            ready and can be replaced by backend response.
          </p>
        </div>
        <div className="mt-4 flex gap-2">
          <Button size="sm">Download PDF</Button>
          <Button variant="outline" size="sm">
            Share with Dental Clinic
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
