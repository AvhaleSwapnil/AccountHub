"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import FinancialReport from "@/components/FinancialReport";
import { SkeletonReportTable } from "@/components/SkeletonLoader";
import { balanceSheetData } from "@/data/balance-sheet";

export default function BalanceSheetPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header title="Balance Sheet" />
      <div className="flex-1 p-8 flex flex-col min-h-0 min-w-0">
        {isLoading ? (
          <SkeletonReportTable />
        ) : (
          <FinancialReport 
            data={balanceSheetData} 
            title="Balance Sheet" 
            subtitle="As of March 25, 2026" 
          />
        )}
      </div>
    </>
  );
}
