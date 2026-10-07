import { createContext, useContext, useState, useEffect } from 'react';
import { defaultPatients } from '../data/patients';
import { getPatients, savePatients, getCurrentUser, saveCurrentUser } from '../utils/storage';
import { doctors } from '../data/doctors';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedPatients = getPatients();
    if (!storedPatients) {
      savePatients(defaultPatients);
    }
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const loginPatient = (email, password) => {
    const patients = getPatients() || defaultPatients;
    const patient = patients.find(
      (p) => p.email === email && p.password === password
    );
    if (patient) {
      const userData = { ...patient, role: 'patient' };
      setUser(userData);
      saveCurrentUser(userData);
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const registerPatient = (formData) => {
    const patients = getPatients() || defaultPatients;
    const exists = patients.find((p) => p.email === formData.email);
    if (exists) {
      return { success: false, message: 'Email already registered' };
    }
    const newPatient = {
      id: `pat${Date.now()}`,
      ...formData,
    };
    const updated = [...patients, newPatient];
    savePatients(updated);
    const userData = { ...newPatient, role: 'patient' };
    setUser(userData);
    saveCurrentUser(userData);
    return { success: true };
  };

  const loginDoctor = (email, password) => {
    const doctor = doctors.find(
      (d) => d.email === email && d.password === password
    );
    if (doctor) {
      const userData = {
        id: doctor.id,
        name: doctor.name,
        email: doctor.email,
        specialization: doctor.specialization,
        role: 'doctor',
      };
      setUser(userData);
      saveCurrentUser(userData);
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
    saveCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, loginPatient, registerPatient, loginDoctor, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
