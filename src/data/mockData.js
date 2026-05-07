// Mock data for the application

export const patients = [
  {
    id: 'P12345',
    name: 'Ahmed Mohamed',
    age: 35,
    phone: '01234567890',
    email: 'ahmed@email.com',
    lastVisit: '2024-02-15'
  },
  {
    id: 'P12346',
    name: 'Sara Ali',
    age: 28,
    phone: '01234567891',
    email: 'sara@email.com',
    lastVisit: '2024-03-01'
  },
  {
    id: 'P12347',
    name: 'Mahmoud Salem',
    age: 45,
    phone: '01234567892',
    email: 'mahmoud@email.com',
    lastVisit: '2024-02-28'
  }
];

export const appointments = [
  {
    id: 'APT001',
    patientId: 'P12345',
    patientName: 'Ahmed Mohamed',
    date: '2024-03-20',
    time: '10:00 AM',
    doctor: 'Dr. Mona Abdallah',
    status: 'confirmed',
    type: 'Checkup'
  },
  {
    id: 'APT002',
    patientId: 'P12346',
    patientName: 'Sara Ali',
    date: '2024-03-20',
    time: '11:30 AM',
    doctor: 'Dr. Khaled Hassan',
    status: 'pending',
    type: 'X-ray Required'
  },
  {
    id: 'APT003',
    patientId: 'P12347',
    patientName: 'Mahmoud Salem',
    date: '2024-03-21',
    time: '09:30 AM',
    doctor: 'Dr. Mona Abdallah',
    status: 'confirmed',
    type: 'Follow up'
  }
];

export const xrayTypes = [
  { id: 1, name: 'Panoramic', description: 'Full jaw X-ray' },
  { id: 2, name: 'CBCT', description: '3D Cone Beam' },
  { id: 3, name: 'Periapical', description: 'Single tooth' },
  { id: 4, name: 'Bitewing', description: 'Cavity detection' },
  { id: 5, name: 'Cephalometric', description: 'Skull X-ray' }
];

// Add mockRequests array
export const mockRequests = [
  {
    id: 'XR-001',
    patientName: 'Ahmed Mohamed',
    patientId: 'P12345',
    patientAge: 35,
    doctor: 'Dr. Mona Abdallah',
    date: '2024-03-16',
    type: 'Panoramic',
    priority: 'urgent',
    status: 'pending',
    notes: 'Full jaw panoramic X-ray'
  },
  {
    id: 'XR-002',
    patientName: 'Sara Ali',
    patientId: 'P12346',
    patientAge: 28,
    doctor: 'Dr. Khaled Hassan',
    date: '2024-03-16',
    type: 'CBCT',
    priority: 'normal',
    status: 'pending',
    notes: 'CBCT for lower right molar'
  },
  {
    id: 'XR-003',
    patientName: 'Mahmoud Salem',
    patientId: 'P12347',
    patientAge: 45,
    doctor: 'Dr. Mona Abdallah',
    date: '2024-03-15',
    type: 'Digital',
    priority: 'urgent',
    status: 'completed',
    notes: 'Digital X-ray for front tooth'
  }
];

export const mockImages = [
  {
    id: 1,
    patientId: 'P12345',
    url: '/api/placeholder/400/300',
    thumbnail: '/api/placeholder/100/100',
    type: 'Panoramic',
    date: '2024-03-16',
    description: 'Full jaw panoramic view'
  },
  {
    id: 2,
    patientId: 'P12345',
    url: '/api/placeholder/400/300',
    thumbnail: '/api/placeholder/100/100',
    type: 'CBCT',
    date: '2024-03-16',
    description: 'CBCT lower right molar'
  },
  {
    id: 3,
    patientId: 'P12345',
    url: '/api/placeholder/400/300',
    thumbnail: '/api/placeholder/100/100',
    type: 'Digital',
    date: '2024-03-15',
    description: 'Digital X-ray front tooth'
  }
];

export const patientHistory = [
  {
    id: 'VR-001',
    patientId: 'P12345',
    patientName: 'Ahmed Mohamed',
    patientAge: 35,
    patientPhone: '01234567890',
    clinicName: 'Smile Dental Clinic',
    visitDate: '2024-03-10',
    doctor: 'Dr. Mona Abdallah',
    technicianName: 'Youssef Nabil',
    xrayType: 'Panoramic',
    paymentAmount: 500,
    paymentStatus: 'paid',
    remainingBalance: 0,
    notes: 'Routine panoramic for full jaw assessment.'
  },
  {
    id: 'VR-002',
    patientId: 'P12346',
    patientName: 'Sara Ali',
    patientAge: 28,
    patientPhone: '01234567891',
    clinicName: 'Walk-in',
    visitDate: '2024-03-05',
    doctor: 'Dr. Khaled Hassan',
    technicianName: 'Hana Samir',
    xrayType: 'CBCT',
    paymentAmount: 1200,
    paymentStatus: 'partial',
    remainingBalance: 400,
    notes: 'CBCT for lower right molar implant planning. Partial payment received.'
  },
  {
    id: 'VR-003',
    patientId: 'P12347',
    patientName: 'Mahmoud Salem',
    patientAge: 45,
    patientPhone: '01234567892',
    clinicName: 'Cairo Radiology Center',
    visitDate: '2024-02-20',
    doctor: 'Dr. Mona Abdallah',
    technicianName: 'Youssef Nabil',
    xrayType: 'Periapical',
    paymentAmount: 300,
    paymentStatus: 'unpaid',
    remainingBalance: 300,
    notes: 'Periapical X-ray for upper left incisor. Payment pending.'
  },
  {
    id: 'VR-004',
    patientId: 'P12348',
    patientName: 'Nour Ibrahim',
    patientAge: 22,
    patientPhone: '01098765432',
    clinicName: 'Walk-in',
    visitDate: '2024-02-14',
    doctor: 'Dr. Rania Fouad',
    technicianName: 'Hana Samir',
    xrayType: 'Bitewing',
    paymentAmount: 250,
    paymentStatus: 'paid',
    remainingBalance: 0,
    notes: 'Bitewing X-rays for cavity screening.'
  },
  {
    id: 'VR-005',
    patientId: 'P12349',
    patientName: 'Omar Farouk',
    patientAge: 52,
    patientPhone: '01112223344',
    clinicName: 'Alexandria Dental Group',
    visitDate: '2024-01-30',
    doctor: 'Dr. Khaled Hassan',
    technicianName: 'Youssef Nabil',
    xrayType: 'Cephalometric',
    paymentAmount: 800,
    paymentStatus: 'partial',
    remainingBalance: 200,
    notes: 'Cephalometric for orthodontic evaluation. Balance to be settled next visit.'
  },
  {
    id: 'VR-006',
    patientId: 'P12350',
    patientName: 'Layla Hassan',
    patientAge: 31,
    patientPhone: '01555667788',
    clinicName: 'Smile Dental Clinic',
    visitDate: '2024-01-15',
    doctor: 'Dr. Rania Fouad',
    technicianName: 'Hana Samir',
    xrayType: 'Panoramic',
    paymentAmount: 500,
    paymentStatus: 'unpaid',
    remainingBalance: 500,
    notes: 'Pre-surgical panoramic. Patient to pay on next appointment.'
  }
];

export const mockUsers = [
  { username: 'nada@patient',      password: 'patient123', role: 'patient',     displayName: 'Nada Mohamed' },
  { username: 'nada@doctor',        password: 'nada123',    role: 'doctor',      displayName: 'Dr. Nada' },
  { username: 'nada@technician',    password: 'nada123',    role: 'technician',  displayName: 'Nada Technician' },
];
