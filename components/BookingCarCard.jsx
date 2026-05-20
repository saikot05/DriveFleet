import Link from "next/link";
import { Calendar, DollarSign, ShieldCheck, Car, Trash2, ArrowRight, User, Mail, Phone, FileText } from "lucide-react";
import { Spinner } from "@heroui/react";

export default function BookingCarCard({ booking, cancellingId, handleCancelBooking }) {
  return (
    <div className="bg-base-100 rounded-3xl p-6 shadow-lg border border-base-200/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-6">
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

        <div className="flex items-center gap-2 text-base-content/70">
          <span className="font-bold text-base-content/50">Booked On:</span>
          <Link href={`/cars/${booking.carId}`} className="text-purple-600 hover:underline font-bold transition-all">
            {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) : new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
          </Link>
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
            <Phone className="w-3.5 h-3.5 text-purple-600" />
            <span>Phone: {booking.phone}</span>
          </div>
        )}
        <div className="flex items-center gap-2 border-t border-purple-500/10 pt-1.5 mt-1.5">
          <Car className="w-3.5 h-3.5 text-purple-600" />
          <span>Driver Needed: {booking.driverNeeded === "Yes" ? "Yes" : "No"}</span>
        </div>
        {booking.specialNote && (
          <div className="flex items-start gap-2 mt-1 border-t border-purple-500/10 pt-1.5">
            <FileText className="w-3.5 h-3.5 text-purple-600 mt-0.5 shrink-0" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-purple-600 font-bold uppercase tracking-wider">Special Note:</span>
              <p className="text-[10px] text-base-content/75 italic font-semibold leading-snug">{booking.specialNote}</p>
            </div>
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
  );
}
