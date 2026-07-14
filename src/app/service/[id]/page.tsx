"use client";

import Link from "next/link";
import { FiClock, FiMapPin, FiStar, FiCalendar, FiCheckCircle } from "react-icons/fi";
import { useParams } from "next/navigation";

export default function ServiceDetailsPage() {
  const params = useParams();
  
  // Simulated data for demonstration
  const service = {
    id: params.id || 1,
    name: "Dhaka Medical College Hospital",
    category: "Hospital",
    location: "Secretariat Road, Dhaka 1000",
    description: "Dhaka Medical College and Hospital is a public medical college and hospital located in Dhaka, the capital city of Bangladesh. It is the largest medical college in Bangladesh.",
    images: [
      "bg-blue-100",
      "bg-emerald-100",
      "bg-amber-100"
    ],
    status: "Active",
    servingToken: 45,
    waitTime: "15 mins",
    rating: 4.8,
    reviewsCount: 1240,
    openingHours: "24/7",
    services: ["Emergency", "ICU", "OPD", "Surgery", "Pharmacy"],
    reviews: [
      { id: 1, name: "Rafiqul Islam", rating: 5, comment: "Excellent service and queue management.", date: "2 days ago" },
      { id: 2, name: "Tania Akter", rating: 4, comment: "Wait time was minimal compared to before.", date: "1 week ago" }
    ],
    related: [
      { id: 4, name: "Square Hospital", location: "Panthapath", waitTime: "5 mins" },
      { id: 7, name: "BIRDEM General Hospital", location: "Shahbagh", waitTime: "25 mins" }
    ]
  };

  return (
    <div className="min-h-screen bg-zinc-50 pb-24">
      {/* Header Image Gallery */}
      <div className="w-full h-[40vh] md:h-[50vh] flex">
        <div className={`w-full md:w-2/3 h-full ${service.images[0]} flex items-center justify-center text-6xl text-blue-300 border-r border-zinc-200`}>
          🏥 Main Image
        </div>
        <div className="hidden md:flex w-1/3 h-full flex-col">
          <div className={`w-full h-1/2 ${service.images[1]} flex items-center justify-center text-4xl text-emerald-300 border-b border-zinc-200`}>
             📸 Image 2
          </div>
          <div className={`w-full h-1/2 ${service.images[2]} flex items-center justify-center text-4xl text-amber-300`}>
             📸 Image 3
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-8">
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200">
              <div className="flex justify-between items-start mb-4">
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                  {service.category}
                </span>
                <div className="flex items-center text-amber-500 font-bold bg-amber-50 px-3 py-1 rounded-full">
                  <FiStar className="fill-current mr-1" /> {service.rating} <span className="text-zinc-500 text-sm ml-1 font-normal">({service.reviewsCount})</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">{service.name}</h1>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-zinc-600 mb-6">
                <span className="flex items-center"><FiMapPin className="mr-2" /> {service.location}</span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center"><FiClock className="mr-2" /> {service.openingHours}</span>
              </div>
              
              <p className="text-zinc-600 leading-relaxed text-lg">
                {service.description}
              </p>
            </div>

            {/* Specifications / Services */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Available Services</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {service.services.map((item, index) => (
                  <div key={index} className="flex items-center text-zinc-700">
                    <FiCheckCircle className="text-emerald-500 mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-blue-900">Customer Reviews</h2>
                <button className="text-blue-600 font-semibold hover:text-blue-800 transition">Write a Review</button>
              </div>
              
              <div className="space-y-6">
                {service.reviews.map((review) => (
                  <div key={review.id} className="border-b border-zinc-100 pb-6 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-blue-900">{review.name}</p>
                          <p className="text-xs text-zinc-500">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex text-amber-500">
                        {[...Array(review.rating)].map((_, i) => (
                          <FiStar key={i} className="fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-zinc-700 mt-3">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Action Column (Sidebar) */}
          <div className="space-y-8">
            
            {/* Live Status Card */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
              
              <div className="relative z-10 text-center mb-6">
                <h3 className="text-xl font-bold text-blue-900 mb-1">Live Queue Status</h3>
                <p className="text-emerald-600 font-semibold text-sm">● {service.status}</p>
              </div>
              
              <div className="flex justify-between items-center bg-zinc-50 p-4 rounded-xl mb-6 border border-zinc-200">
                <div className="text-center w-1/2 border-r border-zinc-200">
                  <p className="text-xs text-zinc-500 mb-1">Serving Token</p>
                  <p className="text-3xl font-bold text-blue-900">#{service.servingToken}</p>
                </div>
                <div className="text-center w-1/2">
                  <p className="text-xs text-zinc-500 mb-1">Est. Wait</p>
                  <p className="text-3xl font-bold text-amber-600">{service.waitTime}</p>
                </div>
              </div>
              
              <button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-bold py-4 rounded-xl shadow-md flex items-center justify-center gap-2 mb-3">
                <FiCalendar /> Book Appointment
              </button>
              <p className="text-center text-xs text-zinc-500">Booking secures your token instantly.</p>
            </div>

            {/* Related Items */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
              <h3 className="font-bold text-blue-900 mb-4">Nearby Providers</h3>
              <div className="space-y-4">
                {service.related.map((item) => (
                  <Link href={`/service/${item.id}`} key={item.id}>
                    <div className="group flex justify-between items-center p-3 rounded-xl hover:bg-zinc-50 transition border border-transparent hover:border-zinc-200 cursor-pointer">
                      <div>
                        <p className="font-semibold text-blue-900 group-hover:text-blue-600 transition">{item.name}</p>
                        <p className="text-xs text-zinc-500">{item.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold text-amber-600">{item.waitTime}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
