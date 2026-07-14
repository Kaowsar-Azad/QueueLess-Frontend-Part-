export default function OwnerDashboard() {
  return (
    <div className="min-h-screen bg-zinc-50 p-8 sm:p-12">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-zinc-200 p-8">
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Service Management</h1>
        <p className="text-zinc-600 mb-8">Manage your queues, services, and view live analytics.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6">
            <h3 className="text-xl font-bold text-emerald-900 mb-2">Active Queues</h3>
            <p className="text-emerald-700 text-sm mb-4">You have 0 active queues running right now.</p>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors w-full">
              Start New Queue
            </button>
          </div>
          
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-6">
            <h3 className="text-xl font-bold text-amber-900 mb-2">Service Settings</h3>
            <p className="text-amber-700 text-sm mb-4">Update your business details and operating hours.</p>
            <button className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors w-full">
              Manage Services
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
