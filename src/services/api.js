import { mockRequests, patients, patientHistory } from '../data/mockData';
import { REQUEST_STATUS } from '../constants/workflow';

const STORAGE_KEY = 'xray-requests-v2';

const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

const readRequests = () => {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return mockRequests;
  try {
    return JSON.parse(stored);
  } catch {
    return mockRequests;
  }
};

const writeRequests = (requests) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
};

export const api = {
  async getPatients() {
    await delay();
    return patients;
  },
  async getRequests() {
    await delay();
    return readRequests();
  },
  async createRequest(payload) {
    await delay();
    const requests = readRequests();
    const item = {
      ...payload,
      id: payload.id || `XR-${Date.now()}`,
      status: REQUEST_STATUS.PENDING,
      createdAt: new Date().toISOString(),
    };
    writeRequests([item, ...requests]);
    return item;
  },
  async updateRequestStatus(requestId, status, metadata = {}) {
    await delay();
    const requests = readRequests().map((r) =>
      r.id === requestId ? { ...r, status, ...metadata, updatedAt: new Date().toISOString() } : r
    );
    writeRequests(requests);
    return requests.find((r) => r.id === requestId);
  },
  async getPatientHistory(patientId) {
    await delay();
    if (!patientId) return patientHistory;
    return patientHistory.filter((h) => h.patientId === patientId);
  },
};
