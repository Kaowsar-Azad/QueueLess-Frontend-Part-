"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { 
  FiArrowLeft, FiClock, FiUsers, FiMapPin, FiCalendar, FiActivity, 
  FiStar, FiShield, FiPhone, FiInfo, FiArrowRight 
} from "react-icons/fi";

interface Service {
  _id: string;
  name: string;
  description: string;
  category: string;
  startHour: string;
  endHour: string;
  maxTokens: number;
  currentQueue: number;
  totalTokens: number;
  address?: string;
  contactNumber?: string;
}

export default function ServiceDetailsPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const router = useRouter();
  
  const [service, setService] = useState<Service | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Mock images based on service categories for high-end look
  const getMockImages = (category: string) => {
    if (category === "Hospital") {
      return [
        "https://images.unsplash.com/photo-1586773860418-d3b71978563d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
      ];
    }
    if (category === "Bank") {
      return [
        "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1541354451442-952615e37787?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80"
      ];
    }
    return [
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80"
    ];
  };

  useEffect(() => {
    const fetchServiceDetailsAndRelated = async () => {
      try {
        // Fetch current service details
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/services/${id}`
        );
        if (!response.ok) {
          throw new Error("Service not found");
        }
        const data = await response.json();
        setService(data);

        // Fetch all services to filter out related
        const allRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/services`
        );
        if (allRes.ok) {
          const allData: Service[] = await allRes.json();
          const filtered = allData.filter(
            (s) => s.category === data.category && s._id !== data._id
          ).slice(0, 2);
          setRelatedServices(filtered);
        }

      } catch (error: any) {
        toast.error(error.message || "Failed to load details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchServiceDetailsAndRelated();
    }
  }, [id]);

  const handleBookToken = async () => {
    if (!session?.user) {
      toast.error("Please login to book a token.");
      router.push("/login");
      return;
    }

    setBookingLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            serviceId: service?._id,
            userId: session.user.id,
            userName: session.user.name
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to book token");
      }

      toast.success(`Token booked successfully! Your Token Number is #${data.tokenNumber}`);
      
      if (service) {
        setService({
          ...service,
          totalTokens: service.totalTokens + 1
        });
      }
      
      router.push("/dashboard/user");
    } catch (error: any) {
      toast.error(error.message || "Failed to book token");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-zinc-800">Service Not Found</h2>
          <Link href="/explore" className="mt-4 inline-block bg-blue-600 text-white px-5 py-2 rounded-lg font-medium">
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  const images = getMockImages(service.category);

  return (
    <div className="min-h-[85vh] bg-zinc-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        <Link href="/explore" className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-800 mb-6 transition-colors">
          <FiArrowLeft className="mr-2" /> Back to Directory
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Multi-Image Gallery */}
            <div className="bg-white rounded-3xl border border-zinc-200/80 shadow-sm overflow-hidden p-6">
              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-zinc-100 relative">
                <img 
                  src={images[activeImageIndex]} 
                  alt="Service Detail" 
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`aspect-[16/9] rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx ? "border-blue-600 scale-95" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Core Info */}
            <div className="bg-white rounded-3xl border border-zinc-200/80 shadow-sm p-8">
              <span className="inline-block text-xs bg-blue-50 text-blue-700 font-extrabold px-3 py-1 rounded-full mb-4">
                {service.category}
              </span>
              <h1 className="text-3xl font-extrabold text-zinc-900 mb-4">{service.name}</h1>
              <p className="text-zinc-600 leading-relaxed whitespace-pre-wrap mb-6">{service.description}</p>
              
              {/* Specs / Details */}
              <div className="border-t border-zinc-100 pt-6">
                <h3 className="text-lg font-bold text-zinc-800 mb-4 flex items-center gap-2">
                  <FiInfo className="text-blue-500" /> Specifications & Rules
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-zinc-600">
                  <div className="flex items-center gap-2 p-3 bg-zinc-50 rounded-xl">
                    <FiMapPin className="text-blue-500 flex-shrink-0" />
                    <span>Location: {service.address || "Main Town Branch, Dhaka"}</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-zinc-50 rounded-xl">
                    <FiPhone className="text-blue-500 flex-shrink-0" />
                    <span>Contact Support: {service.contactNumber || "+880 1234-567890"}</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-zinc-50 rounded-xl">
                    <FiClock className="text-blue-500 flex-shrink-0" />
                    <span>Working Hours: {service.startHour} - {service.endHour}</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-zinc-50 rounded-xl">
                    <FiShield className="text-blue-500 flex-shrink-0" />
                    <span>Verification Required: Yes (Valid NID/Mobile)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* User Reviews */}
            <div className="bg-white rounded-3xl border border-zinc-200/80 shadow-sm p-8">
              <h3 className="text-lg font-bold text-zinc-800 mb-6 flex items-center gap-2">
                <FiStar className="text-amber-500 fill-amber-500" /> Customer Reviews & Ratings
              </h3>
              <div className="space-y-6">
                <div className="border-b border-zinc-100 pb-4">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-zinc-800 text-sm">Pranto Chowdhury</h4>
                    <span className="flex items-center text-amber-500 text-xs font-bold gap-0.5"><FiStar className="fill-amber-500" /> 5.0</span>
                  </div>
                  <p className="text-zinc-500 text-xs sm:text-sm">Great scheduling tool! I booked my bank token from home, arrived on time, and only waited for 5 minutes.</p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-zinc-800 text-sm">Tasnim Ahmed</h4>
                    <span className="flex items-center text-amber-500 text-xs font-bold gap-0.5"><FiStar className="fill-amber-500" /> 4.5</span>
                  </div>
                  <p className="text-zinc-500 text-xs sm:text-sm">Very efficient hospital counter management. Saved me hours of waiting in the lobby.</p>
                </div>
              </div>
            </div>

            {/* Related Items */}
            {relatedServices.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-zinc-800 mb-4">Related Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedServices.map((rs) => (
                    <Link 
                      href={`/service/${rs._id}`} 
                      key={rs._id}
                      className="bg-white p-5 rounded-2xl border border-zinc-200 hover:border-blue-300 transition-all flex items-center justify-between group"
                    >
                      <div>
                        <h4 className="font-bold text-zinc-800 text-sm group-hover:text-blue-600 transition-colors">{rs.name}</h4>
                        <p className="text-zinc-400 text-xs mt-1">{rs.startHour} - {rs.endHour} • {rs.maxTokens} Slots</p>
                      </div>
                      <FiArrowRight className="text-zinc-400 group-hover:translate-x-1 group-hover:text-blue-600 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Live Status Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-zinc-200/80 shadow-sm p-6 text-center sticky top-24">
              <h3 className="text-lg font-bold text-zinc-800 border-b border-zinc-100 pb-3 mb-6">Live Queue Tracker</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl">
                  <p className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">Serving Token</p>
                  <p className="text-3xl font-extrabold text-blue-900 mt-1">#{service.currentQueue || 0}</p>
                </div>

                <div className="bg-zinc-50 border border-zinc-100 p-4 rounded-2xl">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Booked Today</p>
                  <p className="text-3xl font-extrabold text-zinc-800 mt-1">#{service.totalTokens}</p>
                </div>
              </div>

              <button
                onClick={handleBookToken}
                disabled={bookingLoading || service.totalTokens >= service.maxTokens}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-md shadow-blue-600/25 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <FiCalendar className="text-lg" /> 
                {bookingLoading ? "Booking..." : service.totalTokens >= service.maxTokens ? "Queue Full" : "Book Token Now"}
              </button>

              <p className="text-[11px] text-zinc-400 mt-3">
                Requires login. Valid only for today.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
