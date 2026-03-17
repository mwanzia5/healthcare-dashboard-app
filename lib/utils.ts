import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes with conditional logic.
 * Uses clsx and tailwind-merge to avoid conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a Date object or ISO string into a readable date string.
 * Example: "Jan 15, 2025"
 */
export function formatDate(dateInput: Date | string): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

/**
 * Formats a Date object or ISO string into a time string.
 * Example: "2:30 PM"
 */
export function formatTime(dateInput: Date | string): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

/**
 * Formats a Date object or ISO string into a combined date and time string.
 * Example: "Jan 15, 2025 at 2:30 PM"
 */
export function formatDateTime(dateInput: Date | string): string {
  return `${formatDate(dateInput)} at ${formatTime(dateInput)}`
}

/**
 * Calculates age from a birth date string (YYYY-MM-DD) or Date object.
 */
export function calculateAge(birthDate: Date | string): number {
  const birth = typeof birthDate === "string" ? new Date(birthDate) : birthDate
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
}

/**
 * Validates an email address format.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validates a phone number (basic North American format).
 * Accepts: (123) 456-7890, 123-456-7890, 1234567890
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
  return phoneRegex.test(phone.replace(/\s/g, ""))
}

/**
 * Calculates BMI (Body Mass Index) from weight (kg) and height (m).
 * Returns a number rounded to one decimal place.
 */
export function calculateBMI(weightKg: number, heightM: number): number {
  if (heightM <= 0) return 0
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10
}

/**
 * Returns a BMI category based on the calculated BMI value.
 */
export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return "Underweight"
  if (bmi < 25) return "Normal"
  if (bmi < 30) return "Overweight"
  return "Obese"
}

/**
 * Truncates text to a specified length and adds an ellipsis if needed.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

/**
 * Generates a random ID string (for mock data or temporary keys).
 */
export function generateId(length: number = 8): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Safely parses a JSON string, returning a fallback value on error.
 */
export function safeParseJSON<T>(jsonString: string, fallback: T): T {
  try {
    return JSON.parse(jsonString) as T
  } catch {
    return fallback
  }
}

/**
 * Converts a string to a URL‑friendly slug.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

/**
 * Formats a number as a currency string (USD).
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

/**
 * Returns a color class based on a status string.
 * Used for badges, alerts, and status indicators.
 */
export function getStatusColorClass(status: string): string {
  switch (status.toLowerCase()) {
    case "active":
    case "stable":
    case "completed":
    case "success":
      return "bg-green-100 text-green-800 border-green-200"
    case "pending":
    case "scheduled":
    case "warning":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "critical":
    case "cancelled":
    case "error":
      return "bg-red-100 text-red-800 border-red-200"
    case "inactive":
    case "upcoming":
    case "info":
      return "bg-blue-100 text-blue-800 border-blue-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}