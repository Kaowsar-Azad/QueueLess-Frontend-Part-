"use client";

import Link from "next/link";
import { FaHospital, FaUniversity, FaCut, FaBuilding } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

export default function PopularCategories() {
  const categories = [
    {
      id: 1,
      name: "Hospitals & Clinics",
      count: "120+ Services",
      icon: <FaHospital className="text-4xl text-emerald-500 mb-4" />,
      link: "/explore?category=hospital",
      bgColor: "bg-emerald-50",
    },
    {
      id: 2,
      name: "Banks & Finances",
      count: "85+ Services",
      icon: <FaUniversity className="text-4xl text-blue-500 mb-4" />,
      link: "/explore?category=bank",
      bgColor: "bg-blue-50",
    },
    {
      id: 3,
      name: "Saloons & Spas",
      count: "200+ Services",
      icon: <FaCut className="text-4xl text-amber-500 mb-4" />,
      link: "/explore?category=saloon",
      bgColor: "bg-amber-50",
    },
    {
      id: 4,
      name: "Govt. Offices",
      count: "40+ Services",
      icon: <FaBuilding className="text-4xl text-zinc-500 mb-4" />,
      link: "/explore?category=govt",
      bgColor: "bg-zinc-100",
    },
  ];

  return (
    <section className="w-full py-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">Popular Categories</h2>
            <p className="text-zinc-600">Find and book appointments across various sectors.</p>
          </div>
          <Link href="/explore" className="hidden sm:flex items-center text-blue-600 font-semibold hover:text-blue-800 transition">
            View All <FiArrowRight className="ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={category.link}>
              <div className="group bg-white border border-zinc-100 rounded-2xl p-8 hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col items-center text-center cursor-pointer">
                <div className={`w-20 h-20 rounded-full flex justify-center items-center mb-6 group-hover:scale-110 transition-transform duration-300 ${category.bgColor}`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-1">{category.name}</h3>
                <p className="text-zinc-500 text-sm font-medium">{category.count}</p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
           <Link href="/explore" className="inline-flex items-center justify-center w-full bg-blue-100 text-blue-700 font-semibold py-3 rounded-xl">
            View All Categories <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
