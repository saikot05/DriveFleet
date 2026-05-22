"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Car } from "lucide-react";
import toast from "react-hot-toast";
import { getBookings, deleteBooking } from "@/lib/cars/data";
import BookingCarCard from "@/components/BookingCarCard";
import { authClient, useSession } from "@/lib/auth-client";
import { Spinner } from "@heroui/react";

const MyBookingsPage = () => {
    const { data: session, isPending } = useSession();
    const user = session?.user;
    console.log(user);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancellingId, setCancellingId] = useState(null);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const {data: tokenData} = await authClient.token();
            
            const data = await getBookings(user?.email, tokenData?.token);
            setBookings(data || []);
        } catch (err) {
            console.error("Error fetching bookings:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isPending) {
            fetchBookings();
        }
    }, [user?.email, isPending]);

    const handleCancelBooking = async (bookingId, carId) => {
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

                {loading || isPending ? (
                    <div className="flex flex-col items-center justify-center py-32 bg-base-100 rounded-3xl border border-base-200/50 shadow-md">
                        <Spinner color="secondary" size="lg" />
                        <p className="text-xs font-bold text-base-content/40 tracking-wider mt-3 animate-pulse">
                            Loading your bookings dashboard...
                        </p>
                    </div>
                ) : bookings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {bookings.map((booking) => (
                            <BookingCarCard
                                key={booking._id}
                                booking={booking}
                                cancellingId={cancellingId}
                                handleCancelBooking={handleCancelBooking}
                            />
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
                            className="btn btn-purple rounded-2xl px-8 py-3.5 h-auto min-h-0 text-sm"
                        >
                            Explore Fleet Cars
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
};

export default MyBookingsPage;
