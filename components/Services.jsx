import Image from "next/image";
import React from "react";

import s1 from "../assets/s1.png";
import s2 from "../assets/s2.png";
import s3 from "../assets/s3.png";

const Services = () => {
  return (
    <>
      <div className="flex flex-col font-bold justify-center items-center">
        <span className="text-sm text-themeColour">WHAT WE SERVE</span>
        <span className="text-xl">Your Favourite Food</span>
        <span className="text-xl">Delivery Partner</span>
      </div>

      {/* Features */}
      <div className="flex mt-12 gap-12 items-center justify-center">
        <div className="feature">
          <div>
            <Image src={s1} objectFit="cover" />
          </div>
          <span className="font-bold">Easy to Order</span>
          <span className="text-gray-500 break-words w-80 text-center">
            Only need a few steps to get your food home!
          </span>
        </div>
        <div className="feature">
          <div>
            <Image src={s2} objectFit="cover" />
          </div>
          <span className="font-bold">Easy to Order</span>
          <span className="text-gray-500 break-words w-80 text-center">
            Delivery always on time!
          </span>
        </div>
        <div className="feature">
          <div>
            <Image src={s3} objectFit="cover" />
          </div>
          <span className="font-bold">Easy to Order</span>
          <span className="text-gray-500 break-words w-80 text-center">
            The only place where fast = quality!
          </span>
        </div>
      </div>
    </>
  );
};

export default Services;
