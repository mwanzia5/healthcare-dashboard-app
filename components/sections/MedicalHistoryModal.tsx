"use client";

import { useState } from "react";
import { X, FileText, Calendar, AlertCircle, Pill, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MedicalHistory, Patient } from "@/types";
import { formatDate } from "@/lib/utils";
import { ALLERGIES, CONDITIONS, MEDICATIONS, VACCINATIONS } from "@/constants";

interface MedicalHistoryModalProps {
  patient: Patient;
  isOpen: boolean;
  onClose: () => void;
}

export function MedicalHistoryModal({ patient, isOpen, onClose }: MedicalHistoryModalProps) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!isOpen) return null;

  const medicalHistory: MedicalHistory = {
    patientId: patient.id,
    lastUpdated: "2024-01-15",
    conditions: CONDITIONS,
    allergies: ALLERGIES,
    medications: MEDICATIONS,
    vaccinations: VACCINATIONS,
    notes: "Patient shows good response to current treatment plan. Regular monitoring recommended.",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl mx-4 max-h-[90vh] overflow-hidden rounded-xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Medical History</h2>
            <p className="text-slate-600">
              {patient.name} • {patient.id} • {patient.age} years • {patient.gender}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <ScrollArea className="h-[calc(90vh-8rem)]">
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="conditions" className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Conditions
                </TabsTrigger>
                <TabsTrigger value="medications" className="flex items-center gap-2">
                  <Pill className="h-4 w-4" />
                  Medications
                </TabsTrigger>
                <TabsTrigger value="allergies" className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Allergies
                </TabsTrigger>
                <TabsTrigger value="timeline" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Timeline
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Activity className="h-5 w-5 text-blue-600" />
                        Current Vitals
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Blood Pressure</span>
                        <Badge variant={patient.vitals.bloodPressure === "120/80" ? "default" : "destructive"}>
                          {patient.vitals.bloodPressure} mmHg
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Heart Rate</span>
                        <Badge variant={patient.vitals.heartRate <= 100 ? "default" : "destructive"}>
                          {patient.vitals.heartRate} bpm
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Temperature</span>
                        <Badge variant={patient.vitals.temperature <= 37.5 ? "default" : "destructive"}>
                          {patient.vitals.temperature} °C
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Active Conditions</CardTitle>
                      <CardDescription>{medicalHistory.conditions.length} recorded</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {medicalHistory.conditions.slice(0, 3).map((condition) => (
                          <div key={condition.id} className="flex items-center justify-between">
                            <span className="text-sm">{condition.name}</span>
                            <Badge variant={condition.severity === "High" ? "destructive" : "secondary"}>
                              {condition.severity}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Recent Medications</CardTitle>
                      <CardDescription>{medicalHistory.medications.length} active</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {medicalHistory.medications.slice(0, 3).map((med) => (
                          <div key={med.id} className="flex items-center justify-between">
                            <span className="text-sm">{med.name}</span>
                            <Badge variant="outline">{med.dosage}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Clinical Notes</CardTitle>
                    <CardDescription>Last updated: {formatDate(medicalHistory.lastUpdated)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 whitespace-pre-line">{medicalHistory.notes}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Conditions Tab */}
              <TabsContent value="conditions">
                <Card>
                  <CardHeader>
                    <CardTitle>Medical Conditions</CardTitle>
                    <CardDescription>Diagnosed conditions and their status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {medicalHistory.conditions.map((condition) => (
                        <div key={condition.id} className="rounded-lg border p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-slate-800">{condition.name}</h4>
                              <p className="text-sm text-slate-600 mt-1">{condition.description}</p>
                            </div>
                            <Badge variant={condition.severity === "High" ? "destructive" : "secondary"}>
                              {condition.severity}
                            </Badge>
                          </div>
                          <div className="mt-3 flex items-center gap-4 text-sm text-slate-500">
                            <span>Diagnosed: {formatDate(condition.diagnosedDate)}</span>
                            <span>•</span>
                            <span>Status: {condition.status}</span>
                            <span>•</span>
                            <span>ICD-10: {condition.icd10Code}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Medications Tab */}
              <TabsContent value="medications">
                <Card>
                  <CardHeader>
                    <CardTitle>Medication History</CardTitle>
                    <CardDescription>Current and past prescriptions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {medicalHistory.medications.map((med) => (
                        <div key={med.id} className="rounded-lg border p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-slate-800">{med.name}</h4>
                              <p className="text-sm text-slate-600 mt-1">{med.purpose}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <Badge variant={med.status === "Active" ? "default" : "outline"}>{med.status}</Badge>
                              <span className="text-sm font-medium">{med.dosage}</span>
                            </div>
                          </div>
                          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-500">
                            <div>
                              <span className="font-medium">Frequency:</span> {med.frequency}
                            </div>
                            <div>
                              <span className="font-medium">Route:</span> {med.route}
                            </div>
                            <div>
                              <span className="font-medium">Start Date:</span> {formatDate(med.startDate)}
                            </div>
                            <div>
                              <span className="font-medium">Prescriber:</span> {med.prescriber}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Allergies Tab */}
              <TabsContent value="allergies">
                <Card>
                  <CardHeader>
                    <CardTitle>Allergies & Adverse Reactions</CardTitle>
                    <CardDescription>Recorded allergies and their severity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {medicalHistory.allergies.map((allergy) => (
                        <div key={allergy.id} className="rounded-lg border p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-slate-800">{allergy.substance}</h4>
                              <p className="text-sm text-slate-600 mt-1">{allergy.reaction}</p>
                            </div>
                            <Badge variant={allergy.severity === "Severe" ? "destructive" : "warning"}>
                              {allergy.severity}
                            </Badge>
                          </div>
                          <div className="mt-3 flex items-center gap-4 text-sm text-slate-500">
                            <span>First Observed: {formatDate(allergy.firstObserved)}</span>
                            <span>•</span>
                            <span>Last Reaction: {formatDate(allergy.lastReaction)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Timeline Tab */}
              <TabsContent value="timeline">
                <Card>
                  <CardHeader>
                    <CardTitle>Medical Timeline</CardTitle>
                    <CardDescription>Chronological history of medical events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative space-y-8">
                      {[
                        { date: "2024-01-15", event: "Routine Checkup", type: "Appointment", details: "Vitals normal, medication adjusted" },
                        { date: "2023-11-30", event: "Flu Vaccination", type: "Vaccination", details: "Influenza vaccine administered" },
                        { date: "2023-09-22", event: "Lab Results", type: "Test", details: "Blood work shows improved levels" },
                        { date: "2023-07-10", event: "Medication Change", type: "Prescription", details: "Switched to new antihypertensive" },
                        { date: "2023-05-05", event: "Allergy Test", type: "Test", details: "Confirmed penicillin allergy" },
                      ].map((item, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="h-4 w-4 rounded-full bg-blue-600"></div>
                            {index < 4 && <div className="h-full w-0.5 bg-slate-200 mt-2"></div>}
                          </div>
                          <div className="flex-1 pb-8">
                            <div className="rounded-lg border bg-slate-50 p-4">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-slate-800">{item.event}</h4>
                                <Badge variant="outline">{item.type}</Badge>
                              </div>
                              <p className="text-sm text-slate-600 mt-1">{item.details}</p>
                              <p className="text-xs text-slate-500 mt-2">{formatDate(item.date)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="sticky bottom-0 border-t bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <AlertCircle className="h-4 w-4" />
              <span>Last full review: {formatDate(medicalHistory.lastUpdated)}</span>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Print Summary</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}