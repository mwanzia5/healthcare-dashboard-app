"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import StatsOverview from "@/components/sections/StatsOverview";
import PatientList from "@/components/sections/PatientList";
import AppointmentCalendar from "@/components/sections/AppointmentCalendar";
import PrivacyVisuals from "@/components/sections/PrivacyVisuals";
import MedicalHistoryModal from "@/components/sections/MedicalHistoryModal";
import { Patient } from "@/types";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewMedicalHistory = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="pt-16 lg:pt-20 lg:pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Healthcare Dashboard
            </h1>
            <p className="text-slate-600 mt-2">
              Manage patient records, appointments, and ensure data privacy.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">
              Overview
            </h2>
            <StatsOverview />
          </div>

          {/* Privacy Visuals */}
          <div className="mb-10">
            <PrivacyVisuals />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Patient List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-slate-800">
                    Patient List
                  </h2>
                  <span className="text-sm text-slate-500">
                    Updated today
                  </span>
                </div>
                <PatientList onViewHistory={handleViewMedicalHistory} />
              </div>
            </div>

            {/* Appointment Calendar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                <h2 className="text-2xl font-semibold text-slate-800 mb-6">
                  Appointment Calendar
                </h2>
                <AppointmentCalendar />
              </div>
            </div>
          </div>

          {/* Call to Action / Notes */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6 mb-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-800">
                  Need to schedule a new appointment?
                </h3>
                <p className="text-slate-600 mt-1">
                  Use the calendar to add new appointments or manage existing ones.
                </p>
              </div>
              <button className="mt-4 md:mt-0 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 ease-in-out shadow-sm hover:shadow">
                + New Appointment
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Medical History Modal */}
      {selectedPatient && (
        <MedicalHistoryModal
          patient={selectedPatient}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}