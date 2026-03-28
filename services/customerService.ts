export async function fetchCustomers() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/customers`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch customers: ${response.status}`);
  }
  
  return await response.json();
}
