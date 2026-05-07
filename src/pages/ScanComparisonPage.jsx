import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function ScanComparisonPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan Comparison Viewer</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <div className="surface-muted rounded-xl p-4 text-center text-sm text-[color:var(--text-secondary)]">
          Previous Scan (DICOM-ready container)
        </div>
        <div className="surface-muted rounded-xl p-4 text-center text-sm text-[color:var(--text-secondary)]">
          Latest Scan (DICOM-ready container)
        </div>
      </CardContent>
    </Card>
  );
}
