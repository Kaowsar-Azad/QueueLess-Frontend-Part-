"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@heroui/react";
import { MdOutlineQueuePlayNext } from "react-icons/md";

export default function AppNavbar() {
  return (
    <Navbar isBordered maxWidth="xl" className="bg-white/90 backdrop-blur-md">
      <NavbarBrand>
        <MdOutlineQueuePlayNext className="text-3xl text-blue-600 mr-2" />
        <p className="font-bold text-2xl text-blue-900 tracking-wide">QueueLess</p>
      </NavbarBrand>
      
      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/" className="hover:text-blue-600 transition">
            Services
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/explore" aria-current="page" color="primary" className="font-semibold text-blue-600">
            Live Status
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/explore" className="hover:text-blue-600 transition">
            Booking
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/explore" className="hover:text-blue-600 transition">
            Help
          </Link>
        </NavbarItem>
      </NavbarContent>
      
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="/login" variant="flat" className="bg-blue-100 text-blue-700 font-medium hover:bg-blue-200">
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
