"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { FiSearch, FiTag, FiClock, FiUsers, FiArrowRight } from "react-icons/fi";

interface Service {
  _id: string;
  name: string;
  description: string;
  category: string;
  image?: string;
  images?: string[];
  startHour: string;
  endHour: string;
  maxTokens: number;
  totalTokens: number;
}

export default function ExplorePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/services`);
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        setServices(data);
      } catch (error: any) {
        toast.error(error.message || "Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(search.toLowerCase()) || 
                          service.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || service.category === categoryFilter;
    const matchesAvailability = availabilityFilter === "All" || 
      (availabilityFilter === "Available" ? service.totalTokens < service.maxTokens : service.totalTokens >= service.maxTokens);
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  // Sort services
  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    if (sortBy === "name-desc") return b.name.localeCompare(a.name);
    if (sortBy === "limit-desc") return b.maxTokens - a.maxTokens;
    if (sortBy === "limit-asc") return a.maxTokens - b.maxTokens;
    return 0;
  });

  // Paginated services
  const totalPages = Math.ceil(sortedServices.length / itemsPerPage);
  const paginatedServices = sortedServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page on search/filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, categoryFilter, availabilityFilter, sortBy]);

  return (
    <div className="min-h-[85vh] bg-zinc-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-950 tracking-tight">Explore Services</h1>
          <p className="text-zinc-500 mt-3 text-lg max-w-xl mx-auto">
            Search for clinics, banks, and utility centers near you. Book your token ahead of time and avoid queues.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 bg-white p-4 rounded-2xl shadow-sm border border-zinc-200/80">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-4 text-zinc-400 text-lg" />
            <input 
              type="text" 
              placeholder="Search by name, clinic, or branch..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-zinc-900 transition-shadow"
            />
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex gap-2 items-center">
              <span className="text-sm font-semibold text-zinc-500"><FiTag className="inline mr-1" /> Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-zinc-900 font-medium"
              >
                <option value="All">All</option>
                <option value="Hospital">Hospital / Clinic</option>
                <option value="Bank">Bank / Finance</option>
                <option value="Saloon">Saloon / Beauty</option>
                <option value="Govt Office">Government Office</option>
                <option value="Other">Others</option>
              </select>
            </div>

            <div className="flex gap-2 items-center">
              <span className="text-sm font-semibold text-zinc-500">Status:</span>
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-zinc-900 font-medium"
              >
                <option value="All">All Status</option>
                <option value="Available">Available Slots</option>
                <option value="Full">Queue Full</option>
              </select>
            </div>

            <div className="flex gap-2 items-center">
              <span className="text-sm font-semibold text-zinc-500">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-zinc-900 font-medium"
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="limit-desc">Max Slots (High to Low)</option>
                <option value="limit-asc">Max Slots (Low to High)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Directory Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-zinc-500 mt-4 font-medium">Fetching listed services...</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-zinc-200 shadow-sm">
            <p className="text-zinc-500 text-lg font-semibold">No services found matching your query.</p>
            <p className="text-zinc-400 text-sm mt-1">Try clearing your filters or changing search keywords.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {paginatedServices.map((service) => (
                <div 
                  key={service._id}
                  className="bg-white rounded-3xl border border-zinc-200/80 hover:border-blue-200 p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div>
                    {/* Category Tag */}
                    <span className="inline-block text-xs bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-full mb-4">
                      {service.category}
                    </span>
                    
                    {/* Title & Desc */}
                    <div className="flex items-start gap-4 mb-4">
                      {(service.images && service.images.length > 0) || service.image ? (
                        <img 
                          src={(service.images && service.images.length > 0) ? service.images[0] : service.image} 
                          alt={service.name} 
                          className="w-16 h-16 rounded-xl object-cover border border-zinc-200 shrink-0"
                        />
                      ) : null}
                      <div>
                        <h3 className="text-xl font-bold text-zinc-900 tracking-tight mb-1">{service.name}</h3>
                        <p className="text-zinc-500 text-sm line-clamp-2 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-zinc-100 pt-5 space-y-4">
                    {/* Timings and limit */}
                    <div className="flex justify-between text-xs font-semibold text-zinc-500">
                      <span className="flex items-center gap-1.5">
                        <FiClock /> {service.startHour} - {service.endHour}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FiUsers /> Limit: {service.maxTokens} tokens
                      </span>
                    </div>

                    <Link 
                      href={`/service/${service._id}`}
                      className="w-full bg-blue-50 text-blue-700 font-bold py-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 group"
                    >
                      View Details <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 text-zinc-600 font-semibold disabled:opacity-50 transition-colors"
                >
                  Prev
                </button>
                <span className="px-4 py-2 text-zinc-600 font-bold">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 text-zinc-600 font-semibold disabled:opacity-50 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
