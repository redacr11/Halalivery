import React from "react";
import Image from "next/image";
import Link from "next/link";

import { urlFor } from "../lib/client";

const Menu = ({ pizzas }) => {
  return (
    <div className="flex flex-col gap-12 mt-24" id="Menu">
      <div className="flex flex-col font-bold justify-start pl-8">
        <span className="text-themeColour text-sm mb-4">OUR MENU</span>
        <span className="text-xl">Menu that will always</span>
        <span className="text-xl">Make you fall in love</span>
      </div>

      <div className="flex flex-wrap gap-8 justify-around items-center">
        {/* pizzas */}
        {pizzas.map((pizza, id) => {
          const src = urlFor(pizza.image).url();
          return (
            <div
              className="flex flex-col items-start justify-centre gap-2 text-xl font-bold"
              key={id}
            >
              <Link href={`./pizza/${pizza.slug.current}`}>
                <div className="relative h-52 w-72 overflow-hidden rounded-2xl">
                  <Image
                    loader={() => src}
                    src={src}
                    alt=""
                    objectFit="cover"
                    layout="fill"
                    className="cursor-pointer hover:scale-110"
                  />
                </div>
              </Link>
              <span>{pizza.name} </span>
              <span>
                <span className="text-themeColour">£ </span>
                {pizza.price[1]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
