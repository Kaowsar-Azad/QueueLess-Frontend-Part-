"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";

interface Stats {
  totalUsers: number;
  totalOwners: number;
  totalServices: number;
  totalBookings: number;
}

export default function AdminDashboard() {
  const { data: session, isPending } = useSession();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const response = await fetch(
          `/api/admin/stats`,
          { credentials: "include" }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch admin statistics");
        }
        const data = await response.json();
        setStats(data);
      } catch (error: unknown) {
        toast.error((error as Error).message || "Failed to load admin stats");
      } finally {
        setLoading(false);
      }
    };

    if (session?.user && (session.user as { role?: string }).role === "admin") {
      fetchAdminStats();
    }
  }, [session]);

  if (isPending) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center bg-zinc-950">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session?.user || (session.user as { role?: string }).role !== "admin") {
    return (
      <div className="min-h-[85vh] flex items-center justify-center bg-zinc-950">
        <p className="text-zinc-600 font-semibold">Access Denied. Admins Only.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-zinc-50 p-8 sm:p-12">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm border border-zinc-200/80 p-8">
        <div className="border-b border-zinc-100 pb-6 mb-8">
          <h1 className="text-3xl font-extrabold text-zinc-900 mb-2">Admin Control Panel</h1>
          <p className="text-zinc-600">System overview, user management, and live platform analytics.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 space-y-3 animate-pulse">
                <div className="h-4 bg-zinc-200 rounded w-1/2"></div>
                <div className="h-10 bg-zinc-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 transition-all hover:shadow-sm">
              <p className="text-sm font-semibold text-blue-800 uppercase tracking-wider">Total Users</p>
              <h2 className="text-4xl font-black text-blue-900 mt-2">
                {stats?.totalUsers.toLocaleString() || 0}
              </h2>
            </div>
            
            <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6 transition-all hover:shadow-sm">
              <p className="text-sm font-semibold text-purple-800 uppercase tracking-wider">Service Owners</p>
              <h2 className="text-4xl font-black text-purple-900 mt-2">
                {stats?.totalOwners.toLocaleString() || 0}
              </h2>
            </div>
            
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 transition-all hover:shadow-sm">
              <p className="text-sm font-semibold text-zinc-800 uppercase tracking-wider">Total Bookings</p>
              <h2 className="text-4xl font-black text-zinc-900 mt-2">
                {stats?.totalBookings.toLocaleString() || 0}
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
