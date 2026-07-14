export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-zinc-50 p-8 sm:p-12">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-zinc-200 p-8">
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">My Tickets</h1>
        <p className="text-zinc-600 mb-8">View and manage your upcoming appointments and queue status.</p>
        
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-center">
          <p className="text-blue-800 font-medium">You don't have any active tickets right now.</p>
          <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Find a Service
          </button>
        </div>
      </div>
    </div>
  );
}
