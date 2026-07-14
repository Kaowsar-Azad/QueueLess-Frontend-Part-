"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', waitTimeSaved: 120 },
  { name: 'Tue', waitTimeSaved: 200 },
  { name: 'Wed', waitTimeSaved: 150 },
  { name: 'Thu', waitTimeSaved: 300 },
  { name: 'Fri', waitTimeSaved: 250 },
  { name: 'Sat', waitTimeSaved: 400 },
  { name: 'Sun', waitTimeSaved: 450 },
];

export default function StatsSection() {
  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">Our Impact in Numbers</h2>
            <p className="text-zinc-600 text-lg mb-8">
              QueueLess has saved thousands of hours for people across Bangladesh. By enabling online bookings and real-time tracking, we drastically reduce physical waiting time and overcrowding.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                <p className="text-4xl font-bold text-emerald-600 mb-2">5M+</p>
                <p className="text-zinc-600 font-medium">Hours Saved</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <p className="text-4xl font-bold text-blue-600 mb-2">10k+</p>
                <p className="text-zinc-600 font-medium">Partners</p>
              </div>
              <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                <p className="text-4xl font-bold text-amber-600 mb-2">50k+</p>
                <p className="text-zinc-600 font-medium">Daily Bookings</p>
              </div>
              <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200">
                <p className="text-4xl font-bold text-zinc-700 mb-2">99%</p>
                <p className="text-zinc-600 font-medium">Uptime</p>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 bg-zinc-50 rounded-3xl p-8 border border-zinc-200">
            <h3 className="text-xl font-bold text-blue-900 mb-6 text-center">Average Waiting Time Saved (Minutes)</h3>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#71717a'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a'}} />
                  <Tooltip cursor={{fill: '#f4f4f5'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="waitTimeSaved" fill="#2563eb" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
