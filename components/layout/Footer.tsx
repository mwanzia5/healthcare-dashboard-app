"use client";

import Link from "next/link";
import { Heart, Shield, Lock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FOOTER_LINKS, COMPLIANCE_BADGES, SOCIAL_LINKS, SITE_NAME, CURRENT_YEAR } from "@/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-slate-50/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-blue-900">{SITE_NAME}</span>
            </div>
            <p className="mt-4 max-w-md text-sm text-slate-600">
              A secure, HIPAA-compliant healthcare dashboard designed for medical professionals.
              We prioritize patient data privacy and streamline clinical workflows.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  aria-label={link.name}
                  className="rounded-full p-2 text-slate-500 transition-colors hover:bg-blue-50 hover:text-blue-600"
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">Dashboard</h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.dashboard.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-600 transition-colors hover:text-blue-700"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">Resources</h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-600 transition-colors hover:text-blue-700"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance & Privacy */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">Compliance</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-slate-900">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-slate-900">End-to-End Encryption</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 w-full justify-start border-blue-200 text-blue-700 hover:bg-blue-50"
                asChild
              >
                <Link href="/privacy-policy" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Privacy Policy
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Compliance Badges */}
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {COMPLIANCE_BADGES.map((badge) => (
              <div
                key={badge.name}
                className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3"
              >
                <badge.icon className={cn("h-6 w-6", badge.color)} />
                <div>
                  <p className="text-xs font-semibold text-slate-900">{badge.name}</p>
                  <p className="text-xs text-slate-500">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col items-center justify-between border-t pt-8 text-sm text-slate-500 sm:flex-row">
          <p>
            © {CURRENT_YEAR} {SITE_NAME}. All rights reserved.
          </p>
          <p className="mt-2 sm:mt-0">
            Designed for healthcare professionals. Patient data is handled with the utmost confidentiality.
          </p>
        </div>
      </div>
    </footer>
  );
}