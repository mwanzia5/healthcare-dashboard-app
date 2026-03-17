"use client";

import { Shield, Lock, EyeOff, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PRIVACY_STATUS, ENCRYPTION_LEVELS, DATA_PRIVACY_STATS } from "@/constants";

export function PrivacyVisuals() {
  return (
    <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-white shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold text-blue-900">Data Privacy & Security</CardTitle>
            <CardDescription className="text-blue-700">
              Real‑time visual indicators of patient data protection
            </CardDescription>
          </div>
          <Shield className="h-10 w-10 text-blue-600" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Encryption Status Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ENCRYPTION_LEVELS.map((level) => (
            <div
              key={level.id}
              className="flex items-center space-x-3 rounded-lg border border-blue-200 bg-white p-4"
            >
              <div className={`p-2 rounded-full ${level.color}`}>
                <Lock className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-blue-900">{level.label}</p>
                <p className="text-sm text-blue-700">{level.description}</p>
              </div>
              <Badge variant={level.status === "active" ? "default" : "secondary"} className="bg-blue-100 text-blue-800">
                {level.status === "active" ? "Active" : "Inactive"}
              </Badge>
            </div>
          ))}
        </div>

        {/* Privacy Stats */}
        <div>
          <h4 className="font-medium text-blue-900 mb-3">Privacy Compliance Metrics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {DATA_PRIVACY_STATS.map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-lg border border-blue-100 bg-white">
                <div className="text-3xl font-bold text-blue-900">{stat.value}</div>
                <div className="text-sm text-blue-700 mt-1">{stat.label}</div>
                <div className="flex items-center justify-center mt-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-700">{stat.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Access Control Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-blue-900">Access Control Strictness</h4>
            <span className="text-sm font-medium text-blue-800">94%</span>
          </div>
          <Progress value={94} className="h-2 bg-blue-200 [&>div]:bg-blue-600" />
          <div className="flex justify-between text-xs text-blue-700 mt-1">
            <span>Basic</span>
            <span>Role‑Based</span>
            <span>Multi‑Factor</span>
            <span>Full Audit</span>
          </div>
        </div>

        {/* Visual Privacy Indicators */}
        <div className="pt-4 border-t border-blue-100">
          <h4 className="font-medium text-blue-900 mb-3">Active Privacy Protections</h4>
          <div className="flex flex-wrap gap-3">
            <Badge variant="outline" className="border-green-200 bg-green-50 text-green-800">
              <Lock className="h-3 w-3 mr-1" /> End‑to‑End Encryption
            </Badge>
            <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-800">
              <EyeOff className="h-3 w-3 mr-1" /> Data Anonymization
            </Badge>
            <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-800">
              <Shield className="h-3 w-3 mr-1" /> HIPAA Compliant
            </Badge>
            <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-800">
              <Lock className="h-3 w-3 mr-1" /> Audit Logging
            </Badge>
            <Badge variant="outline" className="border-red-200 bg-red-50 text-red-800">
              <Shield className="h-3 w-3 mr-1" /> Breach Detection
            </Badge>
          </div>
        </div>

        {/* Status Summary */}
        <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-green-500 mr-3 animate-pulse"></div>
            <p className="text-sm text-blue-900">
              <span className="font-medium">All systems secure.</span> Patient data is fully encrypted, access is logged, and privacy controls are active.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}