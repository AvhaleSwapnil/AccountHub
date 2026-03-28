export async function fetchInvoices() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/invoices`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch invoices: ${response.status}`);
  }
  
  return await response.json();
}
