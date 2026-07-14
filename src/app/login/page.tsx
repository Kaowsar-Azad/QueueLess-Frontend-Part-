"use client";

import Link from "next/link";
import { FiMail, FiLock } from "react-icons/fi";
import { MdOutlineQueuePlayNext } from "react-icons/md";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please fill in all fields.");
    }
    setLoading(true);
    
    const { data, error } = await signIn.email({
      email,
      password,
    });
    
    setLoading(false);
    
    if (error) {
      toast.error(error.message || "Login failed.");
    } else {
      toast.success("Login successful!");
      // Redirect based on role (defaulting to user if not set)
      // @ts-ignore - bypassing TS checking for role field temporarily
      const role = data?.user?.role || "user";
      
      if (role === "admin") {
        router.push("/dashboard/admin");
      } else if (role === "owner") {
        router.push("/dashboard/owner");
      } else {
        router.push("/dashboard/user");
      }
    }
  };

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
            Stop waiting. <br />
            <span className="text-blue-300">Start living.</span>
          </h1>
          <p className="text-blue-100 text-lg max-w-md leading-relaxed">
            Join thousands of users who save their precious time every day by booking tokens and tracking live queues online.
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

          <h2 className="text-3xl font-bold text-zinc-900 mb-2">Welcome Back</h2>
          <p className="text-zinc-500 mb-8">Please enter your details to sign in.</p>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-zinc-400" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow text-zinc-900" 
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-zinc-700">Password</label>
                <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-500">Forgot password?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-zinc-400" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow text-zinc-900" 
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-zinc-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-zinc-600">
                Remember me for 30 days
              </label>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20 disabled:opacity-50">
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 text-center text-zinc-600">
            Don't have an account?{' '}
            <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
