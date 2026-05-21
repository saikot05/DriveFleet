"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LuArrowRight } from "react-icons/lu";

const Bannar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={bannerRef}
      className="relative w-full overflow-hidden bg-[#0a0a0a] py-16 lg:py-24 flex items-center min-h-[80vh]"
    >
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-[#0a0a0a] to-[#0a0a0a]" />
      </div>

      <div className="absolute top-10 left-10 w-32 h-32 bg-violet-600/10 blur-[50px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-600/10 blur-[80px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-violet-500/50 blur-[1px] animate-ping" style={{ animationDuration: '3s' }} />
      <div className="absolute top-2/3 right-1/4 w-3 h-3 rounded-full bg-purple-500/50 blur-[1px] animate-ping" style={{ animationDuration: '5s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className={`flex flex-col items-center lg:items-start text-center lg:text-left ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs tracking-widest uppercase font-bold mb-8 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
              </span>
              01 Awesome Home Demos
            </div>

            <h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight drop-shadow-lg"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Drive Your Next <br className="hidden lg:block" />
              <span className="bg-gradient-to-r from-violet-500 to-purple-400 bg-clip-text text-transparent">
                Adventure
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/60 max-w-xl mb-10 leading-relaxed font-medium">
              Premium vehicles. Flexible plans. Seamless booking. DriveFleet puts the perfect car at your fingertips wherever your journey takes you.
            </p>
            
            <Link 
              href="/explore-cars" 
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold text-lg hover:opacity-90 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] no-underline"
            >
              Live Preview
              <LuArrowRight className="group-hover:translate-x-1.5 transition-transform duration-300" size={20} />
            </Link>
          </div>

          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[550px] flex items-center justify-center lg:justify-end mt-10 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 to-purple-600/10 rounded-full blur-[100px] -z-10" />
            
            <div 
              className={`relative w-[110%] sm:w-[120%] lg:w-[130%] lg:-mr-[15%] h-full ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}
              style={isVisible ? { animationDelay: "400ms", animationFillMode: "both" } : {}}
            >
              <Image 
                src="https://html.merku.love/rotors/demo_assets/images/banner/img_01.png"
                alt="Premium Transparent Car"
                fill
                priority
                quality={100}
                className="object-contain object-center lg:object-right drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Bannar;
