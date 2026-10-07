export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h4>HealthCarePro</h4>
          <p>Smart Healthcare Management System for patients and doctors.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>Find Doctors</li>
            <li>Book Appointment</li>
            <li>Patient Portal</li>
            <li>Doctor Portal</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@healthcarepro.com</p>
          <p>Phone: +91 1800-123-4567</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 HealthCarePro. Academic Project - Frontend Only.</p>
      </div>
    </footer>
  );
}
