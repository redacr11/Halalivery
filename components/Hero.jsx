import Image from "next/image";
import React from "react";
import { UilPhone } from "@iconscout/react-unicons";

import HeroImage from "../assets/HeroImage.png";

const Hero = () => {
  return (
    <div className="flex">
      {/* Left side */}
      <div className="flex flex-col gap-8 mt-10 p-4 w-3/4">
        <div className="text-base text-themeColour">
          <span>Faster than faster.</span>
        </div>
        <div className="flex flex-col text-7xl font-semibold">
          <span>Be the Fastest</span>
          <span>in Delivering</span>
          <span>
            your <span className="text-themeColour">Pizza</span>
          </span>
        </div>

        <span className=" text-gray-700 font-light">
          Our Mission is to deliver your food, for free.
        </span>

        <button className="btn px-10 py-4">Get Started.</button>
      </div>

      {/* Right side */}

      <div className="relative">
        <div className="absolute -left-60 w-512">
          <Image src={HeroImage} alt="" layout="responsive" />
        </div>

        <div className="flex items-center justify-center absolute w-max p-4 rounded-full top-24 right-24 gap-4 bg-white drop-shadow-xl shadow-black text-themeColour hover:cursor-pointer hover:scale-105">
          <span>Contact Us</span>
          <div className="flex bg-green-500 rounded-full w-10 h-10 items-center justify-center">
            <UilPhone color="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
