import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAppointments } from '../../context/AppointmentContext';
import Card from '../../components/common/Card';
import StatusBadge from '../../components/common/StatusBadge';

export default function PatientDashboard() {
  const { user } = useAuth();
  const { getPatientAppointments } = useAppointments();
  const appointments = getPatientAppointments(user.id);

  const upcoming = appointments.filter(
    (apt) => apt.status === 'Booked' || apt.status === 'Confirmed'
  );
  const recent = appointments.slice(-3).reverse();

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>Welcome, {user.name}!</h1>
            <p>Manage your health appointments and find doctors.</p>
          </div>
        </div>

        <div className="dashboard-stats">
          <Card className="stat-card">
            <span className="stat-icon">&#128197;</span>
            <div>
              <h3>{upcoming.length}</h3>
              <p>Upcoming Appointments</p>
            </div>
          </Card>
          <Card className="stat-card">
            <span className="stat-icon">&#9989;</span>
            <div>
              <h3>{appointments.filter((a) => a.status === 'Completed').length}</h3>
              <p>Completed Visits</p>
            </div>
          </Card>
          <Card className="stat-card">
            <span className="stat-icon">&#128104;&#8205;&#9877;&#65039;</span>
            <div>
              <h3>{new Set(appointments.map((a) => a.doctorId)).size}</h3>
              <p>Doctors Visited</p>
            </div>
          </Card>
        </div>

        <div className="dashboard-actions">
          <Link to="/doctors" className="action-card">
            <span className="action-icon">&#128269;</span>
            <h3>Find Doctors</h3>
            <p>Search and book with specialists</p>
          </Link>
          <Link to="/patient/appointments" className="action-card">
            <span className="action-icon">&#128203;</span>
            <h3>My Appointments</h3>
            <p>View and manage appointments</p>
          </Link>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Appointments</h2>
            <Link to="/patient/appointments">View All</Link>
          </div>
          {recent.length === 0 ? (
            <Card className="empty-state">
              <p>No appointments yet. <Link to="/doctors">Book your first appointment</Link></p>
            </Card>
          ) : (
            <div className="recent-list">
              {recent.map((apt) => (
                <Card key={apt.id} className="recent-item">
                  <div className="recent-item-info">
                    <h4>{apt.doctorName}</h4>
                    <p>{apt.specialization} &bull; {apt.date} at {apt.timeSlot}</p>
                  </div>
                  <StatusBadge status={apt.status} />
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="dashboard-section">
          <h2>Your Profile</h2>
          <Card className="profile-card">
            <div className="profile-grid">
              <div><strong>Email:</strong> {user.email}</div>
              <div><strong>Phone:</strong> {user.phone}</div>
              <div><strong>Age:</strong> {user.age}</div>
              <div><strong>Gender:</strong> {user.gender}</div>
              <div><strong>Blood Group:</strong> {user.bloodGroup}</div>
              <div><strong>Address:</strong> {user.address}</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
