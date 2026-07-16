"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { FiActivity, FiSettings, FiPlus } from "react-icons/fi";

interface Service {
  _id: string;
  name: string;
  category: string;
  currentQueue: number;
  totalTokens: number;
}

interface Booking {
  _id: string;
  status: "pending" | "served" | "cancelled";
}

export default function OwnerDashboard() {
  const { data: session, isPending } = useSession();
  const [services, setServices] = useState<Service[]>([]);
  const [pendingCounts, setPendingCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwnerData = async () => {
      if (!session?.user) return;
      try {
        const res = await fetch(`/api/services?ownerId=${session.user.id}`, {
          credentials: "include"
        });
        if (!res.ok) throw new Error("Failed to load services");
        const servicesData: Service[] = await res.json();
        setServices(servicesData);

        // Fetch bookings for each service to count pending
        const counts: Record<string, number> = {};
        for (const s of servicesData) {
          const bookingsRes = await fetch(`/api/bookings?serviceId=${s._id}`, {
            credentials: "include"
          });
          if (bookingsRes.ok) {
            const bookingsData: Booking[] = await bookingsRes.json();
            const pending = bookingsData.filter(b => b.status === "pending").length;
            counts[s._id] = pending;
          } else {
            counts[s._id] = 0;
          }
        }
        setPendingCounts(counts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      fetchOwnerData();
    }
  }, [session?.user]);

  if (isPending) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center bg-zinc-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // @ts-expect-error - role is a custom property
  const role = session?.user?.role || "user";
  if (!session?.user || role !== "owner") {
    return (
      <div className="min-h-[85vh] flex items-center justify-center bg-zinc-50">
        <p className="text-zinc-600 font-semibold">Access Denied. Owners Only.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-6 sm:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-3xl border border-zinc-200/80 shadow-sm p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Service Management</h1>
            <p className="text-zinc-505 text-zinc-500 mt-1">Manage your queues, services, and view live analytics.</p>
          </div>
          <Link href="/items/add" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3 rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center gap-2 text-sm">
            <FiPlus className="text-lg" /> Start New Queue
          </Link>
        </div>

        {/* Loading / Empty / Content */}
        {loading ? (
          <div className="bg-white rounded-3xl border border-zinc-200/80 p-12 text-center shadow-sm">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-zinc-500 mt-4 font-semibold">Loading active queues...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="bg-white rounded-3xl border border-zinc-200/80 p-16 text-center shadow-sm">
            <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-zinc-100">
              <FiActivity className="text-2xl text-zinc-400" />
            </div>
            <h3 className="text-xl font-bold text-zinc-800">No Active Queues</h3>
            <p className="text-zinc-500 max-w-sm mx-auto mt-2 font-medium">
              You haven&apos;t created any queues yet. Start one to begin managing your customers.
            </p>
            <Link href="/items/add" className="mt-6 inline-block bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20">
              Start Your First Queue
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => {
              const pending = pendingCounts[service._id] || 0;
              return (
                <div key={service._id} className="bg-white rounded-3xl border border-zinc-200/80 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-blue-50 text-blue-700 px-4 py-1.5 font-bold rounded-bl-2xl text-xs uppercase tracking-wider">
                    {service.category}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-black text-zinc-950 truncate pr-16">{service.name}</h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50/50 border border-blue-100/50 p-4 rounded-2xl text-center">
                        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">Now Serving</span>
                        <p className="text-2xl font-black text-blue-900 mt-1">#{service.currentQueue || 0}</p>
                      </div>

                      <div className={`p-4 rounded-2xl text-center border ${pending > 0 ? "bg-emerald-50/50 border-emerald-100/50" : "bg-zinc-50 border-zinc-100"}`}>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Waiting Line</span>
                        <p className={`text-2xl font-black mt-1 ${pending > 0 ? "text-emerald-700" : "text-zinc-800"}`}>{pending} {pending === 1 ? "person" : "people"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-100 flex gap-3">
                    <Link href={`/items/manage/${service._id}`} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-blue-600/20 text-center flex items-center justify-center gap-2 text-sm">
                      <FiActivity className="text-base" /> Manage Queue
                    </Link>
                    <Link href="/items/manage" className="bg-zinc-50 hover:bg-zinc-100 text-zinc-700 font-bold p-3 rounded-xl border border-zinc-200/80 transition-colors" title="Service Settings">
                      <FiSettings className="text-lg" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
