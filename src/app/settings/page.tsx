"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { FiArrowLeft, FiUser, FiMail, FiShield } from "react-icons/fi";

export default function SettingsPage() {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center">
        <p className="text-zinc-600 font-semibold">Please log in to view settings.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-zinc-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <Link
          href={`/dashboard/${(user as any)?.role || 'user'}`}
          className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-800 mb-6 transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Back to Dashboard
        </Link>

        <div className="bg-white rounded-3xl border border-zinc-200/80 shadow-sm p-8">
          <div className="border-b border-zinc-100 pb-6 mb-8">
            <h1 className="text-3xl font-bold text-zinc-900">Profile Settings</h1>
            <p className="text-zinc-500 mt-1">Manage your account information and preferences.</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-center p-6 bg-zinc-50 rounded-2xl border border-zinc-100 mb-6">
              <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-700 font-bold text-3xl flex items-center justify-center border-2 border-blue-500">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                    <FiUser />
                  </div>
                  <input
                    type="text"
                    readOnly
                    value={user.name || ""}
                    className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none text-zinc-600 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                    <FiMail />
                  </div>
                  <input
                    type="email"
                    readOnly
                    value={user.email || ""}
                    className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none text-zinc-600 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Account Role</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                    <FiShield />
                  </div>
                  <input
                    type="text"
                    readOnly
                    value={((user as any).role || "user").toUpperCase()}
                    className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none text-zinc-600 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
