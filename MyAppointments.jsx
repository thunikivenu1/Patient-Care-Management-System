import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAppointments } from '../../context/AppointmentContext';
import AppointmentCard from '../../components/appointments/AppointmentCard';
import Button from '../../components/common/Button';

const FILTERS = ['All', 'Booked', 'Confirmed', 'Completed', 'Cancelled'];

export default function MyAppointments() {
  const { user } = useAuth();
  const { getPatientAppointments, cancelAppointment } = useAppointments();
  const [filter, setFilter] = useState('All');

  const appointments = getPatientAppointments(user.id);
  const filtered =
    filter === 'All'
      ? appointments
      : appointments.filter((apt) => apt.status === filter);

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="appointments-page">
      <div className="container">
        <div className="page-header">
          <h1>My Appointments</h1>
          <Link to="/doctors">
            <Button size="sm">Book New</Button>
          </Link>
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
            <Link to="/doctors">
              <Button>Find a Doctor</Button>
            </Link>
          </div>
        ) : (
          <div className="appointments-list">
            {sorted.map((apt) => (
              <AppointmentCard
                key={apt.id}
                appointment={apt}
                onCancel={cancelAppointment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
