"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CarCard from "@/components/CarCard";
import { getCars } from "@/lib/cars/data";
import { Search, SlidersHorizontal, RotateCcw, Sparkles, Filter, X, Grid, List, CheckCircle, Info } from "lucide-react";

const ExploreCarsContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
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
        setLoading(true);
        getCars()
            .then((data) => {
                setCars(data || []);
                setFilteredCars(data || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching cars:", err);
                setLoading(false);
            });
    }, []);

    const brands = [...new Set(cars.map((car) => car.make))].filter(Boolean).sort();

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
        let result = [...cars];

        if (searchInput.trim() !== "") {
            const query = searchInput.toLowerCase().trim();
            result = result.filter(
                (car) =>
                    car.make?.toLowerCase().includes(query) ||
                    car.model?.toLowerCase().includes(query) ||
                    car.category?.toLowerCase().includes(query) ||
                    car.fuel_type?.toLowerCase().includes(query) ||
                    car.transmission?.toLowerCase().includes(query) ||
                    car.location?.toLowerCase().includes(query) ||
                    car.features?.some((f) => f.toLowerCase().includes(query))
            );
        }

        if (selectedBrand) {
            result = result.filter((car) => car.make === selectedBrand);
        }

        if (selectedAvailability !== "all") {
            const wantAvailable = selectedAvailability === "available";
            result = result.filter((car) => {
                return wantAvailable ? car.available === true : car.available === false;
            });
        }

        if (sortBy === "price-low-high") {
            result.sort((a, b) => Number(a.price_per_day) - Number(b.price_per_day));
        } else if (sortBy === "price-high-low") {
            result.sort((a, b) => Number(b.price_per_day) - Number(a.price_per_day));
        } else if (sortBy === "rating-high-low") {
            result.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
        } else if (sortBy === "year-new-old") {
            result.sort((a, b) => Number(b.year || 0) - Number(a.year || 0));
        }

        setFilteredCars(result);
    }, [searchInput, selectedBrand, selectedAvailability, sortBy, cars]);

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

    const hasActiveFilters = searchInput || selectedBrand || selectedAvailability !== "all" || sortBy !== "default";

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
                            placeholder="Type to search: Brand, model, transmission, fuel, etc..."
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

                {hasActiveFilters && (
                    <div className="flex flex-wrap items-center gap-2.5 mt-5 pt-5 border-t border-base-200/50">
                        <span className="text-xs text-base-content/50 font-bold flex items-center gap-1">
                            <Filter className="w-3.5 h-3.5 text-purple-600" /> Active Filters:
                        </span>
                        {searchInput && (
                            <div className="badge gap-1.5 p-3 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40">
                                Search: &quot;{searchInput}&quot;
                                <X className="w-3 h-3 cursor-pointer hover:text-purple-800 dark:hover:text-purple-100" onClick={() => setSearchInput("")} />
                            </div>
                        )}
                        {selectedBrand && (
                            <div className="badge gap-1.5 p-3 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40">
                                Brand: {selectedBrand}
                                <X className="w-3 h-3 cursor-pointer hover:text-purple-800 dark:hover:text-purple-100" onClick={() => updateSearchParam("brand", "")} />
                            </div>
                        )}
                        {selectedAvailability !== "all" && (
                            <div className="badge gap-1.5 p-3 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40">
                                Status: {selectedAvailability === "available" ? "Available" : "Unavailable"}
                                <X className="w-3 h-3 cursor-pointer hover:text-purple-800 dark:hover:text-purple-100" onClick={() => updateSearchParam("availability", "all")} />
                            </div>
                        )}
                        {sortBy !== "default" && (
                            <div className="badge gap-1.5 p-3 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40">
                                Sort: {
                                    sortBy === "price-low-high" ? "Price: Low to High" :
                                        sortBy === "price-high-low" ? "Price: High to Low" :
                                            sortBy === "rating-high-low" ? "Highest Rated" : "Newest Vehicles"
                                }
                                <X className="w-3 h-3 cursor-pointer hover:text-purple-800 dark:hover:text-purple-100" onClick={() => updateSearchParam("sort", "default")} />
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

                <div className="flex flex-wrap items-center justify-between mt-6 pt-5 border-t border-base-200/50 gap-4">
                    <div className="flex items-center gap-3">
                        <SlidersHorizontal className="text-purple-600 w-4 h-4" />
                        <span className="text-xs font-bold text-base-content/70">Sort By:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => updateSearchParam("sort", e.target.value)}
                            className="select select-ghost select-xs focus:outline-none text-xs font-extrabold text-purple-600 cursor-pointer"
                        >
                            <option value="default">Default</option>
                            <option value="price-low-high">Price: Low to High</option>
                            <option value="price-high-low">Price: High to Low</option>
                            <option value="rating-high-low">Highest Rating</option>
                            <option value="year-new-old">Newest First</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-3 ml-auto">
                        <span className="text-xs text-base-content/50 font-bold bg-base-200/50 px-3.5 py-2 rounded-full">
                            Showing {filteredCars.length} of {cars.length} vehicles
                        </span>
                        <button
                            onClick={handleReset}
                            className="btn btn-ghost btn-sm rounded-xl text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/20 text-xs font-bold gap-1.5 cursor-pointer h-9 px-3 min-h-0 border border-transparent hover:border-purple-200 transition-all"
                        >
                            <RotateCcw className="w-3.5 h-3.5" /> Reset
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-32 gap-4 bg-base-100 rounded-3xl border border-base-200/50 shadow-md">
                    <span className="loading loading-spinner loading-lg text-purple-600 scale-125"></span>
                    <p className="text-sm font-bold text-base-content/40 tracking-wider animate-pulse">
                        Loading our elite fleet...
                    </p>
                </div>
            ) : filteredCars.length > 0 ? (
                /* Perfectly Grid-spaced fleet layout */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCars.map((car) => (
                        <CarCard key={car._id} car={car} />
                    ))}
                </div>
            ) : (
                /* Premium Empty State */
                <div className="bg-base-100 rounded-3xl p-16 text-center border border-base-200/50 max-w-lg mx-auto shadow-lg">
                    <div className="w-20 h-20 rounded-full bg-purple-50 dark:bg-purple-950/20 flex items-center justify-center text-purple-600 mx-auto mb-6">
                        <Search className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-base-content mb-3">No Vehicles Found</h3>
                    <p className="text-base-content/60 text-sm mb-8 leading-relaxed max-w-md mx-auto">
                        We couldn&apos;t find any vehicles matching your search criteria. Try modifying your filter chips or reset to default.
                    </p>
                    <button
                        onClick={handleReset}
                        className="btn btn-purple rounded-2xl px-8 py-3.5 h-auto min-h-0 text-sm"
                    >
                        Reset All Filters
                    </button>
                </div>
            )}
        </div>
    );
};

const AllCarsPage = () => {
    return (
        <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-purple-50/20 to-slate-100/60 dark:from-slate-950 dark:via-zinc-900 dark:to-black transition-colors duration-300">
            <Suspense fallback={
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                    <span className="loading loading-spinner loading-lg text-purple-600"></span>
                </div>
            }>
                <ExploreCarsContent />
            </Suspense>
        </main>
    );
};

export default AllCarsPage;