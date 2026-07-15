"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiClock, FiMapPin, FiArrowRight } from "react-icons/fi";
import { calculateWaitMetrics } from "@/lib/queueUtils";

interface Service {
  _id: string;
  name: string;
  location?: string;
  address: string;
  currentQueue: number;
  totalTokens: number;
  averageTimePerToken?: number;
  category: string;
  image?: string;
  images?: string[];
}

export default function FeaturedServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopServices = async () => {
      try {
        const response = await fetch("/api/services/top");
        if (response.ok) {
          const data = await response.json();
          setServices(data);
        }
      } catch (error) {
        console.error("Failed to fetch top services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopServices();
  }, []);

  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">Live Queue Status</h2>
            <p className="text-zinc-600">Check real-time waiting status of popular services.</p>
          </div>
          <Link href="/explore" className="hidden sm:flex items-center text-blue-600 font-semibold hover:text-blue-800 transition">
            See All Live Queues <FiArrowRight className="ml-2" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-12 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
            <p className="text-zinc-500 font-medium">No active queues available right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const metrics = calculateWaitMetrics(service.totalTokens, service.currentQueue, service.averageTimePerToken || 20);
              const displayImage = (service.images && service.images.length > 0) ? service.images[0] : service.image;

              return (
                <div key={service._id} className="bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className={`h-40 w-full ${metrics.imageColor} relative flex items-center justify-center overflow-hidden`}>
                    {displayImage ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={displayImage} alt={service.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl">
                        {service.category === "Hospital" ? "🏥" : service.category === "Bank" ? "🏦" : "🏢"}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${metrics.statusColor}`}>
                      {metrics.trafficStatus}
                    </span>
                    <h3 className="text-lg font-bold text-blue-900 mb-2 truncate">{service.name}</h3>
                    <div className="flex items-center text-zinc-500 text-sm mb-4">
                      <FiMapPin className="mr-1" /> {service.address}
                    </div>
                    
                    <div className="bg-zinc-50 p-4 rounded-xl flex justify-between items-center">
                      <div>
                        <p className="text-xs text-zinc-500 mb-1">Serving Token</p>
                        <p className="text-xl font-bold text-blue-900">#{service.currentQueue || 0}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-zinc-500 mb-1 flex items-center justify-end"><FiClock className="mr-1" /> Wait Time</p>
                        <p className="text-sm font-semibold text-zinc-700">{metrics.formattedWaitTime}</p>
                      </div>
                    </div>
                    
                    <Link href={`/service/${service._id}`} className="w-full mt-4 bg-blue-50 text-blue-700 font-semibold py-2 rounded-xl hover:bg-blue-100 transition-colors inline-block text-center">
                      Get Token
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
