import React, { useState } from 'react';
import { authenticate } from '../utils/auth';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

export function LoginScreen({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const result = await Promise.resolve(authenticate(username, password));

    if (!result.ok) {
      setError(result.message);
      setIsLoading(false);
      return;
    }

    onLoginSuccess({ role: result.user.role, displayName: result.user.displayName });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4">
      <Card className="w-full max-w-md rounded-3xl">
        <CardContent className="pt-8 pb-8">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--accent-soft)] text-xl">
              🩺
            </div>
            <h1 className="text-2xl font-semibold text-[color:var(--text-primary)]">Welcome Back</h1>
            <p className="mt-1 text-sm text-[color:var(--text-secondary)]">
              Test users: nada@patient / patient123, nada@doctor / nada123, nada@technician / nada123
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-1 text-sm font-medium text-[color:var(--text-secondary)]"
                >
                  Username
                </label>
                <Input
                  id="username"
                  type="text"
                  placeholder="e.g. ahmed@patient"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-medium text-[color:var(--text-secondary)]"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-2 text-sm text-rose-400"
                >
                  {error}
                </div>
              )}

              <Button type="submit" variant="primary" size="lg" disabled={isLoading} className="w-full mt-2">
                {isLoading ? 'Signing in…' : 'Sign In'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
