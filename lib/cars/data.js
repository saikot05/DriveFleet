const getCars = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`, { cache: "no-store" });
    if (!res.ok) {
      console.error(`Failed to fetch cars. Status: ${res.status}`);
      return [];
    }
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error("Error in getCars:", error);
    return [];
  }
};

const getAvailableCars = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/availableCars`, { cache: "no-store" });
    if (!res.ok) {
      console.error(`Failed to fetch available cars. Status: ${res.status}`);
      return [];
    }
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error("Error in getAvailableCars:", error);
    return [];
  }
};

const getCarById = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`, { cache: "no-store" });
    if (!res.ok) {
      console.error(`Failed to fetch car by ID. Status: ${res.status}`);
      return null;
    }
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error("Error in getCarById:", error);
    return null;
  }
};

const getBookings = async (email) => {
  const url = email 
    ? `${process.env.NEXT_PUBLIC_API_URL}/bookings?email=${email}`
    : `${process.env.NEXT_PUBLIC_API_URL}/bookings`;
  
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      console.error(`Failed to fetch bookings. Status: ${res.status}`);
      return [];
    }
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error(`Received non-JSON response from bookings endpoint:`, await res.text());
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error("Error in getBookings:", error);
    return [];
  }
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

const addCar = async (carData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(carData)
  });
  return res;
};

const getCarsByOwner = async (email) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/owner/${email}`, { cache: "no-store" });
    if (!res.ok) {
      console.error(`Failed to fetch owner's cars. Status: ${res.status}`);
      return [];
    }
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error("Error in getCarsByOwner:", error);
    return [];
  }
};

const updateCar = async (id, carData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(carData)
  });
  return res;
};

const deleteCar = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`, {
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
  deleteBooking,
  addCar,
  getCarsByOwner,
  updateCar,
  deleteCar
};

