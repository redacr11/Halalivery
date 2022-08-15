import Image from "next/image";
import Layout from "../../components/Layout";
import { client, urlFor } from "../../lib/client";
import { useState } from "react";
import { useStore } from "../../store/store";
import toast, { Toaster } from "react-hot-toast";

import LeftArrow from "../../assets/arrowLeft.png";
import RightArrow from "../../assets/arrowRight.png";

export default function Pizza({ pizza }) {
  const src = urlFor(pizza.image).url();

  const [size, setSize] = useState(1);
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type) => {
    type === "increase"
      ? setQuantity((prev) => prev + 1)
      : quantity === 1
      ? null
      : setQuantity((prev) => prev - 1);
  };

  //! add to cart function
  const addPizza = useStore((state) => state.addPizza);
  const addToCart = () => {
    addPizza({
      ...pizza,
      price: pizza.price[size],
      quantity: quantity,
      size: size,
    });
    toast.success("Added to Cart!");
  };

  return (
    <Layout>
      <div className="flex p-8 gap-20 mt-12">
        <div className="relative w-1/2 h-96 rounded-xl overflow-hidden">
          <Image
            src={src}
            loader={() => src}
            alt=""
            layout="fill"
            unoptimized
            objectFit="cover"
            className="hover:scale-110"
          />
        </div>

        <div className="flex flex-col flex-1 text-xl font-bold justify-between">
          <span className="text-4xl">{pizza.name}</span>
          <span className="text-lg font-normal text-gray-500">
            {pizza.details}
          </span>
          <span className="text-2xl">
            <span className="text-themeColour">£</span>
            {pizza.price[size]}
          </span>
          <div className="flex gap-12 font-semibold text-lg">
            <span>Size</span>
            <div className="flex gap-2 font-normal text-themeColour text-base [&>*]:flex [&>*]:items-center [&>*]:justify-center [&>*]:py-1 [&>*]:px-6 [&>*]:border-2 [&>*]:border-themeColour [&>*]:rounded-3xl">
              <div
                className={`hover:bg-themeColour hover:cursor-pointer hover:text-white ${
                  size === 0 ? "selected" : ""
                }`}
                onClick={() => setSize(0)}
              >
                Small
              </div>
              <div
                className={`hover:bg-themeColour hover:cursor-pointer hover:text-white ${
                  size === 1 ? "selected" : ""
                }`}
                onClick={() => setSize(1)}
              >
                Medium
              </div>
              <div
                className={`hover:bg-themeColour hover:cursor-pointer hover:text-white ${
                  size === 2 ? "selected" : ""
                }`}
                onClick={() => setSize(2)}
              >
                Large
              </div>
            </div>
          </div>

          {/* Quantity counter */}
          <div className="flex text-lg font-semibold gap-12">
            <span>Quantity</span>
            <div className="flex gap-4">
              <Image
                src={LeftArrow}
                height={20}
                width={20}
                alt=""
                objectFit="contain"
                onClick={() => handleQuantity("decrease")}
              />
              <span>{quantity}</span>
              <Image
                src={RightArrow}
                height={20}
                width={20}
                alt=""
                objectFit="contain"
                onClick={() => handleQuantity("increase")}
              />
            </div>
          </div>

          {/* button */}
          <div className="btn font-normal py-1 px-4" onClick={addToCart}>
            Add to Cart
          </div>
        </div>
        <Toaster />
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == 'pizza' && defined(slug.current)[].slug.current]`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { slug = "" } = context.params;
  const pizza = await client.fetch(
    `*[_type == 'pizza' && slug.current == '${slug}'][0]`
  );
  return {
    props: {
      pizza,
    },
  };
}
