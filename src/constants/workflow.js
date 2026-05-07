export const REQUEST_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  REJECTED: 'rejected',
};

export const STATUS_FLOW = [
  REQUEST_STATUS.PENDING,
  REQUEST_STATUS.ACCEPTED,
  REQUEST_STATUS.IN_PROGRESS,
  REQUEST_STATUS.COMPLETED,
];

export const XRAY_TYPES = [
  'Panoramic',
  'Bitewing',
  'Periapical',
  'Cephalometric',
  'CBCT',
];
