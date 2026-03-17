export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO string
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  email: string;
  phone: string;
  address: string;
  emergencyContact: string;
  insuranceProvider: string;
  insuranceId: string;
  primaryPhysician: string;
  lastVisit: string; // ISO string
  status: 'active' | 'inactive' | 'pending';
  profileImage?: string;
}

export interface Vitals {
  patientId: string;
  recordedAt: string; // ISO string
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  heartRate: number;
  temperature: number; // Celsius
  respiratoryRate: number;
  oxygenSaturation: number; // percentage
  weight: number; // kg
  height: number; // cm
  bmi: number;
  notes?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  dateTime: string; // ISO string
  duration: number; // minutes
  type: 'checkup' | 'consultation' | 'surgery' | 'follow-up' | 'emergency';
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  physician: string;
  location: string;
  notes?: string;
}

export interface MedicalHistoryEntry {
  id: string;
  patientId: string;
  date: string; // ISO string
  condition: string;
  diagnosis: string;
  treatment: string;
  physician: string;
  attachments?: string[]; // URLs to documents/images
  isChronic: boolean;
  resolved: boolean;
}

export interface Medication {
  id: string;
  patientId: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string; // ISO string
  endDate?: string; // ISO string
  prescribedBy: string;
  status: 'active' | 'completed' | 'discontinued';
}

export interface Allergy {
  id: string;
  patientId: string;
  allergen: string;
  severity: 'mild' | 'moderate' | 'severe';
  reaction: string;
  firstObserved: string; // ISO string
  notes?: string;
}

export interface LabResult {
  id: string;
  patientId: string;
  testName: string;
  collectedAt: string; // ISO string
  result: string;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'abnormal' | 'critical';
  labName: string;
  orderingPhysician: string;
}

export interface PrivacyAuditLog {
  id: string;
  timestamp: string; // ISO string
  userId: string;
  userName: string;
  action: 'view' | 'edit' | 'export' | 'delete' | 'access';
  resourceType: 'patient' | 'appointment' | 'medical-history' | 'lab-result';
  resourceId: string;
  ipAddress: string;
  location?: string;
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'physician' | 'nurse' | 'receptionist' | 'lab-technician';
  email: string;
  avatar?: string;
  department: string;
  lastActive: string; // ISO string
}

export interface DashboardStat {
  label: string;
  value: number;
  change: number; // percentage
  icon: string; // Lucide icon name
  color: 'blue' | 'green' | 'red' | 'yellow' | 'indigo';
}

export interface NavItem {
  title: string;
  href: string;
  icon: string; // Lucide icon name
  badge?: number;
}

export interface PrivacyVisual {
  title: string;
  description: string;
  icon: string; // Lucide icon name
  status: 'encrypted' | 'compliant' | 'audited' | 'restricted';
  color: 'green' | 'blue' | 'yellow' | 'red';
}