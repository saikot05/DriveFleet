const brands = [
    { name: "Toyota",     slug: "toyota",        color: "#EB0A1E" },
    { name: "BMW",        slug: "bmw",           color: "#0066B1" },
    { 
        name: "Mercedes",   
        slug: "mercedes-benz", 
        color: "#1a1a1a", 
        customLogo: "https://img.icons8.com/ios-filled/100/1a1a1a/mercedes-benz.png",
        shouldInvert: true
    },
    { name: "Audi",       slug: "audi",          color: "#BB0A14" },
    { name: "Ford",       slug: "ford",          color: "#003478" },
    { name: "Honda",      slug: "honda",         color: "#CC0000" },
    { name: "Tesla",      slug: "tesla",         color: "#CC0000" },
    { name: "Hyundai",    slug: "hyundai",       color: "#002C5F" },
    { name: "Porsche",    slug: "porsche",       color: "#AE0517" },
    { name: "Volkswagen", slug: "volkswagen",    color: "#1B3B6F" },
    { name: "Kia",        slug: "kia",           color: "#C4172C" },
    { name: "Nissan",     slug: "nissan",        color: "#C3002F" },
];

const allBrands = [...brands, ...brands];

const Brand = () => {
    return (
        <section className="w-full py-16 overflow-hidden bg-base-100">
            <div className="max-w-7xl mx-auto px-4 text-center mb-12">
                <span className="inline-block text-sm font-semibold tracking-widest uppercase text-purple-500 mb-2">
                    Trusted Partners
                </span>
                <h2 className="text-4xl font-extrabold text-base-content mb-3">
                    Top Car Brands
                </h2>
                <p className="text-base-content/60 max-w-xl mx-auto text-base leading-relaxed">
                    We partner with the world&apos;s most iconic automotive brands to bring you the best driving experience.
                </p>
                <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-400" />
            </div>

            <div
                className="relative w-full"
                style={{
                    maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                }}
            >
                <div className="marquee-track">
                    {allBrands.map((brand, index) => (
                        <div
                            key={`${brand.slug}-${index}`}
                            className="brand-card mx-3 flex-shrink-0"
                        >
                            <div
                                className="brand-card-inner w-40 h-28 rounded-2xl bg-base-100 border border-base-200 shadow-sm flex flex-col items-center justify-center gap-3 cursor-pointer select-none px-4"
                                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
                            >
                                <img
                                    src={brand.customLogo || `https://cdn.simpleicons.org/${brand.slug}/${brand.color.replace("#", "")}`}
                                    alt={brand.name}
                                    width={44}
                                    height={44}
                                    className={`object-contain ${brand.shouldInvert ? "brand-logo-dark-invert" : ""}`}
                                    style={{ filter: brand.shouldInvert ? undefined : "drop-shadow(0 1px 4px rgba(0,0,0,0.12))" }}
                                />

                                <span
                                    className="text-xs font-bold tracking-wide"
                                    style={{ color: brand.color }}
                                >
                                    {brand.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center gap-2 mt-10">
                {[...Array(5)].map((_, i) => (
                    <span
                        key={i}
                        className="block rounded-full"
                        style={{
                            width: i === 2 ? "24px" : "8px",
                            height: "8px",
                            background:
                                i === 2
                                    ? "linear-gradient(to right, #a855f7, #ec4899)"
                                    : "#e9d5ff",
                        }}
                    />
                ))}
            </div>
        </section>
    );
};

export default Brand;