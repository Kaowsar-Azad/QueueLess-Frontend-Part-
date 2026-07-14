"use client";

import { FiShield, FiTrendingUp, FiSmartphone, FiClock } from "react-icons/fi";

export default function BenefitsSection() {
  const benefits = [
    {
      title: "Save Time",
      description: "Stop wasting hours in waiting rooms. Book ahead and arrive just in time.",
      icon: <FiClock className="text-3xl text-emerald-600" />
    },
    {
      title: "Real-time Tracking",
      description: "Monitor your queue position live from your smartphone, anywhere.",
      icon: <FiSmartphone className="text-3xl text-blue-600" />
    },
    {
      title: "Improved Efficiency",
      description: "Service providers can manage crowds better, reducing chaos and delays.",
      icon: <FiTrendingUp className="text-3xl text-amber-500" />
    },
    {
      title: "Secure & Reliable",
      description: "Your data and bookings are securely stored and instantly verified.",
      icon: <FiShield className="text-3xl text-indigo-500" />
    }
  ];

  return (
    <section className="w-full py-24 bg-blue-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Why Choose QueueLess?</h2>
          <p className="text-zinc-600 max-w-2xl mx-auto text-lg">
            We are transforming the waiting experience for both customers and service providers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex gap-6 bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow">
              <div className="flex-shrink-0 w-16 h-16 bg-blue-50 rounded-xl flex justify-center items-center">
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">{benefit.title}</h3>
                <p className="text-zinc-600 leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
