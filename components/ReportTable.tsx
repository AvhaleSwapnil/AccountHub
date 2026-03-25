"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

interface AccountItem {
  name: string;
  value: number;
}

interface AccountSection {
  name: string;
  items?: AccountItem[];
  subsections?: AccountSection[];
  total?: number;
}

interface ReportTableProps {
  data: AccountSection[];
  reportTitle: string;
  valueLabel?: string;
}

function formatCurrency(value: number): string {
  const formatted = Math.abs(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return value < 0 ? `$(${formatted})` : `$${formatted}`;
}

function SectionRow({
  section,
  depth = 0,
}: {
  section: AccountSection;
  depth?: number;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren =
    (section.subsections && section.subsections.length > 0) ||
    (section.items && section.items.length > 0);
  const isTopLevel = depth === 0;
  const isSummaryRow =
    !hasChildren &&
    section.total !== undefined &&
    !section.items?.length &&
    !section.subsections?.length;

  return (
    <>
      {/* Section Header */}
      <tr
        className={`report-row cursor-pointer transition-colors duration-150 ${
          isTopLevel
            ? "border-t-2 border-border"
            : ""
        }`}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        <td
          className={`py-2.5 pr-4 ${
            isTopLevel
              ? "text-[14px] font-bold text-accent-4"
              : isSummaryRow
              ? "text-[13.5px] font-bold text-text-primary"
              : "text-[13px] font-semibold text-text-primary"
          }`}
          style={{ paddingLeft: `${depth * 24 + 16}px` }}
        >
          <span className="flex items-center gap-1.5">
            {hasChildren && (
              <span className="text-text-muted transition-transform duration-200">
                {isOpen ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </span>
            )}
            {section.name}
          </span>
        </td>
        <td
          className={`py-2.5 text-right pr-6 ${
            isTopLevel || isSummaryRow
              ? "text-[14px] font-bold"
              : "text-[13px] font-semibold"
          } ${
            section.total !== undefined && section.total < 0
              ? "text-negative"
              : isTopLevel
              ? "text-accent-4"
              : "text-text-primary"
          }`}
        >
          {section.total !== undefined ? formatCurrency(section.total) : ""}
        </td>
      </tr>

      {/* Children */}
      {isOpen && hasChildren && (
        <>
          {/* Sub-sections */}
          {section.subsections?.map((sub, idx) => (
            <SectionRow key={idx} section={sub} depth={depth + 1} />
          ))}

          {/* Items */}
          {section.items?.map((item, idx) => (
            <tr key={idx} className="report-row transition-colors duration-150">
              <td
                className="py-2 text-[13px] text-text-secondary"
                style={{ paddingLeft: `${(depth + 1) * 24 + 16}px` }}
              >
                {item.name}
              </td>
              <td
                className={`py-2 text-right pr-6 text-[13px] font-medium ${
                  item.value < 0 ? "text-negative" : "text-text-primary"
                }`}
              >
                {formatCurrency(item.value)}
              </td>
            </tr>
          ))}

          {/* Section Total */}
          {section.total !== undefined && hasChildren && (
            <tr className="border-t border-border-light">
              <td
                className="py-2 text-[13px] font-bold text-text-primary"
                style={{ paddingLeft: `${depth * 24 + 16}px` }}
              >
                Total {section.name}
              </td>
              <td
                className={`py-2 text-right pr-6 text-[13px] font-bold ${
                  section.total < 0 ? "text-negative" : "text-text-primary"
                }`}
              >
                {formatCurrency(section.total)}
              </td>
            </tr>
          )}
        </>
      )}
    </>
  );
}

export default function ReportTable({
  data,
  reportTitle,
  valueLabel = "Total",
}: ReportTableProps) {
  return (
    <div
      className="bg-bg-card rounded-[var(--radius-card)] border border-border overflow-hidden"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Table Header */}
      <div className="sticky-header border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <h3 className="text-[15px] font-bold text-text-primary">
            {reportTitle}
          </h3>
          <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
            Jan 1 – Mar 25, 2026
          </span>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-bg-page/60">
              <th className="text-left text-[11px] font-bold text-text-muted uppercase tracking-wider py-2.5 px-4">
                Account
              </th>
              <th className="text-right text-[11px] font-bold text-text-muted uppercase tracking-wider py-2.5 pr-6">
                {valueLabel}
              </th>
            </tr>
          </thead>
        </table>
      </div>

      {/* Table Body */}
      <div className="overflow-auto max-h-[calc(100vh-320px)]">
        <table className="w-full">
          <tbody>
            {data.map((section, idx) => (
              <SectionRow key={idx} section={section} depth={0} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
