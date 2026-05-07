import { mockUsers } from '../data/mockData';

const VALID_ROLES = ['patient', 'doctor', 'technician'];

/**
 * Authenticates a user against the mock user store.
 * @param {string} username
 * @param {string} password
 * @returns {{ ok: true, user: { role: string, displayName: string } } | { ok: false, message: string }}
 */
export function authenticate(username, password) {
  if (!username) {
    return { ok: false, message: 'Username is required.' };
  }

  if (!password) {
    return { ok: false, message: 'Password is required.' };
  }

  if (!username.includes('@')) {
    return { ok: false, message: 'Username must include a role suffix (e.g., ahmed@patient).' };
  }

  const suffix = username.slice(username.lastIndexOf('@') + 1).toLowerCase();

  if (!VALID_ROLES.includes(suffix)) {
    return { ok: false, message: 'Invalid role. Use @patient, @doctor, or @technician.' };
  }

  const entry = mockUsers.find(
    (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
  );

  if (!entry) {
    return { ok: false, message: 'Invalid username or password.' };
  }

  return { ok: true, user: { role: entry.role, displayName: entry.displayName } };
}
