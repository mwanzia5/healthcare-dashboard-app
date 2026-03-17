"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Users,
  Calendar,
  FileText,
  Shield,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SIDEBAR_NAV_ITEMS, SITE_NAME } from "@/constants";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-slate-200 bg-white transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 p-6">
        {!collapsed ? (
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900">{SITE_NAME}</span>
              <span className="text-xs text-slate-500">Dashboard</span>
            </div>
          </Link>
        ) : (
          <div className="flex w-full justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
              <Shield className="h-6 w-6 text-white" />
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        <SidebarNavItem
          href="/"
          icon={Home}
          label="Overview"
          collapsed={collapsed}
          active={pathname === "/"}
        />
        {SIDEBAR_NAV_ITEMS.map((item) => (
          <SidebarNavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            collapsed={collapsed}
            active={pathname === item.href || pathname.startsWith(`${item.href}/`)}
            badge={item.badge}
          />
        ))}
      </nav>

      {/* Footer / User */}
      <div className="border-t border-slate-200 p-4">
        <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-between")}>
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-slate-200"></div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-900">Dr. Sarah Chen</span>
                <span className="text-xs text-slate-500">Cardiologist</span>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="h-9 w-9 rounded-full bg-slate-200"></div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label="Settings"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
}

interface SidebarNavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  collapsed: boolean;
  active: boolean;
  badge?: string;
}

function SidebarNavItem({
  href,
  icon: Icon,
  label,
  collapsed,
  active,
  badge,
}: SidebarNavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-colors duration-200 hover:bg-blue-50 hover:text-blue-700",
        active
          ? "bg-blue-50 text-blue-700"
          : "text-slate-700 hover:text-blue-700"
      )}
    >
      <div className="relative">
        <Icon className={cn("h-5 w-5", active ? "text-blue-600" : "text-slate-500")} />
        {badge && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            {badge}
          </span>
        )}
      </div>
      {!collapsed && <span className="ml-3">{label}</span>}
      {collapsed && (
        <div className="absolute left-16 z-50 hidden rounded-md bg-slate-900 px-2 py-1 text-xs text-white group-hover:block">
          {label}
        </div>
      )}
    </Link>
  );
}