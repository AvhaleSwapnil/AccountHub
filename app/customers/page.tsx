"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { SkeletonTable } from "@/components/SkeletonLoader";
import { customersData } from "@/data/customers";
import { Search, Plus, MoreHorizontal, Filter, Download } from "lucide-react";
import Pagination from "@/components/Pagination";

const ITEMS_PER_PAGE = 10;

export default function CustomersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredCustomers = customersData.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: "bg-primary-light/50 text-primary-dark",
      inactive: "bg-bg-page text-text-muted",
      overdue: "bg-negative-bg text-negative",
    };
    return styles[status] || "bg-bg-page text-text-muted";
  };

  return (
    <>
      <Header title="Customers" />
      <div className="flex-1 p-8 space-y-6">
        {/* Toolbar */}
        <div
          className="bg-bg-card rounded-[var(--radius-card)] border border-border p-4 flex items-center justify-between"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
                className="h-9 pl-9 pr-4 w-[320px] text-[13px] bg-bg-page border border-border-input rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
              />
            </div>
            <button className="flex items-center gap-2 h-9 px-4 text-[13px] font-semibold text-text-secondary hover:bg-bg-page rounded-[var(--radius-button)] transition-colors border border-transparent hover:border-border">
              <Filter size={15} />
              Filter
            </button>
          </div>
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 h-9 px-4 text-[13px] font-semibold text-text-secondary hover:bg-bg-page rounded-[var(--radius-button)] transition-colors">
              <Download size={15} />
              Export
            </button>
            <button className="flex items-center gap-2 h-9 px-5 bg-primary text-white text-[13px] font-bold rounded-[var(--radius-button)] hover:bg-primary-dark shadow-[0_4px_12px_rgba(139,197,61,0.3)] transition-all active:scale-95 cursor-pointer">
              <Plus size={16} />
              Add Customer
            </button>
          </div>
        </div>

        {/* Table/List View */}
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <div
            className="bg-bg-card rounded-[var(--radius-card)] border border-border flex flex-col overflow-hidden"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-bg-page/60 border-b border-border">
                    <th className="text-left text-[11px] font-bold text-text-muted uppercase tracking-widest py-3 px-6">
                      Customer Details
                    </th>
                    <th className="text-left text-[11px] font-bold text-text-muted uppercase tracking-widest py-3 px-6">
                      Contact Information
                    </th>
                    <th className="text-right text-[11px] font-bold text-text-muted uppercase tracking-widest py-3 px-6">
                      Open Balance
                    </th>
                    <th className="text-right text-[11px] font-bold text-text-muted uppercase tracking-widest py-3 px-6">
                      Lifetime Value
                    </th>
                    <th className="text-center text-[11px] font-bold text-text-muted uppercase tracking-widest py-3 px-6">
                      Health
                    </th>
                    <th className="w-12" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                  {paginatedCustomers.length > 0 ? (
                    paginatedCustomers.map((customer) => (
                      <tr
                        key={customer.id}
                        className="group hover:bg-bg-page/40 transition-colors duration-150"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-accent-1/20 to-accent-3/20 border border-accent-1/10 flex items-center justify-center text-accent-1 text-[13px] font-bold flex-shrink-0">
                              {customer.name
                                .split(" ")
                                .slice(0, 2)
                                .map((w) => w[0])
                                .join("")}
                            </div>
                            <div>
                              <p className="text-[14px] font-bold text-text-primary group-hover:text-primary transition-colors">
                                {customer.name}
                              </p>
                              <p className="text-[11px] text-text-muted font-mono tracking-tighter">
                                {customer.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-[13px] text-text-primary font-medium">{customer.email}</p>
                          <p className="text-[11px] text-text-muted">{customer.phone}</p>
                        </td>
                        <td
                          className={`py-4 px-6 text-[14px] font-bold text-right ${
                            customer.balance < 0
                              ? "text-negative"
                              : "text-text-primary"
                          }`}
                        >
                          $
                          {Math.abs(customer.balance).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                          })}
                          {customer.balance < 0 && " (CR)"}
                        </td>
                        <td className="py-4 px-6 text-[14px] font-semibold text-text-secondary text-right">
                          $
                          {customer.totalSpent.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span
                            className={`text-[10px] font-black px-2.5 py-1 rounded-full ${statusBadge(
                              customer.status
                            )}`}
                          >
                            {customer.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-4 px-4">
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
                      <td colSpan={6} className="py-12 text-center text-text-muted text-[13px]">
                        No customers found matching "{searchTerm}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Component */}
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
