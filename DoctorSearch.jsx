import { specializations } from '../../data/specializations';

export default function DoctorSearch({ searchTerm, onSearchChange, specialization, onSpecializationChange }) {
  return (
    <div className="doctor-search">
      <div className="search-input-wrapper">
        <span className="search-icon">&#128269;</span>
        <input
          type="text"
          placeholder="Search doctors by name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>
      <select
        value={specialization}
        onChange={(e) => onSpecializationChange(e.target.value)}
        className="specialization-select"
      >
        {specializations.map((spec) => (
          <option key={spec} value={spec}>
            {spec === 'All' ? 'All Specializations' : spec}
          </option>
        ))}
      </select>
    </div>
  );
}
