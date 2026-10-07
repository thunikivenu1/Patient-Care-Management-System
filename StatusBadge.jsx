const statusConfig = {
  Booked: { className: 'status-booked', label: 'Booked' },
  Confirmed: { className: 'status-confirmed', label: 'Confirmed' },
  Completed: { className: 'status-completed', label: 'Completed' },
  Cancelled: { className: 'status-cancelled', label: 'Cancelled' },
};

export default function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.Booked;
  return <span className={`status-badge ${config.className}`}>{config.label}</span>;
}
