"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ReportFilters from "@/components/ReportFilters";
import ReportTable from "@/components/ReportTable";
import {
  SkeletonReportFilters,
  SkeletonReportTable,
} from "@/components/SkeletonLoader";
import { balanceSheetData } from "@/data/balance-sheet";

export default function BalanceSheetPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header title="Balance Sheet" />
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
              data={balanceSheetData}
              reportTitle="Balance Sheet"
              valueLabel="Total"
            />
          </>
        )}
      </div>
    </>
  );
}
