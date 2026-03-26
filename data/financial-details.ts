import { FinancialLine } from "./balance-sheet";

export interface Transaction {
  id: string;
  date: string;
  type: string;
  num: string;
  name: string;
  memo: string;
  split: string;
  amount: number;
  balance: number;
}

export interface AccountDetail {
  id: string;
  name: string;
  transactions: Transaction[];
  total: number;
}

export interface DetailedFinancialData {
  groups: {
    id: string;
    name: string;
    accounts: AccountDetail[];
    total: number;
  }[];
  grandTotal: number;
}

export const profitLossDetailData: DetailedFinancialData = {
  groups: [
    {
      id: "income",
      name: "Income",
      total: 142450.00,
      accounts: [
        {
          id: "consulting",
          name: "Consulting Income",
          total: 125000.00,
          transactions: [
            { id: "t1", date: "2026-03-05", type: "Invoice", num: "1041", name: "Kestnerphysmed, LLC", memo: "March Consulting Services", split: "Accounts Receivable", amount: 45000.00, balance: 45000.00 },
            { id: "t2", date: "2026-03-12", type: "Invoice", num: "1045", name: "Metro Orthopedic Group", memo: "Q1 Analytics Review", split: "Accounts Receivable", amount: 55000.00, balance: 100000.00 },
            { id: "t3", date: "2026-03-20", type: "Invoice", num: "1048", name: "Restore Muscle & Joint", memo: "Monthly Maintenance", split: "Accounts Receivable", amount: 25000.00, balance: 125000.00 },
          ]
        },
        {
          id: "software",
          name: "Software License Sales",
          total: 13450.00,
          transactions: [
            { id: "s1", date: "2026-03-02", type: "Sales Receipt", num: "SR-99", name: "Summit Physical Therapy", memo: "Annual Subscription", split: "Checking", amount: 8450.00, balance: 8450.00 },
            { id: "s2", date: "2026-03-15", type: "Sales Receipt", num: "SR-102", name: "Health First Chiro", memo: "Monthly Seat Expansion", split: "Checking", amount: 5000.00, balance: 13450.00 },
          ]
        }
      ]
    },
    {
      id: "expenses",
      name: "Expenses",
      total: 85230.50,
      accounts: [
        {
          id: "advertising",
          name: "Advertising and Marketing",
          total: 12450.00,
          transactions: [
            { id: "e1", date: "2026-03-01", type: "Bill", num: "FB-03", name: "Meta Platforms", memo: "March Ad Spend", split: "Accounts Payable", amount: 8500.00, balance: 8500.00 },
            { id: "e2", date: "2026-03-10", type: "Expense", num: "CHASE-11", name: "Google Ads", memo: "Search Campaign - March", split: "Credit Card", amount: 3950.00, balance: 12450.00 },
          ]
        },
        {
          id: "rent",
          name: "Rent and Lease",
          total: 25000.00,
          transactions: [
            { id: "r1", date: "2026-03-01", type: "Check", num: "2044", name: "Westside Properties", memo: "Office Rent - March", split: "Checking", amount: 25000.00, balance: 25000.00 },
          ]
        }
      ]
    }
  ],
  grandTotal: 17260.00 // Net Income
};

export const balanceSheetDetailData: DetailedFinancialData = {
  groups: [
    {
      id: "assets",
      name: "Assets",
      total: 23436.29,
      accounts: [
        {
          id: "checking",
          name: "Checking",
          total: 1201.00,
          transactions: [
            { id: "b1", date: "2026-03-01", type: "Deposit", num: "", name: "Interest Earned", memo: "Monthly Interest", split: "Interest Income", amount: 1.00, balance: 1201.00 },
            { id: "b2", date: "2026-03-05", type: "Payment", num: "102", name: "Vendor X", memo: "Supplies", split: "Office Expense", amount: -200.00, balance: 1001.00 },
          ]
        },
        {
          id: "truck",
          name: "Truck:Original Cost",
          total: 13495.00,
          transactions: [
            { id: "v1", date: "2026-03-01", type: "Journal Entry", num: "JE-1", name: "", memo: "Initial Asset Recording", split: "Fixed Assets", amount: 13495.00, balance: 13495.00 },
          ]
        }
      ]
    },
    {
      id: "liabilities",
      name: "Liabilities",
      total: 31131.33,
      accounts: [
        {
          id: "mastercard",
          name: "Mastercard",
          total: 157.72,
          transactions: [
            { id: "cc1", date: "2026-03-12", type: "Expense", num: "", name: "AWS", memo: "Cloud Hosting", split: "IT Services", amount: 157.72, balance: 157.72 },
          ]
        },
        {
          id: "notes-payable",
          name: "Notes Payable",
          total: 25000.00,
          transactions: [
            { id: "lp1", date: "2026-03-01", type: "Bill", num: "LN-44", name: "SBA Bank", memo: "Term Loan", split: "Loans Payable", amount: 25000.00, balance: 25000.00 },
          ]
        }
      ]
    }
  ],
  grandTotal: 23436.29
};
