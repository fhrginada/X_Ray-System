import React, { useEffect, useMemo, useState } from 'react';
import PatientBooking from './pages/PatientBooking';
import DoctorXrayRequest from './pages/DoctorXrayRequest';
import TechnicianRequests from './pages/TechnicianRequests';
import UploadXray from './pages/UploadXray';
import DoctorXrayView from './pages/DoctorXrayView';
import PreviousPatients from './pages/PreviousPatients';
import DoctorDashboard from './pages/DoctorDashboard';
import TechnicianDashboard from './pages/TechnicianDashboard';
import PatientDashboard from './pages/PatientDashboard';
import RequestDetailsPage from './pages/RequestDetailsPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import ProfilePage from './pages/ProfilePage';
import ReportViewerPage from './pages/ReportViewerPage';
import PatientHistoryPage from './pages/PatientHistoryPage';
import ScanComparisonPage from './pages/ScanComparisonPage';
import { LoginScreen } from './pages/LoginScreen';
import { Button } from './components/ui/button';
import { MotionDiv } from './components/animations/motionPresets';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import ToastStack from './components/common/ToastStack';
import { AppProvider, useAppContext } from './context/AppContext';
import { api } from './services/api';
import { ROLES } from './constants/roles';
import './App.css';

function AppShell() {
  const [currentPage, setCurrentPage] = useState('patient-dashboard');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [theme, setTheme] = useState('dark');
  const { auth, setAuth, requests, setRequests, notify, refreshRequests } = useAppContext();
  const userRole = auth.currentUser?.role || ROLES.PATIENT;

  useEffect(() => {
    const stored = window.localStorage.getItem('xray-theme');
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(theme === 'light' ? 'theme-light' : 'theme-dark');
    document.documentElement.style.colorScheme = theme === 'light' ? 'light' : 'dark';
    window.localStorage.setItem('xray-theme', theme);
  }, [theme]);

  const handleLoginSuccess = ({ role, displayName }) => {
    const nextAuth = { isAuthenticated: true, currentUser: { role, displayName } };
    setAuth(nextAuth);
    const landingPage =
      role === ROLES.PATIENT ? 'patient-dashboard' : role === ROLES.DOCTOR ? 'doctor-dashboard' : 'technician-dashboard';
    setCurrentPage(landingPage);
    notify('success', `Welcome back, ${displayName}.`);
  };

  const handleLogout = () => {
    setAuth({ isAuthenticated: false, currentUser: null });
    setCurrentPage('patient-dashboard');
    notify('info', 'Session ended successfully.');
  };

  const handleSelectRequest = (request) => {
    setSelectedRequest(request);
    setCurrentPage('upload');
  };

  const handleUploadComplete = (requestId, files) => {
    api.updateRequestStatus(requestId, 'completed', { filesCount: files.length }).then(async () => {
      await refreshRequests();
      notify('success', 'Images uploaded successfully.');
      setCurrentPage('technician-requests');
    });
  };

  const handleBack = () => {
    setCurrentPage('technician-requests');
  };

  const handleBookingComplete = () => {
    setCurrentPage('patient-dashboard');
    notify('success', 'Appointment booked successfully.');
  };

  const handleXrayRequestSubmit = async (request) => {
    await api.createRequest(request);
    await refreshRequests();
    notify('success', 'X-ray request submitted.');
    setCurrentPage('doctor-dashboard');
  };

  const handleStatusChange = async (requestId, status) => {
    await api.updateRequestStatus(requestId, status);
    const updated = await api.getRequests();
    setRequests(updated);
    setSelectedRequest(updated.find((r) => r.id === requestId));
    notify('info', `Request moved to ${status}.`);
  };

  const isDark = theme === 'dark';

  const roleLabel =
    auth.currentUser?.role === 'patient'
      ? 'Patient'
      : auth.currentUser?.role === 'doctor'
      ? 'Dentist'
      : 'X-ray Technician';

  const navItemsByRole = {
    [ROLES.PATIENT]: [
      { id: 'patient-dashboard', label: 'Dashboard', icon: '🏠' },
      { id: 'patient', label: 'Book Appointment', icon: '📅' },
      { id: 'patient-history', label: 'Medical History', icon: '🕓' },
      { id: 'doctor-view', label: 'Scan Viewer', icon: '🩻' },
      { id: 'profile', label: 'Profile', icon: '👤' },
    ],
    [ROLES.DOCTOR]: [
      { id: 'doctor-dashboard', label: 'Dashboard', icon: '🏠' },
      { id: 'doctor-request', label: 'New Request', icon: '📝' },
      { id: 'request-details', label: 'Request Details', icon: '📌' },
      { id: 'patient-history', label: 'Patient History', icon: '🕓' },
      { id: 'doctor-view', label: 'View X-rays', icon: '🩻' },
      { id: 'scan-compare', label: 'Compare Scans', icon: '⚖️' },
      { id: 'report-viewer', label: 'Reports', icon: '📄' },
      { id: 'previous-patients', label: 'Previous Patients', icon: '👥' },
      { id: 'profile', label: 'Profile', icon: '👤' },
    ],
    [ROLES.TECHNICIAN]: [
      { id: 'technician-dashboard', label: 'Dashboard', icon: '🏠' },
      { id: 'technician-requests', label: 'Requests Queue', icon: '📂' },
      { id: 'request-details', label: 'Request Workflow', icon: '🔄' },
      { id: 'profile', label: 'Profile', icon: '👤' },
    ],
  };

  const activeNav = navItemsByRole[userRole] || [];
  const defaultByRole = useMemo(
    () => ({
      [ROLES.PATIENT]: 'patient-dashboard',
      [ROLES.DOCTOR]: 'doctor-dashboard',
      [ROLES.TECHNICIAN]: 'technician-dashboard',
    }),
    [],
  );

  const canAccess = (page) => {
    const permissions = {
      'doctor-dashboard': [ROLES.DOCTOR],
      'doctor-request': [ROLES.DOCTOR],
      'previous-patients': [ROLES.DOCTOR],
      'technician-dashboard': [ROLES.TECHNICIAN],
      'technician-requests': [ROLES.TECHNICIAN],
      upload: [ROLES.TECHNICIAN],
      patient: [ROLES.PATIENT],
      'patient-dashboard': [ROLES.PATIENT],
      'patient-history': [ROLES.PATIENT, ROLES.DOCTOR],
      profile: [ROLES.PATIENT, ROLES.DOCTOR, ROLES.TECHNICIAN],
      'doctor-view': [ROLES.PATIENT, ROLES.DOCTOR],
      'request-details': [ROLES.DOCTOR, ROLES.TECHNICIAN],
      'report-viewer': [ROLES.PATIENT, ROLES.DOCTOR],
      'scan-compare': [ROLES.DOCTOR],
    };
    return (permissions[page] || [ROLES.PATIENT, ROLES.DOCTOR, ROLES.TECHNICIAN]).includes(userRole);
  };

  return (
    <div
      className={`App min-h-screen ${
        isDark
          ? 'bg-[radial-gradient(circle_at_12%_10%,_rgba(125,211,252,0.18)_0%,_transparent_34%),radial-gradient(circle_at_88%_8%,_rgba(96,165,250,0.14)_0%,_transparent_32%),linear-gradient(170deg,_#060f1d_0%,_#0b1b31_45%,_#071425_100%)] text-slate-100'
          : 'bg-[radial-gradient(circle_at_14%_10%,_rgba(147,197,253,0.38)_0%,_rgba(191,219,254,0.2)_26%,_transparent_52%),radial-gradient(circle_at_86%_12%,_rgba(186,230,253,0.34)_0%,_rgba(224,242,254,0.18)_24%,_transparent_50%),linear-gradient(180deg,_#f3f8ff_0%,_#eaf3ff_44%,_#deebff_100%)] text-slate-900'
      } transition-colors duration-300`}
    >
      <ToastStack />
      {!auth.isAuthenticated ? (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div className="mx-auto flex min-h-screen w-full max-w-[1320px] gap-4 px-3 py-4 md:gap-6 md:px-5 md:py-6">
          <aside className="hidden w-[250px] shrink-0 lg:block">
            <MotionDiv
              className="surface-panel sticky top-6 rounded-3xl p-5"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <div className="mb-6 flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-[color:var(--accent-soft)] text-lg">
                  🩺
                </div>
                <div>
                  <p className="text-base font-bold text-[color:var(--text-primary)]">Xray Clinic</p>
                  <p className="text-xs text-[color:var(--text-secondary)]">Medical Imaging Panel</p>
                </div>
              </div>

              <nav className="space-y-1.5">
                {activeNav.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCurrentPage(item.id)}
                    className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all ${
                      currentPage === item.id
                        ? 'bg-[color:var(--accent-soft)] text-[color:var(--accent-primary)]'
                        : 'text-[color:var(--text-secondary)] hover:bg-[color:var(--bg-surface-subtle)] hover:text-[color:var(--text-primary)]'
                    }`}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="mt-8 rounded-2xl bg-[linear-gradient(140deg,_#3b82f6,_#1d4ed8)] p-4 text-white">
                <p className="text-xs uppercase tracking-[0.18em] text-blue-100">Support</p>
                <p className="mt-1 text-sm font-medium">Need technical help?</p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-3 w-full border-white/30 bg-white/20 text-white hover:bg-white/30"
                >
                  Contact Admin
                </Button>
              </div>
            </MotionDiv>
          </aside>

          <div className="min-w-0 flex-1">
            <MotionDiv
              className="surface-panel mb-5 flex flex-wrap items-center justify-between gap-3 rounded-3xl px-4 py-3 md:px-5"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div className="flex min-w-[210px] flex-1 items-center gap-3 rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--bg-surface-subtle)] px-3 py-2 text-sm text-[color:var(--text-secondary)]">
                <span>🔎</span>
                <span>Search patients, requests, records...</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="inline-flex items-center rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--bg-surface-subtle)] px-1 py-0.5 text-[11px] font-medium">
                  <button
                    type="button"
                    onClick={() => setTheme('dark')}
                    className={`rounded-full px-2 py-1 transition-all ${isDark ? 'bg-[color:var(--accent-primary)] text-[color:var(--accent-primary-foreground)]' : 'text-[color:var(--text-secondary)]'}`}
                  >
                    🌙
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme('light')}
                    className={`rounded-full px-2 py-1 transition-all ${!isDark ? 'bg-[color:var(--accent-primary)] text-[color:var(--accent-primary-foreground)]' : 'text-[color:var(--text-secondary)]'}`}
                  >
                    ☀️
                  </button>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--accent-soft)] text-sm font-bold text-[color:var(--accent-primary)]">
                    {auth.currentUser.displayName?.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold text-[color:var(--text-primary)]">{auth.currentUser.displayName}</p>
                    <p className="text-xs text-[color:var(--text-secondary)]">{roleLabel}</p>
                  </div>
                </div>

                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-xs">
                  Logout
                </Button>
              </div>
            </MotionDiv>

            <MotionDiv
              className="main-content"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
            >
              {!canAccess(currentPage) && (
                <UnauthorizedPage onGoBack={() => setCurrentPage(defaultByRole[userRole])} />
              )}

              {userRole === ROLES.PATIENT && canAccess(currentPage) && (
                <>
                  {currentPage === 'patient-dashboard' && <PatientDashboard requests={requests} />}
                  {currentPage === 'patient' && (
                    <PatientBooking onBookingComplete={handleBookingComplete} />
                  )}
                  {currentPage === 'patient-history' && <PatientHistoryPage />}
                  {currentPage === 'doctor-view' && <DoctorXrayView />}
                  {currentPage === 'report-viewer' && <ReportViewerPage request={selectedRequest || requests[0]} />}
                  {currentPage === 'profile' && <ProfilePage user={auth.currentUser} />}
                </>
              )}

              {userRole === ROLES.DOCTOR && canAccess(currentPage) && (
                <>
                  {currentPage === 'doctor-dashboard' && (
                    <DoctorDashboard
                      requests={requests}
                      onOpenDetails={(request) => {
                        setSelectedRequest(request);
                        setCurrentPage('request-details');
                      }}
                    />
                  )}
                  <div className="mb-4 flex flex-wrap gap-2 lg:hidden">
                    <Button
                      variant={currentPage === 'doctor-request' ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => setCurrentPage('doctor-request')}
                    >
                      New Request
                    </Button>
                    <Button
                      variant={currentPage === 'request-details' ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => setCurrentPage('request-details')}
                    >
                      Request Details
                    </Button>
                    <Button
                      variant={currentPage === 'doctor-view' ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => setCurrentPage('doctor-view')}
                    >
                      View X-rays
                    </Button>
                    <Button
                      variant={currentPage === 'previous-patients' ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => setCurrentPage('previous-patients')}
                    >
                      Previous Patients
                    </Button>
                  </div>

                  {currentPage === 'doctor-request' && (
                    <DoctorXrayRequest onRequestSubmit={handleXrayRequestSubmit} />
                  )}
                  {currentPage === 'request-details' && (
                    <RequestDetailsPage
                      request={selectedRequest || requests[0]}
                      onBack={() => setCurrentPage('doctor-dashboard')}
                      onStatusChange={handleStatusChange}
                    />
                  )}
                  {currentPage === 'patient-history' && (
                    <PatientHistoryPage patientId={selectedRequest?.patientId} />
                  )}
                  {currentPage === 'doctor-view' && <DoctorXrayView />}
                  {currentPage === 'scan-compare' && <ScanComparisonPage />}
                  {currentPage === 'report-viewer' && <ReportViewerPage request={selectedRequest || requests[0]} />}
                  {currentPage === 'previous-patients' && <PreviousPatients />}
                  {currentPage === 'profile' && <ProfilePage user={auth.currentUser} />}
                </>
              )}

              {userRole === ROLES.TECHNICIAN && canAccess(currentPage) && (
                <>
                  {currentPage === 'technician-dashboard' && <TechnicianDashboard requests={requests} />}
                  {currentPage === 'technician-requests' && (
                    <TechnicianRequests onSelectRequest={handleSelectRequest} />
                  )}
                  {currentPage === 'request-details' && (
                    <RequestDetailsPage
                      request={selectedRequest || requests[0]}
                      onBack={() => setCurrentPage('technician-dashboard')}
                      onStatusChange={handleStatusChange}
                    />
                  )}

                  {currentPage === 'upload' && selectedRequest && (
                    <UploadXray
                      request={selectedRequest}
                      onBack={handleBack}
                      onUploadComplete={handleUploadComplete}
                    />
                  )}
                  {currentPage === 'profile' && <ProfilePage user={auth.currentUser} />}
                </>
              )}
            </MotionDiv>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <ErrorBoundary>
        <AppShell />
      </ErrorBoundary>
    </AppProvider>
  );
}

export default App;
