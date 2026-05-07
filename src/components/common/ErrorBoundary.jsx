import React from 'react';
import { Button } from '../ui/button';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // Preserve log for diagnostics
    console.error('UI crashed:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto mt-20 max-w-lg rounded-3xl border border-rose-500/40 bg-rose-500/10 p-6 text-center">
          <h2 className="text-xl font-semibold text-rose-200">Something went wrong</h2>
          <p className="mt-2 text-sm text-rose-100/90">
            The section failed to render. Please refresh or go back.
          </p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
