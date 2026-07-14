"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@heroui/react";
import { MdOutlineQueuePlayNext } from "react-icons/md";

export default function AppNavbar() {
  // Mock login state. Set to false to see the logged-out design (Sign In / Get Started buttons).
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full">
          {/* 1. Logo (Left side) */}
          <div className="flex justify-start items-center">
            <MdOutlineQueuePlayNext className="text-3xl text-blue-600 mr-2" />
            <Link href="/" className="font-bold text-2xl tracking-wide text-blue-900">
              QueueLess
            </Link>
          </div>
          
          {/* 2. Center Links (Middle) */}
          <div className="hidden md:flex flex-1 justify-center gap-8 font-medium">
            <Link href="/explore" className="hover:text-blue-600 transition text-zinc-600">Explore</Link>
            <Link href="/explore" className="text-blue-600 font-semibold">Live Status</Link>
            <Link href="/about" className="hover:text-blue-600 transition text-zinc-600">About Us</Link>
            <Link href="/contact" className="hover:text-blue-600 transition text-zinc-600">Help</Link>
          </div>
          
          {/* 3. Auth Actions (Right side) */}
          <div className="flex justify-end items-center gap-4">
            {isLoggedIn ? (
              <div className="relative group">
                <button className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-blue-500 overflow-hidden focus:outline-none transition-transform hover:scale-105">
                  <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full object-cover" />
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-zinc-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                  <div className="p-4 border-b border-zinc-100">
                    <p className="text-sm font-semibold text-zinc-800">Signed in as</p>
                    <p className="text-sm font-medium text-zinc-500 truncate">kaowsar@example.com</p>
                  </div>
                  <div className="p-2 space-y-1">
                    <Link href="/items/manage" className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors">
                      My Dashboard
                    </Link>
                    <button className="w-full text-left px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors">
                      Settings
                    </button>
                    <Link href="/contact" className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors">
                      Help & Feedback
                    </Link>
                  </div>
                  <div className="p-2 border-t border-zinc-100">
                    <button onClick={() => setIsLoggedIn(false)} className="w-full text-left px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex gap-4 items-center">
                <Link href="/login" className="hidden sm:flex items-center justify-center bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors">
                  Sign In
                </Link>
                <Link href="/register" className="flex items-center justify-center bg-blue-600 text-white font-medium hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
