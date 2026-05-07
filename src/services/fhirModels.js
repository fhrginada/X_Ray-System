/**
 * Frontend-ready FHIR placeholders.
 * These shapes are intentionally lightweight and can be swapped with strict TS models later.
 */

export const createFhirPatient = (patient) => ({
  resourceType: 'Patient',
  id: patient.id,
  name: [{ text: patient.name }],
  telecom: patient.phone ? [{ system: 'phone', value: patient.phone }] : [],
});

export const createFhirPractitioner = (name, id) => ({
  resourceType: 'Practitioner',
  id,
  name: [{ text: name }],
});

export const createFhirServiceRequest = (request) => ({
  resourceType: 'ServiceRequest',
  id: request.id,
  status: request.status,
  code: { text: request.type },
  subject: { reference: `Patient/${request.patientId}` },
  priority: request.priority,
  note: request.notes ? [{ text: request.notes }] : [],
});

export const createFhirImagingStudy = (request, files = []) => ({
  resourceType: 'ImagingStudy',
  id: `img-${request.id}`,
  status: request.status === 'completed' ? 'available' : 'registered',
  subject: { reference: `Patient/${request.patientId}` },
  description: `${request.type} study`,
  numberOfInstances: files.length,
});

export const createFhirDiagnosticReport = (request, reportText = '') => ({
  resourceType: 'DiagnosticReport',
  id: `report-${request.id}`,
  status: request.status === 'completed' ? 'final' : 'preliminary',
  code: { text: `${request.type} Diagnostic Report` },
  subject: { reference: `Patient/${request.patientId}` },
  conclusion: reportText || 'Report pending technician/doctor finalization.',
});
