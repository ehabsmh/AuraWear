"use client";

import { Button } from "@/app/ui/general/button";
import { useState } from "react";

function Order() {
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [city, setCity] = useState("");

  const userHasAddress = false; // simulate condition

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Order Info</h2>

      {!userHasAddress ? (
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Address"
            className="input w-full"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Postal Code"
            className="input w-full"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            className="input w-full"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="date"
            placeholder="Birthdate"
            className="input w-full"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            className="input w-full"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Button className="w-full">Save Address</Button>
        </form>
      ) : (
        <Button className="w-full">Order Now</Button>
      )}
    </div>
  );
}

export default Order;
