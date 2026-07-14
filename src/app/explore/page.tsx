"use client";

import Link from "next/link";
import { useState } from "react";
import { FiSearch, FiFilter, FiMapPin, FiClock } from "react-icons/fi";

const SERVICES = [
  { id: 1, name: "Dhaka Medical College Hospital", category: "Hospital", location: "Dhaka", status: "Active", servingToken: 45, waitTime: "15 mins", rating: 4.8 },
  { id: 2, name: "Sonali Bank Main Branch", category: "Bank", location: "Motijheel", status: "High Traffic", servingToken: 112, waitTime: "45 mins", rating: 4.2 },
  { id: 3, name: "Passport Office", category: "Government", location: "Agargaon", status: "Very High Traffic", servingToken: 305, waitTime: "2 hours", rating: 3.5 },
  { id: 4, name: "Square Hospital Specialist", category: "Hospital", location: "Panthapath", status: "Active", servingToken: 12, waitTime: "5 mins", rating: 4.9 },
  { id: 5, name: "Persona Beauty Parlour", category: "Saloon", location: "Banani", status: "Active", servingToken: 3, waitTime: "10 mins", rating: 4.6 },
  { id: 6, name: "BRTA Office", category: "Government", location: "Mirpur", status: "High Traffic", servingToken: 89, waitTime: "1.5 hours", rating: 3.8 },
];

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredServices = SERVICES.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(search.toLowerCase()) || service.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || service.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-zinc-50 pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Explore Services</h1>
          <p className="text-zinc-600 max-w-2xl text-lg">
            Find and book your spot in real-time. Filter by category, location, or search directly for your desired service provider.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 sticky top-24">
              <div className="flex items-center gap-2 mb-6 text-lg font-bold text-blue-900">
                <FiFilter /> Filters
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-zinc-800 mb-3">Categories</h3>
                <div className="space-y-2">
                  {["All", "Hospital", "Bank", "Saloon", "Government"].map(cat => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="category" 
                        value={cat}
                        checked={categoryFilter === cat}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-zinc-300"
                      />
                      <span className="text-zinc-600 group-hover:text-blue-600 transition-colors">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="w-full bg-blue-50 text-blue-700 font-semibold py-2 rounded-xl hover:bg-blue-100 transition-colors mt-4">
                Reset Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            {/* Search Bar */}
            <div className="bg-white p-2 rounded-xl shadow-sm border border-zinc-200 mb-8 flex items-center px-4">
              <FiSearch className="text-zinc-400 mr-3" size={20} />
              <input 
                type="text" 
                placeholder="Search by name or location..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-zinc-700 py-2 placeholder-zinc-400"
              />
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredServices.length > 0 ? (
                filteredServices.map(service => (
                  <Link href={`/service/${service.id}`} key={service.id}>
                    <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 cursor-pointer flex flex-col h-full">
                      <div className="p-6 flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            service.status === 'Active' ? 'text-emerald-700 bg-emerald-100' :
                            service.status === 'High Traffic' ? 'text-amber-700 bg-amber-100' : 'text-red-700 bg-red-100'
                          }`}>
                            {service.status}
                          </span>
                          <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-md font-medium">
                            ★ {service.rating}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-blue-900 mb-2 leading-tight">{service.name}</h3>
                        <div className="flex items-center text-zinc-500 text-sm mb-4">
                          <FiMapPin className="mr-1" /> {service.location}
                        </div>
                      </div>
                      
                      <div className="bg-zinc-50 p-4 border-t border-zinc-100 flex justify-between items-center mt-auto">
                        <div>
                          <p className="text-xs text-zinc-500 mb-1">Serving</p>
                          <p className="text-xl font-bold text-blue-900">#{service.servingToken}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-zinc-500 mb-1 flex items-center justify-end"><FiClock className="mr-1" /> Wait Time</p>
                          <p className="text-sm font-semibold text-zinc-700">{service.waitTime}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-2 text-center py-20">
                  <div className="text-zinc-400 text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-zinc-800">No services found</h3>
                  <p className="text-zinc-500 mt-2">Try adjusting your filters or search term.</p>
                </div>
              )}
            </div>

            {/* Pagination / Load More */}
            {filteredServices.length > 0 && (
              <div className="mt-12 text-center">
                <button className="bg-white border border-zinc-200 text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-colors shadow-sm">
                  Load More Services
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
