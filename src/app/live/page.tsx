"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Link from "next/link";
import { FiClock, FiActivity, FiRefreshCw, FiAlertCircle } from "react-icons/fi";

interface Booking {
  _id: string;
  tokenNumber: number;
  status: "pending" | "served" | "cancelled";
  createdAt: string;
  serviceId: {
    _id: string;
    name: string;
    category: string;
    currentQueue: number;
    averageTimePerToken?: number;
  };
}

export default function LiveStatusPage() {
  const { data: session, isPending } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchActiveBookings = useCallback(async (showToast = false) => {
    if (!session?.user) return;
    if (showToast) setRefreshing(true);
    try {
      const response = await fetch(
        `/api/bookings?userId=${session.user.id}`,
        { credentials: "include" }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch queue status");
      }
      const data: Booking[] = await response.json();
      // Only show pending bookings
      const active = data.filter((b) => b.status === "pending");
      setBookings(active);
      if (showToast) {
        toast.success("Queue status updated!");
      }
    } catch (error: unknown) {
      toast.error((error as Error).message || "Failed to load live status");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [session]);

  // Set up auto-refresh every 10 seconds
  useEffect(() => {
    if (session?.user) {
      // Check if user is owner/admin
      // @ts-expect-error - role is a custom property
      const role = session.user?.role || "user";
      if (role !== "user") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(false);
        return;
      }

      fetchActiveBookings();

      const interval = setInterval(() => {
        fetchActiveBookings(false);
      }, 10000); // 10 seconds

      return () => clearInterval(interval);
    }
  }, [session?.user, fetchActiveBookings]);

  if (isPending || loading) {
    return (
      <div className="min-h-[85vh] bg-zinc-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-zinc-500 mt-4 font-semibold">Loading live queue status...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-[85vh] bg-zinc-50 flex items-center justify-center p-8">
        <div className="text-center bg-white p-12 rounded-3xl shadow-sm border border-zinc-200/80 max-w-md">
          <FiAlertCircle className="text-5xl text-blue-600 mx-auto mb-6" />
          <h1 className="text-2xl font-black text-zinc-900 mb-2">Login Required</h1>
          <p className="text-zinc-500 mb-6 font-medium">Please log in as a customer to track your live queue status.</p>
          <Link
            href="/login"
            className="inline-block bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  // @ts-expect-error - role is a custom property
  const role = session.user?.role || "user";
  if (role !== "user") {
    return (
      <div className="min-h-[85vh] bg-zinc-50 flex items-center justify-center p-8">
        <div className="text-center bg-white p-12 rounded-3xl shadow-sm border border-zinc-200/80 max-w-md">
          <FiAlertCircle className="text-5xl text-amber-500 mx-auto mb-6" />
          <h1 className="text-2xl font-black text-zinc-900 mb-2">Customers Only</h1>
          <p className="text-zinc-500 mb-6 font-medium">
            This page is for customer live tracking. As a service owner/admin, you can manage queues from your dashboard.
          </p>
          <Link
            href="/dashboard/owner"
            className="inline-block bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-zinc-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Live Status</h1>
            <p className="text-zinc-500 mt-1">Real-time status of your active tickets.</p>
          </div>
          <button
            onClick={() => fetchActiveBookings(true)}
            disabled={refreshing}
            className="flex items-center gap-2 bg-white hover:bg-zinc-50 text-zinc-700 font-bold px-4 py-2.5 rounded-xl border border-zinc-200/80 shadow-sm transition-all disabled:opacity-50 text-sm"
          >
            <FiRefreshCw className={`text-zinc-500 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white border border-zinc-200/80 rounded-3xl p-16 text-center shadow-sm">
            <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-zinc-100">
              <FiClock className="text-2xl text-zinc-400" />
            </div>
            <h2 className="text-xl font-bold text-zinc-800">No Active Tickets</h2>
            <p className="text-zinc-500 max-w-sm mx-auto mt-2 font-medium">
              You do not have any active bookings right now. Find a service and book a token to track it here.
            </p>
            <Link
              href="/explore"
              className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20"
            >
              Explore Services
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {bookings.map((booking) => {
              const current = booking.serviceId?.currentQueue || 0;
              const diff = booking.tokenNumber - current - 1;
              const peopleAhead = diff > 0 ? diff : 0;

              return (
                <div
                  key={booking._id}
                  className="bg-white rounded-3xl border border-zinc-200/80 shadow-sm p-8 relative overflow-hidden"
                >
                  {/* Category badge */}
                  <span className="inline-block text-[10px] bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                    {booking.serviceId?.category}
                  </span>

                  <h3 className="text-xl font-black text-zinc-950 truncate mb-6">
                    {booking.serviceId?.name}
                  </h3>

                  <div className="grid grid-cols-2 gap-4 mb-6 border-b border-zinc-100 pb-6">
                    <div className="bg-zinc-50 p-4 rounded-2xl text-center border border-zinc-100">
                      <span className="text-xs font-bold text-zinc-400 uppercase">Your Token</span>
                      <p className="text-3xl font-black text-blue-600 mt-1">#{booking.tokenNumber}</p>
                    </div>

                    <div className="bg-zinc-50 p-4 rounded-2xl text-center border border-zinc-100">
                      <span className="text-xs font-bold text-zinc-400 uppercase">Now Serving</span>
                      <p className="text-3xl font-black text-zinc-800 mt-1">#{current}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center animate-pulse">
                      <FiActivity className="text-xl" />
                    </div>

                    <div>
                      {booking.tokenNumber <= current ? (
                        <>
                          <p className="font-black text-emerald-600 text-sm">It&apos;s your turn!</p>
                          <p className="text-xs text-zinc-500 font-medium">Please proceed to the counter.</p>
                        </>
                      ) : peopleAhead === 0 ? (
                        <>
                          <p className="font-black text-blue-600 text-sm">You are next in line!</p>
                          <p className="text-xs text-zinc-500 font-medium">Get ready, you&apos;re up next.</p>
                        </>
                      ) : (
                        <>
                          <p className="font-black text-zinc-800 text-sm">{peopleAhead} people ahead</p>
                          <p className="text-xs text-zinc-500 font-medium">
                            Estimated wait: ~{peopleAhead * (booking.serviceId?.averageTimePerToken || 20)} mins
                          </p>
                        </>
                      )}
                    </div>
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
