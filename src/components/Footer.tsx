import Link from "next/link";
import { FaTwitter, FaLinkedin, FaHeart } from "react-icons/fa";
import { MdOutlineQueuePlayNext } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="relative bg-zinc-950 text-zinc-400 py-16 overflow-hidden border-t border-zinc-800 mt-auto">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          
          
          <div className="col-span-1 md:col-span-12 lg:col-span-6">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center mr-3 border border-blue-500/20">
                <MdOutlineQueuePlayNext className="text-2xl text-blue-500" />
              </div>
              <span className="text-2xl font-bold text-white tracking-wide">QueueLess</span>
            </div>
            <p className="text-zinc-400 max-w-md leading-relaxed mb-8">
              Smart appointment & queue management system. Say goodbye to long waiting lines and book your slots online with real-time tracking.
            </p>
            <div className="flex space-x-3">
              <a href="https://x.com/pranto17297" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-blue-400 hover:border-blue-400 transition-all duration-300">
                <FaTwitter size={18} />
              </a>
              <a href="https://www.linkedin.com/in/kaowsar-azad" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-blue-700 hover:border-blue-700 transition-all duration-300">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-6 lg:col-span-3 lg:col-start-8">
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link href="/explore" className="hover:text-blue-400 transition-colors">Explore Services</Link></li>
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1 md:col-span-6 lg:col-span-2">
            <h3 className="text-white font-semibold text-lg mb-6">Legal</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
        </div>
        
        <div className="border-t border-zinc-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} QueueLess. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Made with</span>
            <FaHeart className="text-red-500 inline animate-pulse" />
            <span>in Bangladesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
