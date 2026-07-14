"use client";

import { FiSearch, FiCalendar, FiClock, FiCheckCircle } from "react-icons/fi";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Search Service",
      description: "Find hospitals, banks, or saloons near you that use QueueLess.",
      icon: <FiSearch className="text-3xl text-blue-600" />,
      color: "bg-blue-100",
    },
    {
      id: 2,
      title: "Book Appointment",
      description: "Select a convenient time slot and confirm your booking online.",
      icon: <FiCalendar className="text-3xl text-emerald-600" />,
      color: "bg-emerald-100",
    },
    {
      id: 3,
      title: "Track Live Status",
      description: "Monitor the queue in real-time. Know exactly when your turn is.",
      icon: <FiClock className="text-3xl text-amber-500" />,
      color: "bg-amber-100",
    },
    {
      id: 4,
      title: "Get Served",
      description: "Arrive just in time and get served without waiting in lines.",
      icon: <FiCheckCircle className="text-3xl text-blue-600" />,
      color: "bg-blue-100",
    },
  ];

  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">How QueueLess Works</h2>
        <p className="text-zinc-600 max-w-2xl mx-auto mb-16 text-lg">
          We simplify the way you wait. Follow these four simple steps to save your precious time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center relative group">
              {/* Step Number Badge */}
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-zinc-800 text-white flex items-center justify-center font-bold shadow-md z-10">
                {step.id}
              </div>
              
              <div className={`w-20 h-20 rounded-2xl flex justify-center items-center mb-6 shadow-sm group-hover:-translate-y-2 transition-transform duration-300 ${step.color}`}>
                {step.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-blue-900 mb-2">{step.title}</h3>
              <p className="text-zinc-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
