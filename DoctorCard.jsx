import { Link } from 'react-router-dom';
import Card from '../common/Card';

export default function DoctorCard({ doctor }) {
  return (
    <Card className="doctor-card">
      <div className="doctor-card-image">
        <img src={doctor.image} alt={doctor.name} />
      </div>
      <div className="doctor-card-body">
        <h3 className="doctor-name">{doctor.name}</h3>
        <p className="doctor-specialization">{doctor.specialization}</p>
        <div className="doctor-meta">
          <span className="doctor-experience">{doctor.experience} yrs exp.</span>
          <span className="doctor-rating">
            &#9733; {doctor.rating} ({doctor.reviewCount})
          </span>
        </div>
        <p className="doctor-hospital">{doctor.hospital}</p>
        <Link to={`/doctors/${doctor.id}`} className="btn btn-primary btn-sm btn-full">
          View Profile
        </Link>
      </div>
    </Card>
  );
}
