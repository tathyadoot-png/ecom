"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { getAllStores, updateStoreStatus } from "@/services/store.service";
import { Badge } from "@/components/ui/badge";

const STATUS_VARIANT: Record<string, "success" | "warning" | "destructive" | "muted"> = {
  APPROVED: "success",
  PENDING: "warning",
  REJECTED: "destructive",
  SUSPENDED: "destructive",
};

export default function StoresPage() {
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStores = async () => {
    try {
      const res = await getAllStores();
      setStores(res.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch stores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleStatusChange = async (storeId: string, status: string) => {
    try {
      await updateStoreStatus(storeId, status);
      toast.success("Store status updated");
      fetchStores();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update store");
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-muted-foreground">Loading stores...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Stores</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage vendor stores</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-4 text-left font-medium text-muted-foreground">Store</th>
                <th className="p-4 text-left font-medium text-muted-foreground">Owner</th>
                <th className="p-4 text-left font-medium text-muted-foreground">Status</th>
                <th className="p-4 text-left font-medium text-muted-foreground">Created</th>
                <th className="p-4 text-left font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {stores.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-14 text-center text-muted-foreground">
                    No stores found
                  </td>
                </tr>
              ) : (
                stores.map((store) => (
                  <tr key={store._id} className="transition-colors hover:bg-muted/30">
                    <td className="p-4">
                      <Link href={`/stores/${store._id}`} className="font-medium text-foreground hover:underline">
                        {store.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">{store.slug}</p>
                    </td>
                    <td className="p-4 text-muted-foreground">{store.owner?.name}</td>
                    <td className="p-4">
                      <Badge variant={STATUS_VARIANT[store.status] || "muted"}>{store.status}</Badge>
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {new Date(store.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <select
                        value={store.status}
                        onChange={(e) => handleStatusChange(store._id, e.target.value)}
                        className="rounded-lg border border-input bg-transparent px-3 py-1.5 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/20"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="APPROVED">APPROVED</option>
                        <option value="REJECTED">REJECTED</option>
                        <option value="SUSPENDED">SUSPENDED</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
