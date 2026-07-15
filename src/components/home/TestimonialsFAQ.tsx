"use client";

import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiStar } from "react-icons/fi";

export default function TestimonialsFAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(1);

  const faqs = [
    {
      id: 1,
      question: "How do I book a token on QueueLess?",
      answer: "Simply search for your desired service, select an available time slot, and confirm your booking. You will receive a digital token instantly.",
    },
    {
      id: 2,
      question: "Is the live queue status really real-time?",
      answer: "Yes! Our system syncs with the service provider's dashboard to give you the most accurate and real-time updates on your queue position.",
    },
    {
      id: 3,
      question: "Can I cancel or reschedule my appointment?",
      answer: "Absolutely. You can manage all your bookings from your dashboard. Just make sure to cancel at least 2 hours prior to your scheduled time.",
    },
    {
      id: 4,
      question: "Is it completely free for users?",
      answer: "Yes, booking tokens and tracking your status is completely free for all general users.",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Rahim Uddin",
      role: "Patient at DMCH",
      review: "QueueLess completely changed my hospital visit experience. I tracked my token from home and arrived exactly when it was my turn. Saved me 3 hours of sitting in the waiting room!",
      rating: 5,
    },
    {
      id: 2,
      name: "Sabrina Khan",
      role: "Bank Customer",
      review: "I hate waiting in line at the bank. With QueueLess, I booked a slot online during my lunch break. It was smooth, fast, and highly efficient.",
      rating: 5,
    },
  ];

  return (
    <section className="w-full py-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Testimonials */}
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-2">What Our Users Say</h2>
            <p className="text-zinc-600 mb-8">Don&apos;t just take our word for it.</p>
            
            <div className="flex flex-col gap-6">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
                  <div className="flex text-amber-500 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <FiStar key={i} className="fill-current" />
                    ))}
                  </div>
                  <p className="text-zinc-700 italic mb-6">&quot;{t.review}&quot;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex justify-center items-center font-bold text-blue-600">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-blue-900">{t.name}</p>
                      <p className="text-xs text-zinc-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-2">Frequently Asked Questions</h2>
            <p className="text-zinc-600 mb-8">Got questions? We&apos;ve got answers.</p>
            
            <div className="flex flex-col gap-4">
              {faqs.map((faq) => (
                <div 
                  key={faq.id} 
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openFAQ === faq.id ? 'border-blue-200 bg-white shadow-sm' : 'border-zinc-200 bg-transparent'}`}
                >
                  <button 
                    onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left"
                  >
                    <span className="font-semibold text-blue-900">{faq.question}</span>
                    {openFAQ === faq.id ? (
                      <FiChevronUp className="text-blue-600 flex-shrink-0 ml-4" />
                    ) : (
                      <FiChevronDown className="text-zinc-400 flex-shrink-0 ml-4" />
                    )}
                  </button>
                  
                  {openFAQ === faq.id && (
                    <div className="px-6 pb-5 text-zinc-600">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
