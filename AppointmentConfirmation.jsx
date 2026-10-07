import { useLocation, Link, Navigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import StatusBadge from '../../components/common/StatusBadge';

export default function AppointmentConfirmation() {
  const location = useLocation();
  const appointment = location.state?.appointment;

  if (!appointment) {
    return <Navigate to="/patient/dashboard" replace />;
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="confirmation-page">
      <div className="container">
        <Card className="confirmation-card">
          <div className="confirmation-icon">&#10004;</div>
          <h1>Appointment Booked!</h1>
          <p className="confirmation-subtitle">
            Your appointment has been successfully scheduled.
          </p>

          <div className="confirmation-details">
            <div className="confirmation-row">
              <span>Appointment ID</span>
              <strong>#{appointment.id}</strong>
            </div>
            <div className="confirmation-row">
              <span>Status</span>
              <StatusBadge status={appointment.status} />
            </div>
            <div className="confirmation-row">
              <span>Doctor</span>
              <strong>{appointment.doctorName}</strong>
            </div>
            <div className="confirmation-row">
              <span>Specialization</span>
              <strong>{appointment.specialization}</strong>
            </div>
            <div className="confirmation-row">
              <span>Date</span>
              <strong>{formatDate(appointment.date)}</strong>
            </div>
            <div className="confirmation-row">
              <span>Time</span>
              <strong>{appointment.timeSlot}</strong>
            </div>
            {appointment.symptoms && (
              <div className="confirmation-row">
                <span>Symptoms</span>
                <strong>{appointment.symptoms}</strong>
              </div>
            )}
          </div>

          <div className="confirmation-actions">
            <Link to="/patient/appointments">
              <Button variant="outline">View My Appointments</Button>
            </Link>
            <Link to="/patient/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
