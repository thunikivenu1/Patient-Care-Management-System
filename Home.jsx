import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <h1>Your Health, Our Priority</h1>
            <p>
              Book appointments with top doctors, manage your health records, and get
              quality healthcare — all in one place.
            </p>
            <div className="hero-actions">
              <Link to="/patient/register">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link to="/doctors">
                <Button variant="outline" size="lg">Find Doctors</Button>
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-card">
              <div className="hero-stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Expert Doctors</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">10+</span>
                <span className="stat-label">Specializations</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose HealthCarePro?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">&#128197;</div>
              <h3>Easy Booking</h3>
              <p>Book appointments online in just a few clicks with available time slots.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">&#128104;&#8205;&#9877;&#65039;</div>
              <h3>Expert Doctors</h3>
              <p>Access qualified specialists across multiple medical fields.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">&#128274;</div>
              <h3>Secure Records</h3>
              <p>Your health data is stored safely and accessible anytime.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">&#128222;</div>
              <h3>24/7 Support</h3>
              <p>Our support team is always ready to help you.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-content">
          <h2>Ready to take care of your health?</h2>
          <p>Join thousands of patients who trust HealthCarePro.</p>
          <div className="cta-actions">
            <Link to="/patient/login">
              <Button variant="outline" size="lg">Patient Login</Button>
            </Link>
            <Link to="/doctor/login">
              <Button size="lg">Doctor Login</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
