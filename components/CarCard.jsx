import Link from "next/link";
import { Star, Fuel, Settings2, Users, MapPin, Car } from "lucide-react";

const CarCard = ({ car }) => {
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
        <div className="card bg-base-100 image-full h-[380px] shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <figure className="h-full w-full">
                {image ? (
                    <img
                        src={image}
                        alt={`${make} ${model}`}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-base-300">
                        <Car className="w-16 h-16 opacity-30" />
                    </div>
                )}
            </figure>

            <div className="card-body justify-end gap-2 p-5">
                <div className="flex items-center justify-between">
                    {rating && (
                        <div className="flex items-center gap-1 text-sm font-semibold">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-white">{rating}</span>
                            {reviews && <span className="text-white/60 text-xs">({reviews})</span>}
                        </div>
                    )}
                    <div className={`badge ${available ? "badge-success" : "badge-error"} font-semibold text-white`}>
                        {available ? "Available" : "Unavailable"}
                    </div>
                </div>

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
                    <Link href={`/cars/${_id}`} className="btn bg-purple-600 hover:bg-purple-700 text-white border-none font-bold px-6">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CarCard;