import Link from "next/link";
import { ShieldCheck, Zap, Key, BadgePercent, ArrowRight } from "lucide-react";

const PremiumExperience = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-purple-50/10 dark:to-purple-950/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold text-purple-600 dark:text-purple-400 tracking-widest bg-purple-50 dark:bg-purple-950/40 px-4 py-2 rounded-full inline-block mb-4 border border-purple-200/40 dark:border-purple-800/30">
            Why Choose DriveFleet
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            The Premium Rental <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Experience</span>
          </h2>
          <p className="text-base text-slate-500 dark:text-zinc-400 font-medium max-w-xl mx-auto leading-relaxed">
            We offer luxury fleet setups, flexible transparent dynamics, and top-tier client security for your premium journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group p-8 bg-white dark:bg-zinc-900/60 backdrop-blur-md rounded-3xl border border-slate-200/60 dark:border-zinc-800/80 shadow-xl shadow-slate-100/40 dark:shadow-none hover:border-purple-500/40 dark:hover:border-purple-500/30 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Fully Insured Rides</h3>
              <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed font-medium">
                Drive with absolute peace of mind. Every single vehicle in our dynamic fleet includes premium zero-deductible insurance protection setup coverage.
              </p>
            </div>
          </div>

          <div className="group p-8 bg-white dark:bg-zinc-900/60 backdrop-blur-md rounded-3xl border border-slate-200/60 dark:border-zinc-800/80 shadow-xl shadow-slate-100/40 dark:shadow-none hover:border-purple-500/40 dark:hover:border-purple-500/30 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Instant Booking Confirmation</h3>
              <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed font-medium">
                Forget documentation waiting loops. Pick your favorite elite drive option, tap to submit your timeline, and receive instant digital processing layout approval.
              </p>
            </div>
          </div>

          <div className="group p-8 bg-white dark:bg-zinc-900/60 backdrop-blur-md rounded-3xl border border-slate-200/60 dark:border-zinc-800/80 shadow-xl shadow-slate-100/40 dark:shadow-none hover:border-purple-500/40 dark:hover:border-purple-500/30 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Key className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Flexible Self-Drive Plan</h3>
              <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed font-medium">
                Control the steering wheel or opt for an executive personal driver configuration whenever requested. Custom matching layouts available instantly.
              </p>
            </div>
          </div>

          <div className="group p-8 bg-white dark:bg-zinc-900/60 backdrop-blur-md rounded-3xl border border-slate-200/60 dark:border-zinc-800/80 shadow-xl shadow-slate-100/40 dark:shadow-none hover:border-purple-500/40 dark:hover:border-purple-500/30 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BadgePercent className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Transparent Dynamic Pricing</h3>
              <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed font-medium">
                What you calculate is precisely what you pay for the trip. No hidden commission charges, structural processing add-ons, or surprise layout premium fees.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-950 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden border border-purple-500/20">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-600/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-3">Ready to Experience Supreme Comfort?</h3>
              <p className="text-sm text-purple-200/70 font-medium leading-relaxed">
                Join DriveFleet club memberships to unlock high horsepower engines, customized luxury comfort details, and dedicated support features.
              </p>
            </div>
            <Link href="/cars" className="btn bg-white hover:bg-slate-100 text-slate-950 border-0 font-extrabold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2 group tracking-wide shrink-0">
              Explore The Fleet 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumExperience;