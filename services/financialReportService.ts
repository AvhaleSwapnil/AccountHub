import { FinancialLine } from "@/data/balance-sheet";
import { DetailedFinancialData, FinancialGroup, AccountDetail, Transaction } from "@/data/financial-details";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// --- Parsers for Summary Reports ---

export function parseSummaryRows(rows: any[]): FinancialLine[] {
  let result: FinancialLine[] = [];
  if (!rows || !Array.isArray(rows)) return result;

  for (const row of rows) {
    if (row.type === "Section") {
      const name = row.Header?.ColData?.[0]?.value || row.ColData?.[0]?.value || "Section";
      const totalAmount = parseFloat(row.Summary?.ColData?.[1]?.value || "0") || 0;
      
      const children: FinancialLine[] = [];
      if (row.Rows && row.Rows.Row) {
        children.push(...parseSummaryRows(row.Rows.Row));
      }
      
      if (row.Summary) {
        children.push({
          id: Math.random().toString(),
          name: row.Summary.ColData?.[0]?.value || `Total ${name}`,
          amount: totalAmount,
          type: "total"
        });
      }

      result.push({
        id: row.group || Math.random().toString(),
        name,
        amount: totalAmount,
        type: "header",
        children
      });
    } else if (row.type === "Data") {
      result.push({
        id: row.ColData?.[0]?.id || Math.random().toString(),
        name: row.ColData?.[0]?.value || "Unknown",
        amount: parseFloat(row.ColData?.[1]?.value || "0") || 0,
        type: "data"
      });
    }
  }
  return result;
}

// --- Parsers for Detail Reports ---

// In a detail report, QB often nests multiple layers. We'll flatten them into Group -> Account -> Tx.
export function parseDetailRows(rows: any[]): DetailedFinancialData {
  const groups: FinancialGroup[] = [];
  
  // Recursively find all transactions for an account
  const extractTransactions = (rowArray: any[]): Transaction[] => {
    let txs: Transaction[] = [];
    if (!rowArray) return txs;
    for (const r of rowArray) {
      if (r.type === "Data") {
        const c = r.ColData || [];
        // QB Detail Columns: Date, TxType, Num, Name, Memo, Split, Amount, Balance
        // The indices might vary, but standard is:
        // 0: Date, 1: Type, 2: Num, 3: Name, 4: Memo, 5: Split, 6: Amount, 7: Balance
        txs.push({
          id: Math.random().toString(),
          date: c[0]?.value || "N/A",
          type: c[1]?.value || "N/A",
          num: c[2]?.value || "",
          name: c[3]?.value || "",
          memo: c[4]?.value || "",
          split: c[5]?.value || "",
          amount: parseFloat(c[6]?.value || "0") || 0,
          balance: parseFloat(c[7]?.value || "0") || 0
        });
      } else if (r.type === "Section" && r.Rows?.Row) {
        txs.push(...extractTransactions(r.Rows.Row));
      }
    }
    return txs;
  };

  // Find all Leaf Sections (Sections that contain Data rows directly)
  const extractAccounts = (node: any): AccountDetail[] => {
    let accts: AccountDetail[] = [];
    if (!node.Rows?.Row) return accts;
    
    // If this node contains Data rows directly, it IS an account.
    const hasData = node.Rows.Row.some((r: any) => r.type === "Data");
    if (hasData) {
      const summaryCols = node.Summary?.ColData || [];
      // Find the last numeric column in summary for the total
      const totalStr = summaryCols.reverse().find((c: any) => c.value && !isNaN(parseFloat(c.value)))?.value || "0";
      accts.push({
        id: Math.random().toString(),
        name: node.Header?.ColData?.[0]?.value || "Account",
        total: parseFloat(totalStr) || 0,
        transactions: extractTransactions(node.Rows.Row)
      });
    } else {
      // Otherwise search deeper
      for (const r of node.Rows.Row) {
        if (r.type === "Section") {
          accts.push(...extractAccounts(r));
        }
      }
    }
    return accts;
  };

  if (rows && Array.isArray(rows)) {
    for (const r of rows) {
      if (r.type === "Section") {
        const name = r.Header?.ColData?.[0]?.value || "General";
        // To find the group total amount, we look at the last numeric column in the Summary row.
        const summaryCols = r.Summary?.ColData ? [...r.Summary.ColData] : [];
        const totalStr = summaryCols.reverse().find((c: any) => c.value && !isNaN(parseFloat(c.value)))?.value || "0";
        const total = parseFloat(totalStr) || 0;
        
        const accounts = extractAccounts(r);
        
        if (accounts.length > 0) {
          groups.push({
            id: Math.random().toString(),
            name,
            total,
            accounts
          });
        }
      }
    }
  }

  return { groups };
}

export async function getBalanceSheet() {
  const res = await fetch(`${API_BASE_URL}/balance-sheet`);
  if (!res.ok) throw new Error("Failed to fetch balance sheet");
  const json = await res.json();
  const rows = json?.data?.Rows?.Row || json?.Rows?.Row || [];
  return parseSummaryRows(rows);
}

export async function getBalanceSheetDetail() {
  const res = await fetch(`${API_BASE_URL}/balance-sheet-detail`);
  if (!res.ok) throw new Error("Failed to fetch balance sheet detail");
  const json = await res.json();
  const rows = json?.data?.Rows?.Row || json?.Rows?.Row || [];
  return parseDetailRows(rows);
}

export async function getProfitAndLoss() {
  const res = await fetch(`${API_BASE_URL}/profit-and-loss`);
  if (!res.ok) throw new Error("Failed to fetch profit and loss");
  const json = await res.json();
  const rows = json?.data?.Rows?.Row || json?.Rows?.Row || [];
  return parseSummaryRows(rows);
}

export async function getProfitAndLossDetail() {
  const res = await fetch(`${API_BASE_URL}/profit-and-loss-detail`);
  if (!res.ok) throw new Error("Failed to fetch profit and loss detail");
  const json = await res.json();
  const rows = json?.data?.Rows?.Row || json?.Rows?.Row || [];
  return parseDetailRows(rows);
}

// Wait, the user also mentioned /profit-and-loss-statement. 
// It's likely the same summary view but might be on a different endpoint? 
// I will fetch it if needed, but the UI only has 'Balance Sheet' and 'Profit & Loss' tabs.
export async function getProfitAndLossStatement() {
  const res = await fetch(`${API_BASE_URL}/profit-and-loss-statement`);
  if (!res.ok) throw new Error("Failed to fetch profit and loss statement");
  const json = await res.json();
  const rows = json?.data?.Rows?.Row || json?.Rows?.Row || [];
  return parseSummaryRows(rows);
}
