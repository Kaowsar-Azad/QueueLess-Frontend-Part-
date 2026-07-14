"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Button, 
  Avatar, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem 
} from "@heroui/react";
import { MdOutlineQueuePlayNext } from "react-icons/md";

export default function AppNavbar() {
  // Mock login state. Set to true to see the logged-in design, false for logged-out.
  const [isLoggedIn, setIsLoggedIn] = useState(true);

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
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="primary"
                    name="Kaowsar"
                    size="sm"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">kaowsar@example.com</p>
                  </DropdownItem>
                  <DropdownItem key="dashboard" as={Link} href="/items/manage">
                    My Dashboard
                  </DropdownItem>
                  <DropdownItem key="settings">
                    Settings
                  </DropdownItem>
                  <DropdownItem key="help_and_feedback" as={Link} href="/contact">
                    Help & Feedback
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger" onPress={() => setIsLoggedIn(false)}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <>
                <Button as={Link} href="/login" className="hidden sm:flex bg-blue-50 text-blue-700 font-medium hover:bg-blue-100" radius="sm">
                  Sign In
                </Button>
                <Button as={Link} href="/register" className="bg-blue-600 text-white font-medium hover:bg-blue-700" radius="sm">
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
