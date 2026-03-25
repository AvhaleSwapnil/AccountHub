export interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: string;
  date: string;
  dueDate: string;
  amount: number;
  balance: number;
  status: "paid" | "open" | "overdue" | "draft";
}

export const invoicesData: Invoice[] = [
  {
    id: "INV-001",
    invoiceNumber: "INV-2026-0042",
    customer: "Kestnerphysmed, LLC",
    date: "2026-03-15",
    dueDate: "2026-04-14",
    amount: 12450.0,
    balance: 12450.0,
    status: "open",
  },
  {
    id: "INV-002",
    invoiceNumber: "INV-2026-0041",
    customer: "Metro Orthopedic Group",
    date: "2026-03-22",
    dueDate: "2026-04-21",
    amount: 22100.0,
    balance: 22100.0,
    status: "open",
  },
  {
    id: "INV-003",
    invoiceNumber: "INV-2026-0040",
    customer: "Restore Muscle & Joint, LLC",
    date: "2026-03-18",
    dueDate: "2026-04-17",
    amount: 8320.5,
    balance: 8320.5,
    status: "open",
  },
  {
    id: "INV-004",
    invoiceNumber: "INV-2026-0039",
    customer: "Health First Chiropractic, Inc.",
    date: "2026-02-28",
    dueDate: "2026-03-30",
    amount: 9500.0,
    balance: 2150.0,
    status: "overdue",
  },
  {
    id: "INV-005",
    invoiceNumber: "INV-2026-0038",
    customer: "Pinnacle Sports Medicine",
    date: "2026-03-10",
    dueDate: "2026-04-09",
    amount: 5780.25,
    balance: 5780.25,
    status: "open",
  },
  {
    id: "INV-006",
    invoiceNumber: "INV-2026-0037",
    customer: "Summit Physical Therapy",
    date: "2026-03-20",
    dueDate: "2026-04-19",
    amount: 6200.0,
    balance: 0,
    status: "paid",
  },
  {
    id: "INV-007",
    invoiceNumber: "INV-2026-0036",
    customer: "Evergreen Wellness Center",
    date: "2026-01-15",
    dueDate: "2026-02-14",
    amount: 15200.0,
    balance: 15200.0,
    status: "overdue",
  },
  {
    id: "INV-008",
    invoiceNumber: "INV-2026-0035",
    customer: "Kestnerphysmed, LLC",
    date: "2026-03-01",
    dueDate: "2026-03-31",
    amount: 18750.0,
    balance: 0,
    status: "paid",
  },
  {
    id: "INV-009",
    invoiceNumber: "INV-2026-0034",
    customer: "Coastal Rehab Associates",
    date: "2025-12-20",
    dueDate: "2026-01-19",
    amount: 3400.0,
    balance: 3400.0,
    status: "overdue",
  },
  {
    id: "INV-010",
    invoiceNumber: "INV-2026-0033",
    customer: "Metro Orthopedic Group",
    date: "2026-02-15",
    dueDate: "2026-03-17",
    amount: 14300.0,
    balance: 0,
    status: "paid",
  },
];
