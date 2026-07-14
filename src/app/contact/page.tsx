"use client";

import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-zinc-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Get in Touch</h1>
          <p className="text-zinc-600 max-w-2xl mx-auto text-lg">
            Have a question, feedback, or need support? Our team is here to help you out.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-zinc-100 overflow-hidden">
          
          {/* Contact Info (Left Side) */}
          <div className="w-full lg:w-1/3 bg-blue-900 text-white p-10 relative overflow-hidden">
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply opacity-50 blur-3xl pointer-events-none"></div>
            
            <h2 className="text-2xl font-bold mb-8 relative z-10">Contact Information</h2>
            
            <div className="space-y-8 relative z-10">
              <div className="flex items-start">
                <FiPhone className="text-emerald-400 text-xl mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-200 mb-1">Phone</h3>
                  <p>+880 1234 567 890</p>
                  <p className="text-sm text-blue-300 mt-1">Sun to Thu, 9am to 6pm</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FiMail className="text-emerald-400 text-xl mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-200 mb-1">Email</h3>
                  <p>support@queueless.com.bd</p>
                  <p>business@queueless.com.bd</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FiMapPin className="text-emerald-400 text-xl mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-200 mb-1">Office Address</h3>
                  <p className="leading-relaxed">Level 4, QueueLess Tower<br />Banani, Dhaka 1213<br />Bangladesh</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (Right Side) */}
          <div className="w-full lg:w-2/3 p-10">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Send us a Message</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" placeholder="Doe" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Email Address</label>
                <input type="email" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" placeholder="john@example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Subject</label>
                <input type="text" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" placeholder="How can we help?" />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow resize-none" placeholder="Write your message here..."></textarea>
              </div>

              <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-md shadow-blue-600/20 flex items-center justify-center gap-2">
                <FiSend /> Send Message
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}
