"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, User, Plus, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Appointment, APPOINTMENT_STATUS_COLORS, APPOINTMENT_TYPES, DOCTORS } from "@/constants";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function AppointmentCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    doctorId: "",
    type: "checkup",
    date: "",
    time: "09:00",
    notes: "",
  });

  // Initialize with mock data from constants
  useEffect(() => {
    // In a real app, this would be a fetch
    const today = new Date();
    const mockAppointments: Appointment[] = [
      {
        id: "1",
        patientName: "John Smith",
        patientId: "P001",
        doctorId: "D1",
        type: "checkup",
        date: today.toISOString().split("T")[0],
        time: "09:30",
        duration: 30,
        status: "confirmed",
        notes: "Annual physical examination",
      },
      {
        id: "2",
        patientName: "Maria Garcia",
        patientId: "P002",
        doctorId: "D2",
        type: "consultation",
        date: today.toISOString().split("T")[0],
        time: "11:00",
        duration: 45,
        status: "confirmed",
        notes: "Follow-up for hypertension",
      },
      {
        id: "3",
        patientName: "Robert Chen",
        patientId: "P003",
        doctorId: "D3",
        type: "surgery",
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString().split("T")[0],
        time: "14:00",
        duration: 120,
        status: "scheduled",
        notes: "Knee arthroscopy",
      },
      {
        id: "4",
        patientName: "Sarah Johnson",
        patientId: "P004",
        doctorId: "D1",
        type: "emergency",
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1).toISOString().split("T")[0],
        time: "16:30",
        duration: 60,
        status: "completed",
        notes: "Acute abdominal pain",
      },
    ];
    setAppointments(mockAppointments);
  }, []);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }

  const getAppointmentsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return appointments.filter((apt) => apt.date === dateStr);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleNewAppointmentChange = (field: string, value: string) => {
    setNewAppointment((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateAppointment = () => {
    if (!newAppointment.patientName || !newAppointment.doctorId || !newAppointment.date) {
      alert("Please fill in required fields");
      return;
    }

    const newApt: Appointment = {
      id: (appointments.length + 1).toString(),
      patientName: newAppointment.patientName,
      patientId: `P${String(appointments.length + 1).padStart(3, "0")}`,
      doctorId: newAppointment.doctorId,
      type: newAppointment.type as Appointment["type"],
      date: newAppointment.date,
      time: newAppointment.time,
      duration: 30,
      status: "scheduled",
      notes: newAppointment.notes,
    };

    setAppointments([...appointments, newApt]);
    setNewAppointment({
      patientName: "",
      doctorId: "",
      type: "checkup",
      date: "",
      time: "09:00",
      notes: "",
    });
    setIsDialogOpen(false);
  };

  const getDoctorName = (id: string) => {
    const doc = DOCTORS.find((d) => d.id === id);
    return doc ? doc.name : "Unknown";
  };

  const selectedDateAppointments = selectedDate ? getAppointmentsForDate(selectedDate) : [];

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl text-slate-800">Appointment Calendar</CardTitle>
            <CardDescription className="text-slate-500">
              Schedule and manage patient appointments
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  New Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Schedule New Appointment</DialogTitle>
                  <DialogDescription>
                    Fill in the details to schedule a new patient appointment.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="patientName">Patient Name *</Label>
                    <Input
                      id="patientName"
                      placeholder="Full name"
                      value={newAppointment.patientName}
                      onChange={(e) => handleNewAppointmentChange("patientName", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="doctorId">Doctor *</Label>
                      <Select
                        value={newAppointment.doctorId}
                        onValueChange={(val) => handleNewAppointmentChange("doctorId", val)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select doctor" />
                        </SelectTrigger>
                        <SelectContent>
                          {DOCTORS.map((doc) => (
                            <SelectItem key={doc.id} value={doc.id}>
                              {doc.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Appointment Type</Label>
                      <Select
                        value={newAppointment.type}
                        onValueChange={(val) => handleNewAppointmentChange("type", val)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {APPOINTMENT_TYPES.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newAppointment.date}
                        onChange={(e) => handleNewAppointmentChange("date", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newAppointment.time}
                        onChange={(e) => handleNewAppointmentChange("time", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Additional details..."
                      rows={3}
                      value={newAppointment.notes}
                      onChange={(e) => handleNewAppointmentChange("notes", e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateAppointment} className="bg-blue-600 hover:bg-blue-700">
                    Schedule Appointment
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              {/* Calendar Header */}
              <div className="flex items-center justify-between p-4 border-b bg-slate-50">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={prevMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h3 className="text-lg font-semibold text-slate-800">
                    {MONTHS[month]} {year}
                  </h3>
                  <Button variant="ghost" size="icon" onClick={nextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-sm text-slate-500">
                  {selectedDate
                    ? selectedDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Select a date"}
                </div>
              </div>

              {/* Days of Week */}
              <div className="grid grid-cols-7 border-b">
                {DAYS_OF_WEEK.map((day) => (
                  <div
                    key={day}
                    className="py-3 text-center text-sm font-medium text-slate-500 bg-slate-50"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7">
                {days.map((date, idx) => {
                  const isToday =
                    date &&
                    date.getDate() === new Date().getDate() &&
                    date.getMonth() === new Date().getMonth() &&
                    date.getFullYear() === new Date().getFullYear();

                  const isSelected =
                    date &&
                    selectedDate &&
                    date.getDate() === selectedDate.getDate() &&
                    date.getMonth() === selectedDate.getMonth() &&
                    date.getFullYear() === selectedDate.getFullYear();

                  const dayAppointments = date ? getAppointmentsForDate(date) : [];

                  return (
                    <div
                      key={idx}
                      className={cn(
                        "min-h-32 border border-slate-100 p-2 transition-colors",
                        date ? "cursor-pointer hover:bg-blue-50" : "bg-slate-50",
                        isSelected && "bg-blue-50 border-blue-200"
                      )}
                      onClick={() => date && handleDateClick(date)}
                    >
                      {date && (
                        <>
                          <div className="flex justify-between items-center mb-1">
                            <span
                              className={cn(
                                "text-sm font-medium",
                                isToday
                                  ? "bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                  : "text-slate-700",
                                isSelected && !isToday && "text-blue-700"
                              )}
                            >
                              {date.getDate()}
                            </span>
                            {dayAppointments.length > 0 && (
                              <span className="text-xs bg-blue-100 text-blue-700 rounded-full px-2 py-0.5">
                                {dayAppointments.length}
                              </span>
                            )}
                          </div>
                          <div className="space-y-1">
                            {dayAppointments.slice(0, 2).map((apt) => (
                              <div
                                key={apt.id}
                                className="text-xs p-1 rounded truncate"
                                style={{
                                  backgroundColor: APPOINTMENT_STATUS_COLORS[apt.status] + "20",
                                  borderLeft: `3px solid ${APPOINTMENT_STATUS_COLORS[apt.status]}`,
                                }}
                              >
                                <div className="font-medium truncate">{apt.patientName.split(" ")[0]}</div>
                                <div className="text-slate-500 truncate">{apt.time}</div>
                              </div>
                            ))}
                            {dayAppointments.length > 2 && (
                              <div className="text-xs text-slate-500 text-center">
                                +{dayAppointments.length - 2} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Appointment List for Selected Date */}
          <div>
            <div className="sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800">Appointments</h3>
                <Badge variant="outline" className="text-slate-600">
                  {selectedDateAppointments.length} total
                </Badge>
              </div>

              {selectedDate ? (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {selectedDateAppointments.length > 0 ? (
                    selectedDateAppointments.map((apt) => (
                      <Card key={apt.id} className="border-slate-200 shadow-xs">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge
                                  className="text-xs"
                                  style={{
                                    backgroundColor: APPOINTMENT_STATUS_COLORS[apt.status] + "20",
                                    color: APPOINTMENT_STATUS_COLORS[apt.status],
                                    borderColor: APPOINTMENT_STATUS_COLORS[apt.status],
                                  }}
                                >
                                  {apt.status}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {apt.type}
                                </Badge>
                              </div>
                              <h4 className="font-semibold text-slate-800">{apt.patientName}</h4>
                              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-600">
                                <div className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  <span>{getDoctorName(apt.doctorId)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>
                                    {apt.time} ({apt.duration} min)
                                  </span>
                                </div>
                              </div>
                              {apt.notes && (
                                <p className="mt-2 text-sm text-slate-500 line-clamp-2">{apt.notes}</p>
                              )}
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Reschedule</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">Cancel</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8 border border-dashed border-slate-300 rounded-lg">
                      <Calendar className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500">No appointments scheduled for this date.</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3"
                        onClick={() => {
                          if (selectedDate) {
                            const dateStr = selectedDate.toISOString().split("T")[0];
                            setNewAppointment((prev) => ({ ...prev, date: dateStr }));
                            setIsDialogOpen(true);
                          }
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Schedule One
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 border border-dashed border-slate-300 rounded-lg">
                  <Calendar className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">Select a date to view appointments.</p>
                </div>
              )}

              {/* Legend */}
              <div className="mt-6 pt-4 border-t">
                <h4 className="text-sm font-medium text-slate-700 mb-2">Status Legend</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(APPOINTMENT_STATUS_COLORS).map(([status, color]) => (
                    <div key={status} className="flex items-center gap-1">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-xs text-slate-600 capitalize">{status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}