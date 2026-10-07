# HealthCarePro - Smart Healthcare Management System

A frontend-only React.js application for managing healthcare appointments. Built as an academic project with mock data and localStorage persistence.

## Features

### Patient Portal
- Login and Registration
- Patient Dashboard with stats and profile
- Browse and search doctors
- Filter doctors by specialization
- View doctor details (name, specialization, experience, ratings, reviews, available dates & time slots)
- Book appointments
- Appointment confirmation page
- View and cancel appointments

### Doctor Portal
- Doctor Login
- Doctor Dashboard with today's schedule
- View all appointments
- Update appointment status (Booked → Confirmed → Completed / Cancelled)

## Tech Stack

- **React.js** (Vite)
- **React Router** for navigation
- **localStorage** for data persistence
- Mock data in JavaScript files (no backend/API)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Demo Credentials

### Patient Login
- Email: `patient@email.com`
- Password: `password123`

### Doctor Login
- Email: `dr.smith@hospital.com`
- Password: `doctor123`

(All doctors use password: `doctor123`)

## Project Structure

```
src/
├── components/
│   ├── appointments/     # Appointment-related components
│   ├── common/           # Reusable UI components (Button, Input, Card, etc.)
│   ├── doctors/          # Doctor-related components
│   └── layout/           # Header, Footer
├── context/
│   ├── AuthContext.jsx       # Authentication state
│   └── AppointmentContext.jsx # Appointments management
├── data/
│   ├── doctors.js        # Sample doctor data
│   ├── patients.js       # Sample patient data
│   ├── appointments.js   # Sample appointments
│   └── specializations.js
├── pages/
│   ├── patient/          # Patient pages
│   ├── doctor/           # Doctor pages
│   └── Home.jsx
├── utils/
│   └── storage.js        # localStorage helpers
├── App.jsx               # Routes
└── main.jsx              # Entry point
```

## Appointment Status Flow

1. **Booked** - Patient books an appointment
2. **Confirmed** - Doctor confirms the appointment
3. **Completed** - Doctor marks visit as completed
4. **Cancelled** - Patient or doctor cancels

## Note

This is a **frontend-only** project. No Django, Node.js backend, MySQL, or API calls are used. All data is stored in localStorage for demonstration purposes.
