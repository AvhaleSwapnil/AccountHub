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
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/invoices", label: "Invoices", icon: FileText },
  { href: "/balance-sheet", label: "Balance Sheet", icon: BarChart3 },
  { href: "/profit-loss", label: "Profit & Loss", icon: TrendingUp },
  { href: "/connections", label: "Connections", icon: Link2 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[240px] bg-bg-sidebar border-r border-border flex flex-col z-30"
      style={{ boxShadow: "var(--shadow-sidebar)" }}
    >
      {/* Brand */}
      <div className="px-6 py-5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-[10px] bg-primary flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
              <path d="M8 12h8" />
              <path d="M12 8v8" />
            </svg>
          </div>
          <div>
            <h1 className="text-[15px] font-bold text-accent-4 tracking-tight leading-tight">
              ACCOUNT<span className="text-primary">HUB</span>
            </h1>
            <p className="text-[10px] text-text-muted font-bold tracking-widest uppercase">
              Financial Suite
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-2.5 rounded-[var(--radius-input)] text-[13.5px] font-medium
                transition-all duration-200 group relative
                ${isActive
                  ? "bg-bg-sidebar-active text-primary-dark"
                  : "text-text-secondary hover:bg-bg-sidebar-hover hover:text-text-primary"
                }
              `}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full" />
              )}
              <Icon
                size={18}
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
      <div className="px-3 pb-4 border-t border-border pt-3">
        <button className="flex items-center gap-3 px-4 py-2.5 w-full rounded-[var(--radius-input)] text-[13.5px] font-medium text-text-secondary hover:bg-negative-bg hover:text-negative transition-all duration-200 cursor-pointer">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
