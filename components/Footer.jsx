import React from "react";
import Image from "next/image";

import Logo from "../assets/Logo.png";

import { UilFacebook, UilInstagram } from "@iconscout/react-unicons";

const Footer = () => {
  return (
    <div className="flex flex-col gap-8 mt-12 pb-4 items-center justify-center">
      <span className="font-bold text-themeColour">ALL RIGHTS RESERVED</span>
      <div className="flex gap-4">
        <UilFacebook className="text-themeColour" size={30} />
        <UilInstagram className="text-themeColour" size={30} />
      </div>

      <div className="flex flex-1 items-center justify-start gap-2 ">
        <Image
          src={Logo}
          className="flex justify-center justify-items-center gap-2"
          alt=""
          width={50}
          height={50}
        />
        <span className="font-bold text-2xl">Halalivery</span>
      </div>
    </div>
  );
};

export default Footer;
