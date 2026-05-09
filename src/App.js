import { useState, useContext, createContext } from "react";

const ThemeCtx = createContext({});
const useC = () => useContext(ThemeCtx);

const DARK = {
  bg: "#0d1b2e", sidebar: "#0f1e30", sidebarBorder: "#182d45",
  card: "#132030", card2: "#172638", border: "#1e3450",
  accent: "#3b5bdb", text: "#e2e8f0", textSoft: "#94a3b8",
  muted: "#5a7a9a", success: "#16a34a", warning: "#d97706",
  danger: "#dc2626", info: "#0284c7", white: "#ffffff",
};
const LIGHT = {
  bg: "#f0f5fb", sidebar: "#ffffff", sidebarBorder: "#d0dff0",
  card: "#ffffff", card2: "#e8f1fb", border: "#c8d9ef",
  accent: "#2a52c9", text: "#0d1f3c", textSoft: "#3a547a",
  muted: "#6a88aa", success: "#15803d", warning: "#b45309",
  danger: "#b91c1c", info: "#0369a1", white: "#ffffff",
};

const DB = {
  users: [
    { id: 1, username: "doctor1", password: "pass", role: "doctor", name: "Dr. Nada Karim", specialty: "Dentist" },
    { id: 2, username: "tech1", password: "pass", role: "technician", name: "Nada Technician", specialty: "X-ray Technician" },
    { id: 3, username: "patient1", password: "pass", role: "patient", name: "Ahmed Mohamed", specialty: "Patient", patientId: "P001" },
  ],
  patients: [
    { id: "P001", name: "Ahmed Mohamed", age: 34, gender: "Male", phone: "01012345678", email: "ahmed@example.com", lastVisit: "2025-04-10", insurance: "Allianz" },
    { id: "P002", name: "Sara Ali", age: 29, gender: "Female", phone: "01098765432", email: "sara@example.com", lastVisit: "2025-03-22", insurance: "AXA" },
    { id: "P003", name: "Mahmoud Salem", age: 51, gender: "Male", phone: "01122334455", email: "mahmoud@example.com", lastVisit: "2025-01-18", insurance: "None" },
    { id: "P004", name: "Mona Fawzy", age: 28, gender: "Female", phone: "01055667788", email: "mona@example.com", lastVisit: "2025-05-01", insurance: "MetLife" },
    { id: "P005", name: "Karim Hassan", age: 42, gender: "Male", phone: "01066778899", email: "karim@example.com", lastVisit: "2025-04-28", insurance: "Allianz" },
    { id: "P006", name: "Dina Youssef", age: 36, gender: "Female", phone: "01077889900", email: "dina@example.com", lastVisit: "2025-05-05", insurance: "AXA" },
  ],
  requests: [
    { id: "XR-001", patientId: "P001", patientName: "Ahmed Mohamed", doctorId: 1, type: "Panoramic", priority: "urgent", urgentReason: "Suspected infection", status: "pending", notes: "", created: "2026-05-08T08:00:00Z", files: [], techNotes: "" },
    { id: "XR-002", patientId: "P002", patientName: "Sara Ali", doctorId: 1, type: "CBCT", priority: "urgent", urgentReason: "Pre-surgical planning", status: "pending", notes: "Check left mandible.", created: "2026-05-07T10:30:00Z", files: [], techNotes: "" },
    { id: "XR-003", patientId: "P003", patientName: "Mahmoud Salem", doctorId: 1, type: "Digital", priority: "normal", urgentReason: "", status: "completed", notes: "", created: "2026-05-06T14:00:00Z", files: [{ id: "F1", name: "salem_digital.dcm", size: "2.1 MB" }, { id: "F2", name: "salem_view2.dcm", size: "1.8 MB" }], techNotes: "Clear findings. No abnormalities detected." },
    { id: "XR-004", patientId: "P004", patientName: "Mona Fawzy", doctorId: 1, type: "Periapical", priority: "normal", urgentReason: "", status: "in-progress", notes: "", created: "2026-05-08T09:15:00Z", files: [], techNotes: "" },
    { id: "XR-005", patientId: "P005", patientName: "Karim Hassan", doctorId: 1, type: "Bitewing", priority: "normal", urgentReason: "", status: "accepted", notes: "Routine checkup.", created: "2026-05-08T11:00:00Z", files: [], techNotes: "" },
    { id: "XR-006", patientId: "P006", patientName: "Dina Youssef", doctorId: 1, type: "Cephalometric", priority: "urgent", urgentReason: "Orthodontic assessment", status: "completed", notes: "", created: "2026-05-05T13:00:00Z", files: [{ id: "F3", name: "youssef_ceph.dcm", size: "3.2 MB" }], techNotes: "Skeletal class II pattern noted." },
    { id: "XR-007", patientId: "P001", patientName: "Ahmed Mohamed", doctorId: 1, type: "Bitewing", priority: "normal", urgentReason: "", status: "completed", notes: "", created: "2025-11-10T10:00:00Z", files: [{ id: "F4", name: "ahmed_bitewing.dcm", size: "1.2 MB" }], techNotes: "Mild interproximal caries noted upper left." },
  ],
  visits: [
    { id: "V1", patientId: "P001", patientName: "Ahmed Mohamed", date: "2025-04-10", clinic: "Xray Clinic", type: "Panoramic", doctor: "Dr. Nada Karim", paymentStatus: "paid", amount: "350 EGP", report: "No significant pathology detected. Mild bone loss in lower right quadrant." },
    { id: "V2", patientId: "P003", patientName: "Mahmoud Salem", date: "2025-01-18", clinic: "Xray Clinic", type: "Digital", doctor: "Dr. Nada Karim", paymentStatus: "unpaid", amount: "200 EGP", report: "Periapical lesion noted at tooth 26." },
    { id: "V3", patientId: "P002", patientName: "Sara Ali", date: "2025-03-22", clinic: "Xray Clinic", type: "CBCT", doctor: "Dr. Nada Karim", paymentStatus: "paid", amount: "800 EGP", report: "Mild bone loss noted. No acute findings." },
    { id: "V4", patientId: "P006", patientName: "Dina Youssef", date: "2025-05-05", clinic: "Xray Clinic", type: "Cephalometric", doctor: "Dr. Nada Karim", paymentStatus: "paid", amount: "500 EGP", report: "Skeletal class II pattern noted." },
    { id: "V5", patientId: "P005", patientName: "Karim Hassan", date: "2025-04-28", clinic: "Xray Clinic", type: "Bitewing", doctor: "Dr. Nada Karim", paymentStatus: "unpaid", amount: "150 EGP", report: "Interproximal caries detected at upper left premolars." },
  ],
};

const statusColor = (C, s) => ({ pending: C.warning, accepted: C.info, "in-progress": C.accent, completed: C.success, rejected: C.danger }[s] || C.muted);
const priorityColor = (C, p) => p === "urgent" ? C.danger : C.muted;

function useStyles() {
  const C = useC();
  return {
    inp: { background: C.card2, border: `1px solid ${C.border}`, borderRadius: 6, padding: "8px 12px", color: C.text, fontSize: 13, width: "100%", outline: "none", boxSizing: "border-box" },
    btn: (bg, col = "#fff") => ({ background: bg, color: col, border: "none", borderRadius: 6, padding: "7px 16px", cursor: "pointer", fontSize: 12, fontWeight: 600 }),
    btnOut: (col) => ({ background: "transparent", color: col, border: `1px solid ${col}55`, borderRadius: 6, padding: "6px 14px", cursor: "pointer", fontSize: 12, fontWeight: 600 }),
  };
}

function Badge({ color, children }) {
  return <span style={{ color, border: `1px solid ${color}`, borderRadius: 4, padding: "2px 10px", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{String(children).toUpperCase()}</span>;
}

function Card({ children, style }) {
  const C = useC();
  return <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, ...style }}>{children}</div>;
}

function SectionHeader({ title, action }) {
  const C = useC();
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderBottom: `1px solid ${C.border}` }}>
      <span style={{ color: C.text, fontWeight: 600, fontSize: 14 }}>{title}</span>
      {action}
    </div>
  );
}

function Field({ label, children, style }) {
  const C = useC();
  return <div style={style}><div style={{ color: C.muted, fontSize: 11, fontWeight: 600, marginBottom: 5, letterSpacing: "0.05em" }}>{label.toUpperCase()}</div>{children}</div>;
}

function InfoRow({ label, value }) {
  const C = useC();
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${C.border}` }}>
      <span style={{ color: C.muted, fontSize: 13 }}>{label}</span>
      <span style={{ color: C.text, fontSize: 13, fontWeight: 500 }}>{value}</span>
    </div>
  );
}

function StatCard({ label, value }) {
  const C = useC();
  return (
    <div style={{ flex: 1, background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "18px 20px" }}>
      <div style={{ color: C.muted, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 10 }}>{label}</div>
      <div style={{ color: C.text, fontSize: 36, fontWeight: 700, lineHeight: 1 }}>{value}</div>
    </div>
  );
}

const NAV_DOCTOR = ["Dashboard", "New Request", "Request Details", "Patient History", "View X-rays", "Compare Scans", "Reports", "Previous Patients", "Profile"];
const NAV_TECH = ["Dashboard", "Requests Queue", "Image Viewer", "Reports", "Profile"];
const NAV_PATIENT = ["My Dashboard", "My X-rays", "My Reports", "Book Appointment", "Profile"];

function Sidebar({ role, page, setPage }) {
  const C = useC();
  const nav = role === "doctor" ? NAV_DOCTOR : role === "technician" ? NAV_TECH : NAV_PATIENT;
  return (
    <div style={{ width: 215, minWidth: 215, background: C.sidebar, borderRight: `1px solid ${C.sidebarBorder}`, display: "flex", flexDirection: "column", height: "100vh", position: "sticky", top: 0 }}>
      <div style={{ padding: "16px 14px 14px", borderBottom: `1px solid ${C.sidebarBorder}` }}>
        <div style={{ color: C.text, fontWeight: 700, fontSize: 15 }}>Xray Clinic</div>
        <div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>Medical Imaging Panel</div>
      </div>
      <nav style={{ flex: 1, padding: "6px 0", overflowY: "auto" }}>
        {nav.map(label => {
          const active = page === label;
          return (
            <div key={label} onClick={() => setPage(label)} style={{ padding: "9px 16px", cursor: "pointer", fontSize: 13, color: active ? C.white : C.muted, fontWeight: active ? 600 : 400, background: active ? C.accent : "transparent", borderRadius: active ? "0 6px 6px 0" : 0, marginRight: active ? 8 : 0, transition: "all 0.1s" }}>
              {label}
            </div>
          );
        })}
      </nav>
      <div style={{ margin: 12, padding: "12px 14px", background: C.accent + "20", borderRadius: 8, border: `1px solid ${C.accent}44` }}>
        <div style={{ color: C.textSoft, fontSize: 11, fontWeight: 700, marginBottom: 2 }}>SUPPORT</div>
        <div style={{ color: C.muted, fontSize: 12, marginBottom: 10 }}>Need technical help?</div>
        <button style={{ background: C.accent, color: C.white, border: "none", borderRadius: 6, padding: "7px 0", fontSize: 12, cursor: "pointer", fontWeight: 600, width: "100%" }}>Contact Admin</button>
      </div>
    </div>
  );
}

function Topbar({ user, setUser, search, setSearch, darkMode, setDarkMode }) {
  const C = useC();
  return (
    <div style={{ background: C.sidebar, borderBottom: `1px solid ${C.sidebarBorder}`, padding: "0 20px", height: 52, display: "flex", alignItems: "center", gap: 14, position: "sticky", top: 0, zIndex: 10 }}>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search patients, requests, records..." style={{ flex: 1, background: C.card2, border: `1px solid ${C.border}`, borderRadius: 20, padding: "7px 16px", color: C.text, fontSize: 13, outline: "none" }} />
      {/* Theme toggle */}
      <div onClick={() => setDarkMode(d => !d)} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "5px 12px", borderRadius: 20, background: C.card2, border: `1px solid ${C.border}`, userSelect: "none" }}>
        <div style={{ width: 34, height: 18, borderRadius: 10, background: darkMode ? C.accent : C.border, position: "relative", transition: "background 0.2s" }}>
          <div style={{ position: "absolute", top: 2, left: darkMode ? 18 : 2, width: 14, height: 14, borderRadius: "50%", background: C.white, transition: "left 0.2s" }} />
        </div>
        <span style={{ color: C.muted, fontSize: 12, fontWeight: 600 }}>{darkMode ? "Dark" : "Light"}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontWeight: 700, fontSize: 12 }}>
          {user.name.replace("Dr. ", "").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
        </div>
        <div>
          <div style={{ color: C.text, fontSize: 13, fontWeight: 600, lineHeight: 1.2 }}>{user.name}</div>
          <div style={{ color: C.muted, fontSize: 11 }}>{user.specialty}</div>
        </div>
        <button onClick={() => setUser(null)} style={{ background: "transparent", color: C.muted, border: `1px solid ${C.border}`, borderRadius: 6, padding: "5px 12px", cursor: "pointer", fontSize: 12, marginLeft: 8 }}>Logout</button>
      </div>
    </div>
  );
}

function Dashboard({ user, requests, setPage }) {
  const C = useC();
  const mine = user.role === "technician" ? requests : requests.filter(r => r.doctorId === user.id);
  const stats = [{ label: "TOTAL REQUESTS", value: mine.length }, { label: "PENDING", value: mine.filter(r => r.status === "pending").length }, { label: "COMPLETED", value: mine.filter(r => r.status === "completed").length }, { label: "URGENT", value: mine.filter(r => r.priority === "urgent").length }];
  return (
    <div>
      <div style={{ color: C.text, fontSize: 16, fontWeight: 700, marginBottom: 18 }}>Dashboard</div>
      <div style={{ display: "flex", gap: 14, marginBottom: 20 }}>{stats.map(s => <StatCard key={s.label} {...s} />)}</div>
      <Card>
        <SectionHeader title="Recent Requests" action={<button onClick={() => setPage("Request Details")} style={{ background: "transparent", color: C.accent, border: `1px solid ${C.accent}55`, borderRadius: 6, padding: "5px 12px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>View All</button>} />
        <div style={{ padding: "0 18px" }}>
          {mine.map(r => (
            <div key={r.id} onClick={() => setPage("Request Details")} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 0", borderBottom: `1px solid ${C.border}`, cursor: "pointer" }}>
              <div style={{ flex: 1 }}>
                <div style={{ color: C.text, fontSize: 13, fontWeight: 600 }}>{r.patientName} — {r.type}</div>
                <div style={{ color: C.muted, fontSize: 12, marginTop: 3 }}>{r.id} · {r.created.split("T")[0]}</div>
              </div>
              {r.priority === "urgent" && <Badge color={C.danger}>Urgent</Badge>}
              <Badge color={statusColor(C, r.status)}>{r.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function NewRequest({ patients, user, setRequests, requests, setPage }) {
  const C = useC(); const { inp, btn, btnOut } = useStyles();
  const [form, setForm] = useState({ patientId: "", type: "Panoramic", priority: "normal", urgentReason: "", notes: "" });
  const [done, setDone] = useState(false);
  const submit = () => {
    const p = patients.find(p => p.id === form.patientId); if (!p) return;
    setRequests(prev => [...prev, { id: `XR-00${prev.length + 1}`, patientId: p.id, patientName: p.name, doctorId: user.id, type: form.type, priority: form.priority, urgentReason: form.urgentReason, status: "pending", notes: form.notes, created: new Date().toISOString(), files: [], techNotes: "" }]);
    setDone(true);
  };
  if (done) return (
    <Card style={{ padding: 40, textAlign: "center", maxWidth: 420, margin: "40px auto" }}>
      <div style={{ width: 48, height: 48, borderRadius: "50%", background: C.success + "22", border: `1px solid ${C.success}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: C.success, fontSize: 22, fontWeight: 700 }}>✓</div>
      <div style={{ color: C.text, fontSize: 17, fontWeight: 700, marginBottom: 8 }}>Request Submitted</div>
      <div style={{ color: C.muted, fontSize: 13, marginBottom: 24 }}>The X-ray request has been sent to the technician queue.</div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button onClick={() => { setDone(false); setForm({ patientId: "", type: "Panoramic", priority: "normal", urgentReason: "", notes: "" }); }} style={btnOut(C.accent)}>New Request</button>
        <button onClick={() => setPage("Dashboard")} style={btn(C.accent)}>Back to Dashboard</button>
      </div>
    </Card>
  );
  return (
    <div>
      <div style={{ color: C.text, fontSize: 16, fontWeight: 700, marginBottom: 18 }}>New X-ray Request</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card style={{ gridColumn: "1/-1" }}>
          <SectionHeader title="Patient Information" />
          <div style={{ padding: 18 }}>
            <Field label="Patient"><select value={form.patientId} onChange={e => setForm(f => ({ ...f, patientId: e.target.value }))} style={inp}><option value="">Select patient…</option>{patients.map(p => <option key={p.id} value={p.id}>{p.name} — {p.id}</option>)}</select></Field>
            {form.patientId && (() => { const p = patients.find(x => x.id === form.patientId); return p ? (<div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 14, padding: 14, background: C.card2, borderRadius: 8 }}><div><div style={{ color: C.muted, fontSize: 11 }}>AGE</div><div style={{ color: C.text, fontSize: 13 }}>{p.age}</div></div><div><div style={{ color: C.muted, fontSize: 11 }}>PHONE</div><div style={{ color: C.text, fontSize: 13 }}>{p.phone}</div></div><div><div style={{ color: C.muted, fontSize: 11 }}>INSURANCE</div><div style={{ color: C.text, fontSize: 13 }}>{p.insurance}</div></div></div>) : null; })()}
          </div>
        </Card>
        <Card>
          <SectionHeader title="Scan Details" />
          <div style={{ padding: 18, display: "grid", gap: 14 }}>
            <Field label="X-ray Type"><select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} style={inp}>{["Panoramic","CBCT","Digital","Periapical","Bitewing","Cephalometric"].map(t => <option key={t}>{t}</option>)}</select></Field>
            <Field label="Priority">
              <div style={{ display: "flex", gap: 10 }}>
                {["normal","urgent"].map(p => (<div key={p} onClick={() => setForm(f => ({ ...f, priority: p }))} style={{ flex: 1, padding: "9px 14px", borderRadius: 6, border: `1px solid ${form.priority === p ? (p === "urgent" ? C.danger : C.accent) : C.border}`, background: form.priority === p ? (p === "urgent" ? C.danger + "18" : C.accent + "18") : "transparent", cursor: "pointer", textAlign: "center", color: form.priority === p ? (p === "urgent" ? C.danger : C.accent) : C.muted, fontSize: 13, fontWeight: 600, textTransform: "capitalize" }}>{p}</div>))}
              </div>
            </Field>
            {form.priority === "urgent" && <Field label="Urgent Reason"><input value={form.urgentReason} onChange={e => setForm(f => ({ ...f, urgentReason: e.target.value }))} placeholder="Describe reason…" style={inp} /></Field>}
          </div>
        </Card>
        <Card>
          <SectionHeader title="Clinical Notes" />
          <div style={{ padding: 18 }}><textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={5} placeholder="Add clinical notes or instructions for the technician…" style={{ ...inp, resize: "vertical" }} /></div>
        </Card>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <button onClick={submit} disabled={!form.patientId} style={{ ...btn(C.accent), opacity: form.patientId ? 1 : 0.5, padding: "8px 24px", fontSize: 13 }}>Submit Request</button>
        <button onClick={() => setPage("Dashboard")} style={btnOut(C.muted)}>Cancel</button>
      </div>
    </div>
  );
}

function RequestDetails({ requests, setRequests }) {
  const C = useC(); const { btnOut } = useStyles();
  const [sel, setSel] = useState(null);
  const r = requests.find(x => x.id === sel);
  if (r) return (
    <div>
      <button onClick={() => setSel(null)} style={{ ...btnOut(C.muted), marginBottom: 18 }}>Back to list</button>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 16 }}>
        <div>
          <Card style={{ marginBottom: 14 }}>
            <SectionHeader title="Request Information" action={<div style={{ display: "flex", gap: 8 }}><Badge color={priorityColor(C, r.priority)}>{r.priority}</Badge><Badge color={statusColor(C, r.status)}>{r.status}</Badge></div>} />
            <div style={{ padding: "4px 18px 18px" }}><InfoRow label="Request ID" value={r.id} /><InfoRow label="Patient" value={r.patientName} /><InfoRow label="X-ray Type" value={r.type} /><InfoRow label="Created" value={r.created.split("T")[0]} />{r.urgentReason && <InfoRow label="Urgent Reason" value={r.urgentReason} />}</div>
          </Card>
          {r.notes && <Card style={{ marginBottom: 14 }}><SectionHeader title="Clinical Notes" /><div style={{ padding: 18, color: C.textSoft, fontSize: 13, lineHeight: 1.7 }}>{r.notes}</div></Card>}
          {r.techNotes && <Card><SectionHeader title="Technician Notes" /><div style={{ padding: 18, color: C.textSoft, fontSize: 13, lineHeight: 1.7 }}>{r.techNotes}</div></Card>}
        </div>
        <Card>
          <SectionHeader title="Attached Files" />
          <div style={{ padding: 14 }}>
            {r.files.length === 0 ? <div style={{ color: C.muted, fontSize: 13, padding: "8px 0" }}>No files attached yet.</div> : r.files.map(f => (
              <div key={f.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: C.card2, borderRadius: 6, marginBottom: 8, border: `1px solid ${C.border}` }}>
                <div><div style={{ color: C.text, fontSize: 12, fontWeight: 500 }}>{f.name}</div><div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>{f.size}</div></div>
                <button style={btnOut(C.info)}>Download</button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
  return (
    <div>
      <div style={{ color: C.text, fontSize: 16, fontWeight: 700, marginBottom: 18 }}>Request Details</div>
      <Card>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr style={{ borderBottom: `1px solid ${C.border}` }}>{["Request ID","Patient","Type","Priority","Status","Date",""].map(h => <th key={h} style={{ padding: "11px 16px", textAlign: "left", color: C.muted, fontWeight: 600, fontSize: 11, letterSpacing: "0.05em" }}>{h.toUpperCase()}</th>)}</tr></thead>
          <tbody>{requests.map(r => (<tr key={r.id} onClick={() => setSel(r.id)} style={{ borderBottom: `1px solid ${C.border}`, cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.background = C.card2} onMouseLeave={e => e.currentTarget.style.background = "transparent"}><td style={{ padding: "12px 16px", color: C.info, fontWeight: 600 }}>{r.id}</td><td style={{ padding: "12px 16px", color: C.text }}>{r.patientName}</td><td style={{ padding: "12px 16px", color: C.textSoft }}>{r.type}</td><td style={{ padding: "12px 16px" }}><Badge color={priorityColor(C, r.priority)}>{r.priority}</Badge></td><td style={{ padding: "12px 16px" }}><Badge color={statusColor(C, r.status)}>{r.status}</Badge></td><td style={{ padding: "12px 16px", color: C.muted }}>{r.created.split("T")[0]}</td><td style={{ padding: "12px 16px" }}><button style={btnOut(C.accent)}>View</button></td></tr>))}</tbody>
        </table>
      </Card>
    </div>
  );
}

function RequestsQueue({ requests, setRequests }) {
  const C = useC(); const { inp, btn, btnOut } = useStyles();
  const [statusFilter, setStatusFilter] = useState("all");
  const [urgentOnly, setUrgentOnly] = useState(false);
  const [search, setSearch] = useState("");
  const [uploadId, setUploadId] = useState(null);
  const [techNotes, setTechNotes] = useState("");
  const [files, setFiles] = useState([]);
  const filtered = requests.filter(r => { if (statusFilter !== "all" && r.status !== statusFilter) return false; if (urgentOnly && r.priority !== "urgent") return false; if (search && !r.patientName.toLowerCase().includes(search.toLowerCase())) return false; return true; });
  const transition = (id, status) => setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  const complete = (id) => { setRequests(prev => prev.map(r => r.id === id ? { ...r, status: "completed", techNotes, files: [...r.files, ...files.map((f, i) => ({ id: `F${Date.now()}${i}`, name: f, size: "1.8 MB" }))] } : r)); setUploadId(null); setTechNotes(""); setFiles([]); };
  return (
    <div>
      <div style={{ color: C.text, fontSize: 16, fontWeight: 700, marginBottom: 18 }}>Requests Queue</div>
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by patient name..." style={{ ...inp, width: 220 }} />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ ...inp, width: 150 }}>{["all","pending","accepted","in-progress","completed","rejected"].map(s => <option key={s} value={s}>{s === "all" ? "All Statuses" : s}</option>)}</select>
        <label style={{ display: "flex", alignItems: "center", gap: 6, color: C.textSoft, fontSize: 13, cursor: "pointer", paddingLeft: 6 }}><input type="checkbox" checked={urgentOnly} onChange={e => setUrgentOnly(e.target.checked)} style={{ accentColor: C.danger }} />Urgent only</label>
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        {filtered.map(r => (
          <Card key={r.id}>
            <div style={{ padding: "14px 18px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}><span style={{ color: C.text, fontWeight: 600, fontSize: 14 }}>{r.patientName}</span><span style={{ color: C.muted }}>—</span><span style={{ color: C.textSoft, fontSize: 13 }}>{r.type}</span><Badge color={priorityColor(C, r.priority)}>{r.priority}</Badge><Badge color={statusColor(C, r.status)}>{r.status}</Badge></div>
                  <div style={{ color: C.muted, fontSize: 12 }}>{r.id} · {r.created.split("T")[0]}</div>
                  {r.urgentReason && <div style={{ color: C.danger, fontSize: 12, marginTop: 5 }}>Urgent: {r.urgentReason}</div>}
                  {r.notes && <div style={{ color: C.textSoft, fontSize: 12, marginTop: 5 }}>Notes: {r.notes}</div>}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {r.status === "pending" && <><button onClick={() => transition(r.id, "accepted")} style={btn(C.success)}>Accept</button><button onClick={() => transition(r.id, "rejected")} style={btn(C.danger)}>Reject</button></>}
                  {r.status === "accepted" && <button onClick={() => { transition(r.id, "in-progress"); setUploadId(r.id); }} style={btn(C.accent)}>Start & Upload</button>}
                  {r.status === "in-progress" && <button onClick={() => setUploadId(r.id)} style={btn(C.accent)}>Upload Files</button>}
                </div>
              </div>
            </div>
            {uploadId === r.id && (
              <div style={{ borderTop: `1px solid ${C.border}`, padding: "16px 18px", background: C.card2 }}>
                <div style={{ color: C.text, fontWeight: 600, fontSize: 13, marginBottom: 12 }}>Upload Study Files</div>
                <div style={{ marginBottom: 12 }}><Field label="Technician Notes"><textarea value={techNotes} onChange={e => setTechNotes(e.target.value)} rows={3} placeholder="Add scan notes and report summary…" style={{ ...inp, resize: "vertical" }} /></Field></div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ color: C.muted, fontSize: 11, fontWeight: 600, marginBottom: 8 }}>FILES</div>
                  <button onClick={() => setFiles(f => [...f, `scan_${r.id}_${f.length + 1}.dcm`])} style={{ ...btnOut(C.accent), marginBottom: 8 }}>+ Add File</button>
                  {files.map((f, i) => (<div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: C.card, borderRadius: 6, marginBottom: 6, border: `1px solid ${C.border}` }}><div style={{ flex: 1 }}><div style={{ color: C.text, fontSize: 12 }}>{f}</div><div style={{ height: 3, background: C.border, borderRadius: 2, marginTop: 5 }}><div style={{ width: "100%", height: 3, background: C.success, borderRadius: 2 }} /></div></div><button onClick={() => setFiles(f => f.filter((_, j) => j !== i))} style={{ background: "transparent", border: "none", color: C.danger, cursor: "pointer", fontSize: 16, lineHeight: 1 }}>×</button></div>))}
                </div>
                <div style={{ display: "flex", gap: 10 }}><button onClick={() => complete(r.id)} style={btn(C.success)}>Mark as Completed</button><button onClick={() => { setUploadId(null); setFiles([]); setTechNotes(""); }} style={btnOut(C.muted)}>Cancel</button></div>
              </div>
            )}
          </Card>
        ))}
        {filtered.length === 0 && <div style={{ color: C.muted, fontSize: 13, padding: "20px 0" }}>No requests match the current filters.</div>}
      </div>
    </div>
  );
}

function PatientHistory({ visits, search }) {
  const C = useC(); const { inp } = useStyles();
  const [expanded, setExpanded] = useState(null);
  const [typeFilter, setTypeFilter] = useState("");
  const [payFilter, setPayFilter] = useState("");
  const filtered = visits.filter(v => { if (typeFilter && v.type !== typeFilter) return false; if (payFilter && v.paymentStatus !== payFilter) return false; if (search && !v.patientName.toLowerCase().includes(search.toLowerCase())) return false; return true; });
  return (
    <div>
      <div style={{ color: C.text, fontSize: 16, fontWeight: 700, marginBottom: 18 }}>Patient History</div>
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ ...inp, width: 170 }}><option value="">All X-ray Types</option>{["Panoramic","CBCT","Digital","Periapical","Bitewing","Cephalometric"].map(t => <option key={t}>{t}</option>)}</select>
        <select value={payFilter} onChange={e => setPayFilter(e.target.value)} style={{ ...inp, width: 150 }}><option value="">All Payments</option><option value="paid">Paid</option><option value="unpaid">Unpaid</option></select>
      </div>
      <Card>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr style={{ borderBottom: `1px solid ${C.border}` }}>{["Patient","Date","Type","Doctor","Amount","Payment",""].map(h => <th key={h} style={{ padding: "11px 16px", textAlign: "left", color: C.muted, fontWeight: 600, fontSize: 11, letterSpacing: "0.05em" }}>{h.toUpperCase()}</th>)}</tr></thead>
          <tbody>
            {filtered.map(v => (
              <>
                <tr key={v.id} onClick={() => setExpanded(expanded === v.id ? null : v.id)} style={{ borderBottom: expanded === v.id ? "none" : `1px solid ${C.border}`, cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.background = C.card2} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "12px 16px", color: C.text, fontWeight: 500 }}>{v.patientName}</td>
                  <td style={{ padding: "12px 16px", color: C.muted }}>{v.date}</td>
                  <td style={{ padding: "12px 16px", color: C.textSoft }}>{v.type}</td>
                  <td style={{ padding: "12px 16px", color: C.muted }}>{v.doctor}</td>
                  <td style={{ padding: "12px 16px", color: C.textSoft }}>{v.amount}</td>
                  <td style={{ padding: "12px 16px" }}><Badge color={v.paymentStatus === "paid" ? C.success : C.warning}>{v.paymentStatus}</Badge></td>
                  <td style={{ padding: "12px 16px", color: C.muted, fontSize: 12 }}>{expanded === v.id ? "▲" : "▼"}</td>
                </tr>
                {expanded === v.id && (<tr key={v.id + "_e"}><td colSpan={7} style={{ padding: "14px 20px", background: C.card2, borderBottom: `1px solid ${C.border}` }}><div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 12 }}><div><div style={{ color: C.muted, fontSize: 11, marginBottom: 3 }}>CLINIC</div><div style={{ color: C.text, fontSize: 13 }}>{v.clinic}</div></div><div><div style={{ color: C.muted, fontSize: 11, marginBottom: 3 }}>X-RAY TYPE</div><div style={{ color: C.text, fontSize: 13 }}>{v.type}</div></div><div><div style={{ color: C.muted, fontSize: 11, marginBottom: 3 }}>PAYMENT</div><div style={{ color: C.text, fontSize: 13, textTransform: "capitalize" }}>{v.paymentStatus}</div></div></div><div><div style={{ color: C.muted, fontSize: 11, marginBottom: 4 }}>REPORT SUMMARY</div><div style={{ color: C.textSoft, fontSize: 13, lineHeight: 1.6 }}>{v.report}</div></div></td></tr>)}
              </>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div style={{ color: C.muted, fontSize: 13, padding: "20px 18px" }}>No records match the current filters.</div>}
      </Card>
    </div>
  );
}

function XrayViewer({ requests, titleOverride, filterFn }) {
  const C = useC(); const { btnOut, btn } = useStyles();
  const displayList = filterFn ? requests.filter(filterFn) : requests.filter(r => r.status === "completed" && r.files.length > 0);
  const [sel, setSel] = useState(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [zoom, setZoom] = useState(1);
  const req = sel ? requests.find(r => r.id === sel) : null;
  if (req) return (
    <div>
      <button onClick={() => setSel(null)} style={{ ...btnOut(C.muted), marginBottom: 18 }}>Back to list</button>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 230px", gap: 16 }}>
        <Card>
          <div style={{ background: "#040c18", height: 360, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ fontSize: 150, filter: `brightness(${brightness}%) contrast(${contrast}%)`, transform: `scale(${zoom})`, transition: "transform 0.2s", userSelect: "none" }}>🩻</div>
            <div style={{ position: "absolute", bottom: 12, left: 12, display: "flex", gap: 6 }}>
              <button onClick={() => setZoom(z => Math.min(z + 0.25, 4))} style={btn(C.card2 + "cc", C.text)}>+</button>
              <button onClick={() => setZoom(z => Math.max(z - 0.25, 0.5))} style={btn(C.card2 + "cc", C.text)}>−</button>
              <button onClick={() => { setZoom(1); setBrightness(100); setContrast(100); }} style={btn(C.card2 + "cc", C.muted)}>Reset</button>
            </div>
            <div style={{ position: "absolute", top: 10, left: 12, color: "#ffffff88", fontSize: 11 }}>{req.patientName} — {req.type} — {req.created.split("T")[0]}</div>
          </div>
          <div style={{ padding: "12px 16px", display: "flex", gap: 10, borderTop: `1px solid ${C.border}` }}>
            <button style={btnOut(C.info)}>Download All</button>
            <button style={btnOut(C.muted)}>Print</button>
            <button style={btnOut(C.muted)}>Share</button>
          </div>
        </Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Card>
            <SectionHeader title="Image Controls" />
            <div style={{ padding: 16 }}>
              <div style={{ marginBottom: 14 }}><div style={{ display: "flex", justifyContent: "space-between", color: C.muted, fontSize: 11, marginBottom: 6 }}><span>BRIGHTNESS</span><span>{brightness}%</span></div><input type="range" min="30" max="220" value={brightness} onChange={e => setBrightness(+e.target.value)} style={{ width: "100%", accentColor: C.accent }} /></div>
              <div><div style={{ display: "flex", justifyContent: "space-between", color: C.muted, fontSize: 11, marginBottom: 6 }}><span>CONTRAST</span><span>{contrast}%</span></div><input type="range" min="30" max="220" value={contrast} onChange={e => setContrast(+e.target.value)} style={{ width: "100%", accentColor: C.accent }} /></div>
            </div>
          </Card>
          <Card>
            <SectionHeader title="Study Info" />
            <div style={{ padding: "4px 16px 12px" }}><InfoRow label="Patient" value={req.patientName} /><InfoRow label="Type" value={req.type} /><InfoRow label="Date" value={req.created.split("T")[0]} /><InfoRow label="Files" value={req.files.length} /></div>
          </Card>
          {req.techNotes && <Card><SectionHeader title="Tech Notes" /><div style={{ padding: 14, color: C.textSoft, fontSize: 12, lineHeight: 1.6 }}>{req.techNotes}</div></Card>}
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <div style={{ color: C.text, fontSize: 16, fontWeight: 700, marginBottom: 18 }}>{titleOverride || "View X-rays"}</div>
      {displayList.length === 0 && <div style={{ color: C.muted, fontSize: 13 }}>No completed scans available.</div>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
        {displayList.map(r => (
          <Card key={r.id} style={{ cursor: "pointer" }} onClick={() => setSel(r.id)}>
            <div style={{ background: C.card2, height: 120, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52, marginBottom: 12, borderBottom: `1px solid ${C.border}` }}>🩻</div>
            <div style={{ padding: "0 14px 14px" }}>
              <div style={{ color: C.text, fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{r.patientName}</div>
              <div style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>{r.type} · {r.created.split("T")[0]} · {r.files.length} file(s)</div>
              <button style={btnOut(C.accent)}>Open Viewer</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CompareScans({ requests }) {
  const C = useC(); const { inp } = useStyles();
  const done = requests.filter(r => r.status === "completed");
  const [left, setLeft] = useState(done[0]?.id || ""); const [right, setRight] = useState(done[1]?.id || "");
  const [brightness, setBrightness] = useState(100); const [contrast, setContrast] = useState(100);
  return (
    <div>
      <div style={{ color: C.text, fontSize: 16, fontWeight: 700, marginBottom: 18 }}>Compare Scans</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <Field label="Scan A"><select value={left} onChange={e => setLeft(e.target.value)} style={inp}><option value="">Select…</option>{done.map(r => <option key={r.id} value={r.id}>{r.id} — {r.patientName} ({r.type})</option>)}</select></Field>
        <Field label="Scan B"><select value={right} onChange={e => setRight(e.target.value)} style={inp}><option value="">Select…</option>{done.map(r => <option key={r.id} value={r.id}>{r.id} — {r.patientName} ({r.type})</option>)}</select></Field>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        {[left, right].map((id, i) => { const r = done.find(x => x.id === id); return (<Card key={i}><div style={{ background: "#040c18", height: 240, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 90, filter: `brightness(${brightness}%) contrast(${contrast}%)` }}>🩻</div><div style={{ padding: "10px 14px 14px" }}><div style={{ color: C.muted, fontSize: 11, marginBottom: 4, fontWeight: 600 }}>SCAN {i === 0 ? "A" : "B"}</div>{r ? <><div style={{ color: C.text, fontSize: 13, fontWeight: 500 }}>{r.patientName}</div><div style={{ color: C.muted, fontSize: 12 }}>{r.type} · {r.created.split("T")[0]}</div></> : <div style={{ color: C.muted, fontSize: 13 }}>No scan selected</div>}</div></Card>); })}
      </div>
      <Card><SectionHeader title="Shared Controls" /><div style={{ padding: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}><div><div style={{ display: "flex", justifyContent: "space-between", color: C.muted, fontSize: 11, marginBottom: 6 }}><span>BRIGHTNESS</span><span>{brightness}%</span></div><input type="range" min="30" max="220" value={brightness} onChange={e => setBrightness(+e.target.value)} style={{ width: "100%", accentColor: C.accent }} /></div><div><div style={{ display: "flex", justifyContent: "space-between", color: C.muted, fontSize: 11, marginBottom: 6 }}><span>CONTRAST</span><span>{contrast}%</span></div><input type="range" min="30" max="220" value={contrast} onChange={e => setContrast(+e.target.value)} style={{ width: "100%", accentColor: C.accent }} /></div></div></Card>
    </div>
  );
}

function ReportViewer({ requests, filterFn, patientFriendly }) {
  const C = useC(); const { inp, btn, btnOut } = useStyles();
  const pool = filterFn ? requests.filter(filterFn) : requests.filter(r => r.status === "completed");
  const [sel, setSel] = useState(pool[0]?.id || "");
  const [report, setReport] = useState(""); const [loading, setLoading] = useState(false);
  const req = requests.find(r => r.id === sel);
  const generate = async () => {
    if (!req) return; setLoading(true); setReport("");
    try {
      const prompt = patientFriendly
        ? `You are a radiology assistant. Write a clear, patient-friendly diagnostic report:\nScan Type: ${req.type}\nTechnician Notes: ${req.techNotes || "None"}\n\nUse simple language. Structure: What was scanned, How it was done, What was found, Summary.`
        : `You are a radiology assistant. Write a professional diagnostic report:\nPatient: ${req.patientName}\nScan Type: ${req.type}\nTechnician Notes: ${req.techNotes || "None"}\nClinical Notes: ${req.notes || "None"}\n\nStructure: Clinical Indication, Technique, Findings, Impression.`;
      const res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }) });
      const data = await res.json();
      setReport(data.content?.[0]?.text || "Unable to generate.");
    } catch { setReport("Error generating report. Please try again."); }
    setLoading(false);
  };
  return (
    <div>
      <div style={{ color: C.text, fontSize: 16, fontWeight: 700, marginBottom: 18 }}>{patientFriendly ? "My Reports" : "Reports"}</div>
      {pool.length === 0 ? <div style={{ color: C.muted, fontSize: 13 }}>No completed scans available.</div> : <>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
          {pool.map(r => (<Card key={r.id} style={{ cursor: "pointer", borderColor: sel === r.id ? C.accent : C.border }} onClick={() => { setSel(r.id); setReport(""); }}><div style={{ padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}><div><div style={{ color: C.text, fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{r.patientName} — {r.type}</div><div style={{ color: C.muted, fontSize: 12 }}>{r.id} · {r.created.split("T")[0]}</div></div><Badge color={C.success}>Completed</Badge></div></Card>))}
        </div>
        {sel && <Card><SectionHeader title="Diagnostic Report" action={<div style={{ display: "flex", gap: 10 }}>{report && <><button style={btnOut(C.info)}>Download PDF</button><button style={btnOut(C.muted)}>Share</button></>}<button onClick={generate} disabled={loading} style={{ ...btn(C.accent), opacity: loading ? 0.7 : 1 }}>{loading ? "Generating…" : "Generate AI Report"}</button></div>} /><div style={{ padding: 20 }}>{!report && !loading && <div style={{ color: C.muted, fontSize: 13 }}>Select a scan above and click Generate AI Report.</div>}{loading && <div style={{ display: "flex", gap: 10, alignItems: "center", color: C.muted, fontSize: 13 }}><div style={{ width: 16, height: 16, border: `2px solid ${C.border}`, borderTop: `2px solid ${C.accent}`, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />Generating report…</div>}{report && <pre style={{ whiteSpace: "pre-wrap", color: C.textSoft, fontSize: 13, lineHeight: 1.8, fontFamily: "inherit", margin: 0 }}>{report}</pre>}</div></Card>}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </>}
    </div>
  );
}

function PreviousPatients({ patients, search }) {
  const C = useC(); const { btnOut } = useStyles();
  const [sel, setSel] = useState(null);
  const filtered = patients.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.id.includes(search));
  const p = patients.find(x => x.id === sel);
  if (p) return (
    <div>
      <button onClick={() => setSel(null)} style={{ ...btnOut(C.muted), marginBottom: 18 }}>Back to list</button>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card><SectionHeader title="Patient Information" /><div style={{ padding: "4px 16px 16px" }}><InfoRow label="Patient ID" value={p.id} /><InfoRow label="Full Name" value={p.name} /><InfoRow label="Age" value={`${p.age} years`} /><InfoRow label="Gender" value={p.gender} /><InfoRow label="Phone" value={p.phone} /><InfoRow label="Email" value={p.email} /><InfoRow label="Insurance" value={p.insurance} /><InfoRow label="Last Visit" value={p.lastVisit} /></div></Card>
        <Card><SectionHeader title="Visit History" /><div style={{ padding: "4px 16px 16px" }}>{DB.visits.filter(v => v.patientId === p.id).map(v => (<div key={v.id} style={{ padding: "10px 0", borderBottom: `1px solid ${C.border}` }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ color: C.text, fontSize: 13, fontWeight: 500 }}>{v.type}</span><Badge color={v.paymentStatus === "paid" ? C.success : C.warning}>{v.paymentStatus}</Badge></div><div style={{ color: C.muted, fontSize: 12 }}>{v.date} · {v.amount}</div><div style={{ color: C.textSoft, fontSize: 12, marginTop: 4 }}>{v.report}</div></div>))}{DB.visits.filter(v => v.patientId === p.id).length === 0 && <div style={{ color: C.muted, fontSize: 13, padding: "10px 0" }}>No visit records found.</div>}</div></Card>
      </div>
    </div>
  );
  return (
    <div>
      <div style={{ color: C.text, fontSize: 16, fontWeight: 700, marginBottom: 18 }}>Previous Patients</div>
      <Card>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr style={{ borderBottom: `1px solid ${C.border}` }}>{["ID","Name","Age","Gender","Phone","Insurance","Last Visit",""].map(h => <th key={h} style={{ padding: "11px 16px", textAlign: "left", color: C.muted, fontWeight: 600, fontSize: 11, letterSpacing: "0.05em" }}>{h.toUpperCase()}</th>)}</tr></thead>
          <tbody>{filtered.map(p => (<tr key={p.id} onClick={() => setSel(p.id)} style={{ borderBottom: `1px solid ${C.border}`, cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.background = C.card2} onMouseLeave={e => e.currentTarget.style.background = "transparent"}><td style={{ padding: "12px 16px", color: C.info, fontWeight: 600 }}>{p.id}</td><td style={{ padding: "12px 16px", color: C.text, fontWeight: 500 }}>{p.name}</td><td style={{ padding: "12px 16px", color: C.muted }}>{p.age}</td><td style={{ padding: "12px 16px", color: C.muted }}>{p.gender}</td><td style={{ padding: "12px 16px", color: C.muted }}>{p.phone}</td><td style={{ padding: "12px 16px", color: C.muted }}>{p.insurance}</td><td style={{ padding: "12px 16px", color: C.muted }}>{p.lastVisit}</td><td style={{ padding: "12px 16px" }}><button style={btnOut(C.accent)}>View</button></td></tr>))}</tbody>
        </table>
      </Card>
    </div>
  );
}

function PatientDashboard({ user, requests }) {
  const C = useC();
  const mine = requests.filter(r => r.patientId === user.patientId);
  const stats = [{ label: "TOTAL SCANS", value: mine.length }, { label: "PENDING", value: mine.filter(r => r.status === "pending").length }, { label: "COMPLETED", value: mine.filter(r => r.status === "completed").length }, { label: "IN PROGRESS", value: mine.filter(r => r.status === "in-progress").length }];
  return (
    <div>
      <div style={{ color: C.text, fontSize: 16, fontWeight: 700, marginBottom: 18 }}>My Dashboard</div>
      <div style={{ display: "flex", gap: 14, marginBottom: 20 }}>{stats.map(s => <StatCard key={s.label} {...s} />)}</div>
      <Card>
        <SectionHeader title="My Scan Requests" />
        <div style={{ padding: "0 18px" }}>
          {mine.length === 0 && <div style={{ color: C.muted, fontSize: 13, padding: "16px 0" }}>No requests found.</div>}
          {mine.map(r => (<div key={r.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 0", borderBottom: `1px solid ${C.border}` }}><div style={{ flex: 1 }}><div style={{ color: C.text, fontSize: 13, fontWeight: 600 }}>{r.type}</div><div style={{ color: C.muted, fontSize: 12, marginTop: 3 }}>{r.id} · {r.created.split("T")[0]}</div></div>{r.priority === "urgent" && <Badge color={C.danger}>Urgent</Badge>}<Badge color={statusColor(C, r.status)}>{r.status}</Badge></div>))}
        </div>
      </Card>
    </div>
  );
}

function BookAppointment() {
  const C = useC(); const { inp, btn, btnOut } = useStyles();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ doctor: "", date: "", time: "", type: "Panoramic", referral: "", insurance: "" });
  const [done, setDone] = useState(false);
  const doctors = ["Dr. Nada Karim", "Dr. Rami Saleh", "Dr. Leila Nour"];
  const times = ["09:00","09:30","10:00","10:30","11:00","14:00","14:30","15:00","15:30","16:00"];
  const steps = ["Doctor", "Date & Time", "Scan Type", "Insurance", "Confirm"];
  if (done) return (
    <Card style={{ padding: 40, textAlign: "center", maxWidth: 440, margin: "40px auto" }}>
      <div style={{ width: 48, height: 48, borderRadius: "50%", background: C.success + "22", border: `1px solid ${C.success}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: C.success, fontSize: 22, fontWeight: 700 }}>✓</div>
      <div style={{ color: C.text, fontSize: 17, fontWeight: 700, marginBottom: 8 }}>Appointment Confirmed</div>
      <div style={{ color: C.muted, fontSize: 13, marginBottom: 4 }}>With {form.doctor}</div>
      <div style={{ color: C.muted, fontSize: 13, marginBottom: 4 }}>{form.date} at {form.time}</div>
      <div style={{ color: C.muted, fontSize: 13, marginBottom: 24 }}>Scan: {form.type}</div>
      <button onClick={() => { setDone(false); setStep(1); setForm({ doctor: "", date: "", time: "", type: "Panoramic", referral: "", insurance: "" }); }} style={btn(C.accent)}>Book Another</button>
    </Card>
  );
  return (
    <div>
      <div style={{ color: C.text, fontSize: 16, fontWeight: 700, marginBottom: 18 }}>Book Appointment</div>
      <div style={{ display: "flex", gap: 0, marginBottom: 24 }}>{steps.map((s, i) => (<div key={i} style={{ flex: 1, textAlign: "center" }}><div style={{ height: 4, borderRadius: 2, background: i + 1 <= step ? C.accent : C.border, marginBottom: 7 }} /><div style={{ fontSize: 11, color: i + 1 <= step ? C.accent : C.muted, fontWeight: i + 1 === step ? 700 : 400 }}>{s}</div></div>))}</div>
      <Card style={{ padding: 24 }}>
        {step === 1 && <div><div style={{ color: C.text, fontWeight: 600, marginBottom: 14 }}>Select a Doctor</div>{doctors.map(d => (<div key={d} onClick={() => setForm(f => ({ ...f, doctor: d }))} style={{ padding: "12px 16px", borderRadius: 7, border: `1px solid ${form.doctor === d ? C.accent : C.border}`, background: form.doctor === d ? C.accent + "18" : "transparent", cursor: "pointer", color: form.doctor === d ? C.text : C.textSoft, fontSize: 13, fontWeight: form.doctor === d ? 600 : 400, marginBottom: 8 }}>{d}</div>))}</div>}
        {step === 2 && <div><div style={{ color: C.text, fontWeight: 600, marginBottom: 14 }}>Pick Date & Time</div><Field label="Date" style={{ marginBottom: 16 }}><input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={inp} /></Field><div style={{ color: C.muted, fontSize: 11, fontWeight: 600, marginBottom: 10, letterSpacing: "0.05em" }}>TIME SLOT</div><div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{times.map(t => (<div key={t} onClick={() => setForm(f => ({ ...f, time: t }))} style={{ padding: "7px 16px", borderRadius: 6, border: `1px solid ${form.time === t ? C.accent : C.border}`, background: form.time === t ? C.accent : "transparent", cursor: "pointer", color: form.time === t ? C.white : C.muted, fontSize: 13, fontWeight: form.time === t ? 600 : 400 }}>{t}</div>))}</div></div>}
        {step === 3 && <Field label="Scan Type"><select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} style={inp}>{["Panoramic","CBCT","Digital","Periapical","Bitewing","Cephalometric"].map(t => <option key={t}>{t}</option>)}</select></Field>}
        {step === 4 && <div style={{ display: "grid", gap: 14 }}><Field label="Referral Info"><input value={form.referral} onChange={e => setForm(f => ({ ...f, referral: e.target.value }))} placeholder="Referring doctor or note (optional)" style={inp} /></Field><Field label="Insurance Provider"><input value={form.insurance} onChange={e => setForm(f => ({ ...f, insurance: e.target.value }))} placeholder="e.g. Allianz, AXA, None" style={inp} /></Field></div>}
        {step === 5 && <div><div style={{ color: C.text, fontWeight: 600, marginBottom: 14 }}>Confirm Appointment</div>{[["Doctor",form.doctor],["Date",form.date],["Time",form.time],["Scan Type",form.type],["Referral",form.referral||"—"],["Insurance",form.insurance||"—"]].map(([k,v]) => <InfoRow key={k} label={k} value={v} />)}</div>}
        <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
          {step > 1 && <button onClick={() => setStep(s => s - 1)} style={btnOut(C.muted)}>Back</button>}
          {step < 5 && <button onClick={() => setStep(s => s + 1)} style={{ ...btn(C.accent), marginLeft: "auto" }}>Next</button>}
          {step === 5 && <button onClick={() => setDone(true)} style={{ ...btn(C.success), marginLeft: "auto" }}>Confirm Booking</button>}
        </div>
      </Card>
    </div>
  );
}

function Profile({ user }) {
  const C = useC();
  return (
    <div>
      <div style={{ color: C.text, fontSize: 16, fontWeight: 700, marginBottom: 18 }}>Profile</div>
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 16 }}>
        <Card>
          <div style={{ padding: 24, textAlign: "center" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontWeight: 800, fontSize: 24, margin: "0 auto 14px" }}>{user.name.replace("Dr. ", "").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}</div>
            <div style={{ color: C.text, fontSize: 16, fontWeight: 700 }}>{user.name}</div>
            <div style={{ color: C.muted, fontSize: 13, marginTop: 4 }}>{user.specialty}</div>
            <div style={{ marginTop: 12 }}><Badge color={C.success}>Active Session</Badge></div>
          </div>
        </Card>
        <Card>
          <SectionHeader title="Account Details" />
          <div style={{ padding: "4px 18px 18px" }}>
            <InfoRow label="Display Name" value={user.name} />
            <InfoRow label="Role" value={user.role.charAt(0).toUpperCase() + user.role.slice(1)} />
            <InfoRow label="Specialty" value={user.specialty} />
            <InfoRow label="Session Status" value="Active" />
            <InfoRow label="Last Login" value="Today, 08:14 AM" />
          </div>
        </Card>
      </div>
    </div>
  );
}

function Login({ onLogin, darkMode, setDarkMode }) {
  const C = useC(); const { inp, btn } = useStyles();
  const [u, setU] = useState(""); const [p, setP] = useState(""); const [err, setErr] = useState("");
  const login = () => { const user = DB.users.find(x => x.username === u && x.password === p); if (user) onLogin(user); else setErr("Invalid username or password."); };
  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 380 }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
          <div onClick={() => setDarkMode(d => !d)} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "5px 12px", borderRadius: 20, background: C.card, border: `1px solid ${C.border}`, userSelect: "none" }}>
            <div style={{ width: 34, height: 18, borderRadius: 10, background: darkMode ? C.accent : C.border, position: "relative", transition: "background 0.2s" }}>
              <div style={{ position: "absolute", top: 2, left: darkMode ? 18 : 2, width: 14, height: 14, borderRadius: "50%", background: C.white, transition: "left 0.2s" }} />
            </div>
            <span style={{ color: C.muted, fontSize: 12, fontWeight: 600 }}>{darkMode ? "Dark" : "Light"}</span>
          </div>
        </div>
        <div style={{ marginBottom: 28, textAlign: "center" }}>
          <div style={{ color: C.text, fontSize: 22, fontWeight: 700 }}>Xray Clinic</div>
          <div style={{ color: C.muted, fontSize: 13, marginTop: 4 }}>Medical Imaging Panel</div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 28 }}>
          <div style={{ marginBottom: 16 }}><Field label="Username"><input value={u} onChange={e => setU(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} placeholder="Enter username" style={inp} /></Field></div>
          <div style={{ marginBottom: 20 }}><Field label="Password"><input type="password" value={p} onChange={e => setP(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} placeholder="Enter password" style={inp} /></Field></div>
          {err && <div style={{ color: C.danger, fontSize: 13, marginBottom: 14 }}>{err}</div>}
          <button onClick={login} style={{ ...btn(C.accent), width: "100%", padding: "10px", fontSize: 14 }}>Sign In</button>
          <div style={{ marginTop: 18, padding: 14, background: C.card2, borderRadius: 7, border: `1px solid ${C.border}` }}>
            <div style={{ color: C.muted, fontSize: 11, fontWeight: 600, marginBottom: 8, letterSpacing: "0.05em" }}>DEMO ACCOUNTS (password: pass)</div>
            {[["doctor1","Doctor — Dr. Nada Karim"],["tech1","Technician — Nada Technician"],["patient1","Patient — Ahmed Mohamed"]].map(([username, label]) => (
              <div key={username} onClick={() => { setU(username); setP("pass"); }} style={{ color: C.accent, fontSize: 12, cursor: "pointer", padding: "3px 0", fontWeight: 500 }}>{username} · {label}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [requests, setRequests] = useState(DB.requests);
  const [darkMode, setDarkMode] = useState(true);
  const C = darkMode ? DARK : LIGHT;

  if (!user) return (
    <ThemeCtx.Provider value={C}>
      <Login onLogin={u => { setUser(u); setPage(u.role === "patient" ? "My Dashboard" : "Dashboard"); }} darkMode={darkMode} setDarkMode={setDarkMode} />
    </ThemeCtx.Provider>
  );

  const pages = {
    "Dashboard": <Dashboard user={user} requests={requests} setPage={setPage} />,
    "New Request": <NewRequest patients={DB.patients} user={user} setRequests={setRequests} requests={requests} setPage={setPage} />,
    "Request Details": <RequestDetails requests={requests} setRequests={setRequests} />,
    "Patient History": <PatientHistory visits={DB.visits} search={search} />,
    "View X-rays": <XrayViewer requests={requests} />,
    "Compare Scans": <CompareScans requests={requests} />,
    "Reports": <ReportViewer requests={requests} />,
    "Previous Patients": <PreviousPatients patients={DB.patients} search={search} />,
    "Requests Queue": <RequestsQueue requests={requests} setRequests={setRequests} />,
    "Image Viewer": <XrayViewer requests={requests} titleOverride="Image Viewer" />,
    "My Dashboard": <PatientDashboard user={user} requests={requests} />,
    "My X-rays": <XrayViewer requests={requests} titleOverride="My X-rays" filterFn={r => r.patientId === user.patientId && r.status === "completed" && r.files.length > 0} />,
    "My Reports": <ReportViewer requests={requests} filterFn={r => r.patientId === user.patientId && r.status === "completed"} patientFriendly />,
    "Book Appointment": <BookAppointment />,
    "Profile": <Profile user={user} />,
  };

  const defaultPage = user.role === "patient" ? "My Dashboard" : "Dashboard";

  return (
    <ThemeCtx.Provider value={C}>
      <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
        <div style={{ display: "flex" }}>
          <Sidebar role={user.role} page={page} setPage={setPage} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh", overflow: "hidden" }}>
            <Topbar user={user} setUser={setUser} search={search} setSearch={setSearch} darkMode={darkMode} setDarkMode={setDarkMode} />
            <div style={{ flex: 1, padding: "24px 26px", overflowY: "auto" }}>
              {pages[page] || pages[defaultPage]}
            </div>
          </div>
        </div>
      </div>
    </ThemeCtx.Provider>
  );
}
