import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAppointments } from '../../context/AppointmentContext';
import Card from '../../components/common/Card';
import StatusBadge from '../../components/common/StatusBadge';

export default function DoctorDashboard() {
  const { user } = useAuth();
  const { getDoctorAppointments } = useAppointments();
  const appointments = getDoctorAppointments(user.id);

  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(
    (apt) => apt.date === today && apt.status !== 'Cancelled'
  );
  const pending = appointments.filter((apt) => apt.status === 'Booked');
  const completed = appointments.filter((apt) => apt.status === 'Completed');

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>Welcome, {user.name}!</h1>
            <p>{user.specialization} &bull; Doctor Portal</p>
          </div>
        </div>

        <div className="dashboard-stats">
          <Card className="stat-card">
            <span className="stat-icon">&#128197;</span>
            <div>
              <h3>{todayAppointments.length}</h3>
              <p>Today&apos;s Appointments</p>
            </div>
          </Card>
          <Card className="stat-card">
            <span className="stat-icon">&#9203;</span>
            <div>
              <h3>{pending.length}</h3>
              <p>Pending Confirmation</p>
            </div>
          </Card>
          <Card className="stat-card">
            <span className="stat-icon">&#9989;</span>
            <div>
              <h3>{completed.length}</h3>
              <p>Completed</p>
            </div>
          </Card>
          <Card className="stat-card">
            <span className="stat-icon">&#128203;</span>
            <div>
              <h3>{appointments.length}</h3>
              <p>Total Appointments</p>
            </div>
          </Card>
        </div>

        <div className="dashboard-actions">
          <Link to="/doctor/appointments" className="action-card">
            <span className="action-icon">&#128203;</span>
            <h3>Manage Appointments</h3>
            <p>View, confirm, and update appointment status</p>
          </Link>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Today&apos;s Schedule</h2>
            <Link to="/doctor/appointments">View All</Link>
          </div>
          {todayAppointments.length === 0 ? (
            <Card className="empty-state">
              <p>No appointments scheduled for today.</p>
            </Card>
          ) : (
            <div className="recent-list">
              {todayAppointments.map((apt) => (
                <Card key={apt.id} className="recent-item">
                  <div className="recent-item-info">
                    <h4>{apt.patientName}</h4>
                    <p>{apt.timeSlot} &bull; {apt.symptoms || 'No symptoms listed'}</p>
                  </div>
                  <StatusBadge status={apt.status} />
                </Card>
              ))}
            </div>
          )}
        </div>

        {pending.length > 0 && (
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Pending Confirmations</h2>
            </div>
            <div className="recent-list">
              {pending.slice(0, 5).map((apt) => (
                <Card key={apt.id} className="recent-item">
                  <div className="recent-item-info">
                    <h4>{apt.patientName}</h4>
                    <p>{apt.date} at {apt.timeSlot}</p>
                  </div>
                  <StatusBadge status={apt.status} />
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
