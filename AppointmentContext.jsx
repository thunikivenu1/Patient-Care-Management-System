import { createContext, useContext, useState, useEffect } from 'react';
import { defaultAppointments } from '../data/appointments';
import { getAppointments, saveAppointments, generateId } from '../utils/storage';

const AppointmentContext = createContext(null);

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const stored = getAppointments();
    if (!stored) {
      saveAppointments(defaultAppointments);
      setAppointments(defaultAppointments);
    } else {
      setAppointments(stored);
    }
  }, []);

  const bookAppointment = (appointmentData) => {
    const newAppointment = {
      id: generateId('apt'),
      status: 'Booked',
      createdAt: new Date().toISOString(),
      ...appointmentData,
    };
    const updated = [...appointments, newAppointment];
    setAppointments(updated);
    saveAppointments(updated);
    return newAppointment;
  };

  const updateAppointmentStatus = (appointmentId, status) => {
    const updated = appointments.map((apt) =>
      apt.id === appointmentId ? { ...apt, status } : apt
    );
    setAppointments(updated);
    saveAppointments(updated);
  };

  const cancelAppointment = (appointmentId) => {
    updateAppointmentStatus(appointmentId, 'Cancelled');
  };

  const getPatientAppointments = (patientId) => {
    return appointments.filter((apt) => apt.patientId === patientId);
  };

  const getDoctorAppointments = (doctorId) => {
    return appointments.filter((apt) => apt.doctorId === doctorId);
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        bookAppointment,
        updateAppointmentStatus,
        cancelAppointment,
        getPatientAppointments,
        getDoctorAppointments,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointments() {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointments must be used within AppointmentProvider');
  }
  return context;
}
