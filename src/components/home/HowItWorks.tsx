"use client";

import { FiSearch, FiCalendar, FiClock, FiCheckCircle } from "react-icons/fi";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Discover Services",
      description: "Find hospitals, banks, or saloons near you. Use our smart search to locate exactly what you need.",
      icon: <FiSearch className="text-4xl text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300" />,
      gradient: "border-zinc-200/80 hover:border-blue-300 hover:shadow-blue-900/5",
      numberColor: "text-blue-200",
    },
    {
      id: 2,
      title: "Book Your Spot",
      description: "Select a convenient time slot and book your token instantly. No more standing in physical lines.",
      icon: <FiCalendar className="text-4xl text-emerald-600 mb-6 group-hover:scale-110 transition-transform duration-300" />,
      gradient: "border-zinc-200/80 hover:border-emerald-300 hover:shadow-emerald-900/5",
      numberColor: "text-emerald-200",
    },
    {
      id: 3,
      title: "Live Tracking",
      description: "Monitor the queue in real-time from your dashboard. Know exactly when it's your turn to be served.",
      icon: <FiClock className="text-4xl text-purple-600 mb-6 group-hover:scale-110 transition-transform duration-300" />,
      gradient: "border-zinc-200/80 hover:border-purple-300 hover:shadow-purple-900/5",
      numberColor: "text-purple-200",
    },
    {
      id: 4,
      title: "Arrive & Proceed",
      description: "Arrive just in time, show your digital token, and get served immediately with zero waiting.",
      icon: <FiCheckCircle className="text-4xl text-rose-600 mb-6 group-hover:scale-110 transition-transform duration-300" />,
      gradient: "border-zinc-200/80 hover:border-rose-300 hover:shadow-rose-900/5",
      numberColor: "text-rose-200",
    },
  ];

  return (
    <section className="relative w-full py-32 bg-zinc-50 overflow-hidden">
      {/* Background Glows for Light Theme */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-[0.15] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-300 to-emerald-300 blur-[100px] rounded-full mix-blend-multiply"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="inline-block mb-4">
          <span className="bg-white border border-zinc-200 text-blue-600 text-xs font-extrabold px-4 py-1.5 rounded-full tracking-wider uppercase shadow-sm">
            Simple Process
          </span>
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 mb-6 tracking-tight">
          How <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">QueueLess</span> Works
        </h2>
        
        <p className="text-zinc-600 max-w-2xl mx-auto mb-20 text-lg md:text-xl font-medium">
          Four simple steps to reclaim your time. We digitize the waiting experience so you can focus on what matters most.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
          
          {/* Connector Line (visible on large screens only) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-zinc-200 to-transparent -translate-y-1/2 -z-10"></div>

          {steps.map((step) => (
            <div 
              key={step.id} 
              className={`relative group bg-white border ${step.gradient} rounded-3xl p-8 text-left transition-all duration-500 hover:-translate-y-3 hover:shadow-xl overflow-hidden cursor-default`}
            >
              {/* Background Large Number */}
              <div className={`absolute -right-2 -bottom-6 text-9xl font-black transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-12 ${step.numberColor} z-0`}>
                {step.id}
              </div>

              <div className="relative z-10">
                {step.icon}
                
                <h3 className="text-2xl font-bold text-zinc-900 mb-3 tracking-wide">{step.title}</h3>
                <p className="text-zinc-500 leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
