"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import FinancialReport from "@/components/FinancialReport";
import { SkeletonReportTable } from "@/components/SkeletonLoader";
import { profitLossData } from "@/data/profit-loss";

export default function ProfitLossPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header title="Profit and Loss" />
      <div className="flex-1 p-8 flex flex-col min-h-0 min-w-0">
        {isLoading ? (
          <SkeletonReportTable />
        ) : (
          <FinancialReport 
            data={profitLossData} 
            title="Profit and Loss" 
            subtitle="January - March, 2026" 
          />
        )}
      </div>
    </>
  );
}
