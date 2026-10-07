import { useState, useMemo } from 'react';
import { doctors } from '../../data/doctors';
import DoctorSearch from '../../components/doctors/DoctorSearch';
import DoctorCard from '../../components/doctors/DoctorCard';

export default function DoctorList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialization, setSpecialization] = useState('All');

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpec =
        specialization === 'All' || doctor.specialization === specialization;
      return matchesSearch && matchesSpec;
    });
  }, [searchTerm, specialization]);

  return (
    <div className="doctors-page">
      <div className="container">
        <div className="page-header">
          <h1>Find Doctors</h1>
          <p>Search and filter doctors by name or specialization</p>
        </div>

        <DoctorSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          specialization={specialization}
          onSpecializationChange={setSpecialization}
        />

        <p className="results-count">
          {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
        </p>

        {filteredDoctors.length === 0 ? (
          <div className="empty-state">
            <p>No doctors found matching your search.</p>
          </div>
        ) : (
          <div className="doctors-grid">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
