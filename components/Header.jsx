import React, { useState, useEffect } from "react";
import Image from "next/image";
import { UilShoppingBag, UilReceipt } from "@iconscout/react-unicons";
import { useStore } from "../store/store";

import Logo from "../assets/Logo.png";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  //? state in terminal
  // const state = useStore((state) => state);
  // console.log(state);

  const [order, setOrder] = useState("");
  const router = useRouter();

  useEffect(() => {
    setOrder(localStorage.getItem("order"));
  }, []);

  const items = useStore((state) => state.cart.pizzas.length);

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex flex-1 items-center justify-start gap-2 ">
        <Image src={Logo} alt="" width={50} height={50} />
        <span className="font-bold text-2xl">Halalivery</span>
      </div>

      <ul className="flex flex-1 list-none gap-8 justify-center z-99 hover:cursor-pointer [&>*:hover]:text-themeColour">
        <li>
          <Link href="../">Home</Link>
        </li>
        <li onClick={() => router.push("/#Menu")}>Menu</li>
        {/* <li>Contact</li> */}
      </ul>

      <div className="flex flex-1 gap-4 justify-end">
        <Link href="/cart">
          <div className="flex relative cursor-pointer z-99">
            <UilShoppingBag size={35} color="#2E2E2E" />
            <div className="flex absolute bg-themeColour text-white rounded-full w-5 h-5 justify-center items-center left-5">
              {items}
            </div>
          </div>
        </Link>

        {order && (
          <Link href={`/order/${order}`}>
            <div className="flex relative cursor-pointer z-99">
              <UilReceipt size={35} color="#2E2E2E" />
              {order != "" && (
                <div className="flex absolute bg-themeColour text-white rounded-full w-5 h-5 justify-center items-center left-5">
                  1
                </div>
              )}
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
