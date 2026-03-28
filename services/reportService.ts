import {
  DollarSign,
  Wallet,
  TrendingUp,
  Receipt,
  Building2,
  CreditCard,
  Scale,
  RefreshCw,
  PiggyBank,
  ArrowDownToLine,
  Package,
  ArrowUpFromLine,
  Landmark,
} from "lucide-react";

export async function fetchDashboardKPIs() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  
  // Note: Assuming backend allows CORS as per instruction
  const response = await fetch(`${baseUrl}/balance-sheet`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch from backend: ${response.status}`);
  }
  
  const json = await response.json();
  const rows = json?.data?.Rows?.Row || [];

  const findValGroup = (arr: any[], group: string): number | null => {
    if (!arr) return null;
    for (const row of arr) {
      if (row.group === group) {
        const val = row.Summary?.ColData?.[1]?.value || row.ColData?.[1]?.value;
        if (val !== undefined) return parseFloat(val);
      }
      if (row.Rows?.Row) {
        const val = findValGroup(row.Rows.Row, group);
        if (val !== null) return val;
      }
    }
    return null;
  };

  const findValName = (arr: any[], nameSubstring: string): number | null => {
    if (!arr) return null;
    for (const row of arr) {
      const rowName = row.Summary?.ColData?.[0]?.value || row.Header?.ColData?.[0]?.value || row.ColData?.[0]?.value || "";
      if (rowName.toLowerCase().includes(nameSubstring.toLowerCase())) {
        const val = row.Summary?.ColData?.[1]?.value || row.ColData?.[1]?.value;
        if (val !== undefined) return parseFloat(val);
      }
      if (row.Rows?.Row) {
        const val = findValName(row.Rows.Row, nameSubstring);
        if (val !== null) return val;
      }
    }
    return null;
  };

  const rawAssets = findValGroup(rows, "TotalAssets");
  const rawLiabilities = findValGroup(rows, "Liabilities");
  const rawEquity = findValGroup(rows, "Equity");
  const rawCurrentAssets = findValGroup(rows, "CurrentAssets");
  const rawCurrentLiabilities = findValGroup(rows, "CurrentLiabilities");
  const workingCapital = (rawCurrentAssets !== null && rawCurrentLiabilities !== null) 
    ? rawCurrentAssets - rawCurrentLiabilities 
    : null;

  const rawBank = findValGroup(rows, "BankAccounts");
  const rawAR = findValGroup(rows, "AR");
  const rawInventory = findValName(rows, "Inventory");
  const rawAP = findValGroup(rows, "AP");
  const rawLongTerm = findValGroup(rows, "LongTermLiabilities");
  const rawNetIncome = findValGroup(rows, "NetIncome");

  // Format purely based on API return. Zero if missing, no mock defaults!
  const fmt = (num: number | null) => 
    "$" + (num || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return [
    { label: "Total Revenue", value: fmt(0), change: "+0.0%", trend: "neutral" as const, icon: DollarSign, color: "#8bc53d" },
    { label: "Total Expenses", value: fmt(0), change: "-0.0%", trend: "neutral" as const, icon: Wallet, color: "#C62026" },
    { label: "Net Profit", value: fmt(rawNetIncome), change: "+0.0%", trend: "neutral" as const, icon: TrendingUp, color: "#00648F" },
    { label: "Outstanding Invoices", value: "0", change: "0 invoices", trend: "neutral" as const, icon: Receipt, color: "#F68C1F" },
    { label: "Total Assets", value: fmt(rawAssets), change: "+0.0%", trend: "neutral" as const, icon: Building2, color: "#8bc53d" },
    { label: "Total Liabilities", value: fmt(rawLiabilities), change: "-0.0%", trend: "neutral" as const, icon: CreditCard, color: "#F68C1F" },
    { label: "Total Equity", value: fmt(rawEquity), change: "+0.0%", trend: "neutral" as const, icon: Scale, color: "#00648F" },
    { label: "Working Capital", value: fmt(workingCapital), change: "+0.0%", trend: "neutral" as const, icon: RefreshCw, color: "#8bc53d" },
    { label: "Cash & Bank Balance", value: fmt(rawBank), change: "+0.0%", trend: "neutral" as const, icon: PiggyBank, color: "#8bc53d" },
    { label: "Account Receivable", value: fmt(rawAR), change: "+0.0%", trend: "neutral" as const, icon: ArrowDownToLine, color: "#00B0F0" },
    { label: "Inventory Value", value: fmt(rawInventory), change: "stable", trend: "neutral" as const, icon: Package, color: "#6D6E71" },
    { label: "Account Payable", value: fmt(rawAP), change: "-0.0%", trend: "neutral" as const, icon: ArrowUpFromLine, color: "#C62026" },
    { label: "Long-Term Debt", value: fmt(rawLongTerm), change: "-0.0%", trend: "neutral" as const, icon: Landmark, color: "#C62026" },
  ];
}
