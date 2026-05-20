"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
    ArrowLeft, Star, Fuel, Settings2, Users, MapPin, 
    Gauge, Zap, Palette, CheckCircle, ShieldCheck,
    X, Check, Phone, Mail, User
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { getCarById, createBooking } from "@/lib/cars/data";
import { Spinner } from "@heroui/react";

export default function CarDetailsPage({ params }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const id = resolvedParams.id;

    const { data: session } = useSession();
    const user = session?.user;

    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBooked, setIsBooked] = useState(false);
    const [bookingLoading, setBookingLoading] = useState(false);

    const [formData, setFormData] = useState({
        userName: "",
        userEmail: "",
        phone: "",
        startDate: "",
        endDate: ""
    });

    useEffect(() => {
        if (!id) return;
        
        setLoading(true);
        getCarById(id)
            .then((data) => {
                setCar(data);
                setIsBooked(!data.available);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching car:", err);
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                userName: user.name || "",
                userEmail: user.email || ""
            }));
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const calculateDays = () => {
        if (!formData.startDate || !formData.endDate) return 0;
        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);
        if (end < start) return 0;
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays === 0 ? 1 : diffDays;
    };

    const days = calculateDays();
    const totalPrice = car ? days * car.price_per_day : 0;

    const handleBookingSubmit = async (e) => {
        e.preventDefault();

        if (!formData.phone.trim()) {
            toast.error("Please enter a valid phone number");
            return;
        }
        if (!formData.startDate || !formData.endDate) {
            toast.error("Please select start and end dates");
            return;
        }
        if (new Date(formData.endDate) < new Date(formData.startDate)) {
            toast.error("End date cannot be earlier than start date");
            return;
        }
        
        const today = new Date();
        today.setHours(0,0,0,0);
        if (new Date(formData.startDate) < today) {
            toast.error("Start date cannot be in the past");
            return;
        }

        setBookingLoading(true);

        const bookingPayload = {
            carId: car._id,
            make: car.make,
            model: car.model,
            image: car.image,
            price_per_day: car.price_per_day,
            userName: formData.userName || "Guest User",
            userEmail: formData.userEmail || "guest@example.com",
            phone: formData.phone,
            startDate: formData.startDate,
            endDate: formData.endDate,
            totalPrice: totalPrice,
            status: "Confirmed",
            bookingDate: new Date().toISOString()
        };

        try {
            const res = await createBooking(bookingPayload);

            if (res.ok) {
                toast.success("Ride Booked Successfully!");
                setIsBooked(true);
                setIsModalOpen(false);
                setTimeout(() => {
                    router.push("/my-bookings");
                }, 1500);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } catch (err) {
            console.error("Booking error:", err);
            toast.error("Could not complete booking request.");
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-950 py-24 gap-4">
                <Spinner color="secondary" size="lg" />
                <p className="text-xs font-bold text-base-content/40 tracking-wider animate-pulse">
                    Loading vehicle specifications...
                </p>
            </div>
        );
    }

    if (!car) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-950 p-6">
                <div className="text-center max-w-md bg-base-100 p-8 rounded-3xl border border-base-200 shadow-xl">
                    <h2 className="text-3xl font-extrabold text-base-content mb-3">Car Not Found</h2>
                    <p className="text-base-content/60 text-sm mb-6 leading-relaxed">
                        We couldn&apos;t find details for this vehicle. It may have been removed or the ID is invalid.
                    </p>
                    <Link
                        href="/cars"
                        className="btn bg-purple-600 hover:bg-purple-700 text-white border-0 rounded-2xl px-6"
                    >
                        Back to Fleet
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-purple-50/20 to-slate-100/60 dark:from-slate-950 dark:via-zinc-900 dark:to-black py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <Link 
                        href="/cars" 
                        className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors bg-purple-50 dark:bg-purple-950/25 px-4 py-2 rounded-2xl border border-purple-200/50"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Fleet
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        <div className="relative h-[300px] md:h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl border border-base-200">
                            {car.image ? (
                                <img 
                                    src={car.image} 
                                    alt={`${car.make} ${car.model}`}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-slate-200 dark:bg-zinc-800 flex items-center justify-center">
                                    <span className="text-xl font-bold opacity-30">No Image Available</span>
                                </div>
                            )}

                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-950/80 backdrop-blur-md text-white border border-white/10 uppercase tracking-widest">
                                    {car.category}
                                </span>
                            </div>

                            <div className="absolute top-4 right-4">
                                <span className={`px-4 py-2 rounded-full text-xs font-bold text-white shadow-lg border border-white/10 ${!isBooked ? "bg-success" : "bg-error"}`}>
                                    {!isBooked ? "Available for Rent" : "Currently Booked"}
                                </span>
                            </div>
                        </div>

                        <div className="bg-base-100 rounded-3xl p-6 md:p-8 shadow-xl border border-base-200/60">
                            <h3 className="text-lg font-bold mb-6 text-base-content flex items-center gap-2">
                                <Gauge className="w-5 h-5 text-purple-600" /> Technical Specifications
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                                <div className="flex items-center gap-3 p-3 rounded-2xl bg-base-200/30 border border-base-200/40">
                                    <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/20 text-purple-600 flex items-center justify-center shrink-0">
                                        <Gauge className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-base-content/40 tracking-wider">Mileage</p>
                                        <p className="text-sm font-bold text-base-content">{car.mileage?.toLocaleString() || "N/A"} mi</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 rounded-2xl bg-base-200/30 border border-base-200/40">
                                    <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/20 text-purple-600 flex items-center justify-center shrink-0">
                                        <Settings2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-base-content/40 tracking-wider">Transmission</p>
                                        <p className="text-sm font-bold text-base-content">{car.transmission || "Automatic"}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 rounded-2xl bg-base-200/30 border border-base-200/40">
                                    <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/20 text-purple-600 flex items-center justify-center shrink-0">
                                        <Fuel className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-base-content/40 tracking-wider">Fuel Type</p>
                                        <p className="text-sm font-bold text-base-content">{car.fuel_type || "Petrol"}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 rounded-2xl bg-base-200/30 border border-base-200/40">
                                    <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/20 text-purple-600 flex items-center justify-center shrink-0">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-base-content/40 tracking-wider">Capacity</p>
                                        <p className="text-sm font-bold text-base-content">{car.seats || 5} Seats</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 rounded-2xl bg-base-200/30 border border-base-200/40">
                                    <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/20 text-purple-600 flex items-center justify-center shrink-0">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-base-content/40 tracking-wider">Power</p>
                                        <p className="text-sm font-bold text-base-content">{car.horsepower || "N/A"} HP</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 rounded-2xl bg-base-200/30 border border-base-200/40">
                                    <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/20 text-purple-600 flex items-center justify-center shrink-0">
                                        <Palette className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-base-content/40 tracking-wider">Color</p>
                                        <p className="text-sm font-bold text-base-content">{car.color || "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <div className="bg-base-100 rounded-3xl p-6 md:p-8 shadow-xl border border-base-200/60">
                            <span className="text-sm font-bold text-purple-600 uppercase tracking-widest bg-purple-50 dark:bg-purple-950/20 px-3 py-1.5 rounded-full inline-block mb-3 border border-purple-200/30">
                                {car.year} Release
                            </span>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-base-content tracking-tight leading-none mb-3">
                                {car.make} <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">{car.model}</span>
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-base-content/60 mt-4 pt-4 border-t border-base-200/50">
                                {car.rating && (
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span>{car.rating}</span>
                                        <span className="text-base-content/40 font-semibold">({car.reviews || 0} reviews)</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4 text-purple-600" />
                                    <span>{car.location}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-base-100 rounded-3xl p-6 md:p-8 shadow-xl border border-base-200/60">
                            <h3 className="text-base font-extrabold text-base-content mb-3">Overview</h3>
                            <p className="text-sm text-base-content/75 leading-relaxed font-medium">
                                Experience the supreme driving dynamics and luxury comfort of the {car.make} {car.model}. With its sleek {car.color || "Alpine White"} exterior and robust {car.horsepower || "300"} horsepower engine, this vehicle blends high-performance capability with practical comfort. Ideal for both short daily rides and lengthy adventures.
                            </p>
                        </div>

                        {car.features && car.features.length > 0 && (
                            <div className="bg-base-100 rounded-3xl p-6 md:p-8 shadow-xl border border-base-200/60">
                                <h3 className="text-base font-extrabold text-base-content mb-4 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-purple-600" /> Included Features
                                </h3>
                                <div className="grid grid-cols-2 gap-3.5">
                                    {car.features.map((f, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm text-base-content/70 font-semibold">
                                            <div className="w-4.5 h-4.5 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 flex items-center justify-center shrink-0">
                                                <Check className="w-3 h-3 stroke-[3]" />
                                            </div>
                                            <span>{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="bg-base-100 rounded-3xl p-6 md:p-8 shadow-xl border-2 border-purple-500/10 shadow-purple-500/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 rounded-full blur-2xl pointer-events-none" />

                            <p className="text-xs uppercase font-extrabold text-base-content/40 tracking-widest mb-1">Rental Cost</p>
                            <div className="flex items-baseline gap-1.5 mb-6">
                                <span className="text-4xl font-extrabold text-base-content">${car.price_per_day}</span>
                                <span className="text-sm font-semibold text-base-content/50">/ day</span>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2 p-3 rounded-2xl bg-purple-500/5 border border-purple-500/10 text-xs font-semibold text-purple-800 dark:text-purple-300">
                                    <ShieldCheck className="w-4 h-5 text-purple-600 shrink-0" />
                                    <span>Insurance & 24/7 Roadside Assistance included.</span>
                                </div>

                                {!isBooked ? (
                                    <button 
                                        onClick={() => setIsModalOpen(true)}
                                        className="btn w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold rounded-2xl h-13 border-0 shadow-lg shadow-purple-500/20 transition-all cursor-pointer hover:scale-[1.02] active:scale-100"
                                    >
                                        Book This Ride Now
                                    </button>
                                ) : (
                                    <button 
                                        disabled
                                        className="btn w-full bg-base-200 border-base-300 text-base-content/40 font-bold rounded-2xl h-13 pointer-events-none"
                                    >
                                        Currently Fully Booked
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
                    <div className="relative bg-base-100 w-full max-w-xl rounded-3xl shadow-2xl border border-base-200/60 overflow-hidden transform scale-100 transition-all duration-300">
                        <div className="flex items-center justify-between px-6 py-4.5 border-b border-base-200">
                            <div>
                                <h3 className="text-lg font-extrabold text-base-content">Book Your Ride</h3>
                                <p className="text-xs text-base-content/50 font-bold mt-0.5">{car.make} {car.model} (${car.price_per_day}/day)</p>
                            </div>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-base-content/30 hover:text-base-content hover:bg-base-200 transition-all cursor-pointer border-0 bg-transparent"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleBookingSubmit} className="p-6 flex flex-col gap-4">
                            <div className="flex flex-col gap-3.5">
                                <h4 className="text-xs font-bold uppercase text-purple-600 tracking-wider">1. Contact Information</h4>
                                
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/40">
                                        <User className="w-4 h-4" />
                                    </span>
                                    <input 
                                        type="text" 
                                        name="userName"
                                        placeholder="Full Name"
                                        value={formData.userName}
                                        onChange={handleInputChange}
                                        required
                                        className="input input-bordered w-full pl-10 rounded-xl text-sm h-11 focus:outline-purple-500 font-semibold"
                                    />
                                </div>

                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/40">
                                        <Mail className="w-4 h-4" />
                                    </span>
                                    <input 
                                        type="email" 
                                        name="userEmail"
                                        placeholder="Email Address"
                                        value={formData.userEmail}
                                        onChange={handleInputChange}
                                        required
                                        className="input input-bordered w-full pl-10 rounded-xl text-sm h-11 focus:outline-purple-500 font-semibold"
                                    />
                                </div>

                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/40">
                                        <Phone className="w-4 h-4" />
                                    </span>
                                    <input 
                                        type="tel" 
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="input input-bordered w-full pl-10 rounded-xl text-sm h-11 focus:outline-purple-500 font-semibold"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-3.5 pt-2 border-t border-base-200/50">
                                <h4 className="text-xs font-bold uppercase text-purple-600 tracking-wider">2. Rental Period</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="label-text font-bold text-base-content/60 text-xs block mb-1">Pick-up Date</label>
                                        <input 
                                            type="date" 
                                            name="startDate"
                                            value={formData.startDate}
                                            onChange={handleInputChange}
                                            required
                                            min={new Date().toISOString().split("T")[0]}
                                            className="input input-bordered w-full rounded-xl text-sm h-11 focus:outline-purple-500 font-bold"
                                        />
                                    </div>
                                    <div>
                                        <label className="label-text font-bold text-base-content/60 text-xs block mb-1">Return Date</label>
                                        <input 
                                            type="date" 
                                            name="endDate"
                                            value={formData.endDate}
                                            onChange={handleInputChange}
                                            required
                                            min={formData.startDate || new Date().toISOString().split("T")[0]}
                                            className="input input-bordered w-full rounded-xl text-sm h-11 focus:outline-purple-500 font-bold"
                                        />
                                    </div>
                                </div>
                            </div>

                            {formData.startDate && formData.endDate && days > 0 && (
                                <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10 flex flex-col gap-1.5 mt-2">
                                    <div className="flex items-center justify-between text-xs font-semibold text-base-content/60">
                                        <span>Rate per day</span>
                                        <span>${car.price_per_day}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs font-semibold text-base-content/60">
                                        <span>Rental duration</span>
                                        <span>{days} {days === 1 ? "day" : "days"}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm font-extrabold text-purple-600 pt-2 border-t border-purple-500/10">
                                        <span>Total Payment</span>
                                        <span>${totalPrice}</span>
                                    </div>
                                </div>
                            )}

                            <div className="mt-4 flex gap-3">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="btn flex-1 bg-base-200 hover:bg-base-300 text-base-content font-bold rounded-2xl h-12 border-0 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    disabled={bookingLoading}
                                    className="btn flex-1 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold rounded-2xl h-12 border-0 cursor-pointer shadow-lg shadow-purple-500/10 animate-fade-in"
                                >
                                    {bookingLoading ? <Spinner color="white" size="sm" /> : "Confirm Booking"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
