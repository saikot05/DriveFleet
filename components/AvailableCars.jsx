"use client";
import { useEffect, useState } from "react";
import CarCard from "./CarCard";
import { getAvailableCars } from "@/lib/cars/data";

const AvailableCars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAvailableCars()
            .then((data) => {
                setCars(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch available cars:", err);
                setLoading(false);
            });
    }, []);

    return (
        <section className="section-cars-bg w-full py-16 px-4">
            <div className="max-w-7xl mx-auto flex flex-col gap-4">
                <div className="text-center mb-8">
                    <span className="inline-block text-sm font-semibold tracking-widest uppercase text-purple-500 mb-2">
                        Our Fleet
                    </span>
                    <h2 className="text-4xl font-extrabold text-base-content mb-3 leading-tight">
                        Available Cars
                    </h2>
                    <p className="text-base-content/60 max-w-xl mx-auto text-base leading-relaxed">
                        Browse our latest fleet of premium vehicles available for rent. Find the perfect car for your journey.
                    </p>
                    <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-400" />
                </div>

                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="skeleton h-[380px] w-full rounded-2xl" />
                        ))}
                    </div>
                )}

                {!loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {cars.length > 0 ? (
                            cars.map((car) => (
                                <CarCard key={car._id} car={car} />
                            ))
                        ) : (
                            <p className="col-span-3 text-center text-base-content/50 py-12">
                                No available cars found.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default AvailableCars;