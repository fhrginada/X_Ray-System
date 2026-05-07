# Implementation Plan: Previous Patients

## Overview

Add a `PreviousPatients.jsx` page to the existing React app with search, filtering, a visit records table, and an inline detail panel. Data comes from a new `patientHistory` array in `mockData.js`. Changes also touch `App.js` for routing and navigation.

## Tasks

- [x] 1. Add mock data to mockData.js
  - [x] 1.1 Add `patientHistory` array with at least 6 Visit_Record objects
    - Each record must include: id, patientId, patientName, patientAge, patientPhone, clinicName, visitDate, doctor, technicianName, xrayType, paymentAmount, paymentStatus, remainingBalance, notes
    - Cover all three paymentStatus values: `paid`, `unpaid`, `partial`
    - Use varied clinics (including at least one "Walk-in"), doctors, and xrayTypes matching existing `xrayTypes` names
    - _Requirements: 7.1, 7.2, 7.3_

- [x] 2. Create PreviousPatients page component
  - [x] 2.1 Create `src/pages/PreviousPatients.jsx` with state and filtered data logic
    - Import `patientHistory` from `mockData.js`
    - Declare state: `searchTerm`, `filters` (clinic, xrayType, doctor, paymentStatus, dateFrom, dateTo), `selectedRecord`
    - Implement filtering logic: all active filters applied simultaneously, then search on top
    - Default sort: descending by `visitDate`
    - _Requirements: 1.1, 2.1, 2.2, 2.3, 3.2, 3.3_

  - [x] 2.2 Render the visit records table
    - Display columns: patient name, patient ID, visit date, clinic name, X-ray type, payment amount (EGP), payment status badge, attending doctor
    - Show "No patient history available" when `patientHistory` is empty
    - Show "No results found" when search/filter yields no matches
    - _Requirements: 1.2, 1.3, 2.4, 3.5, 5.1, 5.2, 6.1, 6.3_

  - [x] 2.3 Implement Search_Bar
    - Controlled `<input>` bound to `searchTerm`
    - Matches against `patientName` and `patientId` (case-insensitive)
    - Clearing the input restores the full filtered list
    - _Requirements: 2.1, 2.2, 2.3_

  - [x] 2.4 Implement Filter_Bar
    - Render `<select>` controls for clinic, xrayType, doctor, paymentStatus using existing `Select` UI component
    - Render date range inputs (dateFrom, dateTo) using existing `Input` UI component
    - Show a visual active-filter indicator (e.g., badge with count of active filters) when any filter is non-empty
    - Include a "Clear filters" button that resets all filter state
    - _Requirements: 3.1, 3.3, 3.4_

  - [x] 2.5 Implement PatientHistoryPanel inline sub-component
    - Rendered below the selected row when `selectedRecord` is set
    - Display all detail fields: patientName, patientId, patientAge, patientPhone, clinicName, visitDate, doctor, xrayType, technicianName, paymentAmount, paymentStatus, remainingBalance (when partial), notes
    - `onClose` callback clears `selectedRecord` without resetting search/filter state
    - _Requirements: 4.1, 4.2, 4.3, 5.3_

- [x] 3. Create stylesheet for PreviousPatients
  - Create `src/styles/PreviousPatients.css`
  - Style the table, filter bar, search bar, payment status badges (distinct colors for paid/unpaid/partial), and the detail panel
  - Follow the visual patterns of `TechnicianRequests.css` and `DoctorXrayRequest.css`
  - _Requirements: 5.2_

- [x] 4. Checkpoint — Ensure the component renders without errors
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Wire PreviousPatients into App.js
  - [x] 5.1 Import `PreviousPatients` in `App.js` and add render condition
    - Add `import PreviousPatients from './pages/PreviousPatients'`
    - Render `<PreviousPatients />` when `userRole === 'doctor' && currentPage === 'previous-patients'`
    - _Requirements: 1.4_

  - [x] 5.2 Add navigation button for Previous Patients in the doctor role nav
    - Add a nav button (consistent with existing doctor nav buttons) that calls `setCurrentPage('previous-patients')`
    - Button should be visible only when `userRole === 'doctor'`
    - _Requirements: 1.4_

- [x] 6. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- `PatientHistoryPanel` lives inline in `PreviousPatients.jsx` — no separate file needed
- Payment amounts are displayed in EGP throughout
