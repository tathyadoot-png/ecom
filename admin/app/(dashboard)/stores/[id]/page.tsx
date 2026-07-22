"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";

import { getStoreById, updateStoreFlags } from "@/services/store.service";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const STATUS_VARIANT: Record<string, "success" | "warning" | "destructive" | "muted"> = {
  APPROVED: "success",
  PENDING: "warning",
  REJECTED: "destructive",
  SUSPENDED: "destructive",
};

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-bold tracking-tight">{value}</p>
    </div>
  );
}

export default function StoreDetailsPage() {
  const params = useParams();
  const [store, setStore] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [savingFlags, setSavingFlags] = useState(false);

  const fetchStore = async () => {
    try {
      const res = await getStoreById(params.id as string);
      setStore(res.data.store);
      setStats(res.data.stats);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const handleFlagChange = async (flags: { featured?: boolean; verified?: boolean; displayOrder?: number }) => {
    setSavingFlags(true);
    try {
      await updateStoreFlags(params.id as string, flags);
      setStore((prev: any) => ({ ...prev, ...flags }));
      toast.success("Curation settings updated");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update");
    } finally {
      setSavingFlags(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-muted-foreground">Loading store...</div>;
  }

  if (!store) {
    return <div className="py-20 text-center text-muted-foreground">Store not found</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Store Details</h1>
        <p className="mt-1 text-sm text-muted-foreground">Vendor store information</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Products" value={stats?.totalProducts || 0} />
        <StatCard label="Orders" value={stats?.totalOrders || 0} />
        <StatCard label="Revenue" value={`₹${stats?.revenue || 0}`} />
      </div>

      {store.banner && (
        <div className="relative h-56 overflow-hidden rounded-2xl border border-border">
          <Image src={store.banner} alt={store.name} fill className="object-cover" />
        </div>
      )}

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex flex-col items-center gap-5 sm:flex-row">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
            {store.logo && <Image src={store.logo} alt={store.name} fill className="object-cover" />}
          </div>
          <div>
            <h2 className="text-xl font-bold">{store.name}</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">{store.slug}</p>
            <div className="mt-3">
              <Badge variant={STATUS_VARIANT[store.status] || "muted"}>{store.status}</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="mb-4 text-base font-semibold">Curation</h3>
        <p className="mb-5 text-sm text-muted-foreground">
          Controls what appears on the public Homepage and Artisan Directory. Only admins can set these.
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <label className="flex items-center gap-2.5">
            <Switch
              checked={!!store.featured}
              disabled={savingFlags}
              onCheckedChange={(checked) => handleFlagChange({ featured: checked })}
            />
            <span className="text-sm font-medium">Featured</span>
          </label>
          <label className="flex items-center gap-2.5">
            <Switch
              checked={!!store.verified}
              disabled={savingFlags}
              onCheckedChange={(checked) => handleFlagChange({ verified: checked })}
            />
            <span className="text-sm font-medium">Verified</span>
          </label>
          <div className="space-y-1.5">
            <Label>Display Order</Label>
            <Input
              type="number"
              min={0}
              defaultValue={store.displayOrder ?? 0}
              disabled={savingFlags}
              onBlur={(e) => handleFlagChange({ displayOrder: Number(e.target.value) || 0 })}
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="mb-3 text-base font-semibold">Description</h3>
        <p className="text-sm text-muted-foreground">{store.description || "No description"}</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="mb-5 text-base font-semibold">Owner Information</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <p className="text-xs text-muted-foreground">Name</p>
            <p className="mt-1 text-sm font-semibold">{store.owner?.name}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Email</p>
            <p className="mt-1 text-sm font-semibold">{store.owner?.email}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Role</p>
            <p className="mt-1 text-sm font-semibold">{store.owner?.role}</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="mb-5 text-base font-semibold">Store Meta</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <p className="text-xs text-muted-foreground">Created</p>
            <p className="mt-1 text-sm font-medium">{new Date(store.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Updated</p>
            <p className="mt-1 text-sm font-medium">{new Date(store.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
