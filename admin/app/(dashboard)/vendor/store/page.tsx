"use client";

import { useEffect, useState } from "react";

import { getMyStore } from "@/services/store.service";
import { Badge } from "@/components/ui/badge";
import StoreProfileForm from "@/components/stores/store-profile-form";

const STATUS_VARIANT: Record<string, "success" | "warning" | "destructive" | "muted"> = {
  APPROVED: "success",
  PENDING: "warning",
  REJECTED: "destructive",
  SUSPENDED: "destructive",
};

export default function VendorStorePage() {
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState<any>(null);

  const fetchStore = async () => {
    try {
      const res = await getMyStore();
      setStore(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStore();
  }, []);

  if (loading) {
    return <div className="py-20 text-center text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Store</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {store ? "Manage your artisan profile" : "Create your vendor store to get started"}
          </p>
        </div>
        {store && (
          <Badge variant={STATUS_VARIANT[store.status] || "muted"}>{store.status}</Badge>
        )}
      </div>

      <StoreProfileForm
        mode={store ? "edit" : "create"}
        initialData={store}
        onSaved={fetchStore}
      />
    </div>
  );
}
