import React, { useState, useMemo } from 'react';
import { patientHistory } from '../data/mockData';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';
import '../styles/PreviousPatients.css';

// ── PatientHistoryPanel ──────────────────────────────────────────────────────

function PatientHistoryPanel({ record, onClose }) {
  const paymentVariant =
    record.paymentStatus === 'paid'
      ? 'success'
      : record.paymentStatus === 'partial'
      ? 'warning'
      : 'danger';

  return (
    <div className="patient-history-panel col-span-full mt-0 rounded-2xl border border-sky-500/30 bg-slate-900/90 px-5 py-5 shadow-soft-elevated">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-50">Visit Details</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          ✕ Close
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {/* Patient Info */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Patient Information
          </p>
          <DetailRow label="Name" value={record.patientName} />
          <DetailRow label="ID" value={record.patientId} />
          <DetailRow label="Age" value={`${record.patientAge} yrs`} />
          <DetailRow label="Phone" value={record.patientPhone} />
        </div>

        {/* Visit Info */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Visit Information
          </p>
          <DetailRow label="Clinic" value={record.clinicName} />
          <DetailRow label="Visit Date" value={record.visitDate} />
          <DetailRow label="Doctor" value={record.doctor} />
          <DetailRow label="X-ray Type" value={record.xrayType} />
          <DetailRow label="Technician" value={record.technicianName} />
        </div>

        {/* Payment Info */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Payment Information
          </p>
          <DetailRow label="Amount" value={`${record.paymentAmount} EGP`} />
          <div className="flex items-start gap-2">
            <span className="w-28 shrink-0 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
              Status
            </span>
            <Badge variant={paymentVariant} className="text-[11px]">
              {record.paymentStatus}
            </Badge>
          </div>
          {record.paymentStatus === 'partial' && (
            <DetailRow
              label="Remaining"
              value={`${record.remainingBalance} EGP`}
            />
          )}
          {record.notes && (
            <div className="mt-2">
              <p className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                Notes
              </p>
              <p className="text-sm text-slate-300">{record.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-start gap-2">
      <span className="w-28 shrink-0 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
        {label}
      </span>
      <span className="text-sm text-slate-100">{value}</span>
    </div>
  );
}

// ── PreviousPatients ─────────────────────────────────────────────────────────

const EMPTY_FILTERS = {
  clinic: '',
  xrayType: '',
  doctor: '',
  paymentStatus: '',
  dateFrom: '',
  dateTo: '',
};

const PreviousPatients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Derive unique option values from data
  const uniqueClinics = useMemo(
    () => [...new Set(patientHistory.map((r) => r.clinicName))].sort(),
    []
  );
  const uniqueXrayTypes = useMemo(
    () => [...new Set(patientHistory.map((r) => r.xrayType))].sort(),
    []
  );
  const uniqueDoctors = useMemo(
    () => [...new Set(patientHistory.map((r) => r.doctor))].sort(),
    []
  );

  // Count active filters
  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  // Sort descending by visitDate (stable base)
  const sorted = useMemo(
    () =>
      [...patientHistory].sort((a, b) =>
        b.visitDate.localeCompare(a.visitDate)
      ),
    []
  );

  // Apply filters then search
  const filteredRecords = useMemo(() => {
    let result = sorted;

    if (filters.clinic) result = result.filter((r) => r.clinicName === filters.clinic);
    if (filters.xrayType) result = result.filter((r) => r.xrayType === filters.xrayType);
    if (filters.doctor) result = result.filter((r) => r.doctor === filters.doctor);
    if (filters.paymentStatus) result = result.filter((r) => r.paymentStatus === filters.paymentStatus);
    if (filters.dateFrom) result = result.filter((r) => r.visitDate >= filters.dateFrom);
    if (filters.dateTo) result = result.filter((r) => r.visitDate <= filters.dateTo);

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (r) =>
          r.patientName.toLowerCase().includes(term) ||
          r.patientId.toLowerCase().includes(term)
      );
    }

    return result;
  }, [sorted, filters, searchTerm]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters(EMPTY_FILTERS);
  };

  const handleRowClick = (record) => {
    setSelectedRecord((prev) => (prev?.id === record.id ? null : record));
  };

  const paymentBadgeVariant = (status) => {
    if (status === 'paid') return 'success';
    if (status === 'partial') return 'warning';
    return 'danger';
  };

  return (
    <div className="previous-patients-page mx-auto max-w-7xl px-1 py-3 sm:px-2 md:px-0 md:py-4">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-4 border-b border-slate-800 pb-4 md:mb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
            Previous Patients
            <Badge className="text-[11px] uppercase tracking-[0.16em]">
              {patientHistory.length} records
            </Badge>
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Browse and search historical patient visit records.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Search by name or patient ID..."
            className="w-64 md:w-72"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar mb-4 rounded-2xl border border-slate-800/80 bg-slate-950/60 px-4 py-3 shadow-soft-card">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Clinic
            </label>
            <Select
              className="w-44"
              value={filters.clinic}
              onChange={(e) => handleFilterChange('clinic', e.target.value)}
            >
              <option value="">All Clinics</option>
              {uniqueClinics.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              X-ray Type
            </label>
            <Select
              className="w-40"
              value={filters.xrayType}
              onChange={(e) => handleFilterChange('xrayType', e.target.value)}
            >
              <option value="">All Types</option>
              {uniqueXrayTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Doctor
            </label>
            <Select
              className="w-48"
              value={filters.doctor}
              onChange={(e) => handleFilterChange('doctor', e.target.value)}
            >
              <option value="">All Doctors</option>
              {uniqueDoctors.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Payment Status
            </label>
            <Select
              className="w-36"
              value={filters.paymentStatus}
              onChange={(e) =>
                handleFilterChange('paymentStatus', e.target.value)
              }
            >
              <option value="">All Statuses</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
              <option value="partial">Partial</option>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              From
            </label>
            <Input
              type="date"
              className="w-36"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              To
            </label>
            <Input
              type="date"
              className="w-36"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
            />
          </div>

          <div className="flex items-end gap-2 pb-0.5">
            {activeFilterCount > 0 && (
              <Badge variant="info" className="text-[11px]">
                {activeFilterCount} active
              </Badge>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              disabled={activeFilterCount === 0}
            >
              Clear filters
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="history-table-container mb-6 overflow-x-auto rounded-2xl border border-slate-800/80 bg-slate-950/60 shadow-soft-card backdrop-blur-xl">
        <table className="history-table min-w-[900px] w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-900/80">
              {[
                'Patient Name',
                'Patient ID',
                'Visit Date',
                'Clinic',
                'X-ray Type',
                'Amount (EGP)',
                'Payment Status',
                'Doctor',
              ].map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-400"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {patientHistory.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="no-results px-4 py-10 text-center text-sm text-slate-400"
                >
                  No patient history available
                </td>
              </tr>
            ) : filteredRecords.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="no-results px-4 py-10 text-center text-sm text-slate-400"
                >
                  No results found
                </td>
              </tr>
            ) : (
              filteredRecords.map((record) => {
                const isSelected = selectedRecord?.id === record.id;
                return (
                  <React.Fragment key={record.id}>
                    <tr
                      onClick={() => handleRowClick(record)}
                      className={`transition-colors hover:bg-slate-900/60 ${
                        isSelected ? 'selected-row bg-sky-500/8' : ''
                      }`}
                    >
                      <td className="px-4 py-3 align-middle">
                        <span className="font-semibold text-slate-50">
                          {record.patientName}
                        </span>
                      </td>
                      <td className="px-4 py-3 align-middle">
                        <span className="inline-flex rounded-full bg-slate-800 px-3 py-1 text-[11px] font-semibold tracking-wide text-slate-100 shadow-soft-card">
                          {record.patientId}
                        </span>
                      </td>
                      <td className="px-4 py-3 align-middle text-slate-300">
                        {record.visitDate}
                      </td>
                      <td className="px-4 py-3 align-middle text-slate-100">
                        {record.clinicName}
                      </td>
                      <td className="px-4 py-3 align-middle text-slate-100">
                        {record.xrayType}
                      </td>
                      <td className="px-4 py-3 align-middle text-slate-100">
                        {record.paymentAmount} EGP
                      </td>
                      <td className="px-4 py-3 align-middle">
                        <Badge
                          variant={paymentBadgeVariant(record.paymentStatus)}
                          className="text-[11px]"
                        >
                          {record.paymentStatus}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 align-middle text-slate-100">
                        {record.doctor}
                      </td>
                    </tr>
                    {isSelected && (
                      <tr>
                        <td colSpan="8" className="px-4 pb-4 pt-0">
                          <PatientHistoryPanel
                            record={record}
                            onClose={() => setSelectedRecord(null)}
                          />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PreviousPatients;
