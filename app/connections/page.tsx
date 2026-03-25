"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import {
  Link2,
  Link2Off,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Clock,
  ExternalLink,
  Shield,
  Database,
  Settings,
  ChevronRight,
  Zap,
} from "lucide-react";

interface ConnectionInfo {
  status: "connected" | "disconnected" | "expired" | "error";
  companyName: string;
  companyId: string;
  connectedAt: string;
  lastSynced: string;
  tokenExpiresAt: string;
  environment: "sandbox" | "production";
  syncedEntities: {
    name: string;
    count: number;
    lastSync: string;
    status: "synced" | "syncing" | "error";
  }[];
}

const connectionData: ConnectionInfo = {
  status: "connected",
  companyName: "Sage Healthy RCM",
  companyId: "4620816365213104410",
  connectedAt: "2026-03-20T10:30:00Z",
  lastSynced: "2026-03-25T17:00:00Z",
  tokenExpiresAt: "2026-04-19T10:30:00Z",
  environment: "production",
  syncedEntities: [
    { name: "Customers", count: 89, lastSync: "2026-03-25T17:00:00Z", status: "synced" },
    { name: "Invoices", count: 247, lastSync: "2026-03-25T17:00:00Z", status: "synced" },
    { name: "Accounts", count: 68, lastSync: "2026-03-25T16:45:00Z", status: "synced" },
    { name: "Payments", count: 182, lastSync: "2026-03-25T16:30:00Z", status: "synced" },
    { name: "Vendors", count: 34, lastSync: "2026-03-25T14:00:00Z", status: "synced" },
    { name: "Bills", count: 95, lastSync: "2026-03-25T14:00:00Z", status: "synced" },
  ],
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit"
  });
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function daysUntil(dateStr: string) {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.max(0, Math.floor(diff / 86400000));
}

export default function ConnectionsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [connection, setConnection] = useState<ConnectionInfo | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setConnection(connectionData);
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2500);
  };

  const statusConfig = {
    connected: { label: "Connected", icon: CheckCircle2, color: "#8bc53d", bg: "bg-primary-light/40" },
    disconnected: { label: "Disconnected", icon: Link2Off, color: "#6D6E71", bg: "bg-bg-page" },
    expired: { label: "Token Expired", icon: AlertCircle, color: "#F68C1F", bg: "bg-warning-bg/30" },
    error: { label: "Connection Error", icon: AlertCircle, color: "#C62026", bg: "bg-negative-bg" },
  };

  const currentStatus = connection ? statusConfig[connection.status] : statusConfig.disconnected;
  const tokenDaysLeft = connection ? daysUntil(connection.tokenExpiresAt) : 0;

  return (
    <>
      <Header title="Manage Connection" />
      <div className="flex-1 p-8 space-y-6">
        {/* Main Status Card */}
        <div className="bg-bg-card rounded-[var(--radius-card)] border border-border overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="px-6 py-3 flex items-center justify-between" style={{ backgroundColor: `${currentStatus.color}10`, borderBottom: `2px solid ${currentStatus.color}` }}>
            <div className="flex items-center gap-2">
              <currentStatus.icon size={18} style={{ color: currentStatus.color }} />
              <span className="text-[13px] font-bold uppercase tracking-widest" style={{ color: currentStatus.color }}>{currentStatus.label}</span>
            </div>
            {connection?.status === "connected" && (
              <span className="text-[11.5px] text-text-muted">Last synced: {timeAgo(connection.lastSynced)}</span>
            )}
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="space-y-4">
                <div className="skeleton h-12 w-64 rounded-lg" />
                <div className="skeleton h-4 w-48 rounded-lg" />
              </div>
            ) : connection?.status === "connected" ? (
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-[14px] flex items-center justify-center bg-gradient-to-br from-[#2CA01C] to-[#108A00] shadow-[0_4px_14px_rgba(44,160,28,0.3)] text-white font-black text-xl uppercase">qb</div>
                  <div>
                    <h3 className="text-[18px] font-bold text-text-primary mb-0.5">QuickBooks Online</h3>
                    <p className="text-[13px] text-text-secondary mb-3">{connection.companyName}</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                       <div className="flex items-center gap-1.5 text-[12px] text-text-muted">
                        <Database size={13} /> Company ID: <span className="font-mono text-text-secondary">{connection.companyId}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[12px] text-text-muted">
                        <Shield size={13} /> Environment: <span className="font-semibold text-primary">{connection.environment}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={handleSync} disabled={isSyncing} className="h-9 px-5 bg-primary text-white text-[13px] font-bold rounded-[var(--radius-button)] hover:bg-primary-dark transition-all shadow-[0_2px_8px_rgba(139,197,61,0.3)] disabled:opacity-50 flex items-center gap-2">
                    <RefreshCw size={14} className={isSyncing ? "animate-spin" : ""} /> {isSyncing ? "Syncing..." : "Sync Now"}
                  </button>
                  <button onClick={() => setShowDisconnectModal(true)} className="h-9 px-4 text-[13px] font-bold text-negative border border-negative/30 rounded-[var(--radius-button)] hover:bg-negative-bg transition-all">Disconnect</button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-[16px] bg-bg-page mx-auto mb-4 flex items-center justify-center text-text-muted"><Link2Off size={32} /></div>
                <h3 className="text-[18px] font-bold text-text-primary mb-2">No active connection</h3>
                <p className="text-[13px] text-text-secondary mb-6 max-w-sm mx-auto">Connect your QuickBooks account to start syncing your financial data automatically.</p>
                <button className="h-11 px-8 bg-gradient-to-r from-[#2CA01C] to-[#108A00] text-white text-[14px] font-black rounded-full shadow-[0_6px_20px_rgba(44,160,28,0.4)] flex items-center gap-2 mx-auto hover:scale-105 transition-transform"><Zap size={16} fill="white" /> CONNECT TO QUICKBOOKS</button>
              </div>
            )}
          </div>
        </div>

        {/* Info Grid */}
        {connection?.status === "connected" && !isLoading && (
          <>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-bg-card rounded-[var(--radius-card)] border border-border p-5" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="flex items-center gap-2 mb-3 text-text-muted text-[11px] font-black uppercase tracking-widest"><Shield size={16} className="text-accent-1" /> Access Token</div>
                <p className="text-[24px] font-bold text-primary-dark">Active</p>
                <p className="text-[12px] text-text-muted mt-1">Refreshed automatically every 60 mins</p>
              </div>
              <div className="bg-bg-card rounded-[var(--radius-card)] border border-border p-5 border-l-4 border-l-warning" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="flex items-center gap-2 mb-3 text-text-muted text-[11px] font-black uppercase tracking-widest"><Clock size={16} className="text-warning" /> Token Expiry</div>
                <p className="text-[24px] font-bold text-warning">{tokenDaysLeft} Days Remaining</p>
                <p className="text-[12px] text-text-muted mt-1">Valid until {formatDate(connection.tokenExpiresAt)}</p>
              </div>
              <div className="bg-bg-card rounded-[var(--radius-card)] border border-border p-5" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="flex items-center gap-2 mb-3 text-text-muted text-[11px] font-black uppercase tracking-widest"><Database size={16} className="text-accent-3" /> Data Volume</div>
                <p className="text-[24px] font-bold text-text-primary">{connection.syncedEntities.reduce((a, b) => a + b.count, 0)} Records</p>
                <p className="text-[12px] text-text-muted mt-1">Across all synced accounts and entities</p>
              </div>
            </div>

            {/* Entity List */}
            <div className="bg-bg-card rounded-[var(--radius-card)] border border-border overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Settings size={16} className="text-text-muted" />
                  <h3 className="text-[15px] font-bold text-text-primary">Synced Entities</h3>
                </div>
              </div>
              <div className="divide-y divide-border-light">
                {connection.syncedEntities.map((entity, i) => (
                  <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-bg-page/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-[10px] bg-bg-page flex items-center justify-center text-accent-4"><Database size={18} /></div>
                      <div>
                        <p className="text-[14px] font-bold text-text-primary">{entity.name}</p>
                        <p className="text-[11.5px] text-text-muted">Last sync {timeAgo(entity.lastSync)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-[15px] font-bold text-text-primary">{entity.count}</p>
                        <p className="text-[11px] text-text-muted uppercase font-bold">Items</p>
                      </div>
                      <span className="text-[10px] font-black px-2.5 py-1 bg-primary-light/40 text-primary-dark rounded-full">SYNCED</span>
                      <ChevronRight size={16} className="text-text-muted" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="bg-bg-card rounded-[var(--radius-card)] border border-border p-6" style={{ boxShadow: "var(--shadow-card)" }}>
              <h3 className="text-[15px] font-bold text-text-primary mb-6">Recent Activity</h3>
              <div className="relative pl-6 space-y-6">
                <div className="absolute left-2.5 top-2 bottom-2 w-px bg-border-light" />
                {[
                  { title: "Manual sync triggered", detail: "Started for 6 entities", time: "Today, 5:00 PM" },
                  { title: "Invoice sync complete", detail: "247 records updated", time: "Today, 4:45 PM" },
                  { title: "OAuth token refreshed", detail: "Access valid for 60 mins", time: "Today, 4:00 PM" },
                  { title: "System check", detail: "Connection health looking good", time: "Today, 10:30 AM" },
                ].map((act, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[19.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary border-2 border-white" />
                    <p className="text-[13px] font-bold text-text-primary leading-tight">{act.title}</p>
                    <p className="text-[12px] text-text-secondary mt-0.5">{act.detail}</p>
                    <p className="text-[11px] text-text-muted mt-1">{act.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {showDisconnectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-accent-4/40 backdrop-blur-sm" onClick={() => setShowDisconnectModal(false)} />
            <div className="relative bg-bg-card rounded-[var(--radius-card)] border border-border w-full max-w-md p-6 shadow-2xl scale-in-center">
              <div className="w-14 h-14 bg-negative-bg rounded-full flex items-center justify-center mx-auto mb-4 text-negative"><AlertCircle size={32} /></div>
              <h3 className="text-lg font-bold text-center text-text-primary mb-2">Disconnect QuickBooks?</h3>
              <p className="text-sm text-text-secondary text-center leading-relaxed">This will stop all automatic syncing and revoke active tokens. Your current data will remain as-is.</p>
              <div className="mt-8 flex gap-3">
                <button onClick={() => setShowDisconnectModal(false)} className="flex-1 h-11 rounded-[var(--radius-button)] border border-border font-bold text-[13px] hover:bg-bg-page transition-colors">Cancel</button>
                <button onClick={() => { setConnection({ ...connectionData, status: "disconnected" }); setShowDisconnectModal(false); }} className="flex-1 h-11 rounded-[var(--radius-button)] bg-negative text-white font-bold text-[13px] hover:bg-negative-dark transition-colors">Disconnect</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
