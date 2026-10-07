import { useParams, Link } from 'react-router-dom';
import { doctors } from '../../data/doctors';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

export default function DoctorDetails() {
  const { id } = useParams();
  const doctor = doctors.find((d) => d.id === id);

  if (!doctor) {
    return (
      <div className="container page-center">
        <h2>Doctor not found</h2>
        <Link to="/doctors">Back to Doctors</Link>
      </div>
    );
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="doctor-details-page">
      <div className="container">
        <Link to="/doctors" className="back-link">&larr; Back to Doctors</Link>

        <div className="doctor-profile">
          <div className="doctor-profile-left">
            <img src={doctor.image} alt={doctor.name} className="doctor-profile-image" />
            <Card className="rating-card">
              <div className="rating-big">
                <span className="rating-star">&#9733;</span>
                <span className="rating-value">{doctor.rating}</span>
              </div>
              <p>{doctor.reviewCount} reviews</p>
            </Card>
          </div>

          <div className="doctor-profile-right">
            <h1>{doctor.name}</h1>
            <p className="doctor-spec-badge">{doctor.specialization}</p>
            <div className="doctor-info-grid">
              <div className="info-item">
                <span className="info-label">Experience</span>
                <span className="info-value">{doctor.experience} years</span>
              </div>
              <div className="info-item">
                <span className="info-label">Hospital</span>
                <span className="info-value">{doctor.hospital}</span>
              </div>
            </div>
            <p className="doctor-bio">{doctor.bio}</p>

            <Link to={`/doctors/${doctor.id}/book`}>
              <Button size="lg">Book Appointment</Button>
            </Link>
          </div>
        </div>

        <div className="doctor-sections">
          <Card className="doctor-section">
            <h2>Available Dates</h2>
            <div className="dates-grid">
              {doctor.availableDates.map((date) => (
                <div key={date} className="date-chip">
                  {formatDate(date)}
                </div>
              ))}
            </div>
          </Card>

          <Card className="doctor-section">
            <h2>Available Time Slots</h2>
            {doctor.availableDates.map((date) => (
              <div key={date} className="slots-group">
                <h4>{formatDate(date)}</h4>
                <div className="slots-grid">
                  {doctor.timeSlots[date]?.map((slot) => (
                    <span key={slot} className="slot-chip">{slot}</span>
                  ))}
                </div>
              </div>
            ))}
          </Card>

          <Card className="doctor-section">
            <h2>Patient Reviews</h2>
            <div className="reviews-list">
              {doctor.reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <span className="review-patient">{review.patient}</span>
                    <span className="review-rating">
                      {'\u2605'.repeat(review.rating)}
                    </span>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
