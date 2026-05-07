# Requirements Document

## Introduction

The Previous Patients feature provides authorized users (doctors and admins) with a searchable, filterable history of all past patient visits. Each record surfaces key details: the clinic the patient came from, the X-ray type performed, the amount paid, the visit date, the attending doctor, and other relevant patient history. This gives clinical staff a consolidated view of patient activity without navigating multiple screens.

## Glossary

- **Previous_Patients_Page**: The UI page that displays the historical list of patient visit records.
- **Visit_Record**: A single entry representing one patient visit, containing patient info, clinic origin, X-ray type, payment amount, visit date, and attending doctor.
- **Patient_History_Panel**: The expanded detail view shown when a user selects a specific Visit_Record.
- **Clinic**: The referring or originating clinic from which the patient was sent for X-ray services.
- **Payment_Status**: The state of a visit's payment — one of: `paid`, `unpaid`, or `partial`.
- **Doctor**: A licensed medical professional associated with a Visit_Record.
- **Technician**: The X-ray technician who performed the imaging for a visit.
- **Filter_Bar**: The UI control strip that allows users to narrow the displayed Visit_Records by date range, clinic, X-ray type, doctor, or payment status.
- **Search_Bar**: The text input that allows users to search Visit_Records by patient name or patient ID.

---

## Requirements

### Requirement 1: Display Patient Visit History

**User Story:** As a doctor, I want to view a list of all previous patient visits, so that I can quickly review past cases and patient history.

#### Acceptance Criteria

1. THE Previous_Patients_Page SHALL display a list of Visit_Records sorted by visit date in descending order by default.
2. WHEN the Previous_Patients_Page loads, THE Previous_Patients_Page SHALL display at least the following fields for each Visit_Record: patient name, patient ID, visit date, clinic name, X-ray type, payment amount, payment status, and attending doctor.
3. WHEN no Visit_Records exist, THE Previous_Patients_Page SHALL display a message indicating that no patient history is available.
4. THE Previous_Patients_Page SHALL be accessible to users with the doctor role.

---

### Requirement 2: Search Patient Records

**User Story:** As a doctor, I want to search for a specific patient by name or ID, so that I can quickly locate their visit history.

#### Acceptance Criteria

1. THE Search_Bar SHALL accept free-text input and match against patient name and patient ID fields.
2. WHEN a user types in the Search_Bar, THE Previous_Patients_Page SHALL update the displayed Visit_Records in real time to show only matching records.
3. WHEN the Search_Bar is cleared, THE Previous_Patients_Page SHALL restore the full list of Visit_Records.
4. IF no Visit_Records match the search input, THEN THE Previous_Patients_Page SHALL display a "No results found" message.

---

### Requirement 3: Filter Patient Records

**User Story:** As a doctor, I want to filter the patient list by clinic, X-ray type, date range, doctor, or payment status, so that I can focus on a relevant subset of records.

#### Acceptance Criteria

1. THE Filter_Bar SHALL provide filter controls for: clinic, X-ray type, date range (start date and end date), attending doctor, and payment status.
2. WHEN a user applies one or more filters, THE Previous_Patients_Page SHALL display only Visit_Records that satisfy all active filter criteria simultaneously.
3. WHEN a user clears all filters, THE Previous_Patients_Page SHALL restore the full unfiltered list of Visit_Records.
4. WHILE filters are active, THE Filter_Bar SHALL visually indicate which filters are currently applied.
5. IF a filter combination produces no matching Visit_Records, THEN THE Previous_Patients_Page SHALL display a "No results found" message.

---

### Requirement 4: View Detailed Visit Record

**User Story:** As a doctor, I want to expand a patient visit record to see full details, so that I can review all information about that specific visit.

#### Acceptance Criteria

1. WHEN a user selects a Visit_Record from the list, THE Patient_History_Panel SHALL open and display the full details of that visit.
2. THE Patient_History_Panel SHALL display: patient name, patient ID, patient age, patient phone number, clinic name, visit date, attending doctor, X-ray type, technician name, payment amount, payment status, and any clinical notes.
3. WHEN a user closes the Patient_History_Panel, THE Previous_Patients_Page SHALL return focus to the Visit_Record list without losing the current search or filter state.

---

### Requirement 5: Payment Information Display

**User Story:** As a doctor, I want to see how much a patient paid and whether the payment is complete, so that I have a full picture of the visit record.

#### Acceptance Criteria

1. THE Visit_Record SHALL display the total payment amount in Egyptian Pounds (EGP).
2. THE Visit_Record SHALL display the Payment_Status using a distinct visual indicator (e.g., a badge) for each state: `paid`, `unpaid`, and `partial`.
3. WHEN Payment_Status is `partial`, THE Patient_History_Panel SHALL display both the amount paid and the remaining balance.

---

### Requirement 6: Clinic Origin Display

**User Story:** As a doctor, I want to know which clinic referred or sent the patient, so that I can understand the patient's care pathway.

#### Acceptance Criteria

1. THE Visit_Record SHALL display the name of the originating Clinic for each visit.
2. THE Previous_Patients_Page SHALL support filtering Visit_Records by Clinic name via the Filter_Bar.
3. IF a Visit_Record has no associated Clinic, THEN THE Previous_Patients_Page SHALL display "Walk-in" as the clinic value for that record.

---

### Requirement 7: Mock Data for Previous Patients

**User Story:** As a developer, I want realistic mock data for previous patient visits, so that the feature can be demonstrated and tested without a backend.

#### Acceptance Criteria

1. THE mockData.js file SHALL include a `patientHistory` array containing at least 6 Visit_Records with varied clinics, X-ray types, payment statuses, doctors, and dates.
2. EACH Visit_Record in `patientHistory` SHALL include: id, patientId, patientName, patientAge, patientPhone, clinicName, visitDate, doctor, technicianName, xrayType, paymentAmount, paymentStatus, remainingBalance, and notes.
3. THE `patientHistory` array SHALL include records with all three Payment_Status values: `paid`, `unpaid`, and `partial`.
