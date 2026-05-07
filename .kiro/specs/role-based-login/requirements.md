# Requirements Document

## Introduction

This feature replaces the manual role-switcher buttons in the clinic/X-ray React app with a login screen. Users authenticate by entering credentials in the format `username@role` (e.g., `ahmed@patient`, `mona@doctor`, `youssef@technician`). The Login Screen reads the role suffix from the username, validates the credentials against mock data stored in `mockData.js`, and redirects the user to the correct landing page for their role. No real authentication backend is involved; this is a frontend-only mock login.

## Glossary

- **Login_Screen**: The React page component that renders the credential input form and handles submission.
- **Authenticator**: The logic module (function/utility) that validates credentials against `mockUsers` in `mockData.js` and returns the resolved role and user profile.
- **App**: The root React component (`App.js`) that manages global state including `userRole`, `currentUser`, and `isAuthenticated`.
- **Role**: One of three string values — `patient`, `doctor`, or `technician` — derived from the `@role` suffix of the username.
- **mockUsers**: The array of mock credential objects added to `mockData.js`, each containing `username`, `password`, `role`, and `displayName`.
- **Landing_Page**: The first page shown after login, determined by the user's role: `PatientBooking` for patients, `DoctorXrayRequest` for doctors, `TechnicianRequests` for technicians.
- **Session**: A lightweight in-memory authentication state held in React state (no persistence across hard refresh required).

---

## Requirements

### Requirement 1: Mock Credential Store

**User Story:** As a developer, I want mock user credentials stored in `mockData.js`, so that the login feature has a data source to validate against without a real backend.

#### Acceptance Criteria

1. THE `mockData.js` file SHALL export a `mockUsers` array containing at least one user entry per role (`patient`, `doctor`, `technician`).
2. THE `mockUsers` array SHALL contain objects with the fields: `username` (string), `password` (string), `role` (one of `patient` | `doctor` | `technician`), and `displayName` (string).
3. WHEN a `mockUsers` entry is defined, THE entry's `username` field SHALL follow the format `name@role` (e.g., `ahmed@patient`, `mona@doctor`, `youssef@technician`).

---

### Requirement 2: Role Extraction from Username

**User Story:** As a user, I want the system to determine my role from my username suffix, so that I do not have to manually select my role during login.

#### Acceptance Criteria

1. WHEN a user submits a username containing the `@` character, THE Authenticator SHALL extract the substring after the last `@` as the candidate role.
2. WHEN the extracted suffix matches one of `patient`, `doctor`, or `technician` (case-insensitive), THE Authenticator SHALL treat it as the user's role.
3. IF the extracted suffix does not match any of the three valid roles, THEN THE Authenticator SHALL return an authentication failure with the message "Invalid role. Use @patient, @doctor, or @technician."
4. IF the username does not contain the `@` character, THEN THE Authenticator SHALL return an authentication failure with the message "Username must include a role suffix (e.g., ahmed@patient)."

---

### Requirement 3: Credential Validation

**User Story:** As a user, I want the system to verify my username and password, so that only authorized users can access the application.

#### Acceptance Criteria

1. WHEN a user submits a username and password, THE Authenticator SHALL compare the submitted credentials against the `mockUsers` array using a case-insensitive username match and a case-sensitive password match.
2. WHEN the submitted credentials match a `mockUsers` entry, THE Authenticator SHALL return a success result containing the matched user's `role` and `displayName`.
3. IF no `mockUsers` entry matches the submitted username and password, THEN THE Authenticator SHALL return an authentication failure with the message "Invalid username or password."
4. IF the username field is empty, THEN THE Login_Screen SHALL prevent form submission and display the message "Username is required."
5. IF the password field is empty, THEN THE Login_Screen SHALL prevent form submission and display the message "Password is required."

---

### Requirement 4: Login Screen UI

**User Story:** As a user, I want a login screen with a username and password field, so that I can enter my credentials to access the app.

#### Acceptance Criteria

1. WHEN the App is in an unauthenticated state, THE App SHALL render the Login_Screen instead of any role-specific page.
2. THE Login_Screen SHALL render a username input field, a password input field, and a submit button.
3. THE Login_Screen SHALL display a hint explaining the `username@role` format (e.g., "Use format: name@patient, name@doctor, or name@technician").
4. WHEN an authentication failure is returned by the Authenticator, THE Login_Screen SHALL display the failure message in a visible error area without clearing the username field.
5. WHILE the Login_Screen is processing a submission, THE Login_Screen SHALL disable the submit button to prevent duplicate submissions.
6. THE Login_Screen SHALL match the existing app visual style (dark/light theme, Tailwind CSS, existing UI components).

---

### Requirement 5: Post-Login Redirect

**User Story:** As a user, I want to be redirected to the correct page for my role after login, so that I immediately see the tools relevant to me.

#### Acceptance Criteria

1. WHEN authentication succeeds and the user's role is `patient`, THE App SHALL set `currentPage` to `'patient'` and render `PatientBooking`.
2. WHEN authentication succeeds and the user's role is `doctor`, THE App SHALL set `currentPage` to `'doctor-request'` and render `DoctorXrayRequest`.
3. WHEN authentication succeeds and the user's role is `technician`, THE App SHALL set `currentPage` to `'technician'` and render `TechnicianRequests`.
4. WHEN authentication succeeds, THE App SHALL store the authenticated user's `displayName` and `role` in state and remove the Login_Screen from the view.

---

### Requirement 6: Logout

**User Story:** As a user, I want a logout option, so that I can end my session and return to the login screen.

#### Acceptance Criteria

1. WHILE a user is authenticated, THE App SHALL render a logout button visible in the top bar.
2. WHEN the logout button is clicked, THE App SHALL clear the authentication state and render the Login_Screen.
3. WHEN the logout button is clicked, THE App SHALL reset `currentPage` to its default value so the next login starts fresh.

---

### Requirement 7: Role Switcher Removal

**User Story:** As a developer, I want the manual role-switcher buttons removed from the top bar, so that role selection is exclusively controlled by the login flow.

#### Acceptance Criteria

1. THE App SHALL NOT render the Patient / Doctor / Technician role-switcher buttons when a user is authenticated.
2. THE App SHALL NOT render the role-switcher buttons on the Login_Screen.
3. WHEN a user is authenticated, THE App SHALL display the current user's `displayName` and role label in the top bar in place of the role-switcher.
