# Implementation Plan: Role-Based Login

## Overview

Implement a frontend-only login flow that replaces the manual role-switcher with credential-based authentication. Users log in with `username@role` credentials validated against a mock user store, and are redirected to their role's landing page.

## Tasks

- [x] 1. Add mock user data to `mockData.js`
  - Export a `mockUsers` array with at least one entry per role (`patient`, `doctor`, `technician`)
  - Each entry must have `username`, `password`, `role`, and `displayName` fields
  - Usernames must follow the `name@role` format
  - _Requirements: 1.1, 1.2, 1.3_

- [x] 2. Create `src/utils/auth.js` with the `authenticate()` function
  - [x] 2.1 Implement `authenticate(username, password)` pure function
    - Return `{ ok: false, message }` if username is empty
    - Return `{ ok: false, message }` if password is empty
    - Return `{ ok: false, message }` if username has no `@`
    - Extract suffix after last `@`, validate against `['patient', 'doctor', 'technician']`
    - Match against `mockUsers` with case-insensitive username and case-sensitive password
    - Return `{ ok: true, user: { role, displayName } }` on success
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3_

  - [x] 2.2 Write unit tests for `authenticate()`
    - Test empty username → correct error message
    - Test empty password → correct error message
    - Test username without `@` → correct error message
    - Test invalid role suffix → correct error message
    - Test wrong password → "Invalid username or password."
    - Test valid credentials → `{ ok: true, user }` with correct role and displayName
    - Test case-insensitive username match
    - _Requirements: 2.3, 2.4, 3.1, 3.2, 3.3_

- [x] 3. Create `src/pages/LoginScreen.jsx`
  - [x] 3.1 Implement the login form component
    - Accept `onLoginSuccess` prop
    - Manage `username`, `password`, `error`, `isLoading` state
    - Render username input, password input, and submit button using existing UI components (`Input`, `Button`, `Card`, `CardContent`)
    - Show format hint: "Use format: name@patient, name@doctor, or name@technician"
    - On submit: call `authenticate()`, show error on failure, call `onLoginSuccess` on success
    - Disable submit button while `isLoading` is true
    - Do not clear username field on error
    - Match dark/light theme using existing Tailwind CSS variables
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 3.4, 3.5_

  - [x] 3.2 Write unit tests for `LoginScreen`
    - Test that empty username prevents submission and shows error
    - Test that empty password prevents submission and shows error
    - Test that auth failure displays error without clearing username
    - Test that submit button is disabled during loading
    - _Requirements: 3.4, 3.5, 4.4, 4.5_

- [x] 4. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Update `App.js` to integrate authentication state and login flow
  - [x] 5.1 Add `isAuthenticated` and `currentUser` state
    - Add `const [isAuthenticated, setIsAuthenticated] = useState(false)`
    - Add `const [currentUser, setCurrentUser] = useState(null)`
    - Import `LoginScreen`
    - _Requirements: 4.1, 5.4_

  - [x] 5.2 Implement `handleLoginSuccess` and `handleLogout`
    - `handleLoginSuccess({ role, displayName })`: set `isAuthenticated`, `currentUser`, `userRole`, and `currentPage` per role mapping
    - `handleLogout()`: clear `isAuthenticated`, `currentUser`, reset `currentPage` to `'patient'`
    - Role → landing page: `patient` → `'patient'`, `doctor` → `'doctor-request'`, `technician` → `'technician'`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 6.2, 6.3_

  - [x] 5.3 Conditionally render `LoginScreen` vs main layout
    - When `isAuthenticated === false`, render `<LoginScreen onLoginSuccess={handleLoginSuccess} />` instead of the main layout
    - _Requirements: 4.1, 5.4_

  - [x] 5.4 Replace role-switcher with user info and logout button in top bar
    - Remove the Patient / Doctor / Technician role-switcher buttons
    - When authenticated, display `currentUser.displayName` and role label in the top bar
    - Render a logout button that calls `handleLogout()`
    - Do not render the role-switcher on the login screen
    - _Requirements: 6.1, 7.1, 7.2, 7.3_

- [x] 6. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
