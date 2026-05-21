import Link from "next/link";
import { Star, Fuel, Settings2, Users, MapPin, Car, Edit, Trash2 } from "lucide-react";

const CarCard = ({ car, onEdit, onDelete }) => {
    const {
        _id,
        make,
        model,
        year,
        price_per_day,
        fuel_type,
        transmission,
        seats,
        available,
        rating,
        reviews,
        image,
        features = [],
        location,
    } = car;

    return (
        <div className="c relative bg-base-100 image-full h-[380px] overflow-hidden rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            {/* Top-Right Availability Badge */}
            <div className="absolute top-4 right-4 z-20">
                <span className={`badge ${available ? "badge-success" : "badge-error"} font-semibold text-white border-none shadow-md px-3 py-2 text-xs`}>
                    {available ? "Available" : "Unavailable"}
                </span>
            </div>
            <figure className="absolute inset-0 h-full w-full m-0 p-0 overflow-hidden rounded-3xl">
                {image ? (
                    <img
                        src={image}
                        alt={`${make} ${model}`}
                        className="w-full h-full object-cover rounded-3xl"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-base-300 rounded-3xl">
                        <Car className="w-16 h-16 opacity-30" />
                    </div>
                )}
            </figure>

            <div className="card-body justify-end gap-2 p-5">
                {rating && (
                    <div className="flex items-center gap-1 text-sm font-semibold mb-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-white">{rating}</span>
                        {reviews && <span className="text-white/60 text-xs">({reviews})</span>}
                    </div>
                )}

                <h2 className="card-title text-white text-xl font-extrabold leading-tight">
                    {make} {model}
                    <span className="text-white/60 font-normal text-sm">{year}</span>
                </h2>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-white/75 text-xs font-medium">
                    {fuel_type && (
                        <span className="flex items-center gap-1">
                            <Fuel className="w-3.5 h-3.5" /> {fuel_type}
                        </span>
                    )}
                    {transmission && (
                        <span className="flex items-center gap-1">
                            <Settings2 className="w-3.5 h-3.5" /> {transmission}
                        </span>
                    )}
                    {seats && (
                        <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" /> {seats} Seats
                        </span>
                    )}
                    {location && (
                        <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" /> {location}
                        </span>
                    )}
                </div>

                {features.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {features.slice(0, 3).map((f, i) => (
                            <div key={i} className="badge badge-outline text-white border-white/30 text-xs">
                                {f}
                            </div>
                        ))}
                        {features.length > 3 && (
                            <div className="badge badge-outline text-white/50 border-white/20 text-xs">
                                +{features.length - 3} more
                            </div>
                        )}
                    </div>
                )}

                <div className="card-actions justify-between items-center pt-2 border-t border-white/10 mt-1">
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Per day</p>
                        <p className="text-2xl font-extrabold text-white">${price_per_day}</p>
                    </div>
                    {onEdit && onDelete ? (
                        <div className="flex gap-2">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    onEdit(car);
                                }}
                                className="btn btn-sm bg-purple-600 hover:bg-purple-700 text-white border-none font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 text-xs transition-all cursor-pointer"
                            >
                                <Edit className="w-3.5 h-3.5" /> Edit
                            </button>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    onDelete(car);
                                }}
                                className="btn btn-sm bg-rose-600 hover:bg-rose-700 text-white border-none font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 text-xs transition-all cursor-pointer"
                            >
                                <Trash2 className="w-3.5 h-3.5" /> Delete
                            </button>
                        </div>
                    ) : (
                        <Link href={`/cars/${_id}`} className="btn bg-purple-600 hover:bg-purple-700 text-white border-none font-bold px-6">
                            View Details
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CarCard;