import { Gauge, Settings2, Fuel, Users, Zap, Palette } from "lucide-react";

export default function DetailCarCard({ car }) {
  return (
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
  );
}
