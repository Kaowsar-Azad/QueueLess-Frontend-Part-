"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Link from "next/link";
import { FiClock, FiActivity, FiRefreshCw, FiAlertCircle, FiCheckCircle, FiMapPin } from "react-icons/fi";

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
    image?: string;
    images?: string[];
    address?: string;
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

  if (isPending || (loading && bookings.length === 0)) {
    return (
      <div className="min-h-[85vh] bg-zinc-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Live Status</h1>
              <p className="text-zinc-505 text-zinc-500 mt-1">Real-time status of your active tickets.</p>
            </div>
            <div className="h-10 bg-white border border-zinc-200/80 w-24 rounded-xl animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(2)].map((_, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-zinc-200/80 shadow-sm relative overflow-hidden flex flex-col animate-pulse">
                <div className="h-40 w-full bg-zinc-200 shrink-0"></div>
                <div className="p-6 flex flex-col flex-1 space-y-6">
                  <div className="h-16 bg-zinc-100 rounded-2xl w-full"></div>
                  <div className="grid grid-cols-2 gap-4 mt-auto">
                    <div className="bg-zinc-50 p-4 rounded-2xl h-20"></div>
                    <div className="bg-zinc-50 p-4 rounded-2xl h-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
              You do not have any active tokens right now. Find a service and reserve a token to track it here.
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
              const diff = booking.tokenNumber - current;
              const peopleAhead = diff > 0 ? diff : 0;
              const userName = session?.user?.name?.split(' ')[0] || 'there';

              const imgUrl = booking.serviceId?.images?.[0] || booking.serviceId?.image || "https://placehold.co/600x400?text=Queue+Tracker";

              return (
                <div
                  key={booking._id}
                  className={`bg-white rounded-3xl shadow-lg relative overflow-hidden group flex flex-col transition-all ${
                    booking.tokenNumber <= current 
                      ? "border-2 border-emerald-500 ring-4 ring-emerald-500/20 shadow-emerald-500/20" 
                      : "border border-zinc-200/80 shadow-blue-900/5"
                  }`}
                >
                  {/* Image Header */}
                  <div className="h-40 w-full bg-zinc-100 relative shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgUrl} alt={booking.serviceId?.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/40 to-transparent"></div>
                    
                    <span className="absolute top-4 left-4 inline-block text-[10px] bg-white/95 text-blue-700 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {booking.serviceId?.category}
                    </span>
                    
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-black text-white truncate shadow-sm mb-1">
                        {booking.serviceId?.name}
                      </h3>
                      {booking.serviceId?.address && (
                        <p className="text-white/80 text-xs font-medium flex items-center gap-1">
                          <FiMapPin /> {booking.serviceId.address}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    {/* Status Banner */}
                    <div className={`mb-6 p-4 rounded-2xl flex items-center gap-4 ${
                        booking.tokenNumber <= current 
                          ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20" 
                          : peopleAhead === 0 
                            ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" 
                            : "bg-blue-50 text-blue-900 border border-blue-100"
                      }`}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                        booking.tokenNumber <= current || peopleAhead === 0 ? "bg-white/20 text-white" : "bg-blue-100 text-blue-600"
                      }`}>
                        {booking.tokenNumber <= current ? <FiCheckCircle className="text-2xl" /> : <FiActivity className="text-2xl animate-pulse" />}
                      </div>
                      <div>
                        {booking.tokenNumber <= current ? (
                          <>
                            <p className="font-black text-lg">Hey {userName}, it&apos;s your turn!</p>
                            <p className="text-sm opacity-90 font-medium">Please proceed to the service counter immediately.</p>
                          </>
                        ) : peopleAhead === 0 ? (
                          <>
                            <p className="font-black text-lg">Hey {userName}, you are Next!</p>
                            <p className="text-sm opacity-90 font-medium">Get ready, you&apos;re up next.</p>
                          </>
                        ) : (
                          <>
                            <p className="font-black text-lg">Waiting in Queue, {userName}</p>
                            <p className="text-sm opacity-90 font-medium">
                              {peopleAhead} people ahead • ~{peopleAhead * (booking.serviceId?.averageTimePerToken || 20)} mins wait
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Tokens Grid */}
                    <div className="grid grid-cols-2 gap-4 mt-auto border-t border-zinc-100 pt-6">
                      <div className="bg-zinc-50 p-4 rounded-2xl text-center border border-zinc-100 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-zinc-200"></div>
                        <span className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider">Now Serving</span>
                        <p className="text-3xl font-black text-zinc-800 mt-2">#{current}</p>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-2xl text-center border border-blue-100 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                        <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider">Your Token</span>
                        <p className="text-3xl font-black text-blue-700 mt-2">#{booking.tokenNumber}</p>
                      </div>
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
