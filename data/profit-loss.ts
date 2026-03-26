import { FinancialLine } from "./balance-sheet";

export const profitLossData: FinancialLine[] = [
  {
    id: "income",
    name: "INCOME",
    amount: 142450.00,
    level: 0,
    type: "header",
    children: [
      {
        id: "sales",
        name: "Sales / Services",
        amount: 138450.00,
        level: 1,
        type: "header",
        children: [
          { id: "consulting", name: "Consulting Income", amount: 125000.00, level: 2, type: "item" },
          { id: "software", name: "Software License Sales", amount: 13450.00, level: 2, type: "item" },
          { id: "training", name: "Training Fees", amount: 0, level: 2, type: "item" },
        ]
      },
      {
        id: "other-income",
        name: "Other Income",
        amount: 4000.00,
        level: 1,
        type: "header",
        children: [
          { id: "interest", name: "Interest Income", amount: 650.00, level: 2, type: "item" },
          { id: "misc-income", name: "Miscellaneous Income", amount: 3350.00, level: 2, type: "item" },
        ]
      },
      { id: "total-income", name: "Total Income", amount: 142450.00, level: 1, type: "total" }
    ]
  },
  {
    id: "cogs",
    name: "COST OF GOODS SOLD (COGS)",
    amount: 28450.00,
    level: 0,
    type: "header",
    children: [
      { id: "server-costs", name: "Server & Infrastructure Costs", amount: 12450.00, level: 1, type: "item" },
      { id: "third-party", name: "Third Party API Services", amount: 6500.00, level: 1, type: "item" },
      { id: "contractors", name: "External Labor - COGS", amount: 9500.00, level: 1, type: "item" },
      { id: "total-cogs", name: "Total COGS", amount: 28450.00, level: 0, type: "total" }
    ]
  },
  { id: "gross-profit", name: "GROSS PROFIT", amount: 114000.00, level: 0, type: "total" },
  {
    id: "expenses",
    name: "EXPENSES",
    amount: 85230.50,
    level: 0,
    type: "header",
    children: [
      {
        id: "operating-expenses",
        name: "Operating Expenses",
        amount: 52450.25,
        level: 1,
        type: "header",
        children: [
          { id: "advertising", name: "Advertising and Marketing", amount: 12450.00, level: 2, type: "item" },
          { id: "rent", name: "Rent and Lease", amount: 25000.00, level: 2, type: "item" },
          { id: "utilities", name: "Utilities", amount: 3500.00, level: 2, type: "item" },
          { id: "insurance", name: "Insurance", amount: 6500.25, level: 2, type: "item" },
          { id: "office-exp", name: "Office Expenses", amount: 5000.00, level: 2, type: "item" },
        ]
      },
      {
        id: "payroll-expenses",
        name: "Payroll Expenses",
        amount: 32780.25,
        level: 1,
        type: "header",
        children: [
          { id: "salaries", name: "Salaries & Wages", amount: 28500.00, level: 2, type: "item" },
          { id: "payroll-taxes", name: "Payroll Taxes", amount: 3280.25, level: 2, type: "item" },
          { id: "benefits", name: "Staff Benefits", amount: 1000.00, level: 2, type: "item" },
        ]
      },
      { id: "total-expenses", name: "Total Expenses", amount: 85230.50, level: 1, type: "total" }
    ]
  },
  { id: "net-operating-income", name: "NET OPERATING INCOME", amount: 28769.50, level: 0, type: "total" },
  {
    id: "other-expenses",
    name: "Other Expenses",
    amount: 11509.50,
    level: 0,
    type: "header",
    children: [
      { id: "interest-exp", name: "Interest Expense", amount: 4509.50, level: 1, type: "item" },
      { id: "tax-exp", name: "Income Tax Expense", amount: 7000.00, level: 1, type: "item" },
      { id: "total-other-expenses", name: "Total Other Expenses", amount: 11509.50, level: 0, type: "total" }
    ]
  },
  { id: "net-income", name: "NET INCOME", amount: 17260.00, level: 0, type: "total" }
];
