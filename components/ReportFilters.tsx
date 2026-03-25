"use client";

import { useState } from "react";
import { RotateCcw, Filter, Download } from "lucide-react";

interface ReportFiltersProps {
  onExport?: () => void;
}

export default function ReportFilters({ onExport }: ReportFiltersProps) {
  const [period, setPeriod] = useState("this-quarter");
  const [fromDate, setFromDate] = useState("2026-01-01");
  const [toDate, setToDate] = useState("2026-03-25");
  const [method, setMethod] = useState("accrual");

  const handleReset = () => {
    setPeriod("this-quarter");
    setFromDate("2026-01-01");
    setToDate("2026-03-25");
    setMethod("accrual");
  };

  return (
    <div
      className="bg-bg-card rounded-[var(--radius-card)] border border-border p-5"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-primary" />
          <h3 className="text-[14px] font-semibold text-text-primary">
            Report Filters
          </h3>
        </div>
        <button
          onClick={onExport}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-accent-1 border border-accent-1/30 rounded-[var(--radius-button)] hover:bg-accent-1/5 transition-colors duration-200 cursor-pointer"
        >
          <Download size={13} />
          Export PDF / CSV
        </button>
      </div>

      <div className="flex flex-wrap items-end gap-4">
        {/* Report Period */}
        <div className="flex flex-col gap-1.5 min-w-[180px]">
          <label className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
            Report Period
          </label>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="h-9 px-3 text-[13px] bg-bg-input border border-border-input rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%236D6E71' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 10px center",
            }}
          >
            <option value="this-month">This Month</option>
            <option value="last-month">Last Month</option>
            <option value="this-quarter">This Quarter</option>
            <option value="last-quarter">Last Quarter</option>
            <option value="this-year">This Fiscal Year</option>
            <option value="last-year">Last Fiscal Year</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        {/* From Date */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
            From
          </label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="h-9 px-3 text-[13px] bg-bg-input border border-border-input rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
          />
        </div>

        {/* To Date */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
            To
          </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="h-9 px-3 text-[13px] bg-bg-input border border-border-input rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
          />
        </div>

        {/* Accounting Method */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
            Accounting Method
          </label>
          <div className="flex h-9 border border-border-input rounded-[var(--radius-input)] overflow-hidden">
            <button
              onClick={() => setMethod("cash")}
              className={`px-4 text-[12.5px] font-medium transition-all duration-200 cursor-pointer ${
                method === "cash"
                  ? "bg-primary text-white"
                  : "bg-bg-input text-text-secondary hover:bg-bg-page"
              }`}
            >
              Cash
            </button>
            <button
              onClick={() => setMethod("accrual")}
              className={`px-4 text-[12.5px] font-medium border-l border-border-input transition-all duration-200 cursor-pointer ${
                method === "accrual"
                  ? "bg-primary text-white"
                  : "bg-bg-input text-text-secondary hover:bg-bg-page"
              }`}
            >
              Accrual
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 ml-auto">
          <button
            onClick={handleReset}
            className="h-9 px-4 flex items-center gap-1.5 text-[12.5px] font-medium text-text-secondary border border-border rounded-[var(--radius-button)] hover:bg-bg-page transition-colors duration-200 cursor-pointer"
          >
            <RotateCcw size={13} />
            Reset
          </button>
          <button className="h-9 px-5 text-[12.5px] font-semibold text-white bg-primary rounded-[var(--radius-button)] hover:bg-primary-dark transition-colors duration-200 cursor-pointer"
            style={{ boxShadow: "0 2px 6px rgba(139, 197, 61, 0.3)" }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
