"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Activity, Calendar, Users, ShieldCheck, TrendingUp, Clock } from "lucide-react";
import { STATS_OVERVIEW } from "@/constants";

export function StatsOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {STATS_OVERVIEW.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.id}
            className={cn(
              "border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200",
              stat.highlight && "border-blue-200 bg-gradient-to-br from-blue-50 to-white"
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {stat.label}
              </CardTitle>
              <div className={cn(
                "p-2 rounded-lg",
                stat.highlight ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-600"
              )}>
                <Icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                {stat.value}
              </div>
              <div className="flex items-center text-xs mt-1">
                {stat.trend && (
                  <div className={cn(
                    "flex items-center mr-2",
                    stat.trend.direction === "up" ? "text-green-600" : "text-red-600"
                  )}>
                    <TrendingUp className={cn(
                      "h-3 w-3 mr-1",
                      stat.trend.direction === "down" && "rotate-180"
                    )} />
                    <span>{stat.trend.value}</span>
                  </div>
                )}
                <span className="text-slate-500">
                  {stat.description}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}