"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Link from "next/link";
import { FiClock, FiXCircle, FiActivity } from "react-icons/fi";

interface Booking {
  _id: string;
  tokenNumber: number;
  status: "pending" | "served" | "cancelled";
  createdAt: string;
  serviceId: {
    _id: string;
    name: string;
    category: string;
    startHour: string;
    endHour: string;
    currentQueue: number;
  };
}

export default function UserDashboard() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!session?.user) return;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/bookings?userId=${session.user.id}`,
          { credentials: "include" }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tickets");
        }
        const data = await response.json();
        setBookings(data);
      } catch (error: unknown) {
        toast.error((error as Error).message || "Failed to load tickets");
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      fetchBookings();
    }
  }, [session?.user]);

  const handleCancelBooking = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/bookings/${id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ status: "cancelled" })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel ticket");
      }

      toast.success("Booking successfully cancelled.");
      setBookings(
        bookings.map((b) => (b._id === id ? { ...b, status: "cancelled" as const } : b))
      );
    } catch (error: unknown) {
      toast.error((error as Error).message || "Failed to cancel booking");
    }
  };

  if (!session?.user) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center">
        <p className="text-zinc-600 font-semibold">Please log in to view your dashboard.</p>
      </div>
    );
  }

  const activeTickets = bookings.filter((b) => b.status === "pending");
  const pastTickets = bookings.filter((b) => b.status !== "pending");

  return (
    <div className="min-h-[85vh] bg-zinc-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-3xl border border-zinc-200/80 shadow-sm p-8 mb-8">
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">My Tickets</h1>
          <p className="text-zinc-500 mt-1">View, track, or cancel your active queue tickets.</p>
        </div>

        {loading ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-zinc-200/80 shadow-sm">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-zinc-500 mt-4">Loading your tickets...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white border border-zinc-200/80 rounded-3xl p-12 text-center shadow-sm">
            <p className="text-zinc-600 text-lg font-semibold">You don&apos;t have any active tickets right now.</p>
            <Link
              href="/explore"
              className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20"
            >
              Explore & Find a Service
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* Active Tickets */}
            {activeTickets.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-zinc-800 mb-4 flex items-center gap-2">
                  <FiActivity className="text-blue-500" /> Active Tickets
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeTickets.map((ticket) => (
                    <div
                      key={ticket._id}
                      className="bg-white rounded-3xl border border-blue-100 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-2 font-black rounded-bl-2xl text-lg">
                        #{ticket.tokenNumber}
                      </div>

                      <div className="space-y-3">
                        <span className="inline-block text-[10px] bg-blue-50 text-blue-700 font-bold px-2.5 py-0.5 rounded-full uppercase">
                          {ticket.serviceId?.category || "Service"}
                        </span>
                        <h3 className="text-lg font-bold text-zinc-900 pr-12 line-clamp-1">
                          {ticket.serviceId?.name}
                        </h3>

                        <div className="flex flex-col gap-2 pt-2 border-t border-zinc-100 text-xs font-semibold text-zinc-500">
                          <span className="flex items-center gap-1.5">
                            <FiClock /> {ticket.serviceId?.startHour} - {ticket.serviceId?.endHour}
                          </span>
                          <span className="flex items-center gap-1.5 text-blue-600">
                            <FiActivity /> Serving Token: #{ticket.serviceId?.currentQueue || 0}
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
                        <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-3 py-1 rounded-full">
                          Active Wait
                        </span>
                        
                        <button
                          onClick={() => handleCancelBooking(ticket._id)}
                          className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg font-bold flex items-center gap-1 transition-colors"
                        >
                          <FiXCircle /> Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Past/Cancelled Tickets */}
            {pastTickets.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-zinc-800 mb-4">Past Tickets History</h2>
                <div className="bg-white rounded-3xl border border-zinc-200/80 shadow-sm p-6 overflow-hidden">
                  <div className="divide-y divide-zinc-100">
                    {pastTickets.map((ticket) => (
                      <div
                        key={ticket._id}
                        className="py-4 flex items-center justify-between first:pt-0 last:pb-0"
                      >
                        <div>
                          <h4 className="font-bold text-zinc-800 text-sm">
                            {ticket.serviceId?.name || "Deleted Service"}
                          </h4>
                          <p className="text-xs text-zinc-400 mt-1">
                            Booked on {new Date(ticket.createdAt).toLocaleDateString()} • Token #{ticket.tokenNumber}
                          </p>
                        </div>

                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full ${
                            ticket.status === "served"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-zinc-100 text-zinc-500"
                          }`}
                        >
                          {ticket.status.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
