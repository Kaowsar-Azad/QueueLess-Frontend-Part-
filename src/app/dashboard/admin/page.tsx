export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-zinc-50 p-8 sm:p-12">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-zinc-200 p-8">
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Admin Control Panel</h1>
        <p className="text-zinc-600 mb-8">System overview, user management, and platform analytics.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <p className="text-sm font-medium text-blue-800">Total Users</p>
            <h2 className="text-3xl font-bold text-blue-900 mt-1">1,204</h2>
          </div>
          <div className="bg-purple-50 border border-purple-100 rounded-xl p-6">
            <p className="text-sm font-medium text-purple-800">Service Owners</p>
            <h2 className="text-3xl font-bold text-purple-900 mt-1">85</h2>
          </div>
          <div className="bg-zinc-100 border border-zinc-200 rounded-xl p-6">
            <p className="text-sm font-medium text-zinc-800">Total Queues Processed</p>
            <h2 className="text-3xl font-bold text-zinc-900 mt-1">14,302</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
