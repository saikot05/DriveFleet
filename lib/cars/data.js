const getCars = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`, { cache: "no-store" });
  return await res.json();
};

const getAvailableCars = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/availableCars`, { cache: "no-store" });
  return await res.json();
};

const getCarById = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`, { cache: "no-store" });
  return await res.json();
};

const getBookings = async (email) => {
  const url = email 
    ? `${process.env.NEXT_PUBLIC_API_URL}/bookings?email=${email}`
    : `${process.env.NEXT_PUBLIC_API_URL}/bookings`;
  const res = await fetch(url, { cache: "no-store" });
  return await res.json();
};

const createBooking = async (payload) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  return res;
};

const deleteBooking = async (bookingId, carId) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${bookingId}?carId=${carId}`, {
    method: "DELETE"
  });
  return res;
};

export { 
  getCars, 
  getAvailableCars, 
  getCarById, 
  getBookings, 
  createBooking, 
  deleteBooking 
};
