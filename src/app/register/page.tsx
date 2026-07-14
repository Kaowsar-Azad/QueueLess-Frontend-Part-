"use client";

import Link from "next/link";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { MdOutlineQueuePlayNext } from "react-icons/md";

export default function RegisterPage() {
  return (
    <div className="min-h-[85vh] bg-zinc-50 flex flex-col md:flex-row">
      {/* Left Branding Side */}
      <div className="hidden md:flex md:w-1/2 bg-blue-900 p-12 flex-col justify-between relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 pointer-events-none"></div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center">
            <MdOutlineQueuePlayNext className="text-4xl text-emerald-400 mr-2" />
            <span className="text-3xl font-bold text-white tracking-wide">QueueLess</span>
          </Link>
        </div>

        <div className="relative z-10 mb-20">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Take control of <br />
            <span className="text-blue-300">your time.</span>
          </h1>
          <p className="text-blue-100 text-lg max-w-md leading-relaxed">
            Create an account today to start booking appointments and managing your queue status from anywhere.
          </p>
        </div>
        
        <div className="relative z-10 text-blue-200 text-sm">
          &copy; {new Date().getFullYear()} QueueLess. All rights reserved.
        </div>
      </div>

      {/* Right Form Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md">
          <div className="md:hidden flex items-center justify-center mb-8">
            <MdOutlineQueuePlayNext className="text-4xl text-blue-600 mr-2" />
            <span className="text-3xl font-bold text-blue-900 tracking-wide">QueueLess</span>
          </div>

          <h2 className="text-3xl font-bold text-zinc-900 mb-2">Create an account</h2>
          <p className="text-zinc-500 mb-8">Enter your details to get started with QueueLess.</p>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-zinc-400" />
                </div>
                <input 
                  type="text" 
                  className="w-full pl-10 pr-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" 
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-zinc-400" />
                </div>
                <input 
                  type="email" 
                  className="w-full pl-10 pr-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" 
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-zinc-400" />
                </div>
                <input 
                  type="password" 
                  className="w-full pl-10 pr-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" 
                  placeholder="Create a password"
                />
              </div>
              <p className="text-xs text-zinc-500 mt-2">Must be at least 8 characters long.</p>
            </div>

            <button type="button" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20 mt-4">
              Create Account
            </button>
          </form>

          <div className="mt-8 text-center text-zinc-600">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
