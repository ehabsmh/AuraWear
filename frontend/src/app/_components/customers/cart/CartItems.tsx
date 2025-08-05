"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const initialCartItems = [
  {
    id: 1,
    name: "Classic T-Shirt",
    price: 25,
    quantity: 1,
    image: "/1.webp",
  },
  {
    id: 2,
    name: "Denim Jacket",
    price: 60,
    quantity: 2,
    image: "/4.jpg",
  },
  {
    id: 3,
    name: "Sneakers",
    price: 90,
    quantity: 1,
    image: "/7.jpg",
  },
];

export default function CartClient() {
  const [cart, setCart] = useState(initialCartItems);
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [city, setCity] = useState("");

  const handleQtyChange = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const userHasAddress = false; // simulate condition

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {/* Cart Section */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-3xl font-bold">Shopping Cart</h2>
          <p className="text-gray-600">Total Items: {totalItems}</p>

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white p-4 rounded-xl shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-500">${item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Button onClick={() => handleQtyChange(item.id, -1)}>
                    -
                  </Button>
                  <span>{item.quantity}</span>
                  <Button onClick={() => handleQtyChange(item.id, 1)}>+</Button>
                </div>
              </div>
              <div className="text-lg font-semibold">
                ${(item.quantity * item.price).toFixed(2)}
              </div>
            </div>
          ))}

          <div className="text-right font-bold text-2xl">
            Total: ${totalPrice.toFixed(2)}
          </div>
        </div>

        {/* Order Section */}
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
      </div>
    </div>
  );
}
