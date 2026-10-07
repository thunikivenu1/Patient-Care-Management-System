import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

export default function DoctorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginDoctor } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const result = loginDoctor(email, password);
    if (result.success) {
      navigate('/doctor/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <Card className="auth-card">
          <div className="auth-header">
            <h1>Doctor Login</h1>
            <p>Access your doctor portal to manage appointments.</p>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <Input
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <Input
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <Button type="submit" fullWidth>
              Sign In
            </Button>
          </form>

          <div className="auth-footer">
            <p>
              Are you a patient?{' '}
              <Link to="/patient/login">Patient Login</Link>
            </p>
          </div>

          <div className="demo-credentials">
            <p><strong>Demo:</strong> dr.smith@hospital.com / doctor123</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
