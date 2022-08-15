import { Modal, useMantineTheme } from "@mantine/core";
import React from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { createOrder } from "../lib/orderHandler";
import { useStore } from "../store/store";
import { useRouter } from "next/router";

const OrderModal = ({ opened, setOpened, paymentMethod }) => {
  const theme = useMantineTheme();
  const router = useRouter();
  const [formData, setFormData] = useState({});

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetCart = useStore((state) => state.resetCart);

  const total = typeof window !== "undefined" && localStorage.getItem("total");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = await createOrder({ ...formData, total, paymentMethod });
    toast.success("Order Placed!");
    resetCart();
    {
      typeof window !== "undefined" && localStorage.setItem("order", id);
    }

    router.push(`/order/${id}`);
  };
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={opened}
      onClose={() => setOpened(null)}
    >
      <form
        className="flex flex-col gap-4 items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          required
          placeholder="Name"
          className="formText"
          onChange={handleInput}
        />
        <input
          type="text"
          name="phone"
          required
          placeholder="Phone Number"
          className="formText"
          onChange={handleInput}
        />
        <textarea
          name="address"
          rows={3}
          className="formText"
          placeholder="Address"
          onChange={handleInput}
        />
        <span>
          Amount due on delivery:{" "}
          <span className="font-bold text-themeColour text-xl">£{total}</span>
        </span>
        <button type="submit" className="btn p-4 text-lg bg-green-500">
          Place Order
        </button>
      </form>
      <Toaster />
    </Modal>
  );
};

export default OrderModal;
