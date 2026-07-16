"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Link from "next/link";
import { FiArrowLeft, FiTrash2, FiClock, FiUsers, FiTag } from "react-icons/fi";
import { formatTime } from "@/lib/timeUtils";

interface Service {
  _id: string;
  name: string;
  description: string;
  category: string;
  startHour: string;
  endHour: string;
  maxTokens: number;
}

export default function ManageServicesPage() {
  const { data: session } = useSession();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      if (!session?.user) return;
      try {
        const response = await fetch(
          `/api/services?ownerId=${session.user.id}`,
          { credentials: "include" }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        setServices(data);
      } catch (error: unknown) {
        toast.error((error as Error).message || "Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      fetchServices();
    }
  }, [session?.user]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service queue?")) return;

    try {
      const response = await fetch(
        `/api/services/${id}`,
        { method: "DELETE", credentials: "include" }
      );
      if (!response.ok) {
        throw new Error("Failed to delete service");
      }
      toast.success("Service successfully deleted!");
      setServices(services.filter((s) => s._id !== id));
    } catch (error: unknown) {
      toast.error((error as Error).message || "Failed to delete service");
    }
  };

  if (!session?.user) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center">
        <p className="text-zinc-600 font-semibold">Please log in to manage your services.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-zinc-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/dashboard/owner"
          className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-800 mb-6 transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Back to Dashboard
        </Link>

        <div className="bg-white rounded-3xl border border-zinc-200/80 shadow-sm p-8">
          <div className="border-b border-zinc-100 pb-6 mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900">Manage Services</h1>
              <p className="text-zinc-500 mt-1">View, track, or delete your listed service queues.</p>
            </div>
            <Link
              href="/items/add"
              className="bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
            >
              Add New
            </Link>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-zinc-50/55 rounded-2xl border border-zinc-200/60 animate-pulse">
                  <div className="space-y-3 flex-1">
                    <div className="h-5 bg-zinc-200 rounded-full w-20"></div>
                    <div className="h-6 bg-zinc-200 rounded w-1/3"></div>
                    <div className="h-4 bg-zinc-200 rounded w-1/2"></div>
                    <div className="flex gap-4 pt-1">
                      <div className="h-4 bg-zinc-200 rounded w-24"></div>
                      <div className="h-4 bg-zinc-200 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 sm:mt-0 shrink-0">
                    <div className="h-10 bg-zinc-200 rounded-xl w-28"></div>
                    <div className="h-10 bg-zinc-200 rounded-xl w-10"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-12 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
              <p className="text-zinc-500 font-medium">You haven&apos;t listed any services yet.</p>
              <Link
                href="/items/add"
                className="mt-4 inline-block bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Create Your First Queue
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {services.map((service) => (
                <div
                  key={service._id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-zinc-50 rounded-2xl border border-zinc-200/60 hover:shadow-sm transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <FiTag /> {service.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900">{service.name}</h3>
                    <p className="text-zinc-500 text-sm">{service.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-xs font-semibold text-zinc-500 pt-1">
                      <span className="flex items-center gap-1">
                        <FiClock /> {formatTime(service.startHour)} - {formatTime(service.endHour)}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiUsers /> Limit: {service.maxTokens} tokens
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4 sm:mt-0">
                    <Link
                      href={`/items/manage/${service._id}`}
                      className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2.5 rounded-xl transition-colors border border-blue-100 flex items-center gap-2 font-bold text-sm"
                    >
                      <FiUsers />
                      <span>Bookings</span>
                    </Link>
                    
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="bg-red-50 text-red-600 hover:bg-red-100 p-3 rounded-xl transition-colors border border-red-100"
                      title="Delete Service"
                    >
                      <FiTrash2 className="text-lg" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
