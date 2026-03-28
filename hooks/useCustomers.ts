import { useState, useEffect } from "react";
import { fetchCustomers } from "@/services/customerService";
import { Customer } from "@/data/customers";

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadCustomers() {
      try {
        const response = await fetchCustomers();
        const apiCustomers = Array.isArray(response?.QueryResponse?.Customer)
          ? response.QueryResponse.Customer
          : Array.isArray(response?.data?.QueryResponse?.Customer)
            ? response.data.QueryResponse.Customer
            : (Array.isArray(response) ? response : []);

        const mappedCustomers = apiCustomers.map((c: any) => ({
          id: c.Id || c.id,
          name: c.DisplayName || c.FullyQualifiedName || c.GivenName || "Unknown",
          email: c.PrimaryEmailAddr?.Address || c.email || "N/A",
          phone: c.PrimaryPhone?.FreeFormNumber || c.phone || "N/A",
          balance: parseFloat(c.Balance) || parseFloat(c.balance) || 0,
          status: (parseFloat(c.Balance) > 0 || parseFloat(c.balance) > 0) ? "overdue" : (c.Active === false ? "inactive" : "active"),
          lastUpdated: c.MetaData?.LastUpdatedTime ? new Date(c.MetaData.LastUpdatedTime).toLocaleDateString() : "N/A",
          createdDate: c.MetaData?.CreateTime ? new Date(c.MetaData.CreateTime).toLocaleDateString() : "N/A",
        }));

        if (isMounted) {
          setCustomers(mappedCustomers);
          setIsLoading(false);
          setError(null);
        }
      } catch (err: any) {
        console.error("Failed to load customers API:", err);
        if (isMounted) {
          setError("Failed to load clients. Please try again later.");
          setIsLoading(false);
        }
      }
    }
    loadCustomers();

    return () => { isMounted = false; };
  }, []);

  return { customers, setCustomers, isLoading, error };
}
