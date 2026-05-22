"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CarCard from "@/components/CarCard";
import { Search, Sparkles, Filter, X, Info } from "lucide-react";

const ExploreCarsContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [cars, setCars] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    const urlSearchQuery = searchParams.get("search") || "";
    const selectedBrand = searchParams.get("brand") || "";
    const selectedAvailability = searchParams.get("availability") || "all";
    const sortBy = searchParams.get("sort") || "default";

    const [searchInput, setSearchInput] = useState(urlSearchQuery);

    useEffect(() => {
        setSearchInput(urlSearchQuery);
    }, [urlSearchQuery]);

    useEffect(() => {
        const fetchAllCarsForBrands = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`, { cache: "no-store" });
                if (res.ok) {
                    const data = await res.json();
                    const uniqueBrands = [...new Set(data.map((car) => car.make))].filter(Boolean).sort();
                    setBrands(uniqueBrands);
                }
            } catch (err) {
                console.error("Error creating brands list:", err);
            }
        };
        fetchAllCarsForBrands();
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (searchInput.trim()) {
                params.set("search", searchInput);
            } else {
                params.delete("search");
            }
            router.push(`/cars?${params.toString()}`, { scroll: false });
        }, 350);

        return () => clearTimeout(delayDebounceFn);
    }, [searchInput]);

    useEffect(() => {
        const fetchFilteredCars = async () => {
            setLoading(true);
            try {
                const queryParams = new URLSearchParams();
                if (urlSearchQuery) queryParams.set("search", urlSearchQuery);
                if (selectedBrand) queryParams.set("brand", selectedBrand);
                if (selectedAvailability !== "all") queryParams.set("availability", selectedAvailability);
                if (sortBy !== "default") queryParams.set("sort", sortBy);

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars?${queryParams.toString()}`, {
                    cache: "no-store"
                });

                if (res.ok) {
                    const data = await res.json();
                    setCars(data || []);
                }
            } catch (err) {
                console.error("API Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFilteredCars();
    }, [urlSearchQuery, selectedBrand, selectedAvailability, sortBy]);

    const updateSearchParam = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value && value !== "all" && value !== "default") {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`/cars?${params.toString()}`, { scroll: false });
    };

    const handleReset = () => {
        setSearchInput("");
        router.push("/cars", { scroll: false });
    };

    const hasActiveFilters = urlSearchQuery || selectedBrand || selectedAvailability !== "all" || sortBy !== "default";

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-8 md:p-16 mb-12 shadow-2xl border border-white/5">
                <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[120px] -mr-32 -mt-32 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-purple-700/5 rounded-full blur-[120px] -ml-32 -mb-32 pointer-events-none"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

                <div className="relative z-10 max-w-3xl">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-5">
                        <Sparkles className="w-3.5 h-3.5" /> Luxury Fleet Experience
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-5 tracking-tight leading-[1.15]">
                        Find Your <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent">Perfect Journey</span>
                    </h1>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl font-normal opacity-90">
                        Select from our hand-picked collection of prestige cars. Instant search, transparent pricing, and simple booking for any destination.
                    </p>
                </div>
            </div>

            <div className="bg-base-100/90 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border border-base-200/60 mb-12 transition-all duration-300">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                    <div className="relative md:col-span-6">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-purple-500/70">
                            <Search className="w-5 h-5" />
                        </span>
                        <input
                            type="text"
                            placeholder="Type to search: Brand, model, transmission..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="input input-bordered w-full pl-12 pr-10 rounded-2xl bg-purple-500/5 dark:bg-purple-950/20 border-purple-500/20 text-purple-700 dark:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 text-sm h-12 py-0 transition-all font-bold text-center"
                        />
                        {searchInput && (
                            <button
                                onClick={() => setSearchInput("")}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-purple-500/50 hover:text-purple-700"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    <div className="md:col-span-3">
                        <select
                            value={selectedBrand}
                            onChange={(e) => updateSearchParam("brand", e.target.value)}
                            className="select select-bordered w-full rounded-2xl bg-purple-500/5 dark:bg-purple-950/20 border-purple-500/20 text-purple-700 dark:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 text-sm h-12 py-0 font-bold cursor-pointer text-center"
                        >
                            <option value="" className="text-center text-base-content bg-base-100">All Brands</option>
                            {brands.map((b) => (
                                <option key={b} value={b} className="text-center text-base-content bg-base-100">
                                    {b}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="md:col-span-3">
                        <select
                            value={selectedAvailability}
                            onChange={(e) => updateSearchParam("availability", e.target.value)}
                            className="select select-bordered w-full rounded-2xl bg-purple-500/5 dark:bg-purple-950/20 border-purple-500/20 text-purple-700 dark:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 text-sm h-12 py-0 font-bold cursor-pointer text-center"
                        >
                            <option value="all" className="text-center text-base-content bg-base-100">All Availability</option>
                            <option value="available" className="text-center text-base-content bg-base-100">Available Only</option>
                            <option value="unavailable" className="text-center text-base-content bg-base-100">Unavailable Only</option>
                        </select>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-5">
                    <div className="md:col-start-10 md:col-span-3">
                        <select
                            value={sortBy}
                            onChange={(e) => updateSearchParam("sort", e.target.value)}
                            className="select select-bordered w-full rounded-2xl bg-purple-500/5 dark:bg-purple-950/20 border-purple-500/20 text-purple-700 dark:text-purple-300 text-sm h-11 py-0 font-bold text-center"
                        >
                            <option value="default">Default Sorting</option>
                            <option value="price-low-high">Price: Low to High</option>
                            <option value="price-high-low">Price: High to Low</option>
                            <option value="rating-high-low">Highest Rated</option>
                            <option value="year-new-old">Newest Vehicles</option>
                        </select>
                    </div>
                </div>

                {hasActiveFilters && (
                    <div className="flex flex-wrap items-center gap-2.5 mt-5 pt-5 border-t border-base-200/50">
                        <span className="text-xs text-base-content/50 font-bold flex items-center gap-1">
                            <Filter className="w-3.5 h-3.5 text-purple-600" /> Active Filters:
                        </span>
                        {urlSearchQuery && (
                            <div className="badge gap-1.5 p-3 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40">
                                Search: &quot;{urlSearchQuery}&quot;
                                <X className="w-3 h-3 cursor-pointer hover:text-purple-800" onClick={() => setSearchInput("")} />
                            </div>
                        )}
                        {selectedBrand && (
                            <div className="badge gap-1.5 p-3 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40">
                                Brand: {selectedBrand}
                                <X className="w-3 h-3 cursor-pointer hover:text-purple-800" onClick={() => updateSearchParam("brand", "")} />
                            </div>
                        )}
                        {selectedAvailability !== "all" && (
                            <div className="badge gap-1.5 p-3 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40">
                                Status: {selectedAvailability === "available" ? "Available" : "Unavailable"}
                                <X className="w-3 h-3 cursor-pointer hover:text-purple-800" onClick={() => updateSearchParam("availability", "all")} />
                            </div>
                        )}
                        <button
                            onClick={handleReset}
                            className="text-xs font-bold text-red-500 hover:text-red-600 hover:underline transition-all ml-auto pl-2"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="text-sm text-base-content/60 font-medium">Curating our premium vehicle selection...</p>
                </div>
            ) : cars.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cars.map((car) => (
                        <CarCard key={car._id || car.id} car={car} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-base-200/30 rounded-3xl border border-dashed border-base-300 max-w-md mx-auto p-6">
                    <Info className="w-12 h-12 text-base-content/30 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-base-content mb-1">No Vehicles Found</h3>
                    <p className="text-sm text-base-content/60 mb-5">
                        We couldn't find any vehicles matching your configurations.
                    </p>
                    <button onClick={handleReset} className="btn btn-sm btn-primary rounded-xl px-5">
                        Clear Search Filter
                    </button>
                </div>
            )}
        </div>
    );
};

export default ExploreCarsContent;