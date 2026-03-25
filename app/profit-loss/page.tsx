"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ReportFilters from "@/components/ReportFilters";
import ReportTable from "@/components/ReportTable";
import {
  SkeletonReportFilters,
  SkeletonReportTable,
} from "@/components/SkeletonLoader";
import { profitLossData } from "@/data/profit-loss";

export default function ProfitLossPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header title="Profit & Loss" />
      <div className="flex-1 p-8 space-y-6">
        {isLoading ? (
          <>
            <SkeletonReportFilters />
            <SkeletonReportTable />
          </>
        ) : (
          <>
            <ReportFilters />
            <ReportTable
              data={profitLossData}
              reportTitle="Profit & Loss Statement"
              valueLabel="Amount"
            />
          </>
        )}
      </div>
    </>
  );
}
