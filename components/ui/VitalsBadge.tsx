"use client";

import { cn } from "@/lib/utils";
import { Vitals } from "@/types";
import { Activity, Heart, Thermometer } from "lucide-react";

interface VitalsBadgeProps {
  vitals: Vitals;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function VitalsBadge({ vitals, className, size = "md" }: VitalsBadgeProps) {
  const { bloodPressure, heartRate, temperature } = vitals;

  const getStatusColor = (type: keyof Vitals, value: number) => {
    if (type === "bloodPressure") {
      const [systolic] = value.toString().split("/").map(Number);
      if (systolic < 90) return "text-amber-600 bg-amber-50 border-amber-200";
      if (systolic >= 90 && systolic <= 120) return "text-emerald-600 bg-emerald-50 border-emerald-200";
      if (systolic > 120 && systolic <= 140) return "text-amber-600 bg-amber-50 border-amber-200";
      return "text-red-600 bg-red-50 border-red-200";
    }
    if (type === "heartRate") {
      if (value < 60) return "text-amber-600 bg-amber-50 border-amber-200";
      if (value >= 60 && value <= 100) return "text-emerald-600 bg-emerald-50 border-emerald-200";
      return "text-red-600 bg-red-50 border-red-200";
    }
    if (type === "temperature") {
      if (value < 36.1) return "text-amber-600 bg-amber-50 border-amber-200";
      if (value >= 36.1 && value <= 37.2) return "text-emerald-600 bg-emerald-50 border-emerald-200";
      return "text-red-600 bg-red-50 border-red-200";
    }
    return "text-slate-600 bg-slate-50 border-slate-200";
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs gap-1",
    md: "px-3 py-1.5 text-sm gap-2",
    lg: "px-4 py-2 text-base gap-3",
  };

  const iconSize = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  return (
    <div className={cn("inline-flex items-center rounded-full border", sizeClasses[size], className)}>
      <div className={cn("flex items-center gap-1 rounded-full px-2 py-0.5 border", getStatusColor("bloodPressure", parseInt(bloodPressure.split("/")[0])))}>
        <Activity size={iconSize[size]} className="shrink-0" />
        <span className="font-medium">{bloodPressure}</span>
        <span className="text-xs opacity-70">BP</span>
      </div>
      <div className={cn("flex items-center gap-1 rounded-full px-2 py-0.5 border", getStatusColor("heartRate", heartRate))}>
        <Heart size={iconSize[size]} className="shrink-0" />
        <span className="font-medium">{heartRate}</span>
        <span className="text-xs opacity-70">BPM</span>
      </div>
      <div className={cn("flex items-center gap-1 rounded-full px-2 py-0.5 border", getStatusColor("temperature", temperature))}>
        <Thermometer size={iconSize[size]} className="shrink-0" />
        <span className="font-medium">{temperature.toFixed(1)}</span>
        <span className="text-xs opacity-70">°C</span>
      </div>
    </div>
  );
}