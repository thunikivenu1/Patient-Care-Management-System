import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppointments } from '../../context/AppointmentContext';
import AppointmentCard from '../../components/appointments/AppointmentCard';

const FILTERS = ['All', 'Booked', 'Confirmed', 'Completed', 'Cancelled'];

export default function DoctorAppointments() {
  const { user } = useAuth();
  const { getDoctorAppointments, updateAppointmentStatus } = useAppointments();
  const [filter, setFilter] = useState('All');

  const appointments = getDoctorAppointments(user.id);
  const filtered =
    filter === 'All'
      ? appointments
      : appointments.filter((apt) => apt.status === filter);

  const sorted = [...filtered].sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    return a.timeSlot.localeCompare(b.timeSlot);
  });

  return (
    <div className="appointments-page">
      <div className="container">
        <div className="page-header">
          <h1>My Appointments</h1>
          <p>Manage and update patient appointment status</p>
        </div>

        <div className="filter-tabs">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-tab ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
              {f !== 'All' && (
                <span className="filter-count">
                  {appointments.filter((a) => a.status === f).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {sorted.length === 0 ? (
          <div className="empty-state">
            <p>No {filter !== 'All' ? filter.toLowerCase() : ''} appointments found.</p>
          </div>
        ) : (
          <div className="appointments-list">
            {sorted.map((apt) => (
              <AppointmentCard
                key={apt.id}
                appointment={apt}
                showPatient
                showDoctor={false}
                isDoctorView
                onStatusChange={updateAppointmentStatus}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
