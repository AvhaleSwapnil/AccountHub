export interface FinancialLine {
  id: string;
  name: string;
  amount: number;
  level: number; // 0 for major category, 1 for sub, 2 for detail
  type: "item" | "total" | "header";
  children?: FinancialLine[];
  isOpen?: boolean;
}

export const balanceSheetData: FinancialLine[] = [
  {
    id: "assets",
    name: "ASSETS",
    amount: 512450.75,
    level: 0,
    type: "header",
    children: [
      {
        id: "current-assets",
        name: "Current Assets",
        amount: 320450.25,
        level: 1,
        type: "header",
        children: [
          {
            id: "cash-bank",
            name: "Cash and Bank Accounts",
            amount: 185200.50,
            level: 2,
            type: "header",
            children: [
              { id: "checking", name: "Operating Checking (1234)", amount: 145200.00, level: 3, type: "item" },
              { id: "savings", name: "Savings / Reserve (5678)", amount: 40000.50, level: 3, type: "item" },
            ]
          },
          {
            id: "ar",
            name: "Accounts Receivable (A/R)",
            amount: 112450.75,
            level: 2,
            type: "header",
            children: [
              { id: "ar-trade", name: "Accounts Receivable", amount: 112450.75, level: 3, type: "item" },
            ]
          },
          {
            id: "other-current",
            name: "Other Current Assets",
            amount: 22799.00,
            level: 2,
            type: "header",
            children: [
              { id: "prepaid", name: "Prepaid Insurance", amount: 12500.00, level: 3, type: "item" },
              { id: "supplies", name: "Office Supplies", amount: 4299.00, level: 3, type: "item" },
              { id: "undeposited", name: "Undeposited Funds", amount: 6000.00, level: 3, type: "item" },
            ]
          },
          { id: "total-current-assets", name: "Total Current Assets", amount: 320450.25, level: 1, type: "total" }
        ]
      },
      {
        id: "fixed-assets",
        name: "Fixed Assets",
        amount: 192000.50,
        level: 1,
        type: "header",
        children: [
          { id: "equipment", name: "Furniture and Equipment", amount: 145000.00, level: 2, type: "item" },
          { id: "accum-deprec", name: "Accumulated Depreciation", amount: -45000.00, level: 2, type: "item" },
          { id: "leasehold", name: "Leasehold Improvements", amount: 92000.50, level: 2, type: "item" },
          { id: "total-fixed-assets", name: "Total Fixed Assets", amount: 192000.50, level: 1, type: "total" }
        ]
      },
      { id: "total-assets", name: "TOTAL ASSETS", amount: 512450.75, level: 0, type: "total" }
    ]
  },
  {
    id: "liabilities-equity",
    name: "LIABILITIES AND EQUITY",
    amount: 512450.75,
    level: 0,
    type: "header",
    children: [
      {
        id: "liabilities",
        name: "Liabilities",
        amount: 213752.81,
        level: 1,
        type: "header",
        children: [
          {
            id: "current-liabilities",
            name: "Current Liabilities",
            amount: 85452.81,
            level: 2,
            type: "header",
            children: [
              { id: "ap", name: "Accounts Payable (A/P)", amount: 42450.75, level: 3, type: "item" },
              { id: "credit-cards", name: "Credit Cards", amount: 12502.06, level: 3, type: "item" },
              { id: "payroll-tax", name: "Payroll Tax Payable", amount: 8500.00, level: 3, type: "item" },
              { id: "sales-tax", name: "Sales Tax Payable", amount: 22000.00, level: 3, type: "item" },
            ]
          },
          {
            id: "long-term-liabilities",
            name: "Long-Term Liabilities",
            amount: 128300.00,
            level: 2,
            type: "header",
            children: [
              { id: "loan-sba", name: "SBA Loan", amount: 95000.00, level: 3, type: "item" },
              { id: "notes-payable", name: "Notes Payable", amount: 33300.00, level: 3, type: "item" },
            ]
          },
          { id: "total-liabilities", name: "Total Liabilities", amount: 213752.81, level: 1, type: "total" }
        ]
      },
      {
        id: "equity",
        name: "Equity",
        amount: 298697.94,
        level: 1,
        type: "header",
        children: [
          { id: "capital", name: "Owner's Capital", amount: 150000.00, level: 2, type: "item" },
          { id: "draws", name: "Owner's Draws", amount: -25000.00, level: 2, type: "item" },
          { id: "retained", name: "Retained Earnings", amount: 156437.94, level: 2, type: "item" },
          { id: "net-income", name: "Net Income", amount: 17260.00, level: 2, type: "item" },
          { id: "total-equity", name: "Total Equity", amount: 298697.94, level: 1, type: "total" }
        ]
      },
      { id: "total-liabilities-equity", name: "TOTAL LIABILITIES AND EQUITY", amount: 512450.75, level: 0, type: "total" }
    ]
  }
];
