const KEYS = {
  PATIENTS: 'healthcare_patients',
  APPOINTMENTS: 'healthcare_appointments',
  CURRENT_USER: 'healthcare_current_user',
};

export function getPatients() {
  const stored = localStorage.getItem(KEYS.PATIENTS);
  return stored ? JSON.parse(stored) : null;
}

export function savePatients(patients) {
  localStorage.setItem(KEYS.PATIENTS, JSON.stringify(patients));
}

export function getAppointments() {
  const stored = localStorage.getItem(KEYS.APPOINTMENTS);
  return stored ? JSON.parse(stored) : null;
}

export function saveAppointments(appointments) {
  localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(appointments));
}

export function getCurrentUser() {
  const stored = localStorage.getItem(KEYS.CURRENT_USER);
  return stored ? JSON.parse(stored) : null;
}

export function saveCurrentUser(user) {
  if (user) {
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(KEYS.CURRENT_USER);
  }
}

export function generateId(prefix) {
  return `${prefix}${Date.now()}`;
}
