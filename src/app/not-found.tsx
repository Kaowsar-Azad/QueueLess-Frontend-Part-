"use client";

import Link from "next/link";
import { FiAlertCircle, FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="flex-1 w-full bg-zinc-50 flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="bg-white p-12 rounded-3xl shadow-xl shadow-blue-900/5 max-w-lg w-full border border-zinc-100 flex flex-col items-center">
        <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex justify-center items-center mb-6">
          <FiAlertCircle className="text-5xl" />
        </div>
        
        <h1 className="text-6xl font-extrabold text-blue-900 mb-4 tracking-tight">404</h1>
        <h2 className="text-2xl font-bold text-zinc-800 mb-4">Page Not Found</h2>
        
        <p className="text-zinc-500 mb-8 leading-relaxed">
          Oops! The page you are looking for doesn&apos;t exist or has been moved. 
          Please check the URL or navigate back to the home page.
        </p>
        
        <Link 
          href="/" 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold px-8 py-3 rounded-xl shadow-md shadow-blue-600/20"
        >
          <FiArrowLeft /> Back to Home
        </Link>
      </div>
    </div>
  );
}
