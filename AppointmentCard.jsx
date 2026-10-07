import StatusBadge from '../common/StatusBadge';
import Button from '../common/Button';

export default function AppointmentCard({
  appointment,
  showPatient = false,
  showDoctor = true,
  onCancel,
  onStatusChange,
  isDoctorView = false,
}) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="appointment-card">
      <div className="appointment-card-header">
        <StatusBadge status={appointment.status} />
        <span className="appointment-id">#{appointment.id}</span>
      </div>
      <div className="appointment-card-body">
        {showDoctor && (
          <div className="appointment-detail">
            <span className="detail-label">Doctor</span>
            <span className="detail-value">{appointment.doctorName}</span>
          </div>
        )}
        {showPatient && (
          <div className="appointment-detail">
            <span className="detail-label">Patient</span>
            <span className="detail-value">{appointment.patientName}</span>
          </div>
        )}
        <div className="appointment-detail">
          <span className="detail-label">Specialization</span>
          <span className="detail-value">{appointment.specialization}</span>
        </div>
        <div className="appointment-detail">
          <span className="detail-label">Date & Time</span>
          <span className="detail-value">
            {formatDate(appointment.date)} at {appointment.timeSlot}
          </span>
        </div>
        {appointment.symptoms && (
          <div className="appointment-detail">
            <span className="detail-label">Symptoms</span>
            <span className="detail-value">{appointment.symptoms}</span>
          </div>
        )}
      </div>
      <div className="appointment-card-actions">
        {!isDoctorView && appointment.status === 'Booked' && onCancel && (
          <Button variant="danger" size="sm" onClick={() => onCancel(appointment.id)}>
            Cancel
          </Button>
        )}
        {isDoctorView && appointment.status === 'Booked' && onStatusChange && (
          <Button variant="primary" size="sm" onClick={() => onStatusChange(appointment.id, 'Confirmed')}>
            Confirm
          </Button>
        )}
        {isDoctorView && appointment.status === 'Confirmed' && onStatusChange && (
          <Button variant="success" size="sm" onClick={() => onStatusChange(appointment.id, 'Completed')}>
            Mark Completed
          </Button>
        )}
        {isDoctorView && (appointment.status === 'Booked' || appointment.status === 'Confirmed') && onStatusChange && (
          <Button variant="danger" size="sm" onClick={() => onStatusChange(appointment.id, 'Cancelled')}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
