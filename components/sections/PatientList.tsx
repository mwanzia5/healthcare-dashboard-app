"use client";

import { useState, useMemo } from "react";
import { Search, MoreVertical, Eye, FileText, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VitalsBadge } from "@/components/ui/VitalsBadge";
import { cn } from "@/lib/utils";
import { Patient, PatientStatus, Vitals } from "@/types";
import { PATIENTS_MOCK_DATA, PATIENT_STATUS_COLORS } from "@/constants";

export function PatientList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<PatientStatus | "all">("all");

  const filteredPatients = useMemo(() => {
    return PATIENTS_MOCK_DATA.filter((patient) => {
      const matchesSearch =
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.condition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedStatus === "all" || patient.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, selectedStatus]);

  const handleViewDetails = (patient: Patient) => {
    // In a real app, this would open the medical history modal
    console.log("View details for:", patient.id);
    alert(`Opening medical history for ${patient.name}. This would trigger a modal in a full implementation.`);
  };

  const handleScheduleAppointment = (patient: Patient) => {
    console.log("Schedule appointment for:", patient.id);
    alert(`Redirecting to calendar to schedule an appointment for ${patient.name}.`);
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-xl font-semibold text-slate-800">Patient Records</CardTitle>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search patients by name, ID, or condition..."
                className="pl-10 w-full sm:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600 whitespace-nowrap">Filter by status:</span>
              <div className="flex flex-wrap gap-1">
                <Button
                  variant={selectedStatus === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStatus("all")}
                  className="h-8"
                >
                  All
                </Button>
                {Object.entries(PATIENT_STATUS_COLORS).map(([status, color]) => (
                  <Button
                    key={status}
                    variant={selectedStatus === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedStatus(status as PatientStatus)}
                    className={cn("h-8", selectedStatus === status && color.bg)}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead className="font-semibold text-slate-700">Patient</TableHead>
                <TableHead className="font-semibold text-slate-700">ID</TableHead>
                <TableHead className="font-semibold text-slate-700">Condition</TableHead>
                <TableHead className="font-semibold text-slate-700">Vitals Summary</TableHead>
                <TableHead className="font-semibold text-slate-700">Last Visit</TableHead>
                <TableHead className="font-semibold text-slate-700">Status</TableHead>
                <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <TableRow key={patient.id} className="hover:bg-blue-50/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                          {patient.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{patient.name}</p>
                          <p className="text-sm text-slate-500">{patient.age} years • {patient.gender}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm text-slate-600">{patient.id}</TableCell>
                    <TableCell>
                      <div className="max-w-[180px]">
                        <p className="text-slate-800">{patient.condition}</p>
                        <p className="text-xs text-slate-500 truncate">{patient.notes}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <VitalsBadge vitals={patient.vitals} />
                    </TableCell>
                    <TableCell className="text-slate-700">{patient.lastVisit}</TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          "font-medium",
                          PATIENT_STATUS_COLORS[patient.status].bg,
                          PATIENT_STATUS_COLORS[patient.status].text
                        )}
                        variant="outline"
                      >
                        {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => handleViewDetails(patient)}
                          aria-label="View medical history"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => handleScheduleAppointment(patient)}
                          aria-label="Schedule appointment"
                        >
                          <Calendar className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              View Full Record
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              Add Clinical Note
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-slate-500">
                    No patients found matching your search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between mt-4 text-sm text-slate-600">
          <p>
            Showing <span className="font-semibold">{filteredPatients.length}</span> of{" "}
            <span className="font-semibold">{PATIENTS_MOCK_DATA.length}</span> patients
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}