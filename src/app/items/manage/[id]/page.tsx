"use client";

import { useEffect, useState, use } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Link from "next/link";
import { FiArrowLeft, FiCheck, FiX, FiUser, FiActivity } from "react-icons/fi";

interface Booking {
  _id: string;
  tokenNumber: number;
  userName: string;
  userId: string;
  status: "pending" | "served" | "cancelled";
  createdAt: string;
}

interface Service {
  _id: string;
  name: string;
  ownerId: string;
  currentQueue: number;
  totalTokens: number;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ServiceBookingsPage({ params }: PageProps) {
  const { id: serviceId } = use(params);
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchServiceAndBookings = async () => {
    if (!session?.user) return;
    try {
      // Fetch service details
      const serviceResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/services/${serviceId}`,
        { credentials: "include" }
      );
      if (!serviceResponse.ok) {
        throw new Error("Failed to fetch service details");
      }
      const serviceData = await serviceResponse.json();
      
      // Authorization Check: Only owner of the service can manage its bookings
      if (serviceData.ownerId !== session.user.id) {
        toast.error("Unauthorized to access this service's bookings");
        return;
      }
      setService(serviceData);

      // Fetch bookings for this service
      const bookingsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/bookings?serviceId=${serviceId}`,
        { credentials: "include" }
      );
      if (!bookingsResponse.ok) {
        throw new Error("Failed to fetch bookings");
      }
      const bookingsData = await bookingsResponse.json();
      setBookings(bookingsData);
    } catch (error: unknown) {
      toast.error((error as Error).message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchServiceAndBookings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user, serviceId]);

  const handleUpdateStatus = async (bookingId: string, status: "served" | "cancelled") => {
    const actionText = status === "served" ? "serve" : "cancel";
    if (!confirm(`Are you sure you want to ${actionText} this booking?`)) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/bookings/${bookingId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update booking status`);
      }

      toast.success(`Booking successfully marked as ${status}.`);
      
      // Refresh both service and bookings
      await fetchServiceAndBookings();
    } catch (error: unknown) {
      toast.error((error as Error).message || `Failed to update status`);
    }
  };

  if (!session?.user) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center">
        <p className="text-zinc-600 font-semibold">Please log in to manage bookings.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center bg-zinc-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-zinc-500 mt-4 font-medium">Loading bookings data...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center bg-zinc-50">
        <p className="text-zinc-600 font-bold">Service not found or access denied.</p>
      </div>
    );
  }

  const pendingBookings = bookings.filter((b) => b.status === "pending").sort((a, b) => a.tokenNumber - b.tokenNumber);
  const completedBookings = bookings.filter((b) => b.status !== "pending");

  return (
    <div className="min-h-[85vh] bg-zinc-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/items/manage"
          className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-800 mb-6 transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Back to Manage Services
        </Link>

        {/* Dashboard Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-3xl border border-zinc-200/80 shadow-sm p-6">
            <span className="text-xs font-bold text-zinc-400 uppercase">Service Name</span>
            <h1 className="text-xl font-black text-zinc-900 mt-1 truncate">{service.name}</h1>
          </div>

          <div className="bg-white rounded-3xl border border-zinc-200/80 shadow-sm p-6 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-zinc-400 uppercase">Currently Serving</span>
              <p className="text-3xl font-black text-blue-600 mt-1">#{service.currentQueue || 0}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FiActivity className="text-xl" />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-zinc-200/80 shadow-sm p-6 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-zinc-400 uppercase">Total Tokens Booked</span>
              <p className="text-3xl font-black text-emerald-600 mt-1">{service.totalTokens || 0}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FiCheck className="text-xl" />
            </div>
          </div>
        </div>

        {/* Active Queue / Pending Bookings */}
        <div className="bg-white rounded-3xl border border-zinc-200/80 shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-black text-zinc-900 mb-6">Active Queue</h2>

          {pendingBookings.length === 0 ? (
            <div className="text-center py-12 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
              <p className="text-zinc-500 font-medium">No pending tickets in queue.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-100 text-zinc-400 text-xs font-bold uppercase">
                    <th className="pb-4">Token</th>
                    <th className="pb-4">Customer Name</th>
                    <th className="pb-4">Joined At</th>
                    <th className="pb-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {pendingBookings.map((booking) => (
                    <tr key={booking._id} className="text-zinc-800 text-sm">
                      <td className="py-4 font-black text-blue-600 text-lg">
                        #{booking.tokenNumber}
                      </td>
                      <td className="py-4 font-bold flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-600 flex items-center justify-center">
                          <FiUser />
                        </div>
                        {booking.userName}
                      </td>
                      <td className="py-4 text-zinc-500">
                        {new Date(booking.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-4 text-right">
                        <div className="inline-flex gap-2">
                          <button
                            onClick={() => handleUpdateStatus(booking._id, "served")}
                            className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-3.5 py-2 rounded-xl transition-all border border-emerald-100 flex items-center gap-1 font-bold text-xs"
                          >
                            <FiCheck /> Serve
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(booking._id, "cancelled")}
                            className="bg-red-50 text-red-700 hover:bg-red-100 p-2 rounded-xl transition-all border border-red-100"
                            title="Cancel Booking"
                          >
                            <FiX />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* History / Completed Bookings */}
        <div className="bg-white rounded-3xl border border-zinc-200/80 shadow-sm p-8">
          <h2 className="text-2xl font-black text-zinc-900 mb-6">Serving History</h2>

          {completedBookings.length === 0 ? (
            <div className="text-center py-12 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
              <p className="text-zinc-500 font-medium">No served or cancelled tokens yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-100 text-zinc-400 text-xs font-bold uppercase">
                    <th className="pb-4">Token</th>
                    <th className="pb-4">Customer Name</th>
                    <th className="pb-4">Date</th>
                    <th className="pb-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {completedBookings.map((booking) => (
                    <tr key={booking._id} className="text-zinc-800 text-sm">
                      <td className="py-4 font-bold text-zinc-500">#{booking.tokenNumber}</td>
                      <td className="py-4 font-semibold text-zinc-700">{booking.userName}</td>
                      <td className="py-4 text-zinc-500">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 text-right">
                        <span
                          className={`inline-block text-xs font-bold px-3 py-1 rounded-full uppercase ${
                            booking.status === "served"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-zinc-100 text-zinc-500"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
