"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { MdOutlineQueuePlayNext } from "react-icons/md";

export default function AppNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 w-full">
          {/* 1. Logo (Left side) */}
          <div className="flex-1 flex justify-start items-center">
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
          
          {/* 3. Login Button (Right side) */}
          <div className="flex-1 flex justify-end">
            <Button as={Link} href="/login" className="bg-blue-100 text-blue-700 font-medium hover:bg-blue-200" radius="sm">
              Login
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
