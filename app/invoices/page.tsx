"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { SkeletonTable } from "@/components/SkeletonLoader";
import { invoicesData } from "@/data/invoices";
import { Search, Plus, MoreHorizontal, Filter, ListFilter, Download } from "lucide-react";
import Pagination from "@/components/Pagination";

const ITEMS_PER_PAGE = 5;

export default function InvoicesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredInvoices = invoicesData.filter((inv) => {
    const matchesSearch =
      inv.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredInvoices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedInvoices = filteredInvoices.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      paid: "bg-primary-light/50 text-primary-dark",
      open: "bg-accent-light-blue/30 text-accent-1",
      overdue: "bg-negative-bg text-negative",
      draft: "bg-bg-page text-text-muted",
    };
    return styles[status] || "bg-bg-page text-text-muted";
  };

  const totalOpen = invoicesData
    .filter((i) => i.status === "open")
    .reduce((sum, i) => sum + i.balance, 0);
  const totalOverdue = invoicesData
    .filter((i) => i.status === "overdue")
    .reduce((sum, i) => sum + i.balance, 0);
  const totalPaid = invoicesData
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <>
      <Header title="Invoices" />
      <div className="flex-1 p-8 space-y-6">
        {/* Summary Info Row */}
        <div className="grid grid-cols-3 gap-6">
          {[
            {
              label: "Open Invoices",
              value: totalOpen,
              count: invoicesData.filter((i) => i.status === "open").length,
              color: "#00648F",
              trend: "+4.2% vs last month"
            },
            {
              label: "Overdue Balance",
              value: totalOverdue,
              count: invoicesData.filter((i) => i.status === "overdue").length,
              color: "#C62026",
              trend: "Critical action required"
            },
            {
              label: "Paid YTD",
              value: totalPaid,
              count: invoicesData.filter((i) => i.status === "paid").length,
              color: "#8bc53d",
              trend: "85% of target reached"
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-bg-card rounded-[var(--radius-card)] border border-border p-6 group transition-all duration-300 hover:translate-y-[-2px]"
              style={{
                boxShadow: "var(--shadow-card)",
                borderLeft: `4px solid ${item.color}`,
              }}
            >
              <p className="text-[12px] font-bold text-text-muted uppercase tracking-widest mb-2">
                {item.label}
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-[28px] font-bold text-text-primary">
                  {isLoading ? (
                    <span className="skeleton inline-block h-8 w-32 rounded-md" />
                  ) : (
                    `$${item.value.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}`
                  )}
                </p>
                <span className="text-[12px] font-bold text-text-muted">USD</span>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border-light">
                <span className="text-[11.5px] font-bold text-text-secondary">
                  {item.count} Records
                </span>
                <span className="text-[11px] font-medium text-text-muted italic">
                  {item.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div
          className="bg-bg-card rounded-[var(--radius-card)] border border-border p-4 flex items-center justify-between shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                type="text"
                placeholder="Search invoices, customers..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-9 pl-9 pr-4 w-[300px] text-[13px] bg-bg-page border border-border-input rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
              />
            </div>
            <div className="flex items-center bg-bg-page rounded-full p-1 border border-border-light">
              {["all", "open", "overdue", "paid"].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setStatusFilter(status);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-1.5 text-[11px] font-bold rounded-full transition-all duration-200 uppercase tracking-wider ${
                    statusFilter === status
                      ? "bg-white text-accent-1 shadow-sm border border-border-light"
                      : "text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 h-9 px-4 text-[13px] font-semibold text-text-secondary hover:bg-bg-page border border-transparent hover:border-border rounded-[var(--radius-button)] transition-all">
              <Download size={15} />
              Export
            </button>
            <button className="flex items-center gap-2 h-9 px-5 bg-primary text-white text-[13px] font-bold rounded-[var(--radius-button)] hover:bg-primary-dark transition-all shadow-[0_4px_12px_rgba(139,197,61,0.3)] active:scale-95">
              <Plus size={16} />
              New Invoice
            </button>
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <div
            className="bg-bg-card rounded-[var(--radius-card)] border border-border flex flex-col overflow-hidden shadow-sm"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-bg-page/60 border-b border-border">
                    <th className="text-left text-[11px] font-bold text-text-muted uppercase tracking-widest py-4 px-6">
                      Invoice / Number
                    </th>
                    <th className="text-left text-[11px] font-bold text-text-muted uppercase tracking-widest py-4 px-6">
                      Customer
                    </th>
                    <th className="text-left text-[11px] font-bold text-text-muted uppercase tracking-widest py-4 px-6">
                      Due Date
                    </th>
                    <th className="text-right text-[11px] font-bold text-text-muted uppercase tracking-widest py-4 px-6">
                      Total Amount
                    </th>
                    <th className="text-right text-[11px] font-bold text-text-muted uppercase tracking-widest py-4 px-6">
                      Balance Due
                    </th>
                    <th className="text-center text-[11px] font-bold text-text-muted uppercase tracking-widest py-4 px-6">
                      Status
                    </th>
                    <th className="w-12" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                  {paginatedInvoices.length > 0 ? (
                    paginatedInvoices.map((invoice) => (
                      <tr
                        key={invoice.id}
                        className="group hover:bg-bg-page/40 transition-colors duration-150"
                      >
                        <td className="py-4 px-6">
                          <p className="text-[13.5px] font-bold text-accent-1 hover:underline cursor-pointer">
                            {invoice.invoiceNumber}
                          </p>
                          <p className="text-[11px] text-text-muted mt-0.5">
                            Issued: {new Date(invoice.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </p>
                        </td>
                        <td className="py-4 px-6 text-[14px] text-text-primary font-semibold">
                          {invoice.customer}
                        </td>
                        <td className="py-4 px-6 text-[13px] text-text-secondary">
                          <span className={invoice.status === "overdue" ? "text-negative font-bold" : ""}>
                            {new Date(invoice.dueDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-[14.5px] font-bold text-text-primary text-right">
                          $
                          {invoice.amount.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td
                          className={`py-4 px-6 text-[14.5px] font-bold text-right ${
                            invoice.balance > 0
                              ? "text-text-primary"
                              : "text-text-muted"
                          }`}
                        >
                          $
                          {invoice.balance.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span
                            className={`text-[10px] font-black px-2.5 py-1 rounded-full ${statusBadge(
                              invoice.status
                            )}`}
                          >
                            {invoice.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button className="p-2 rounded-[8px] hover:bg-bg-page border border-transparent hover:border-border transition-all duration-150 cursor-pointer">
                            <MoreHorizontal
                              size={16}
                              className="text-text-muted"
                            />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-text-muted text-[13px]">
                        No invoices found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                className="border-t-0 bg-bg-card"
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
