import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <span className="logo-icon">+</span>
          <span className="logo-text">HealthCare<span className="logo-accent">Pro</span></span>
        </Link>

        <nav className="nav">
          {user?.role === 'patient' && (
            <>
              <Link to="/patient/dashboard">Dashboard</Link>
              <Link to="/doctors">Find Doctors</Link>
              <Link to="/patient/appointments">My Appointments</Link>
            </>
          )}
          {user?.role === 'doctor' && (
            <>
              <Link to="/doctor/dashboard">Dashboard</Link>
              <Link to="/doctor/appointments">Appointments</Link>
            </>
          )}
          {!user && (
            <>
              <Link to="/patient/login">Patient Login</Link>
              <Link to="/doctor/login">Doctor Login</Link>
            </>
          )}
        </nav>

        <div className="header-actions">
          {user ? (
            <div className="user-menu">
              <span className="user-name">Hi, {user.name.split(' ')[0]}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/patient/register">
              <Button size="sm">Register</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
