"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Bell, Shield, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { NAV_LINKS, USER_PROFILE, PRIVACY_STATUS } from "@/constants";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [privacyActive, setPrivacyActive] = useState(PRIVACY_STATUS.active);
  const [notificationCount, setNotificationCount] = useState(3);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const togglePrivacy = () => {
    setPrivacyActive((prev) => !prev);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md border-slate-200 shadow-sm"
          : "bg-white border-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-8 w-8">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500" />
                <div className="absolute inset-1 rounded-md bg-white flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-blue-600" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-800">
                HealthSync
                <span className="text-blue-600"> Dashboard</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Privacy Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePrivacy}
              className={cn(
                "hidden sm:flex items-center gap-2",
                privacyActive
                  ? "text-green-700 hover:text-green-800 hover:bg-green-50"
                  : "text-amber-700 hover:text-amber-800 hover:bg-amber-50"
              )}
            >
              <Shield className="h-4 w-4" />
              <span className="text-xs font-medium">
                {privacyActive ? "Privacy Active" : "Privacy Paused"}
              </span>
            </Button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-slate-100"
                >
                  <Bell className="h-5 w-5 text-slate-600" />
                  {notificationCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs border-2 border-white">
                      {notificationCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notifications</span>
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
                    Mark all as read
                  </Button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-64 overflow-y-auto">
                  <div className="p-3 hover:bg-slate-50 cursor-pointer">
                    <p className="text-sm font-medium">New lab results available</p>
                    <p className="text-xs text-slate-500">Patient: John Doe</p>
                    <p className="text-xs text-slate-400">2 minutes ago</p>
                  </div>
                  <div className="p-3 hover:bg-slate-50 cursor-pointer">
                    <p className="text-sm font-medium">Appointment reminder</p>
                    <p className="text-xs text-slate-500">Dr. Smith at 10:30 AM</p>
                    <p className="text-xs text-slate-400">1 hour ago</p>
                  </div>
                  <div className="p-3 hover:bg-slate-50 cursor-pointer">
                    <p className="text-sm font-medium">Critical alert: High BP</p>
                    <p className="text-xs text-slate-500">Patient: Maria Garcia</p>
                    <p className="text-xs text-slate-400">3 hours ago</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-blue-600 font-medium">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 hover:bg-slate-100 pl-2 pr-3"
                >
                  <Avatar className="h-8 w-8 border-2 border-slate-200">
                    <AvatarImage src={USER_PROFILE.avatar} alt={USER_PROFILE.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-800">
                      {USER_PROFILE.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-slate-800">{USER_PROFILE.name}</p>
                    <p className="text-xs text-slate-500">{USER_PROFILE.role}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-400 hidden md:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{USER_PROFILE.name}</p>
                    <p className="text-xs leading-none text-slate-500">{USER_PROFILE.role}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>My Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Privacy Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 focus:text-red-600">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-white" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">HealthSync</p>
                      <p className="text-xs text-slate-500">Dashboard</p>
                    </div>
                  </div>
                  <nav className="flex-1 space-y-4">
                    {NAV_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block py-2 text-sm font-medium text-slate-700 hover:text-blue-600"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <Separator className="my-6" />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className={cn("h-4 w-4", privacyActive ? "text-green-600" : "text-amber-500")} />
                        <span className="text-sm">Privacy</span>
                      </div>
                      <Button
                        variant={privacyActive ? "default" : "outline"}
                        size="sm"
                        onClick={togglePrivacy}
                        className={cn(
                          "h-7 text-xs",
                          privacyActive
                            ? "bg-green-600 hover:bg-green-700"
                            : "border-amber-300 text-amber-700 hover:bg-amber-50"
                        )}
                      >
                        {privacyActive ? "ON" : "OFF"}
                      </Button>
                    </div>
                    <div className="text-xs text-slate-500">
                      <p>HIPAA compliant session</p>
                      <p>All data encrypted</p>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}