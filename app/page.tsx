"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import {
  FileText,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Wallet,
  Receipt,
  PieChart,
  Search,
  ChevronDown,
  Building2,
  CreditCard,
  Scale,
  RefreshCw,
  PiggyBank,
  ArrowDownToLine,
  Package,
  ArrowUpFromLine,
  Landmark,
  Users
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import { fetchDashboardKPIs } from "@/services/reportService";
import { fetchCustomers } from "@/services/customerService";
import { fetchInvoices } from "@/services/invoiceService";
const chartData = [
  { name: "Jan", revenue: 65, expenses: 40 },
  { name: "Feb", revenue: 45, expenses: 35 },
  { name: "Mar", revenue: 85, expenses: 50 },
  { name: "Apr", revenue: 55, expenses: 45 },
  { name: "May", revenue: 70, expenses: 30 },
  { name: "Jun", revenue: 95, expenses: 60 },
];

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [dynamicStats, setDynamicStats] = useState<any[]>([]);
  const [customersData, setCustomersData] = useState<any[]>([]);
  const [invoicesData, setInvoicesData] = useState<any[]>([]);

  useEffect(() => {
    setIsClient(true);
    let isMounted = true;

    async function loadAllData() {
      try {
        const [kpiData, custsData, invsData] = await Promise.all([
          fetchDashboardKPIs(),
          fetchCustomers(),
          fetchInvoices()
        ]);

        if (isMounted) {
          const custs = Array.isArray(custsData?.QueryResponse?.Customer) ? custsData.QueryResponse.Customer :
            Array.isArray(custsData?.data?.QueryResponse?.Customer) ? custsData.data.QueryResponse.Customer : 
            (Array.isArray(custsData) ? custsData : []);
            
          const invs = Array.isArray(invsData?.QueryResponse?.Invoice) ? invsData.QueryResponse.Invoice :
            Array.isArray(invsData?.data?.QueryResponse?.Invoice) ? invsData.data.QueryResponse.Invoice : 
            (Array.isArray(invsData) ? invsData : []);

          setCustomersData(custs);
          setInvoicesData(invs);

          let totalRevenue = 0;
          let outstandingCount = 0;

          invs.forEach((inv: any) => {
            const amt = inv.TotalAmt || inv.amount || 0;
            const bal = inv.Balance || inv.balance || 0;
            totalRevenue += amt;
            if (bal > 0 && (inv.status !== "paid")) outstandingCount++;
          });

          const totalCustomers = custs.length;

          const baseMap = kpiData.map(stat => {
            if (stat.label === "Total Revenue") {
              return { ...stat, value: "$" + totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) };
            }
            if (stat.label === "Outstanding Invoices") {
              return { ...stat, value: outstandingCount.toString() + " invoices" };
            }
            return stat;
          });

          if (!baseMap.some(s => s.label === "Total Customers")) {
            baseMap.splice(3, 0, {
              label: "Total Customers",
              value: totalCustomers.toString(),
              change: "Active",
              trend: "neutral" as const,
              icon: Users,
              color: "#00B0F0"
            });
          }

          setDynamicStats(baseMap);
        }
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadAllData();

    return () => { isMounted = false; };
  }, []);

  return (
    <>
      <Header title="Dashboard" />
      <div className="flex-1 p-6 space-y-6">
        <h1 className="text-[24px] font-bold text-text-primary">Dashboard</h1>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {dynamicStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className={`bg-bg-card rounded-xl border border-border p-6 transition-all duration-300 hover:shadow-md ${isLoading ? "opacity-0" : "opacity-100"}`}
                style={{
                  boxShadow: "var(--shadow-card)",
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[14px] font-medium text-text-secondary">
                    {stat.label}
                  </span>
                  <Icon size={18} style={{ color: stat.color }} strokeWidth={2} />
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-[24px] font-bold text-text-primary leading-none tracking-tight">
                    {isLoading ? (
                      <span className="skeleton inline-block h-8 w-24 rounded-md" />
                    ) : (
                      stat.value
                    )}
                  </p>

                  <p className="text-[12px] text-text-muted mt-1">
                    {stat.change} from last month
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-12 gap-4">
          {/* Revenue vs Expenses Chart */}
          <div
            className="col-span-12 lg:col-span-8 bg-bg-card rounded-xl border border-border p-6 flex flex-col"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[18px] font-semibold text-text-primary">Financial Trends</h3>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-[13px] font-medium rounded-md bg-bg-page border border-border text-text-secondary hover:border-border transition-all">Export PDF</button>
                <button className="px-3 py-1.5 text-[13px] font-medium rounded-md bg-primary text-white hover:bg-primary-dark transition-all">Full View</button>
              </div>
            </div>

            <div className="h-[300px] w-full mt-auto">
              {isClient && !isLoading ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border-light)" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "var(--color-text-muted)", fontSize: 12, fontWeight: 500 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "var(--color-text-muted)", fontSize: 12, fontWeight: 500 }}
                    />
                    <Tooltip
                      cursor={{ fill: 'var(--color-bg-page)', radius: 4 }}
                      contentStyle={{
                        borderRadius: '8px',
                        border: '1px solid var(--color-border)',
                        boxShadow: 'var(--shadow-card)',
                        fontSize: '13px',
                        padding: '10px 14px'
                      }}
                    />
                    <Legend
                      verticalAlign="top"
                      align="right"
                      iconType="circle"
                      wrapperStyle={{ paddingBottom: '16px', fontSize: '12px', fontWeight: 500 }}
                    />
                    <Bar name="Revenue" dataKey="revenue" fill="var(--color-primary)" radius={[4, 4, 0, 0]} barSize={24} />
                    <Bar name="Expenses" dataKey="expenses" fill="var(--color-negative)" fillOpacity={0.7} radius={[4, 4, 0, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full flex items-center justify-center p-8">
                  <div className="w-full h-full bg-bg-page/50 rounded-lg flex items-center justify-center border border-dashed border-border">
                    <TrendingUp className="text-text-muted animate-pulse" size={32} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Performance Summary / Insights */}
          <div
            className="col-span-12 lg:col-span-4 bg-bg-card rounded-xl border border-border p-6 flex flex-col"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[18px] font-semibold text-text-primary">Monthly Insight</h3>
              <PieChart size={18} className="text-primary" />
            </div>

            <div className="flex-1 space-y-3">
              {[
                { label: "Operating Margin", value: "33.1%", color: "#8bc53d", desc: "Healthy profit range" },
                { label: "Account Payable", value: "$4,230", color: "#F68C1F", desc: "Due within 14 days" },
                { label: "Projected Cash", value: "$182K", color: "#00648F", desc: "Estimated end of Q2" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-lg bg-bg-page/50 hover:bg-bg-page transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12px] font-medium text-text-muted">{item.label}</span>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  </div>
                  <p className="text-[20px] font-bold text-text-primary mb-0.5">{item.value}</p>
                  <p className="text-[12px] text-text-muted">{item.desc}</p>
                </div>
              ))}
            </div>

            <button className="w-full mt-5 py-2.5 bg-bg-page hover:bg-border-light border border-border text-[13px] font-medium text-text-primary rounded-md transition-all">
              Comprehensive Audit Info
            </button>
          </div>

          {/* Recent Invoices - Full Width Table */}
          <div
            className="col-span-12 bg-bg-card p-6 rounded-xl border border-border"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[18px] font-semibold text-text-primary">Recent Invoices</h3>

              <div className="flex items-center gap-3">
                <div className="relative w-[280px]">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-text-muted" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search invoices..."
                    className="w-full pl-10 pr-4 h-10 bg-bg-card border border-border rounded-md text-[14px] text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>

                <Link href="/invoices">
                  <button className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 h-10 rounded-md text-[14px] font-semibold transition-all active:scale-[0.98]">
                    View All
                    <ChevronDown size={16} />
                  </button>
                </Link>
              </div>
            </div>

            <div className="overflow-x-auto rounded-md border border-border">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border bg-bg-page/50">
                    <th className="py-3 px-4 text-[14px] font-medium text-text-muted">ID</th>
                    <th className="py-3 px-4 text-[14px] font-medium text-text-muted">Client Name</th>
                    <th className="py-3 px-4 text-[14px] font-medium text-text-muted">Reference</th>
                    <th className="py-3 px-4 text-[14px] font-medium text-text-muted text-right">Amount</th>
                    <th className="py-3 px-4 text-[14px] font-medium text-text-muted">Due Date</th>
                    <th className="py-3 px-4 text-[14px] font-medium text-text-muted text-center w-[100px]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i}><td colSpan={6} className="py-4 px-4"><div className="skeleton h-8 w-full rounded-md" /></td></tr>
                    ))
                  ) : (
                    invoicesData.slice(0, 5).map((inv: any, i: number) => {
                      const amount = inv.TotalAmt || inv.amount || 0;
                      const balance = inv.Balance || inv.balance || 0;
                      let status = inv.status || "open";
                      if (inv.TotalAmt !== undefined) {
                        status = balance > 0 ? "open" : "paid";
                      }
                      
                      return (
                      <tr key={i} className="group hover:bg-bg-page/50 transition-colors">
                        <td className="py-3 px-4 text-[14px] font-medium text-text-primary">
                          {inv.DocNumber || inv.id || `INV-00${i+1}`}
                        </td>
                        <td className="py-3 px-4 text-[14px] text-text-secondary">
                          {inv.CustomerRef?.name || inv.customer || "Unknown Client"}
                        </td>
                        <td className="py-3 px-4 text-[14px] text-text-muted">
                          Standard Billing
                        </td>
                        <td className="py-3 px-4 text-right text-[14px] font-semibold text-text-primary tabular-nums">
                          ${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-3 px-4 text-[14px] text-text-secondary">
                          {inv.DueDate || inv.dueDate || inv.date || "N/A"}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={cn(
                            "inline-flex items-center justify-center px-2.5 py-1 rounded-md text-[12px] font-medium capitalize min-w-[70px]",
                            status === "paid" ? "bg-[#8bc53d] text-white" : "",
                            status === "open" ? "bg-[#00648F] text-white" : "",
                            status === "overdue" ? "bg-[#C62026] text-white" : "",
                            (!["paid", "open", "overdue"].includes(status)) ? "bg-[#6D6E71] text-white" : ""
                          )}>
                            {status}
                          </span>
                        </td>
                      </tr>
                    )})
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
