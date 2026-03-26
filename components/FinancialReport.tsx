"use client";

import { useState } from "react";
import { 
  ChevronDown, 
  ChevronRight, 
  Printer, 
  Download, 
  Settings2,
  Calendar,
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { FinancialLine } from "@/data/balance-sheet";
import FinancialDetails from "./FinancialDetails";
import { DetailedFinancialData } from "@/data/financial-details";

interface FinancialReportProps {
  data: FinancialLine[];
  detailedData?: DetailedFinancialData;
  title: string;
  subtitle?: string;
}

const ReportRow = ({ line, depth = 0 }: { line: FinancialLine; depth: number }) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = line.children && line.children.length > 0;
  
  const toggle = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.stopPropagation();
      setIsOpen(!isOpen);
    }
  };

  const isCategory = line.type === "header";
  const isTotal = line.type === "total";

  return (
    <div className="flex flex-col">
      <div 
        onClick={toggle}
        className={cn(
          "group flex items-center justify-between py-2.5 px-4 transition-colors border-b border-gray-100",
          hasChildren && "cursor-pointer hover:bg-gray-50",
          !hasChildren && "hover:bg-gray-50/50",
          isTotal && "bg-gray-50/60 font-bold border-b-2 border-gray-900 mt-1 mb-2",
          isCategory && depth === 0 && "bg-gray-50/30 border-t-2 border-gray-200 mt-6"
        )}
      >
        <div className="flex items-center gap-1 flex-1">
          {/* Indentation with vertical lines for better hierarchy visibility */}
          <div className="flex shrink-0">
            {Array.from({ length: depth }).map((_, i) => (
              <div key={i} className="w-7 h-5 border-r border-gray-200/50 mr-[-1px]" />
            ))}
          </div>
          
          {/* Expand icon */}
          <div className="w-6 flex items-center justify-center">
            {hasChildren ? (
              isOpen ? <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-900" /> : <ChevronRight size={14} className="text-gray-400 group-hover:text-gray-900" />
            ) : null}
          </div>
          
          <span className={cn(
            "text-[13.5px] tabular-nums",
            isCategory ? "font-bold text-gray-900 uppercase tracking-tight" : "text-gray-700",
            isTotal && "text-[14px] text-gray-900",
            depth > 1 && !isTotal && "text-gray-600 font-medium"
          )}>
            {line.name}
          </span>
        </div>
        
        {/* Number - Always Solid Black #000000 */}
        <div className={cn(
          "text-[14px] text-right min-w-[140px] tabular-nums",
          "text-[#000000]", // Absolute requirement
          isTotal ? "font-bold border-t border-gray-400 pt-0.5" : "font-medium"
        )}>
          {formatCurrency(line.amount)}
        </div>
      </div>
      
      {/* Children rendering */}
      {hasChildren && isOpen && (
        <div className="flex flex-col">
          {line.children!.map((child) => (
            <ReportRow key={child.id} line={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function FinancialReport({ data, detailedData, title, subtitle }: FinancialReportProps) {
  const [viewMode, setViewMode] = useState<"summary" | "detail">("summary");
  const [period, setPeriod] = useState("This Month");
  const [method, setMethod] = useState<"Accrual" | "Cash">("Accrual");
  const [customRange, setCustomRange] = useState({ start: "2026-03-01", end: "2026-03-25" });

  const activeSubtitle = period === "Custom Range" ? `${customRange.start} - ${customRange.end}` : period;

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden">
      {/* Professional Sticky Toolbar */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-6">
           {/* View Mode Toggle */}
           <div className="flex flex-col gap-1.5 mr-2">
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">View Mode</span>
             <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200 h-10 w-[180px]">
               <button 
                onClick={() => setViewMode("summary")}
                className={cn(
                  "flex-1 text-[11px] font-black uppercase tracking-wider rounded-md transition-all",
                  viewMode === "summary" ? "bg-white text-gray-900 shadow-sm border border-gray-200" : "text-gray-400 hover:text-gray-600"
                )}
               >
                 Reports
               </button>
               <button 
                onClick={() => setViewMode("detail")}
                className={cn(
                  "flex-1 text-[11px] font-black uppercase tracking-wider rounded-md transition-all",
                  viewMode === "detail" ? "bg-white text-gray-900 shadow-sm border border-gray-200" : "text-gray-400 hover:text-gray-600"
                )}
               >
                 Details
               </button>
             </div>
           </div>

           {/* Period Selector */}
           <div className="flex flex-col gap-1.5">
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Report Period</span>
             <div className="flex items-center gap-3">
               <div className="flex items-center gap-2 h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-all group">
                 <Calendar size={14} className="text-gray-400 group-hover:text-primary" />
                 <select 
                   value={period}
                   onChange={(e) => setPeriod(e.target.value)}
                   className="bg-transparent text-[13px] font-bold text-gray-900 focus:outline-none cursor-pointer min-w-[120px]"
                 >
                   <option>Today</option>
                   <option>This Month</option>
                   <option>This Quarter</option>
                   <option>This Year</option>
                   <option>Custom Range</option>
                 </select>
               </div>
               
               {period === "Custom Range" && (
                 <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
                   <input 
                     type="date" 
                     value={customRange.start}
                     onChange={(e) => setCustomRange({...customRange, start: e.target.value})}
                     className="h-10 px-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-900"
                   />
                   <span className="text-gray-400 text-xs font-bold">to</span>
                   <input 
                     type="date" 
                     value={customRange.end}
                     onChange={(e) => setCustomRange({...customRange, end: e.target.value})}
                     className="h-10 px-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-900"
                   />
                 </div>
               )}
             </div>
           </div>

           {/* Method Toggle */}
           <div className="flex flex-col gap-1.5">
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Accounting Method</span>
             <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200 h-10 w-[180px]">
               <button 
                onClick={() => setMethod("Accrual")}
                className={cn(
                  "flex-1 text-[11px] font-black uppercase tracking-wider rounded-md transition-all",
                  method === "Accrual" ? "bg-white text-gray-900 shadow-sm border border-gray-200" : "text-gray-400 hover:text-gray-600"
                )}
               >
                 Accrual
               </button>
               <button 
                onClick={() => setMethod("Cash")}
                className={cn(
                  "flex-1 text-[11px] font-black uppercase tracking-wider rounded-md transition-all",
                  method === "Cash" ? "bg-white text-gray-900 shadow-sm border border-gray-200" : "text-gray-400 hover:text-gray-600"
                )}
               >
                 Cash
               </button>
             </div>
           </div>
           
           <button className="self-end mb-0.5 h-10 px-6 bg-gray-900 text-white text-[11px] font-black uppercase tracking-widest rounded-lg hover:bg-black transition-all active:scale-95 shadow-md">
             Run Report
           </button>
        </div>

        <div className="flex items-center gap-3 self-end mb-0.5">
          <button title="Print" className="p-2.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all cursor-pointer border border-transparent hover:border-gray-200"><Printer size={20} /></button>
          <button title="Export" className="p-2.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all cursor-pointer border border-transparent hover:border-gray-200"><Download size={20} /></button>
          <button title="Settings" className="p-2.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all cursor-pointer border border-transparent hover:border-gray-200"><Settings2 size={20} /></button>
        </div>
      </div>

      {/* Report Content */}
      {viewMode === "summary" ? (
        <div className="flex-1 overflow-y-auto bg-gray-50/50 p-12 lg:p-16">
          <div className="max-w-4xl mx-auto bg-white p-12 shadow-2xl border border-gray-100 min-h-[1000px] flex flex-col">
            {/* Company Branding */}
            <div className="flex flex-col items-center mb-12 relative">
               <div className="absolute top-0 left-0 w-16 h-1 bg-gray-900" />
               <h1 className="text-[24px] font-black text-gray-900 tracking-tighter uppercase leading-none mb-2">Sage Healthy RCM, LLC</h1>
               <h2 className="text-[18px] font-medium text-gray-600 mb-2">{title}</h2>
               <div className="flex items-center gap-3 text-[12px] text-gray-400 font-bold uppercase tracking-[0.2em] bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100">
                 <span>{activeSubtitle}</span>
                 <div className="w-1 h-1 rounded-full bg-gray-300" />
                 <span>{method} Basis</span>
               </div>
            </div>

            {/* Table Header - Sticky within container */}
            <div className="flex items-center justify-between pb-3 px-4 border-b-2 border-gray-900 sticky top-0 bg-white z-10 pt-2">
              <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.25em]">Accounting Classification</span>
              <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.25em]">Amount (USD)</span>
            </div>
            
            {/* Main Report Body */}
            <div className="flex-1 py-4">
              {data.map((category) => (
                <ReportRow key={category.id} line={category} depth={0} />
              ))}
            </div>
            
            {/* Footer Metadata */}
            <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col items-center gap-4">
               <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Created on</span>
                    <span className="text-[11px] font-black text-gray-700">March 26, 2026, 11:18 AM</span>
                  </div>
                  <div className="w-px h-6 bg-gray-200" />
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</span>
                    <span className="text-[11px] font-black text-green-600 uppercase tracking-tight italic">Consolidated & Verified</span>
                  </div>
               </div>
               <p className="text-[10px] text-gray-300 font-medium italic text-center max-w-sm">
                 This report provides a granular view of the company's financial state based on the {method.toLowerCase()} accounting method. 
                 Rounding errors may occur due to currency normalization.
               </p>
            </div>
          </div>
        </div>
      ) : (
        detailedData ? (
          <FinancialDetails data={detailedData} title={title} subtitle={`${activeSubtitle} • ${method} Basis`} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 opacity-60">
             <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-primary animate-spin" />
                <p className="text-[13px] font-black text-gray-500 uppercase tracking-widest">Compiling Detailed Transaction Log...</p>
             </div>
          </div>
        )
      )}
    </div>
  );
}
