"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, Clock, User, Stethoscope, Plus, Filter, Search, MoreVertical, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { APPOINTMENT_STATUS, APPOINTMENT_TYPES, DOCTORS, APPOINTMENTS_MOCK } from "@/constants";
import { Appointment, AppointmentStatus } from "@/types";
import { formatDate, cn } from "@/lib/utils";

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [view, setView] = useState<"day" | "week" | "month">("week");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | "all">("all");
  const [doctorFilter, setDoctorFilter] = useState<string>("all");

  const filteredAppointments = APPOINTMENTS_MOCK.filter((apt) => {
    const matchesSearch = apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || apt.status === statusFilter;
    const matchesDoctor = doctorFilter === "all" || apt.doctor === doctorFilter;
    return matchesSearch && matchesStatus && matchesDoctor;
  });

  const appointmentsForSelectedDate = filteredAppointments.filter((apt) => {
    if (!date) return false;
    const aptDate = new Date(apt.dateTime);
    return aptDate.toDateString() === date.toDateString();
  });

  const getStatusIcon = (status: AppointmentStatus) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    const firstApt = filteredAppointments.find((apt) => {
      if (!selectedDate) return false;
      const aptDate = new Date(apt.dateTime);
      return aptDate.toDateString() === selectedDate.toDateString();
    });
    setSelectedAppointment(firstApt || null);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Appointment Calendar</h1>
          <p className="text-slate-600 mt-2">Manage, schedule, and view all patient appointments in one place.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Calendar & Filters */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle>Schedule</CardTitle>
                  <div className="flex items-center gap-2">
                    <Tabs value={view} onValueChange={(v) => setView(v as "day" | "week" | "month")} className="w-full sm:w-auto">
                      <TabsList>
                        <TabsTrigger value="day">Day</TabsTrigger>
                        <TabsTrigger value="week">Week</TabsTrigger>
                        <TabsTrigger value="month">Month</TabsTrigger>
                      </TabsList>
                    </Tabs>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          <Plus className="h-4 w-4 mr-2" />
                          New Appointment
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Schedule New Appointment</DialogTitle>
                          <DialogDescription>
                            Fill in the details to book a new patient appointment.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="patient">Patient Name</Label>
                              <Input id="patient" placeholder="Full name" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="doctor">Doctor</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select doctor" />
                                </SelectTrigger>
                                <SelectContent>
                                  {DOCTORS.map((doc) => (
                                    <SelectItem key={doc.id} value={doc.name}>
                                      {doc.name} ({doc.specialty})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="date">Date</Label>
                              <Input id="date" type="date" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="time">Time</Label>
                              <Input id="time" type="time" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="type">Appointment Type</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                {APPOINTMENT_TYPES.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea id="notes" placeholder="Additional notes or symptoms..." rows={3} />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                            Schedule Appointment
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  className="rounded-md border"
                  classNames={{
                    day_selected: "bg-blue-600 text-white hover:bg-blue-700",
                    day_today: "bg-blue-100 text-blue-800 font-bold",
                  }}
                />
              </CardContent>
            </Card>

            {/* Appointment List for Selected Date */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Appointments for {date ? formatDate(date, "full") : "selected date"}
                </CardTitle>
                <CardDescription>
                  {appointmentsForSelectedDate.length} appointment(s) scheduled
                </CardDescription>
              </CardHeader>
              <CardContent>
                {appointmentsForSelectedDate.length > 0 ? (
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {appointmentsForSelectedDate.map((apt) => (
                        <Card
                          key={apt.id}
                          className={cn(
                            "cursor-pointer transition-all hover:shadow-md",
                            selectedAppointment?.id === apt.id && "ring-2 ring-blue-500"
                          )}
                          onClick={() => setSelectedAppointment(apt)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Badge
                                    variant="outline"
                                    className={cn(
                                      "flex items-center gap-1",
                                      apt.status === "confirmed" && "border-green-200 bg-green-50 text-green-800",
                                      apt.status === "cancelled" && "border-red-200 bg-red-50 text-red-800",
                                      apt.status === "pending" && "border-amber-200 bg-amber-50 text-amber-800"
                                    )}
                                  >
                                    {getStatusIcon(apt.status)}
                                    {APPOINTMENT_STATUS[apt.status]}
                                  </Badge>
                                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                                    {apt.type}
                                  </Badge>
                                </div>
                                <h4 className="font-semibold text-slate-800">{apt.patientName}</h4>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                                  <span className="flex items-center gap-1">
                                    <Stethoscope className="h-3.5 w-3.5" />
                                    {apt.doctor}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3.5 w-3.5" />
                                    {new Date(apt.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <User className="h-3.5 w-3.5" />
                                    Room {apt.room}
                                  </span>
                                </div>
                              </div>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="text-center py-12 text-slate-500">
                    <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                    <p className="font-medium">No appointments scheduled for this date.</p>
                    <p className="text-sm mt-1">Try selecting a different date or schedule a new appointment.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Filters & Details */}
          <div className="space-y-6">
            {/* Filters Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="search"
                      placeholder="Patient, doctor, type..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as AppointmentStatus | "all")}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      {Object.entries(APPOINTMENT_STATUS).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor">Doctor</Label>
                  <Select value={doctorFilter} onValueChange={setDoctorFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Doctors</SelectItem>
                      {DOCTORS.map((doc) => (
                        <SelectItem key={doc.id} value={doc.name}>
                          {doc.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("all");
                    setDoctorFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>

            {/* Selected Appointment Details */}
            <Card>
              <CardHeader>
                <CardTitle>Appointment Details</CardTitle>
                <CardDescription>
                  {selectedAppointment ? "View and manage selected appointment" : "Select an appointment to view details"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedAppointment ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge
                        className={cn(
                          "text-sm",
                          selectedAppointment.status === "confirmed" && "bg-green-100 text-green-800 border-green-200",
                          selectedAppointment.status === "cancelled" && "bg-red-100 text-red-800 border-red-200",
                          selectedAppointment.status === "pending" && "bg-amber-100 text-amber-800 border-amber-200"
                        )}
                      >
                        {APPOINTMENT_STATUS[selectedAppointment.status]}
                      </Badge>
                      <span className="text-sm text-slate-500">
                        {new Date(selectedAppointment.dateTime).toLocaleDateString()}
                      </span>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-slate-500">Patient</p>
                        <p className="font-semibold text-slate-800">{selectedAppointment.patientName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-500">Doctor</p>
                        <p className="font-semibold text-slate-800">{selectedAppointment.doctor}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-500">Type</p>
                        <p className="font-semibold text-slate-800">{selectedAppointment.type}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-500">Time</p>
                        <p className="font-semibold text-slate-800">
                          {new Date(selectedAppointment.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-500">Room</p>
                        <p className="font-semibold text-slate-800">Room {selectedAppointment.room}</p>
                      </div>
                      {selectedAppointment.notes && (
                        <div>
                          <p className="text-sm font-medium text-slate-500">Notes</p>
                          <p className="text-sm text-slate-700 mt-1">{selectedAppointment.notes}</p>
                        </div>
                      )}
                    </div>
                    <Separator />
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" className="flex-1" onClick={() => setSelectedAppointment(null)}>
                        Clear
                      </Button>
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                        Manage
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <Clock className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                    <p className="font-medium">No appointment selected</p>
                    <p className="text-sm mt-1">Click on an appointment from the list to view details here.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">Today</p>
                      <p className="text-2xl font-bold text-slate-800">
                        {APPOINTMENTS_MOCK.filter(a => new Date(a.dateTime).toDateString() === new Date().toDateString()).length}
                      </p>
                    </div>
                    <div className="rounded-full bg-blue-100 p-3">
                      <CalendarIcon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">This Week</p>
                      <p className="text-2xl font-bold text-slate-800">
                        {APPOINTMENTS_MOCK.filter(a => {
                          const now = new Date();
                          const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
                          const endOfWeek = new Date(now.setDate(now.getDate() + 6));
                          const aptDate = new Date(a.dateTime);
                          return aptDate >= startOfWeek && aptDate <= endOfWeek;
                        }).length}
                      </p>
                    </div>
                    <div className="rounded-full bg-green-100 p-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}