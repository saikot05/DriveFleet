"use client"

import { useEffect, useState } from "react";
import AvailableCars from "@/components/AvailableCars";
import Bannar from "@/components/Bannar";

export default function Home() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`)
      .then(res => res.json())
      .then(data => setCars(data));
  }, []);

  return (
    <div className="flex flex-col">
      <Bannar />
      <AvailableCars cars={cars} />
    </div>
  );
}