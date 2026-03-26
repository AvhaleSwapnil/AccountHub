export interface FinancialLine {
  id: string;
  name: string;
  amount: number;
  level: number;
  type: "item" | "total" | "header";
  children?: FinancialLine[];
}

export const balanceSheetData: FinancialLine[] = [
  {
    id: "assets",
    name: "ASSETS",
    amount: 23436.29,
    level: 0,
    type: "header",
    children: [
      {
        id: "current-assets",
        name: "Current Assets",
        amount: 9941.29,
        level: 1,
        type: "header",
        children: [
          {
            id: "bank-accounts",
            name: "Bank Accounts",
            amount: 2001.00,
            level: 2,
            type: "header",
            children: [
              { id: "checking", name: "Checking", amount: 1201.00, level: 3, type: "item" },
              { id: "savings", name: "Savings", amount: 800.00, level: 3, type: "item" },
              { id: "total-bank-accounts", name: "Total Bank Accounts", amount: 2001.00, level: 2, type: "total" }
            ]
          },
          {
            id: "ar",
            name: "Accounts Receivable",
            amount: 5281.52,
            level: 2,
            type: "header",
            children: [
              { id: "ar-item", name: "Accounts Receivable (A/R)", amount: 5281.52, level: 3, type: "item" },
              { id: "total-ar", name: "Total Accounts Receivable", amount: 5281.52, level: 2, type: "total" }
            ]
          },
          {
            id: "other-current-assets",
            name: "Other Current Assets",
            amount: 2658.77,
            level: 2,
            type: "header",
            children: [
              { id: "inventory", name: "Inventory Asset", amount: 596.25, level: 3, type: "item" },
              { id: "undeposited", name: "Undeposited Funds", amount: 2062.52, level: 3, type: "item" },
              { id: "total-other-current", name: "Total Other Current Assets", amount: 2658.77, level: 2, type: "total" }
            ]
          },
          { id: "total-current-assets", name: "Total Current Assets", amount: 9941.29, level: 1, type: "total" }
        ]
      },
      {
        id: "fixed-assets",
        name: "Fixed Assets",
        amount: 13495.00,
        level: 1,
        type: "header",
        children: [
          {
            id: "truck-group",
            name: "Truck",
            amount: 13495.00,
            level: 2,
            type: "header",
            children: [
              { id: "truck-cost", name: "Original Cost", amount: 13495.00, level: 3, type: "item" },
              { id: "total-truck", name: "Total Truck", amount: 13495.00, level: 2, type: "total" }
            ]
          },
          { id: "total-fixed-assets", name: "Total Fixed Assets", amount: 13495.00, level: 1, type: "total" }
        ]
      },
      { id: "total-assets", name: "TOTAL ASSETS", amount: 23436.29, level: 0, type: "total" }
    ]
  },
  {
    id: "liabilities-equity",
    name: "LIABILITIES AND EQUITY",
    amount: 23436.29,
    level: 0,
    type: "header",
    children: [
      {
        id: "liabilities",
        name: "Liabilities",
        amount: 31131.33,
        level: 1,
        type: "header",
        children: [
          {
            id: "current-liabilities",
            name: "Current Liabilities",
            amount: 6131.33,
            level: 2,
            type: "header",
            children: [
              {
                id: "ap-group",
                name: "Accounts Payable",
                amount: 1602.67,
                level: 3,
                type: "header",
                children: [
                  { id: "ap-item", name: "Accounts Payable (A/P)", amount: 1602.67, level: 4, type: "item" },
                  { id: "total-ap", name: "Total Accounts Payable", amount: 1602.67, level: 3, type: "total" }
                ]
              },
              {
                id: "cc-group",
                name: "Credit Cards",
                amount: 157.72,
                level: 3,
                type: "header",
                children: [
                  { id: "mastercard", name: "Mastercard", amount: 157.72, level: 4, type: "item" },
                  { id: "total-cc", name: "Total Credit Cards", amount: 157.72, level: 3, type: "total" }
                ]
              },
              {
                id: "other-liabilities-group",
                name: "Other Current Liabilities",
                amount: 4370.94,
                level: 3,
                type: "header",
                children: [
                  { id: "az-tax", name: "Arizona Dept. of Revenue Payable", amount: 0.00, level: 4, type: "item" },
                  { id: "boe-tax", name: "Board of Equalization Payable", amount: 370.94, level: 4, type: "item" },
                  { id: "loan", name: "Loan Payable", amount: 4000.00, level: 4, type: "item" },
                  { id: "total-other-liabilities", name: "Total Other Current Liabilities", amount: 4370.94, level: 3, type: "total" }
                ]
              },
              { id: "total-current-liabilities", name: "Total Current Liabilities", amount: 6131.33, level: 2, type: "total" }
            ]
          },
          {
            id: "long-term-liabilities",
            name: "Long-Term Liabilities",
            amount: 25000.00,
            level: 2,
            type: "header",
            children: [
              { id: "notes-payable", name: "Notes Payable", amount: 25000.00, level: 3, type: "item" },
              { id: "total-lt-liabilities", name: "Total Long-Term Liabilities", amount: 25000.00, level: 2, type: "total" }
            ]
          },
          { id: "total-liabilities", name: "Total Liabilities", amount: 31131.33, level: 1, type: "total" }
        ]
      },
      {
        id: "equity",
        name: "Equity",
        amount: -7695.04,
        level: 1,
        type: "header",
        children: [
          { id: "opening-equity", name: "Opening Balance Equity", amount: -9337.50, level: 2, type: "item" },
          { id: "retained-earnings", name: "Retained Earnings", amount: 204.17, level: 2, type: "item" },
          { id: "net-income-equity", name: "Net Income", amount: 1438.29, level: 2, type: "item" },
          { id: "total-equity", name: "Total Equity", amount: -7695.04, level: 1, type: "total" }
        ]
      },
      { id: "total-liabilities-equity", name: "TOTAL LIABILITIES AND EQUITY", amount: 23436.29, level: 0, type: "total" }
    ]
  }
];
