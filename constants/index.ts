// Color palette for medical-blue theme
export const COLORS = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  secondary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  danger: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
} as const;

// Privacy and security labels
export const PRIVACY_LABELS = {
  encrypted: 'Encrypted',
  hipaaCompliant: 'HIPAA Compliant',
  secureTransmission: 'Secure Transmission',
  accessRestricted: 'Access Restricted',
  auditLogged: 'Audit Logged',
  dataAnonymized: 'Data Anonymized',
} as const;

export const PRIVACY_STATUS_COLORS = {
  encrypted: COLORS.success[500],
  hipaaCompliant: COLORS.success[600],
  secureTransmission: COLORS.secondary[500],
  accessRestricted: COLORS.warning[500],
  auditLogged: COLORS.neutral[500],
  dataAnonymized: COLORS.primary[500],
} as const;

export const PRIVACY_STATUS_ICONS = {
  encrypted: 'Lock',
  hipaaCompliant: 'ShieldCheck',
  secureTransmission: 'Shield',
  accessRestricted: 'UserX',
  auditLogged: 'FileText',
  dataAnonymized: 'EyeOff',
} as const;

// Patient status constants
export const PATIENT_STATUS = {
  active: 'Active',
  inactive: 'Inactive',
  discharged: 'Discharged',
  critical: 'Critical',
  stable: 'Stable',
} as const;

export const PATIENT_STATUS_COLORS = {
  active: COLORS.success[500],
  inactive: COLORS.neutral[500],
  discharged: COLORS.neutral[400],
  critical: COLORS.danger[500],
  stable: COLORS.secondary[500],
} as const;

// Appointment status constants
export const APPOINTMENT_STATUS = {
  scheduled: 'Scheduled',
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',
  completed: 'Completed',
  noShow: 'No Show',
} as const;

export const APPOINTMENT_STATUS_COLORS = {
  scheduled: COLORS.secondary[500],
  confirmed: COLORS.success[500],
  cancelled: COLORS.danger[500],
  completed: COLORS.neutral[500],
  noShow: COLORS.warning[500],
} as const;

// Vitals ranges and thresholds
export const VITALS_RANGES = {
  bloodPressure: {
    systolic: { min: 90, max: 120 },
    diastolic: { min: 60, max: 80 },
  },
  heartRate: { min: 60, max: 100 },
  temperature: { min: 36.1, max: 37.2 }, // Celsius
  oxygenSaturation: { min: 95, max: 100 }, // Percentage
  respiratoryRate: { min: 12, max: 20 },
} as const;

export const VITALS_STATUS = {
  normal: 'Normal',
  elevated: 'Elevated',
  high: 'High',
  low: 'Low',
  critical: 'Critical',
} as const;

export const VITALS_STATUS_COLORS = {
  normal: COLORS.success[500],
  elevated: COLORS.warning[500],
  high: COLORS.danger[500],
  low: COLORS.warning[600],
  critical: COLORS.danger[700],
} as const;

// Mock data constants for patient records
export const MOCK_PATIENTS = [
  {
    id: 'PT-1001',
    name: 'John Smith',
    age: 45,
    gender: 'Male',
    status: PATIENT_STATUS.active,
    lastVisit: '2024-03-15',
    primaryPhysician: 'Dr. Sarah Chen',
    vitals: {
      bloodPressure: '120/80',
      heartRate: 72,
      temperature: 36.8,
      oxygenSaturation: 98,
      respiratoryRate: 16,
    },
  },
  {
    id: 'PT-1002',
    name: 'Maria Garcia',
    age: 62,
    gender: 'Female',
    status: PATIENT_STATUS.critical,
    lastVisit: '2024-03-14',
    primaryPhysician: 'Dr. James Wilson',
    vitals: {
      bloodPressure: '145/95',
      heartRate: 110,
      temperature: 38.2,
      oxygenSaturation: 92,
      respiratoryRate: 24,
    },
  },
  {
    id: 'PT-1003',
    name: 'Robert Johnson',
    age: 38,
    gender: 'Male',
    status: PATIENT_STATUS.stable,
    lastVisit: '2024-03-12',
    primaryPhysician: 'Dr. Sarah Chen',
    vitals: {
      bloodPressure: '118/78',
      heartRate: 68,
      temperature: 36.5,
      oxygenSaturation: 99,
      respiratoryRate: 14,
    },
  },
  {
    id: 'PT-1004',
    name: 'Lisa Wong',
    age: 29,
    gender: 'Female',
    status: PATIENT_STATUS.active,
    lastVisit: '2024-03-10',
    primaryPhysician: 'Dr. Michael Brown',
    vitals: {
      bloodPressure: '110/70',
      heartRate: 76,
      temperature: 36.9,
      oxygenSaturation: 97,
      respiratoryRate: 18,
    },
  },
  {
    id: 'PT-1005',
    name: 'David Miller',
    age: 71,
    gender: 'Male',
    status: PATIENT_STATUS.stable,
    lastVisit: '2024-03-08',
    primaryPhysician: 'Dr. James Wilson',
    vitals: {
      bloodPressure: '130/85',
      heartRate: 82,
      temperature: 37.0,
      oxygenSaturation: 96,
      respiratoryRate: 20,
    },
  },
] as const;

// Mock data for appointments
export const MOCK_APPOINTMENTS = [
  {
    id: 'APT-2001',
    patientId: 'PT-1001',
    patientName: 'John Smith',
    date: '2024-03-18',
    time: '09:30',
    duration: 30,
    type: 'Follow-up',
    physician: 'Dr. Sarah Chen',
    status: APPOINTMENT_STATUS.confirmed,
    notes: 'Routine checkup',
  },
  {
    id: 'APT-2002',
    patientId: 'PT-1002',
    patientName: 'Maria Garcia',
    date: '2024-03-18',
    time: '11:00',
    duration: 60,
    type: 'Consultation',
    physician: 'Dr. James Wilson',
    status: APPOINTMENT_STATUS.scheduled,
    notes: 'Cardiac evaluation',
  },
  {
    id: 'APT-2003',
    patientId: 'PT-1003',
    patientName: 'Robert Johnson',
    date: '2024-03-19',
    time: '14:15',
    duration: 45,
    type: 'Procedure',
    physician: 'Dr. Sarah Chen',
    status: APPOINTMENT_STATUS.scheduled,
    notes: 'Minor surgery',
  },
  {
    id: 'APT-2004',
    patientId: 'PT-1004',
    patientName: 'Lisa Wong',
    date: '2024-03-19',
    time: '10:00',
    duration: 30,
    type: 'Follow-up',
    physician: 'Dr. Michael Brown',
    status: APPOINTMENT_STATUS.confirmed,
    notes: 'Post-op check',
  },
  {
    id: 'APT-2005',
    patientId: 'PT-1005',
    patientName: 'David Miller',
    date: '2024-03-20',
    time: '13:30',
    duration: 60,
    type: 'Consultation',
    physician: 'Dr. James Wilson',
    status: APPOINTMENT_STATUS.scheduled,
    notes: 'Medication review',
  },
] as const;

// Dashboard stats
export const DASHBOARD_STATS = [
  {
    label: 'Total Patients',
    value: '1,247',
    change: '+12%',
    trend: 'up',
    icon: 'Users',
    color: COLORS.primary[500],
  },
  {
    label: 'Upcoming Appointments',
    value: '48',
    change: '+3',
    trend: 'up',
    icon: 'Calendar',
    color: COLORS.secondary[500],
  },
  {
    label: 'Critical Cases',
    value: '7',
    change: '-2',
    trend: 'down',
    icon: 'AlertCircle',
    color: COLORS.danger[500],
  },
  {
    label: 'Avg. Wait Time',
    value: '12 min',
    change: '-4 min',
    trend: 'down',
    icon: 'Clock',
    color: COLORS.success[500],
  },
] as const;

// Medical history categories
export const MEDICAL_HISTORY_CATEGORIES = [
  'Allergies',
  'Medications',
  'Chronic Conditions',
  'Surgeries',
  'Immunizations',
  'Family History',
  'Lifestyle',
  'Lab Results',
] as const;

// Site configuration
export const SITE_CONFIG = {
  name: 'MediCare Dashboard',
  description: 'Secure healthcare dashboard for managing patient records and appointments',
  url: 'https://dashboard.medical.example.com',
  supportEmail: 'support@medical.example.com',
  privacyPolicyUrl: '/privacy',
  termsOfServiceUrl: '/terms',
} as const;

// Navigation items for sidebar
export const SIDEBAR_NAV_ITEMS = [
  {
    title: 'Dashboard',
    href: '/',
    icon: 'LayoutDashboard',
  },
  {
    title: 'Patients',
    href: '/patients',
    icon: 'Users',
  },
  {
    title: 'Appointments',
    href: '/calendar',
    icon: 'Calendar',
  },
  {
    title: 'Medical Records',
    href: '/records',
    icon: 'FileText',
  },
  {
    title: 'Prescriptions',
    href: '/prescriptions',
    icon: 'Pill',
  },
  {
    title: 'Lab Results',
    href: '/lab',
    icon: 'Microscope',
  },
  {
    title: 'Billing',
    href: '/billing',
    icon: 'CreditCard',
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: 'BarChart',
  },
] as const;

// User roles and permissions
export const USER_ROLES = {
  admin: 'Administrator',
  physician: 'Physician',
  nurse: 'Nurse',
  receptionist: 'Receptionist',
  labTechnician: 'Lab Technician',
} as const;

// Date and time formats
export const DATE_FORMATS = {
  short: 'MMM dd, yyyy',
  long: 'EEEE, MMMM dd, yyyy',
  time: 'hh:mm a',
  dateTime: 'MMM dd, yyyy hh:mm a',
} as const;