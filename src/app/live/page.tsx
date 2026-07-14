export default function LiveStatusPage() {
  return (
    <div className="min-h-[85vh] bg-zinc-50 flex items-center justify-center p-8">
      <div className="text-center bg-white p-12 rounded-3xl shadow-sm border border-zinc-200">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="w-8 h-8 bg-blue-600 rounded-full animate-ping"></div>
        </div>
        <h1 className="text-3xl font-bold text-zinc-900 mb-4">Live Status</h1>
        <p className="text-zinc-600 max-w-md mx-auto">
          Here you will be able to track your queue position in real-time. We are currently building this feature!
        </p>
      </div>
    </div>
  );
}
