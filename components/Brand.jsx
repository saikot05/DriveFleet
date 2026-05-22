import React from "react";

const brands = [
    { name: "Toyota", slug: "toyota", color: "#EB0A1E" },
    { name: "BMW", slug: "bmw", color: "#0066B1" },
    { name: "Mercedes", slug: "mercedes", color: "#000000" },
    { name: "Audi", slug: "audi", color: "#BB0A14" },
    { name: "Ford", slug: "ford", color: "#003478" },
    { name: "Honda", slug: "honda", color: "#CC0000" },
    { name: "Tesla", slug: "tesla", color: "#CC0000" },
    { name: "Hyundai", slug: "hyundai", color: "#002C5F" },
    { name: "Porsche", slug: "porsche", color: "#AE0517" },
    { name: "Volkswagen", slug: "volkswagen", color: "#1B3B6F" },
    { name: "Kia", slug: "kia", color: "#C4172C" },
    { name: "Nissan", slug: "nissan", color: "#C3002F" },
];

const allBrands = [...brands, ...brands, ...brands];

const Brand = () => {
    return (
        <section className="w-full py-20 overflow-hidden bg-gradient-to-b from-base-100 to-base-200/40 dark:from-base-100 dark:to-base-300/20 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[250px] bg-purple-500/10 dark:bg-purple-500/5 blur-[130px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 text-center mb-16 relative z-10">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase bg-purple-500/10 dark:bg-purple-400/10 text-purple-600 dark:text-purple-400 px-3 py-1.5 rounded-full mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                    Trusted Partners
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-base-content tracking-tight mb-4">
                    Top Fleet Brands Available
                </h2>
                <p className="text-base-content/70 dark:text-base-content/60 max-w-2xl mx-auto text-base md:text-lg font-medium leading-relaxed">
                    We partner with the world&apos;s most premium and reliable automotive giants to assure you a premium driving experience.
                </p>
            </div>

            <div
                className="relative w-full overflow-hidden py-4"
                style={{
                    maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
                }}
            >
                <style>{`
                    @keyframes marquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-33.333%); }
                    }
                    .animate-marquee-track {
                        display: flex;
                        width: max-content;
                        animation: marquee 35s linear infinite;
                    }
                    .animate-marquee-track:hover {
                        animation-play-state: paused;
                    }
                `}</style>

                <div className="animate-marquee-track gap-6">
                    {allBrands.map((brand, index) => (
                        <div
                            key={`${brand.slug}-${index}`}
                            className="group relative w-40 h-28 flex flex-col items-center justify-center rounded-2xl bg-base-100 border border-base-200/80 dark:border-base-300 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-purple-500/40 dark:hover:border-purple-400/40 cursor-pointer"
                        >
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative z-10 w-12 h-12 flex items-center justify-center mb-2 transition-all duration-300 group-hover:scale-110">
                                <img
                                    src={`https://cdn.simpleicons.org/${brand.slug}`}
                                    alt={brand.name}
                                    className="w-10 h-10 object-contain filter grayscale opacity-40 dark:invert dark:opacity-50 group-hover:filter-none group-hover:opacity-100 dark:group-hover:invert-0 dark:group-hover:opacity-100 transition-all duration-300"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>

                            <span className="relative z-10 text-xs font-bold text-base-content/60 dark:text-base-content/50 group-hover:text-base-content dark:group-hover:text-base-content transition-colors duration-300 tracking-wide">
                                {brand.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center items-center gap-2 mt-12">
                {[1, 2, 3, 4, 5].map((item, i) => (
                    <span
                        key={i}
                        className={`block h-1.5 rounded-full transition-all duration-300 ${
                            i === 0 
                            ? "w-8 bg-gradient-to-r from-purple-500 to-pink-500 shadow-sm shadow-purple-500/50 dark:shadow-purple-400/20" 
                            : "w-2 bg-base-content/20 dark:bg-base-content/10"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Brand;