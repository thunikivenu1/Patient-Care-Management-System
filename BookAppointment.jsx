import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doctors } from '../../data/doctors';
import { useAuth } from '../../context/AuthContext';
import { useAppointments } from '../../context/AppointmentContext';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

export default function BookAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { bookAppointment } = useAppointments();
  const doctor = doctors.find((d) => d.id === id);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [error, setError] = useState('');

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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!selectedDate || !selectedSlot) {
      setError('Please select a date and time slot');
      return;
    }

    const appointment = bookAppointment({
      patientId: user.id,
      patientName: user.name,
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialization: doctor.specialization,
      date: selectedDate,
      timeSlot: selectedSlot,
      symptoms,
    });

    navigate('/patient/appointment-confirmation', { state: { appointment } });
  };

  return (
    <div className="book-appointment-page">
      <div className="container">
        <Link to={`/doctors/${doctor.id}`} className="back-link">
          &larr; Back to Doctor Profile
        </Link>

        <div className="page-header">
          <h1>Book Appointment</h1>
          <p>with {doctor.name} - {doctor.specialization}</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <Card className="booking-section">
            <h2>1. Select Date</h2>
            <div className="dates-grid selectable">
              {doctor.availableDates.map((date) => (
                <button
                  key={date}
                  type="button"
                  className={`date-chip ${selectedDate === date ? 'selected' : ''}`}
                  onClick={() => handleDateSelect(date)}
                >
                  {formatDate(date)}
                </button>
              ))}
            </div>
          </Card>

          {selectedDate && (
            <Card className="booking-section">
              <h2>2. Select Time Slot</h2>
              <div className="slots-grid selectable">
                {doctor.timeSlots[selectedDate]?.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className={`slot-chip ${selectedSlot === slot ? 'selected' : ''}`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </Card>
          )}

          <Card className="booking-section">
            <h2>3. Describe Symptoms (Optional)</h2>
            <textarea
              className="form-input symptoms-textarea"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Briefly describe your symptoms or reason for visit..."
              rows={4}
            />
          </Card>

          {selectedDate && selectedSlot && (
            <Card className="booking-summary">
              <h2>Booking Summary</h2>
              <div className="summary-grid">
                <div><strong>Doctor:</strong> {doctor.name}</div>
                <div><strong>Specialization:</strong> {doctor.specialization}</div>
                <div><strong>Date:</strong> {formatDate(selectedDate)}</div>
                <div><strong>Time:</strong> {selectedSlot}</div>
                <div><strong>Patient:</strong> {user.name}</div>
              </div>
              <Button type="submit" size="lg" fullWidth>
                Confirm Booking
              </Button>
            </Card>
          )}
        </form>
      </div>
    </div>
  );
}
