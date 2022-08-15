import Image from "next/image";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";
import OrderModal from "../components/OrderModal";
import { client, urlFor } from "../lib/client";
import { useStore } from "../store/store";
import { useRouter } from "next/router";

const cart = () => {
  const cartData = useStore((state) => state.cart);
  const removePizza = useStore((state) => state.removePizza);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [order, setOrder] = useState(
    typeof window !== "undefined" && localStorage.getItem("order")
  );

  const router = useRouter();

  const handleRemove = (i) => {
    removePizza(i);
    toast.error("Item removed.");
  };

  const total = () =>
    cartData.pizzas.reduce((a, b) => a + b.quantity * b.price, 0);

  const handleOnDelivery = () => {
    setPaymentMethod(0);
    typeof window !== "undefined" && localStorage.setItem("total", total());
  };

  const handleCheckout = async () => {
    typeof window !== "undefined" && localStorage.setItem("total", total());
    setPaymentMethod(1);
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData.pizzas),
    });

    if (response.status === 500) return;

    const data = await response.json();
    toast.loading("Redirecting...");
    router.push(data.url);
  };

  return (
    <Layout>
      {/* detailed view */}
      <div className="grid grid-cols-2.2fr1fr p-8 gap-8 ">
        <div>
          <table className="w-full border-separate border-spacing-4">
            <thead>
              <th>Pizza</th>
              <th>Name</th>
              <th>Size</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </thead>
            <tbody>
              {cartData.pizzas.length > 0 &&
                cartData.pizzas.map((pizza, i) => {
                  const src = urlFor(pizza.image).url();
                  return (
                    <tr key={i} className="[&>*]:text-center">
                      <td>
                        <Image
                          loader={() => src}
                          src={src}
                          alt=""
                          objectFit="cover"
                          width={85}
                          height={85}
                          className="rounded-md"
                        />
                      </td>
                      <td className="w-1/6">{pizza.name}</td>
                      <td>
                        {pizza.size === 0
                          ? "Small"
                          : pizza.size === 1
                          ? "Medium"
                          : "Large"}
                      </td>
                      <td>{pizza.price}</td>
                      <td>{pizza.quantity}</td>
                      <td>{pizza.price * pizza.quantity}</td>
                      <td
                        className="text-themeColour cursor-pointer"
                        onClick={() => handleRemove(i)}
                      >
                        x
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* this is the summary */}
        <div className="flex flex-col items-center justify-between h-64 p-7 bg-cartBg drop-shadow-lg rounded-lg">
          <span className="font-bold text-lg">Cart</span>
          <div className="flex flex-col gap-3 w-full [&>div]:flex [&>div]:justify-between">
            <div>
              <span>Items </span>
              <span>{cartData.pizzas.length}</span>
            </div>
            <div>
              <span>Total </span>
              <span>£{total()}</span>
            </div>
          </div>
          {cartData.pizzas.length && !order ? (
            <div className="flex gap-4 [&>*]:text-base [&>*]:p-3">
              <button
                className="btn text-themeColour bg-transparent border-solid"
                onClick={handleOnDelivery}
              >
                Cash on Delivery
              </button>
              <button className="btn" onClick={handleCheckout}>
                Pay Now
              </button>
            </div>
          ) : (
            <span className="text-sm font-semibold text-center italic">
              You cannot place a new order whilst you have another order
              pending.
            </span>
          )}
        </div>
      </div>

      <Toaster />

      {/* Modal */}
      <OrderModal
        opened={paymentMethod === 0}
        setOpened={setPaymentMethod}
        paymentMethod={paymentMethod}
      />
    </Layout>
  );
};

export default cart;
