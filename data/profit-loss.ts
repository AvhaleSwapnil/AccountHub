export interface PLItem {
  name: string;
  value: number;
}

export interface PLSection {
  name: string;
  items?: PLItem[];
  subsections?: PLSection[];
  total?: number;
}

export const profitLossData: PLSection[] = [
  {
    name: "Income",
    subsections: [
      {
        name: "Revenue",
        items: [
          { name: "Consulting Services", value: 185400.0 },
          { name: "Software Subscriptions", value: 92750.0 },
          { name: "Implementation Fees", value: 45200.0 },
          { name: "Training & Support", value: 18600.0 },
        ],
        total: 341950.0,
      },
      {
        name: "Other Income",
        items: [
          { name: "Interest Earned", value: 1240.5 },
          { name: "Referral Bonuses", value: 3800.0 },
        ],
        total: 5040.5,
      },
    ],
    total: 346990.5,
  },
  {
    name: "Cost of Goods Sold",
    subsections: [
      {
        name: "Direct Costs",
        items: [
          { name: "Contractor Payments", value: 62400.0 },
          { name: "Software Licenses (Resold)", value: 28750.0 },
          { name: "Hosting & Infrastructure", value: 14200.0 },
          { name: "Third-Party Integrations", value: 5600.0 },
        ],
        total: 110950.0,
      },
    ],
    total: 110950.0,
  },
  {
    name: "Gross Profit",
    total: 236040.5,
  },
  {
    name: "Expenses",
    subsections: [
      {
        name: "Operating Expenses",
        items: [
          { name: "Salaries & Wages", value: 98500.0 },
          { name: "Employee Benefits", value: 18200.0 },
          { name: "Payroll Taxes", value: 12400.0 },
        ],
        total: 129100.0,
      },
      {
        name: "Marketing & Advertising",
        items: [
          { name: "Digital Advertising", value: 12800.0 },
          { name: "Content Marketing", value: 6500.0 },
          { name: "Events & Conferences", value: 4200.0 },
        ],
        total: 23500.0,
      },
      {
        name: "General & Administrative",
        items: [
          { name: "Office Rent", value: 24000.0 },
          { name: "Utilities", value: 3600.0 },
          { name: "Insurance", value: 8400.0 },
          { name: "Office Supplies", value: 2450.0 },
          { name: "Professional Fees", value: 7200.0 },
          { name: "Software & Tools", value: 5890.5 },
          { name: "Travel & Meals", value: 3400.0 },
          { name: "Depreciation", value: 6200.0 },
        ],
        total: 61140.5,
      },
    ],
    total: 213740.5,
  },
  {
    name: "Net Operating Income",
    total: 22300.0,
  },
  {
    name: "Other Expenses",
    items: [
      { name: "Interest Expense", value: 4200.0 },
      { name: "Bank Fees", value: 840.0 },
    ],
    total: 5040.0,
  },
  {
    name: "Net Income",
    total: 17260.0,
  },
];
