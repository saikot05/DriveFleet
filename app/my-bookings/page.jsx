"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { 
    Calendar, DollarSign, ShieldCheck, Car, Trash2, ArrowRight, User, Mail, Sparkles 
} from "lucide-react";
import toast from "react-hot-toast";
import { getBookings, deleteBooking } from "@/lib/cars/data";
import { Spinner } from "@heroui/react";

export default function MyBookingsPage() {
    const { data: session } = useSession();
    const user = session?.user;

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancellingId, setCancellingId] = useState(null);

    const fetchBookings = () => {
        setLoading(true);
        getBookings(user?.email)
            .then((data) => {
                setBookings(data || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching bookings:", err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchBookings();
    }, [user]);

    const handleCancelBooking = async (bookingId, carId) => {
        if (!confirm("Are you sure you want to cancel this booking? This will make the vehicle available for rent again.")) {
            return;
        }

        setCancellingId(bookingId);
        try {
            const res = await deleteBooking(bookingId, carId);

            if (res.ok) {
                toast.success("Booking cancelled successfully.");
                setBookings(prev => prev.filter(b => b._id !== bookingId));
            } else {
                toast.error("Failed to cancel booking.");
            }
        } catch (err) {
            console.error("Error cancelling booking:", err);
            toast.error("Could not cancel booking.");
        } finally {
            setCancellingId(null);
        }
    };

    return (
        <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-purple-50/20 to-slate-100/60 dark:from-slate-950 dark:via-zinc-900 dark:to-black py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                <div className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-8 md:p-12 mb-10 shadow-xl border border-white/5">
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[80px] pointer-events-none"></div>
                    <div className="relative z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-4">
                            <Sparkles className="w-3.5 h-3.5" /> Booking Dashboard
                        </span>
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-3 tracking-tight">
                            My Rental <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent">Bookings</span>
                        </h1>
                        <p className="text-slate-300 text-xs md:text-sm max-w-xl font-medium opacity-85">
                            {user 
                                ? `Welcome back, ${user.name}! Track and manage your current vehicle reservations below.`
                                : "Viewing all bookings made on this server. In a production env, you will only see bookings belonging to your account."
                            }
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 bg-base-100 rounded-3xl border border-base-200/50 shadow-md">
                        <Spinner color="secondary" size="lg" />
                        <p className="text-xs font-bold text-base-content/40 tracking-wider mt-3 animate-pulse">
                            Loading your bookings dashboard...
                        </p>
                    </div>
                ) : bookings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {bookings.map((booking) => (
                            <div 
                                key={booking._id} 
                                className="bg-base-100 rounded-3xl p-6 shadow-lg border border-base-200/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-6"
                            >
                                <div className="flex gap-4">
                                    <div className="w-24 h-20 md:w-32 md:h-24 rounded-2xl overflow-hidden border border-base-200 bg-slate-100 shrink-0">
                                        {booking.image ? (
                                            <img 
                                                src={booking.image} 
                                                alt={`${booking.make} ${booking.model}`}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-base-300">
                                                <Car className="w-8 h-8 opacity-25" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <span className="text-[10px] uppercase font-extrabold text-purple-600 bg-purple-50 dark:bg-purple-950/20 px-2 py-1 rounded-md w-fit border border-purple-200/20 mb-1.5">
                                            Rental Vehicle
                                        </span>
                                        <h3 className="text-base md:text-lg font-extrabold text-base-content leading-tight">
                                            {booking.make} {booking.model}
                                        </h3>
                                        <p className="text-xs text-base-content/50 font-bold mt-0.5">
                                            Rate: ${booking.price_per_day}/day
                                        </p>
                                    </div>
                                </div>

                                <div className="p-4 rounded-2xl bg-base-200/30 border border-base-200/50 text-xs font-semibold text-base-content/85 flex flex-col gap-3">
                                    <div className="flex items-center gap-2 text-base-content/70">
                                        <Calendar className="w-4 h-4 text-purple-600 shrink-0" />
                                        <span>From: <strong className="text-base-content font-bold">{booking.startDate}</strong></span>
                                        <ArrowRight className="w-3.5 h-3.5 text-base-content/40" />
                                        <span>To: <strong className="text-base-content font-bold">{booking.endDate}</strong></span>
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t border-base-200/60 mt-1">
                                        <div className="flex items-center gap-1.5">
                                            <DollarSign className="w-4 h-4 text-purple-600" />
                                            <span className="font-bold text-base-content/50">Total Paid:</span>
                                        </div>
                                        <span className="text-sm font-extrabold text-purple-600">${booking.totalPrice}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1.5 p-3.5 rounded-2xl bg-purple-500/5 border border-purple-500/10 text-[11px] font-bold text-purple-800 dark:text-purple-300">
                                    <div className="flex items-center gap-2">
                                        <User className="w-3.5 h-3.5 text-purple-600" />
                                        <span>Renter: {booking.userName}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-3.5 h-3.5 text-purple-600" />
                                        <span>Email: {booking.userEmail}</span>
                                    </div>
                                    {booking.phone && (
                                        <div className="flex items-center gap-2">
                                            <span className="w-3.5 h-3.5 flex items-center justify-center text-[10px] text-purple-600 font-extrabold">📞</span>
                                            <span>Phone: {booking.phone}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-base-200/50 mt-1">
                                    <span className="badge badge-success text-white font-extrabold gap-1.5 px-3 py-2.5 rounded-full text-xs">
                                        <ShieldCheck className="w-3.5 h-3.5" /> Confirmed
                                    </span>

                                    <button 
                                        onClick={() => handleCancelBooking(booking._id, booking.carId)}
                                        disabled={cancellingId === booking._id}
                                        className="btn btn-error btn-outline btn-sm rounded-xl font-bold gap-1.5 transition-all text-xs cursor-pointer hover:scale-[1.02] border hover:bg-error hover:text-white"
                                    >
                                        {cancellingId === booking._id ? (
                                            <Spinner size="sm" color="danger" />
                                        ) : (
                                            <>
                                                <Trash2 className="w-3.5 h-3.5" /> Cancel Rental
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-base-100 rounded-3xl p-16 text-center border border-base-200/50 max-w-lg mx-auto shadow-lg">
                        <div className="w-20 h-20 rounded-full bg-purple-50 dark:bg-purple-950/20 flex items-center justify-center text-purple-600 mx-auto mb-6">
                            <Car className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-extrabold text-base-content mb-3">No Active Bookings</h3>
                        <p className="text-base-content/60 text-sm mb-8 leading-relaxed max-w-md mx-auto">
                            You don&apos;t have any active vehicle bookings on record. Explore our premium fleet to get started.
                        </p>
                        <Link
                            href="/cars"
                            className="btn bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 border-0 text-white rounded-2xl shadow-lg shadow-purple-500/20 px-8 py-3.5 h-auto min-h-0 text-sm font-bold cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                        >
                            Explore Fleet Cars
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}
