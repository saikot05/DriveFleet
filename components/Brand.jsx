const brands = [
    { name: "Toyota",     slug: "toyota",        color: "#EB0A1E", adaptive: false },
    { name: "BMW",        slug: "bmw",           color: "#0066B1", adaptive: false },
    { name: "Mercedes",   slug: "mercedes",      color: "#888",    adaptive: false  },
    { name: "Audi",       slug: "audi",          color: "#BB0A14", adaptive: false },
    { name: "Ford",       slug: "ford",          color: "#003478", adaptive: false },
    { name: "Honda",      slug: "honda",         color: "#CC0000", adaptive: false },
    { name: "Tesla",      slug: "tesla",         color: "#CC0000", adaptive: false },
    { name: "Hyundai",    slug: "hyundai",       color: "#002C5F", adaptive: false },
    { name: "Porsche",    slug: "porsche",       color: "#AE0517", adaptive: false },
    { name: "Volkswagen", slug: "volkswagen",    color: "#1B3B6F", adaptive: false },
    { name: "Kia",        slug: "kia",           color: "#C4172C", adaptive: false },
    { name: "Nissan",     slug: "nissan",        color: "#C3002F", adaptive: false },
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
                        <div key={`${brand.slug}-${index}`} className="brand-card mx-2.5 flex-shrink-0">
                            <div className="w-36 h-24 rounded-2xl bg-base-100 border border-base-200 flex flex-col items-center justify-center gap-2.5 cursor-pointer px-4 hover:border-base-300 transition-colors">
                                <img
                                    src={`https://cdn.simpleicons.org/${brand.slug}/${brand.adaptive ? "000000" : brand.color.replace("#", "")}`}
                                    alt={brand.name}
                                    width={40}
                                    height={40}
                                    className={`object-contain ${brand.adaptive ? "dark:invert dark:brightness-150" : ""}`}
                                />
                                <span className="text-xs font-semibold text-base-content/60 tracking-wide">
                                    {brand.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center gap-1.5 mt-8">
                {[28, 6, 24, 6, 6].map((w, i) => (
                    <span
                        key={i}
                        className="block rounded-full h-1.5"
                        style={{
                            width: `${w}px`,
                            background: i === 0
                                ? "linear-gradient(to right, #a855f7, #ec4899)"
                                : undefined,
                        }}
                        className={`block rounded-full h-1.5 ${i !== 0 ? "bg-purple-200 dark:bg-purple-900" : ""}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Brand;