import { authenticate } from './auth';

describe('authenticate()', () => {
  // Requirement 3.4 - empty username
  test('returns error when username is empty', () => {
    expect(authenticate('', 'patient123')).toEqual({
      ok: false,
      message: 'Username is required.',
    });
  });

  // Requirement 3.5 - empty password
  test('returns error when password is empty', () => {
    expect(authenticate('ahmed@patient', '')).toEqual({
      ok: false,
      message: 'Password is required.',
    });
  });

  // Requirement 2.4 - username without @
  test('returns error when username has no @ character', () => {
    expect(authenticate('ahmedpatient', 'patient123')).toEqual({
      ok: false,
      message: 'Username must include a role suffix (e.g., ahmed@patient).',
    });
  });

  // Requirement 2.3 - invalid role suffix
  test('returns error when role suffix is not valid (e.g. @admin)', () => {
    expect(authenticate('ahmed@admin', 'patient123')).toEqual({
      ok: false,
      message: 'Invalid role. Use @patient, @doctor, or @technician.',
    });
  });

  // Requirement 3.3 - wrong password
  test('returns error when password is wrong', () => {
    expect(authenticate('ahmed@patient', 'wrongpassword')).toEqual({
      ok: false,
      message: 'Invalid username or password.',
    });
  });

  // Requirement 3.1 & 3.2 - valid credentials
  test('returns success with user object for valid credentials', () => {
    expect(authenticate('ahmed@patient', 'patient123')).toEqual({
      ok: true,
      user: { role: 'patient', displayName: 'Ahmed Mohamed' },
    });
  });

  // Requirement 3.1 - case-insensitive username match
  test('returns success when username is uppercase (case-insensitive match)', () => {
    expect(authenticate('AHMED@PATIENT', 'patient123')).toEqual({
      ok: true,
      user: { role: 'patient', displayName: 'Ahmed Mohamed' },
    });
  });
});
