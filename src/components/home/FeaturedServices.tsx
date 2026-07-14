"use client";

import Link from "next/link";
import { FiClock, FiMapPin, FiArrowRight } from "react-icons/fi";

export default function FeaturedServices() {
  const services = [
    {
      id: 1,
      name: "Dhaka Medical College Hospital",
      location: "Dhaka",
      status: "Active",
      servingToken: 45,
      estimatedWait: "15 mins",
      statusColor: "text-emerald-600 bg-emerald-100",
      image: "bg-emerald-50"
    },
    {
      id: 2,
      name: "Sonali Bank Main Branch",
      location: "Motijheel",
      status: "High Traffic",
      servingToken: 112,
      estimatedWait: "45 mins",
      statusColor: "text-amber-600 bg-amber-100",
      image: "bg-blue-50"
    },
    {
      id: 3,
      name: "Passport Office",
      location: "Agargaon",
      status: "Very High Traffic",
      servingToken: 305,
      estimatedWait: "2 hours",
      statusColor: "text-red-600 bg-red-100",
      image: "bg-zinc-100"
    },
    {
      id: 4,
      name: "Square Hospital Specialist",
      location: "Panthapath",
      status: "Active",
      servingToken: 12,
      estimatedWait: "5 mins",
      statusColor: "text-emerald-600 bg-emerald-100",
      image: "bg-emerald-50"
    },
  ];

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className={`h-32 w-full ${service.image} flex items-center justify-center`}>
                 <span className="text-4xl">🏥</span>
              </div>
              <div className="p-6">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${service.statusColor}`}>
                  {service.status}
                </span>
                <h3 className="text-lg font-bold text-blue-900 mb-2 truncate">{service.name}</h3>
                <div className="flex items-center text-zinc-500 text-sm mb-4">
                  <FiMapPin className="mr-1" /> {service.location}
                </div>
                
                <div className="bg-zinc-50 p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <p className="text-xs text-zinc-500 mb-1">Serving Token</p>
                    <p className="text-xl font-bold text-blue-900">#{service.servingToken}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-zinc-500 mb-1 flex items-center justify-end"><FiClock className="mr-1" /> Wait Time</p>
                    <p className="text-sm font-semibold text-zinc-700">{service.estimatedWait}</p>
                  </div>
                </div>
                
                <button className="w-full mt-4 bg-blue-50 text-blue-700 font-semibold py-2 rounded-xl hover:bg-blue-100 transition-colors">
                  Get Token
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
