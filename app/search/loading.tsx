export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-purple-500 border-r-transparent border-b-cyan-500 border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-light text-slate-700">Analyzing product...</h2>
        <p className="text-slate-500 mt-2 font-light">Finding crypto alternatives...</p>
      </div>
    </div>
  )
}
