"use client";

import Link from "next/link";
import { useState } from "react";
import { MdOutlineQueuePlayNext } from "react-icons/md";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { useSession, signOut } from "@/lib/auth-client";
import { usePathname } from "next/navigation";

export default function AppNavbar() {
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const user = session?.user;
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getInitials = (name: string) => name ? name.charAt(0).toUpperCase() : 'U';
  
  const linkClass = (path: string) => 
    pathname === path 
      ? "text-blue-600 font-semibold" 
      : "hover:text-blue-600 transition text-zinc-600 font-medium";

  const mobileLinkClass = (path: string) =>
    pathname === path
      ? "block px-4 py-3 bg-blue-50 text-blue-700 font-bold rounded-xl"
      : "block px-4 py-3 text-zinc-700 font-medium hover:bg-zinc-50 rounded-xl transition-colors";

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full">
          
          {/* 1. Logo (Left side) */}
          <div className="flex justify-start items-center">
            <MdOutlineQueuePlayNext className="text-3xl text-blue-600 mr-2" />
            <Link href="/" className="font-bold text-2xl tracking-wide text-blue-900">
              QueueLess
            </Link>
          </div>
          
          {/* 2. Desktop Center Links (Middle) */}
          <div className="hidden md:flex flex-1 justify-center gap-8">
            <Link href="/" className={linkClass("/")}>Home</Link>
            <Link href="/explore" className={linkClass("/explore")}>Explore</Link>
            {isLoggedIn ? (
              <>
                {((user as any)?.role === 'user' || !(user as any)?.role) && (
                  <Link href="/live" className={linkClass("/live")}>Live Status</Link>
                )}
                <Link href="/about" className={linkClass("/about")}>About Us</Link>
                <Link href="/contact" className={linkClass("/contact")}>Contact</Link>
                <Link href={`/dashboard/${(user as any)?.role || 'user'}`} className={linkClass(`/dashboard/${(user as any)?.role || 'user'}`)}>Dashboard</Link>
              </>
            ) : (
              <>
                <Link href="/about" className={linkClass("/about")}>About Us</Link>
                <Link href="/contact" className={linkClass("/contact")}>Contact</Link>
              </>
            )}
          </div>
          
          {/* 3. Desktop Auth Actions & Mobile Hamburger (Right side) */}
          <div className="flex justify-end items-center gap-4">
            
            {/* Desktop View */}
            <div className="hidden md:flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-3 bg-zinc-50 px-3 py-1.5 rounded-full border border-zinc-200/80">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold overflow-hidden border border-blue-200">
                      {user?.image ? (
                        <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <span>{getInitials(user?.name || "User")}</span>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-zinc-800 pr-2">
                      {user?.name?.split(' ')[0] || "User"}
                    </span>
                  </div>
                  
                  <button 
                    onClick={async () => {
                      await signOut();
                      window.location.href = "/";
                    }} 
                    className="flex items-center justify-center gap-2 text-sm font-bold text-red-600 hover:text-white hover:bg-red-500 px-4 py-2 rounded-xl transition-all border border-red-200 hover:border-red-500"
                  >
                    <FiLogOut /> Log Out
                  </button>
                </>
              ) : (
                <div className="flex gap-3 items-center">
                  <Link href="/login" className="bg-blue-50 text-blue-700 font-bold hover:bg-blue-100 px-5 py-2 rounded-xl transition-colors">
                    Sign In
                  </Link>
                  <Link href="/register" className="bg-blue-600 text-white font-bold hover:bg-blue-700 px-5 py-2 rounded-xl transition-colors shadow-sm shadow-blue-600/20">
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button 
              className="md:hidden flex items-center justify-center p-2 rounded-lg text-zinc-600 hover:bg-zinc-100 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>

          </div>
        </div>
      </div>

      {/* 4. Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-zinc-200 absolute w-full shadow-lg">
          <div className="px-4 py-6 space-y-2 max-h-[80vh] overflow-y-auto">
            
            {isLoggedIn && (
              <div className="flex items-center gap-4 mb-6 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-bold text-lg overflow-hidden border-2 border-white shadow-sm">
                  {user?.image ? (
                    <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span>{getInitials(user?.name || "User")}</span>
                  )}
                </div>
                <div>
                  <p className="font-bold text-zinc-900">{user?.name || "User"}</p>
                  <p className="text-xs font-medium text-zinc-500">{user?.email}</p>
                </div>
              </div>
            )}

            <Link href="/" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass("/")}>Home</Link>
            <Link href="/explore" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass("/explore")}>Explore</Link>
            
            {isLoggedIn ? (
              <>
                {((user as any)?.role === 'user' || !(user as any)?.role) && (
                  <Link href="/live" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass("/live")}>Live Status</Link>
                )}
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass("/about")}>About Us</Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass("/contact")}>Contact</Link>
                <Link href={`/dashboard/${(user as any)?.role || 'user'}`} onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass(`/dashboard/${(user as any)?.role || 'user'}`)}>Dashboard</Link>
                
                <div className="pt-4 mt-4 border-t border-zinc-100">
                  <button 
                    onClick={async () => {
                      setMobileMenuOpen(false);
                      await signOut();
                      window.location.href = "/";
                    }} 
                    className="w-full text-left px-4 py-3 flex items-center gap-2 text-red-600 font-bold hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <FiLogOut /> Log Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass("/about")}>About Us</Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass("/contact")}>Contact</Link>
                
                <div className="grid grid-cols-2 gap-3 pt-4 mt-4 border-t border-zinc-100">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-center bg-blue-50 text-blue-700 font-bold hover:bg-blue-100 py-3 rounded-xl transition-colors">
                    Sign In
                  </Link>
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="text-center bg-blue-600 text-white font-bold hover:bg-blue-700 py-3 rounded-xl transition-colors">
                    Get Started
                  </Link>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </nav>
  );
}
