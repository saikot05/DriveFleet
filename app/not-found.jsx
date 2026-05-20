import Link from "next/link";
import { Compass, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-purple-50/20 to-slate-100/60 dark:from-slate-950 dark:via-zinc-900 dark:to-black flex flex-col items-center justify-center p-6 transition-colors duration-300">
      <div className="relative max-w-xl w-full text-center bg-base-100 rounded-3xl p-8 md:p-12 shadow-2xl border border-base-200/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-purple-600/10 rounded-full blur-[60px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-pink-600/10 rounded-full blur-[60px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-purple-50 dark:bg-purple-950/20 flex items-center justify-center text-purple-600 mb-8 border border-purple-100 dark:border-purple-900/30 animate-pulse">
            <Compass className="w-12 h-12 animate-spin [animation-duration:10s]" />
          </div>

          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-200/25 mb-4 uppercase tracking-widest">
            Error Code: 404
          </span>

          <h1 className="text-3xl md:text-4xl font-extrabold text-base-content tracking-tight mb-4">
            Lost in <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Destination</span>
          </h1>

          <p className="text-base-content/60 text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed">
            The page you are looking for has taken a detour, been moved, or does not exist. Let&apos;s get you back on track to your next journey!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link
              href="/"
              className="btn bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 border-0 text-white rounded-2xl shadow-lg shadow-purple-500/20 px-8 py-3.5 h-auto min-h-0 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
            >
              <Home className="w-4 h-4" /> Back to Home
            </Link>
            <Link
              href="/cars"
              className="btn btn-outline border-base-300 hover:bg-base-200 text-base-content rounded-2xl px-8 py-3.5 h-auto min-h-0 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
            >
              <ArrowLeft className="w-4 h-4" /> Explore Fleet
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
