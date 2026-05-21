"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Car, DollarSign, MapPin, Users, Settings2, FileText, Image as ImageIcon, Sparkles, AlertCircle, CheckCircle, Info } from "lucide-react";
import toast from "react-hot-toast";
import { addCar } from "@/lib/cars/data";
import { Spinner, Button } from "@heroui/react";

const AddCarPage = () => {
    const { data: session, isPending } = useSession();
    const user = session?.user;
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [formData, setFormData] = useState({
        make: "",
        model: "",
        year: new Date().getFullYear(),
        price: "",
        category: "SUV",
        image: "",
        seats: 5,
        location: "",
        description: "",
        available: true,
        transmission: "Automatic",
        fuel_type: "Petrol",
        mileage: 0,
        horsepower: 0,
        color: "",
        features: ""
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            toast.error("You must be logged in to add a car.");
            return;
        }

        setIsSubmitting(true);
        
        try {
            const payload = {
                ...formData,
                year: Number(formData.year),
                price_per_day: Number(formData.price),
                seats: Number(formData.seats),
                mileage: Number(formData.mileage),
                horsepower: Number(formData.horsepower),
                features: formData.features ? formData.features.split(",").map(f => f.trim()) : [],
                rating: 0,
                reviews: 0,
                addedBy: user.email,
                userName: user.name,
                created_at: new Date().toISOString()
            };
            
            delete payload.price;

            const res = await addCar(payload);
            
            if (res.ok) {
                toast.success("Car added successfully!");
                router.push("/cars");
            } else {
                toast.error("Failed to add car. Please try again.");
            }
        } catch (error) {
            console.error("Error adding car:", error);
            toast.error("An error occurred. Could not add car.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <Spinner size="lg" color="secondary" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
                <div className="bg-white dark:bg-base-100 rounded-3xl p-10 max-w-md w-full shadow-2xl border border-base-200 text-center">
                    <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Access Denied</h2>
                    <p className="text-base-content/60 mb-8">You must be logged in to access this page.</p>
                    <Button color="secondary" className="w-full font-bold" onPress={() => router.push("/login")}>
                        Go to Login
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-purple-50/10 to-slate-100/40 dark:from-slate-950 dark:via-zinc-900/50 dark:to-black py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                <div className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-8 md:p-12 mb-8 shadow-xl border border-white/10">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="relative z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-5">
                            <Sparkles className="w-3.5 h-3.5" /> Fleet Management
                        </span>
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
                            Add a New <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent">Vehicle</span>
                        </h1>
                        <p className="text-slate-300 text-sm max-w-xl font-medium opacity-80 leading-relaxed">
                            List a new vehicle in the DriveFleet database. Fill out the details accurately to make it instantly available for rent in our platform.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                        <div className="xl:col-span-8 space-y-8">
                            
                            <div className="bg-base-100 rounded-3xl shadow-lg border border-base-200/60 overflow-hidden">
                                <div className="p-6 md:p-8 border-b border-base-200/60 bg-base-200/20">
                                    <h3 className="text-lg font-bold flex items-center gap-2 text-base-content">
                                        <Car className="w-5 h-5 text-purple-600" /> General Information
                                    </h3>
                                    <p className="text-xs text-base-content/60 mt-1">The primary identity of your vehicle.</p>
                                </div>
                                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label"><span className="label-text font-bold">Make</span></label>
                                        <input type="text" name="make" value={formData.make} onChange={handleChange} placeholder="e.g. BMW, Toyota" className="input input-bordered w-full bg-base-200/30 focus:bg-base-100 transition-colors" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label"><span className="label-text font-bold">Model</span></label>
                                        <input type="text" name="model" value={formData.model} onChange={handleChange} placeholder="e.g. M5 Competition, Camry" className="input input-bordered w-full bg-base-200/30 focus:bg-base-100 transition-colors" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label"><span className="label-text font-bold">Year</span></label>
                                        <input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="e.g. 2024" className="input input-bordered w-full bg-base-200/30 focus:bg-base-100 transition-colors" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label"><span className="label-text font-bold">Color</span></label>
                                        <input type="text" name="color" value={formData.color} onChange={handleChange} placeholder="e.g. Alpine White" className="input input-bordered w-full bg-base-200/30 focus:bg-base-100 transition-colors" required />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-base-100 rounded-3xl shadow-lg border border-base-200/60 overflow-hidden">
                                <div className="p-6 md:p-8 border-b border-base-200/60 bg-base-200/20">
                                    <h3 className="text-lg font-bold flex items-center gap-2 text-base-content">
                                        <Settings2 className="w-5 h-5 text-purple-600" /> Specifications
                                    </h3>
                                    <p className="text-xs text-base-content/60 mt-1">Technical details and capabilities.</p>
                                </div>
                                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label"><span className="label-text font-bold">Horsepower</span></label>
                                        <input type="number" name="horsepower" value={formData.horsepower} onChange={handleChange} placeholder="e.g. 617" className="input input-bordered w-full bg-base-200/30 focus:bg-base-100 transition-colors" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label"><span className="label-text font-bold">Seat Capacity</span></label>
                                        <input type="number" name="seats" value={formData.seats} onChange={handleChange} placeholder="e.g. 5" min="1" className="input input-bordered w-full bg-base-200/30 focus:bg-base-100 transition-colors" required />
                                    </div>
                                    <div className="form-control md:col-span-2">
                                        <label className="label">
                                            <span className="label-text font-bold flex items-center gap-1.5">
                                                Features <span className="text-xs font-normal text-base-content/50 ml-2">(Comma Separated)</span>
                                            </span>
                                        </label>
                                        <input type="text" name="features" value={formData.features} onChange={handleChange} placeholder="e.g. Sunroof, Heated Seats, Blind Spot Monitor" className="input input-bordered w-full bg-base-200/30 focus:bg-base-100 transition-colors" />
                                        <p className="text-[11px] text-base-content/50 mt-2 px-1">Separate multiple features using a comma ( , ). They will automatically be displayed as tags.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-base-100 rounded-3xl shadow-lg border border-base-200/60 overflow-hidden">
                                <div className="p-6 md:p-8 border-b border-base-200/60 bg-base-200/20">
                                    <h3 className="text-lg font-bold flex items-center gap-2 text-base-content">
                                        <ImageIcon className="w-5 h-5 text-purple-600" /> Media & Description
                                    </h3>
                                    <p className="text-xs text-base-content/60 mt-1">Make your listing stand out with a photo and description.</p>
                                </div>
                                <div className="p-6 md:p-8 space-y-6">
                                    <div className="form-control">
                                        <label className="label"><span className="label-text font-bold">Display Image URL</span></label>
                                        <input type="url" name="image" value={formData.image} onChange={handleChange} placeholder="https://i.ibb.co.com/..." className="input input-bordered w-full bg-base-200/30 focus:bg-base-100 transition-colors" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label"><span className="label-text font-bold">Vehicle Description</span></label>
                                        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe the vehicle's condition, rules, and any special notes..." className="textarea textarea-bordered h-32 bg-base-200/30 focus:bg-base-100 transition-colors" required />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="xl:col-span-4 space-y-8">
                            
                            <div className="bg-base-100 rounded-3xl shadow-lg border border-base-200/60 overflow-hidden">
                                <div className="p-6 border-b border-base-200/60 bg-base-200/20">
                                    <h3 className="text-lg font-bold flex items-center gap-2 text-base-content">
                                        <DollarSign className="w-5 h-5 text-purple-600" /> Listing Setup
                                    </h3>
                                </div>
                                <div className="p-6 space-y-5">
                                    <div className="form-control">
                                        <label className="label"><span className="label-text font-bold text-base-content/80">Daily Rent Price ($)</span></label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <span className="text-base-content/50 font-bold">$</span>
                                            </div>
                                            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="120" min="1" className="input input-bordered w-full pl-8 bg-base-200/30 focus:bg-base-100 text-lg font-bold" required />
                                        </div>
                                    </div>
                                    
                                    <div className="form-control">
                                        <label className="label"><span className="label-text font-bold text-base-content/80">Category</span></label>
                                        <select name="category" value={formData.category} onChange={handleChange} className="select select-bordered w-full bg-base-200/30 focus:bg-base-100 font-medium">
                                            <option value="SUV">SUV</option>
                                            <option value="Sedan">Sedan</option>
                                            <option value="Hatchback">Hatchback</option>
                                            <option value="Coupe">Coupe</option>
                                            <option value="Sport">Sport</option>
                                            <option value="Luxury">Luxury</option>
                                            <option value="Convertible">Convertible</option>
                                            <option value="Minivan">Minivan</option>
                                        </select>
                                    </div>

                                    <div className="form-control">
                                        <label className="label"><span className="label-text font-bold text-base-content/80">Pickup Location</span></label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                <MapPin className="w-4 h-4 text-base-content/40" />
                                            </div>
                                            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Dhaka" className="input input-bordered w-full pl-10 bg-base-200/30 focus:bg-base-100" required />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-base-100 rounded-3xl shadow-lg border border-base-200/60 overflow-hidden sticky top-24">
                                <div className="p-6 border-b border-base-200/60 bg-base-200/20">
                                    <h3 className="text-lg font-bold flex items-center gap-2 text-base-content">
                                        <CheckCircle className="w-5 h-5 text-purple-600" /> Publish
                                    </h3>
                                </div>
                                <div className="p-6 space-y-6">
                                    
                                    <label className="cursor-pointer flex items-start gap-3 p-4 rounded-2xl border border-purple-500/20 bg-purple-50/50 dark:bg-purple-500/10 hover:bg-purple-100/50 dark:hover:bg-purple-500/20 transition-colors">
                                        <input type="checkbox" name="available" checked={formData.available} onChange={handleChange} className="checkbox checkbox-primary mt-0.5" />
                                        <div>
                                            <p className="font-bold text-base-content text-sm mb-0.5">Available Immediately</p>
                                            <p className="text-xs text-base-content/60">If checked, this vehicle will be visible and available to rent right away.</p>
                                        </div>
                                    </label>

                                    <Button 
                                        type="submit" 
                                        size="lg" 
                                        className="w-full font-extrabold tracking-wide text-[15px] shadow-xl shadow-purple-500/40 h-14 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 text-white hover:opacity-90 transition-opacity border-none"
                                        isLoading={isSubmitting}
                                    >
                                        {isSubmitting ? "Processing..." : "Confirm & Add Car"}
                                    </Button>

                                    <div className="flex items-center gap-2 text-xs text-base-content/50 justify-center">
                                        <Info className="w-3.5 h-3.5" />
                                        <span>Please double check all details before submitting.</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default AddCarPage;
