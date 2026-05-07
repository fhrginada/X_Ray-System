import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { LoginScreen } from './LoginScreen';
import * as auth from '../utils/auth';

jest.mock('../utils/auth');

describe('LoginScreen', () => {
  const mockOnLoginSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Requirement 3.4 — empty username prevents submission
  test('shows error and prevents submission when username is empty', async () => {
    auth.authenticate.mockReturnValue({ ok: false, message: 'Username is required.' });

    render(<LoginScreen onLoginSuccess={mockOnLoginSuccess} />);

    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'somepassword' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Username is required.');
    });
    expect(mockOnLoginSuccess).not.toHaveBeenCalled();
  });

  // Requirement 3.5 — empty password prevents submission
  test('shows error and prevents submission when password is empty', async () => {
    auth.authenticate.mockReturnValue({ ok: false, message: 'Password is required.' });

    render(<LoginScreen onLoginSuccess={mockOnLoginSuccess} />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'ahmed@patient' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Password is required.');
    });
    expect(mockOnLoginSuccess).not.toHaveBeenCalled();
  });

  // Requirement 4.4 — auth failure shows error without clearing username
  test('displays auth failure message without clearing the username field', async () => {
    auth.authenticate.mockReturnValue({ ok: false, message: 'Invalid username or password.' });

    render(<LoginScreen onLoginSuccess={mockOnLoginSuccess} />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'wrong@patient' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'badpass' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Invalid username or password.');
    });
    expect(screen.getByLabelText(/username/i)).toHaveValue('wrong@patient');
    expect(mockOnLoginSuccess).not.toHaveBeenCalled();
  });

  // Requirement 4.5 — submit button disabled while loading
  test('disables the submit button while processing submission', async () => {
    let resolveAuth;
    auth.authenticate.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveAuth = resolve;
        })
    );

    // Patch handleSubmit to await authenticate so loading state persists
    // Since the component calls authenticate() synchronously, we need to
    // verify the disabled prop is applied. We do this by checking the
    // button's disabled attribute is set when isLoading is true.
    // The component sets isLoading=true before calling authenticate,
    // so we intercept at the right moment.

    render(<LoginScreen onLoginSuccess={mockOnLoginSuccess} />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'ahmed@patient' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'patient123' } });

    // Verify button is enabled before submission
    expect(screen.getByRole('button', { name: /sign in/i })).not.toBeDisabled();

    // Click submit — since authenticate returns a Promise, the async handleSubmit
    // will await it, keeping isLoading=true until resolved
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    // Button should now show "Signing in…" and be disabled
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /signing in/i })).toBeDisabled();
    });

    // Resolve to clean up
    act(() => {
      resolveAuth({ ok: false, message: 'Invalid username or password.' });
    });
  });
});
