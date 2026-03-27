"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  FileText,
  BarChart3,
  TrendingUp,
  LogOut,
  LayoutDashboard,
  Link2,
  PieChart,
  Briefcase,
  Settings,
  BarChart,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/invoices", label: "Invoices", icon: FileText },
  { href: "/reports", label: "Reports", icon: BarChart },
  { href: "/connections", label: "Connections", icon: Link2 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 w-[240px] bg-bg-sidebar border-r border-border flex flex-col z-30"
      style={{ boxShadow: "var(--shadow-sidebar)" }}
    >
      {/* Brand */}
      <div className="px-5 py-5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <BarChart size={20} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-[16px] font-bold text-text-primary tracking-tight leading-tight">
              DATA<span className="text-primary">HUB</span>
            </h1>
            <p className="text-[11px] text-text-muted leading-none mt-0.5">Sage Healthy RCM</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-md text-[14px] font-medium
                transition-all duration-200 group relative
                ${isActive
                  ? "bg-bg-sidebar-active text-primary font-semibold"
                  : "text-text-secondary hover:bg-bg-sidebar-hover hover:text-text-primary"
                }
              `}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full" />
              )}
              <Icon
                size={18}
                strokeWidth={isActive ? 2.5 : 2}
                className={`transition-colors duration-200 ${isActive
                  ? "text-primary"
                  : "text-text-muted group-hover:text-text-secondary"
                  }`}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 border-t border-border pt-4">
        {/* User Profile */}
        <div className="flex items-center gap-3 px-3 py-2.5 mb-1 rounded-md hover:bg-bg-sidebar-hover cursor-pointer transition-colors duration-200">
          <div className="w-8 h-8 shrink-0 rounded-full bg-primary flex items-center justify-center text-white text-[12px] font-semibold">
            SA
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-[14px] font-medium text-text-primary truncate leading-none">
              Jhon Doe
            </p>
            <p className="text-[12px] text-text-muted truncate mt-1 leading-none">Administrator</p>
          </div>
        </div>

        <button className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-[14px] font-medium text-text-secondary hover:bg-negative/10 hover:text-negative transition-all duration-200 cursor-pointer">
          <LogOut size={16} strokeWidth={2} />
          Logout
        </button>
      </div>
    </aside>
  );
}
