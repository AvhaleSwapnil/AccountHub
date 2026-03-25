export interface AccountItem {
  name: string;
  value: number;
}

export interface AccountSection {
  name: string;
  items?: AccountItem[];
  subsections?: AccountSection[];
  total?: number;
}

export const balanceSheetData: AccountSection[] = [
  {
    name: "Assets",
    subsections: [
      {
        name: "Current Assets",
        subsections: [
          {
            name: "Bank Accounts",
            items: [
              { name: "KeyBank", value: 164432.27 },
              { name: "Mercury Checking", value: 50849.56 },
              { name: "PNC Bank", value: 16488.86 },
              { name: "TD Bank", value: -43387.66 },
            ],
            total: 188383.03,
          },
          {
            name: "Accounts Receivable",
            items: [{ name: "Accounts Receivable (A/R)", value: 225908.11 }],
            total: 225908.11,
          },
          {
            name: "Other Current Assets",
            items: [
              { name: "Inventory Asset", value: 12750.0 },
              { name: "Prepaid Expenses", value: 8400.0 },
              { name: "Undeposited Funds", value: 3250.0 },
            ],
            total: 24400.0,
          },
        ],
        total: 438691.14,
      },
      {
        name: "Fixed Assets",
        subsections: [
          {
            name: "Property & Equipment",
            items: [
              { name: "Office Equipment", value: 24500.0 },
              { name: "Furniture & Fixtures", value: 18200.0 },
              { name: "Computer Equipment", value: 31750.0 },
              { name: "Accumulated Depreciation", value: -22150.0 },
            ],
            total: 52300.0,
          },
        ],
        total: 52300.0,
      },
    ],
    total: 490991.14,
  },
  {
    name: "Liabilities",
    subsections: [
      {
        name: "Current Liabilities",
        subsections: [
          {
            name: "Accounts Payable",
            items: [{ name: "Accounts Payable (A/P)", value: 47832.45 }],
            total: 47832.45,
          },
          {
            name: "Credit Cards",
            items: [
              { name: "Chase Business Card", value: 5621.33 },
              { name: "Amex Platinum", value: 12488.92 },
            ],
            total: 18110.25,
          },
          {
            name: "Other Current Liabilities",
            items: [
              { name: "Payroll Liabilities", value: 15230.0 },
              { name: "Sales Tax Payable", value: 4820.5 },
              { name: "Accrued Expenses", value: 8900.0 },
            ],
            total: 28950.5,
          },
        ],
        total: 94893.2,
      },
      {
        name: "Long-Term Liabilities",
        items: [
          { name: "Business Loan (SBA)", value: 85000.0 },
          { name: "Equipment Financing", value: 12400.0 },
        ],
        total: 97400.0,
      },
    ],
    total: 192293.2,
  },
  {
    name: "Equity",
    subsections: [
      {
        name: "Owner's Equity",
        items: [
          { name: "Opening Balance Equity", value: 150000.0 },
          { name: "Owner's Investment", value: 75000.0 },
          { name: "Owner's Draw", value: -24000.0 },
          { name: "Retained Earnings", value: 62197.94 },
          { name: "Net Income", value: 35500.0 },
        ],
        total: 298697.94,
      },
    ],
    total: 298697.94,
  },
];
