"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { getCarsByOwner, updateCar, deleteCar } from "@/lib/cars/data";
import { 
  Sparkles, 
  Car, 
  Trash2, 
  AlertTriangle,
  X
} from "lucide-react";
import toast from "react-hot-toast";
import { Spinner } from "@heroui/react";
import Link from "next/link";
import CarCard from "@/components/CarCard";

const categories = ["SUV", "Sedan", "Hatchback", "Luxury", "Sport", "Electric", "Hybrid", "Convertible", "Van", "Truck"];

const MyAddedCarsPage = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedCar, setSelectedCar] = useState(null);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const [editForm, setEditForm] = useState({
    price_per_day: "",
    description: "",
    available: true,
    image: "",
    category: "",
    location: ""
  });

  const fetchCars = () => {
    if (!user?.email) return;
    setLoading(true);
    getCarsByOwner(user.email)
      .then((data) => {
        setCars(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user cars:", err);
        setLoading(false);
        toast.error("Failed to load listed cars.");
      });
  };

  useEffect(() => {
    if (!isPending) {
      if (user) {
        fetchCars();
      } else {
        setLoading(false);
      }
    }
  }, [user, isPending]);

  
  const handleOpenEdit = (car) => {
    setSelectedCar(car);
    setEditForm({
      price_per_day: car.price_per_day || "",
      description: car.description || "",
      available: car.available !== undefined ? car.available : true,
      image: car.image || "",
      category: car.category || "",
      location: car.location || ""
    });
    setIsEditOpen(true);
  };

 
  const handleOpenDelete = (car) => {
    setSelectedCar(car);
    setIsDeleteOpen(true);
  };

 
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCar) return;

    setIsActionLoading(true);
    try {
      const updatedPayload = {
        ...editForm,
        price_per_day: Number(editForm.price_per_day)
      };

      const res = await updateCar(selectedCar._id, updatedPayload);

      if (res.ok) {
        toast.success("Car updated successfully!");
        setCars(prev => prev.map(c => c._id === selectedCar._id ? { ...c, ...updatedPayload } : c));
        setIsEditOpen(false);
      } else {
        toast.error("Failed to update car details.");
      }
    } catch (err) {
      console.error("Error updating car:", err);
      toast.error("An error occurred during update.");
    } finally {
      setIsActionLoading(false);
    }
  };

  
  const handleDeleteConfirm = async () => {
    if (!selectedCar) return;

    setIsActionLoading(true);
    try {
      const res = await deleteCar(selectedCar._id);

      if (res.ok) {
        toast.success("Listed car deleted successfully.");
        setCars(prev => prev.filter(c => c._id !== selectedCar._id));
        setIsDeleteOpen(false);
      } else {
        toast.error("Failed to delete the car listing.");
      }
    } catch (err) {
      console.error("Error deleting car:", err);
      toast.error("An error occurred during deletion.");
    } finally {
      setIsActionLoading(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 py-32">
        <Spinner color="secondary" size="lg" />
        <p className="text-xs font-bold text-base-content/40 tracking-wider mt-3 animate-pulse">
          Loading your listings dashboard...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
        <div className="bg-white dark:bg-base-100 rounded-3xl p-10 max-w-md w-full shadow-2xl border border-base-200 text-center">
          <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-950/20 flex items-center justify-center text-red-500 mx-auto mb-6">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-extrabold text-base-content mb-3">Access Denied</h3>
          <p className="text-base-content/60 text-sm mb-8 leading-relaxed">
            You must be logged in to view and manage your listed vehicles.
          </p>
          <Link href="/login" className="btn btn-purple rounded-2xl w-full h-12 flex items-center justify-center">
            Sign In Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-purple-50/20 to-slate-100/60 dark:from-slate-950 dark:via-zinc-900 dark:to-black py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-8 md:p-12 mb-10 shadow-xl border border-white/5">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Fleet Manager
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-3 tracking-tight">
              My Listed <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent">Vehicles</span>
            </h1>
            <p className="text-slate-300 text-xs md:text-sm max-w-xl font-medium opacity-85">
              Review, update, and manage the specifications or availability of cars you have listed on DriveFleet.
            </p>
          </div>
        </div>

        
        {cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {cars.map((car) => (
              <CarCard
                key={car._id}
                car={car}
                onEdit={handleOpenEdit}
                onDelete={handleOpenDelete}
              />
            ))}
          </div>
        ) : (
          <div className="bg-base-100 rounded-3xl p-16 text-center border border-base-200/50 max-w-lg mx-auto shadow-lg">
            <div className="w-20 h-20 rounded-full bg-purple-50 dark:bg-purple-950/20 flex items-center justify-center text-purple-600 mx-auto mb-6">
              <Car className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-extrabold text-base-content mb-3">No Listings Found</h3>
            <p className="text-base-content/60 text-sm mb-8 leading-relaxed max-w-md mx-auto">
              You haven&apos;t listed any vehicles for rent yet. Click below to add your first car to our premium catalog.
            </p>
            <Link
              href="/add-car"
              className="btn btn-purple rounded-2xl px-8 py-3.5 h-auto min-h-0 text-sm inline-flex items-center gap-1.5"
            >
              Add Your Car Listing
            </Link>
          </div>
        )}

      </div>

      
      {isEditOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-base-100 w-full max-w-2xl rounded-3xl shadow-2xl border border-base-200/60 overflow-hidden transform scale-100 transition-all duration-300">
            <div className="flex items-center justify-between px-6 py-5 border-b border-base-200">
              <h3 className="text-xl font-extrabold text-base-content">Update Car Specification</h3>
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-base-content/30 hover:text-base-content hover:bg-base-200 transition-all cursor-pointer border-0 bg-transparent"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 flex flex-col gap-5 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold text-xs uppercase tracking-wider text-base-content/60">Daily Rent Price ($)</span></label>
                  <input
                    type="number"
                    placeholder="Enter price per day"
                    name="price_per_day"
                    value={editForm.price_per_day}
                    onChange={(e) => setEditForm(prev => ({ ...prev, price_per_day: e.target.value }))}
                    className="input input-bordered w-full bg-base-200/30 focus:bg-base-100 transition-colors rounded-2xl h-12 text-sm font-semibold"
                    required
                  />
                </div>

              
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold text-xs uppercase tracking-wider text-base-content/60">Pickup Location</span></label>
                  <input
                    type="text"
                    placeholder="e.g. Dhaka"
                    name="location"
                    value={editForm.location}
                    onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                    className="input input-bordered w-full bg-base-200/30 focus:bg-base-100 transition-colors rounded-2xl h-12 text-sm font-semibold"
                    required
                  />
                </div>

                
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold text-xs uppercase tracking-wider text-base-content/60">Car Category</span></label>
                  <select
                    name="category"
                    value={editForm.category}
                    onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                    className="select select-bordered w-full bg-base-200/30 focus:bg-base-100 transition-colors rounded-2xl h-12 text-sm font-semibold"
                    required
                  >
                    <option value="" disabled>Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold text-xs uppercase tracking-wider text-base-content/60">Image URL</span></label>
                  <input
                    type="url"
                    placeholder="Paste image address"
                    name="image"
                    value={editForm.image}
                    onChange={(e) => setEditForm(prev => ({ ...prev, image: e.target.value }))}
                    className="input input-bordered w-full bg-base-200/30 focus:bg-base-100 transition-colors rounded-2xl h-12 text-sm font-semibold"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-base-200/50 border border-base-200">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-bold text-base-content">Listing Availability</span>
                  <span className="text-xs text-base-content/50">Mark whether this car is currently open for new bookings.</span>
                </div>
                <input
                  type="checkbox"
                  className="toggle toggle-success toggle-md"
                  checked={editForm.available}
                  onChange={(e) => setEditForm(prev => ({ ...prev, available: e.target.checked }))}
                />
              </div>

             
              <div className="form-control">
                <label className="label"><span className="label-text font-bold text-xs uppercase tracking-wider text-base-content/60">Description</span></label>
                <textarea
                  placeholder="Provide details about condition, rules, or special traits..."
                  name="description"
                  value={editForm.description}
                  onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                  className="textarea textarea-bordered w-full bg-base-200/30 focus:bg-base-100 transition-colors rounded-2xl min-h-24 text-sm font-semibold py-3"
                  required
                />
              </div>

             
              <div className="flex justify-end gap-3 pt-4 border-t border-base-200/60 mt-2">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="btn rounded-2xl h-12 font-bold px-6 bg-base-200 hover:bg-base-300 text-base-content border-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isActionLoading}
                  className="btn btn-purple rounded-2xl h-12 font-bold px-8 border-none flex items-center gap-2"
                >
                  {isActionLoading && <Spinner size="sm" color="white" />}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    
      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-base-100 w-full max-w-md rounded-3xl shadow-2xl border border-base-200/60 overflow-hidden transform scale-100 transition-all duration-300 p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/20 flex items-center justify-center text-rose-500 mx-auto mb-4 border border-rose-100 dark:border-rose-900/30">
              <Trash2 className="w-7 h-7" />
            </div>
            <h4 className="font-extrabold text-xl text-base-content mb-2">Delete Listing Confirmation</h4>
            <p className="text-sm text-base-content/60 leading-relaxed mb-6">
              Are you absolutely sure? This action is permanent and cannot be undone. Doing so will permanently remove the listed <strong className="text-base-content font-bold">{selectedCar?.make} {selectedCar?.model}</strong> from the DriveFleet catalog.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="btn rounded-2xl h-12 w-28 font-bold bg-base-200 hover:bg-base-300 text-base-content border-none"
              >
                No, Keep It
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isActionLoading}
                className="btn bg-rose-600 hover:bg-rose-700 text-white rounded-2xl h-12 w-32 font-bold border-none flex items-center justify-center gap-2"
              >
                {isActionLoading && <Spinner size="sm" color="white" />}
                Yes, Delete It
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default MyAddedCarsPage;
