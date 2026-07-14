import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdOutlineQueuePlayNext } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-zinc-300 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <MdOutlineQueuePlayNext className="text-3xl text-emerald-400 mr-2" />
              <span className="text-2xl font-bold text-white tracking-wide">QueueLess</span>
            </div>
            <p className="text-blue-200 max-w-sm">
              Smart appointment & queue management system. Say goodbye to long waiting lines and book your slots online.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-emerald-400 transition">Home</Link></li>
              <li><Link href="/explore" className="hover:text-emerald-400 transition">Explore Services</Link></li>
              <li><Link href="/about" className="hover:text-emerald-400 transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition">Contact</Link></li>
            </ul>
          </div>
          
          {/* Social */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-zinc-300 hover:text-white hover:bg-blue-700 p-2 rounded-full bg-blue-800 transition">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-zinc-300 hover:text-white hover:bg-blue-700 p-2 rounded-full bg-blue-800 transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-zinc-300 hover:text-white hover:bg-blue-700 p-2 rounded-full bg-blue-800 transition">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-zinc-300 hover:text-white hover:bg-blue-700 p-2 rounded-full bg-blue-800 transition">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
          
        </div>
        
        <div className="border-t border-blue-800 mt-12 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} QueueLess. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
