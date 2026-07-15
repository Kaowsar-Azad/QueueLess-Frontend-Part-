"use client";

import Link from "next/link";
import { FiUsers, FiTarget, FiHeart, FiGlobe } from "react-icons/fi";
import { MdOutlineQueuePlayNext } from "react-icons/md";
import { useSession } from "@/lib/auth-client";

export default function AboutPage() {
  const { data: session } = useSession();
  const role = session?.user ? (session.user as { role?: string }).role || "user" : null;

  const values = [
    {
      icon: <FiTarget className="text-blue-600" />,
      title: "Our Mission",
      description: "To eliminate the frustration of physical queues and give people their time back through smart technology.",
    },
    {
      icon: <FiHeart className="text-emerald-500" />,
      title: "User Centric",
      description: "We build features that genuinely help people. Your time and convenience are our absolute top priorities.",
    },
    {
      icon: <FiUsers className="text-amber-500" />,
      title: "Empowering Providers",
      description: "We equip hospitals, banks, and businesses with tools to manage crowds efficiently and improve service quality.",
    },
    {
      icon: <FiGlobe className="text-indigo-500" />,
      title: "Nationwide Impact",
      description: "Starting from Dhaka, our vision is to transform the waiting experience across all of Bangladesh.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-blue-50 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-50 pointer-events-none -mr-20 -mt-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 text-blue-600 rounded-2xl mb-6">
            <MdOutlineQueuePlayNext className="text-4xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6">Redefining How the World Waits</h1>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            QueueLess is a smart appointment and queue management system born out of a simple idea: your time is too valuable to be spent standing in lines.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Core Values</h2>
          <p className="text-zinc-600 max-w-2xl mx-auto text-lg">We are driven by principles that put people first.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-zinc-50 p-8 rounded-2xl border border-zinc-100 hover:shadow-md transition-shadow text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center text-3xl mb-6 border border-zinc-100">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">{value.title}</h3>
              <p className="text-zinc-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Story / Join Section */}
      <div className="py-24 bg-zinc-900 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to save your time?</h2>
          <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
            Join thousands of users who have already switched to a smarter way of managing their appointments and hospital visits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {session?.user ? (
              <Link href={`/dashboard/${role}`} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-lg shadow-blue-600/30">
                Go to Dashboard
              </Link>
            ) : (
              <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-lg shadow-blue-600/30">
                Create Free Account
              </Link>
            )}
            <Link href="/explore" className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-bold py-4 px-8 rounded-xl transition-colors">
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
