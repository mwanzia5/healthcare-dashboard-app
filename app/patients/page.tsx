"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, UserPlus, Download, MoreVertical } from "lucide-react";
import { DataTable } from "@/components/ui/DataTable";
import { VitalsBadge } from "@/components/ui/VitalsBadge";
import { MedicalHistoryModal } from "@/components/sections/MedicalHistoryModal";
import { PATIENTS, PATIENT_STATUS_OPTIONS, PATIENT_STATUS_COLORS } from "@/constants";
import { Patient, PatientStatus } from "@/types";
import { cn } from "@/lib/utils";

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<PatientStatus | "all">("all");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPatients = useMemo(() => {
    return PATIENTS.filter((patient) => {
      const matchesSearch =
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || patient.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const handleViewMedicalHistory = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const columns = [
    {
      header: "Patient",
      accessorKey: "name",
      cell: ({ row }: { row: { original: Patient } }) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
            {row.original.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-gray-900">{row.original.name}</p>
            <p className="text-sm text-gray-500">ID: {row.original.id}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Contact",
      accessorKey: "email",
      cell: ({ row }: { row: { original: Patient } }) => (
        <div>
          <p className="text-gray-900">{row.original.email}</p>
          <p className="text-sm text-gray-500">{row.original.phone}</p>
        </div>
      ),
    },
    {
      header: "Vitals Summary",
      accessorKey: "vitals",
      cell: ({ row }: { row: { original: Patient } }) => <VitalsBadge vitals={row.original.vitals} />,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: { row: { original: Patient } }) => (
        <Badge
          className={cn(
            "font-medium",
            PATIENT_STATUS_COLORS[row.original.status]?.bg,
            PATIENT_STATUS_COLORS[row.original.status]?.text
          )}
        >
          {PATIENT_STATUS_COLORS[row.original.status]?.label || row.original.status}
        </Badge>
      ),
    },
    {
      header: "Last Visit",
      accessorKey: "lastVisit",
      cell: ({ row }: { row: { original: Patient } }) => (
        <div>
          <p className="text-gray-900">{row.original.lastVisit}</p>
          <p className="text-sm text-gray-500">Dr. {row.original.primaryPhysician}</p>
        </div>
      ),
    },
    {
      header: "Actions",
      cell: ({ row }: { row: { original: Patient } }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleViewMedicalHistory(row.original)}
          >
            View History
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
            <p className="text-gray-600 mt-2">
              Manage patient records, view vitals, and access medical history.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
              <UserPlus className="h-4 w-4" />
              Add New Patient
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Patients ({PATIENTS.length})</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="critical">Critical</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Patient Directory</CardTitle>
                    <CardDescription>
                      Search, filter, and manage all patient records in the system.
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-none">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search by name, ID, or email..."
                        className="pl-10 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as PatientStatus | "all")}>
                      <SelectTrigger className="w-[180px] gap-2">
                        <Filter className="h-4 w-4" />
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        {PATIENT_STATUS_OPTIONS.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={columns}
                  data={filteredPatients}
                  emptyMessage="No patients found matching your search criteria."
                />
                <div className="mt-6 text-sm text-gray-500 flex justify-between items-center">
                  <p>Showing {filteredPatients.length} of {PATIENTS.length} patients</p>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="ghost" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>Active Patients</CardTitle>
                <CardDescription>Patients currently under active care and monitoring.</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={columns}
                  data={filteredPatients.filter(p => p.status === "active")}
                  emptyMessage="No active patients found."
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inactive">
            <Card>
              <CardHeader>
                <CardTitle>Inactive Patients</CardTitle>
                <CardDescription>Patients not currently receiving active treatment.</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={columns}
                  data={filteredPatients.filter(p => p.status === "inactive")}
                  emptyMessage="No inactive patients found."
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="critical">
            <Card>
              <CardHeader>
                <CardTitle>Critical Patients</CardTitle>
                <CardDescription>Patients requiring immediate attention and monitoring.</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={columns}
                  data={filteredPatients.filter(p => p.status === "critical")}
                  emptyMessage="No critical patients found."
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-2">
                <UserPlus className="h-4 w-4" />
                Schedule New Appointment
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Download className="h-4 w-4" />
                Generate Health Report
              </Button>
              <Link href="/calendar">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Filter className="h-4 w-4" />
                  View Today&apos;s Appointments
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Data Privacy & Compliance</CardTitle>
              <CardDescription>
                All patient data is encrypted and accessed under strict HIPAA guidelines.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">HIPAA Compliant</p>
                  <p className="text-sm text-gray-600">
                    This system maintains full compliance with healthcare data privacy regulations.
                    Audit logs are maintained for all access.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedPatient && (
        <MedicalHistoryModal
          patient={selectedPatient}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPatient(null);
          }}
        />
      )}
    </div>
  );
}