"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/explore");
    }
  };

  return (
    <section className="relative w-full min-h-[70vh] bg-blue-50 flex flex-col justify-center items-center text-center px-4 py-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-[-10%] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      <div className="absolute top-0 right-[-10%] w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-blue-900 mb-6 leading-tight tracking-tight">
          Smart Appointment & <br />
          <span className="text-blue-600">Queue Management</span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-600 mb-10 max-w-2xl">
          Say goodbye to long waiting lines. Book your appointments online and track your live queue status at hospitals, banks, and more.
        </p>
        
        {/* Search Bar */}
        <div className="w-full max-w-xl flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-2xl shadow-xl shadow-blue-900/5 border border-zinc-100">
          <div className="flex-1 flex items-center px-4 bg-transparent rounded-xl">
            <FiSearch className="text-zinc-400 mr-3" size={20} />
            <input 
              type="text" 
              placeholder="Search hospitals, banks, saloons..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full bg-transparent outline-none text-zinc-700 placeholder-zinc-400"
            />
          </div>
          <button 
            className="bg-emerald-500 hover:bg-emerald-600 transition-colors text-white font-semibold px-8 py-3 rounded-xl shadow-md shadow-emerald-500/20"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* Quick Stats or Tags */}
        <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm font-medium text-zinc-500">
          <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm border border-zinc-100">
             🏥 50+ Hospitals
          </span>
          <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm border border-zinc-100">
             🏦 20+ Banks
          </span>
          <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm border border-zinc-100">
             ✂️ 100+ Saloons
          </span>
        </div>
      </div>
    </section>
  );
}
