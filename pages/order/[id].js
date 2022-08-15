import React, { useEffect } from "react";
import { client } from "../../lib/client";
import Layout from "../../components/Layout";
import Image from "next/image";

import { UilBill, UilBox } from "@iconscout/react-unicons";
import Cooking from "../../assets/cooking.png";
import OnWay from "../../assets/onway.png";
import Spinner from "../../assets/spinner.svg";

const Orders = ({ order }) => {
  useEffect(() => {
    if (order.status > 3) {
      localStorage.clear();
    }
  }, [order]);

  return (
    <Layout>
      <div className="flex flex-col gap-16 mt-12 items-center justify-center">
        <span className="text-4xl font-bold">Order in Process</span>
        <div className="flex flex-col gap-4 w-5/12 [&>div]:flex [&>div]:justify-between">
          <div>
            <span>Order ID</span>
            <span className="font-bold">{order._id}</span>
          </div>
          <div>
            <span>Customer Name</span>
            <span className="font-bold">{order.name}</span>
          </div>
          <div>
            <span>Phone</span>
            <span className="font-bold">{order.phone}</span>
          </div>
          <div>
            <span>Method</span>
            <span className="font-bold">
              {order.method === 0 ? "Cash on Delivery" : "Online Payment(Paid)"}
            </span>
          </div>
          <div>
            <span>Total</span>
            <span className="font-bold">£{order.total}</span>
          </div>
        </div>

        <div className="flex gap-60">
          <div className="status">
            <UilBill width={50} height={50} />
            <span>Payment</span>
            {order.method === 0 ? (
              <span className="paymentDeliveryOnline">On Delivery</span>
            ) : (
              <span className="paymentDeliveryOnline">Paid</span>
            )}
          </div>

          <div className="status">
            <Image src={Cooking} alt="" width={50} height={50} />
            <span>Cooking</span>
            {order.status === 1 && (
              <div className="absolute -left-6 -top-6 w-24">
                <Image src={Spinner} alt="" />
              </div>
            )}

            {order.status > 1 && (
              <span className="rounded-full text-white bg-lime-400 px-4 py-2 text-base">
                Completed
              </span>
            )}
          </div>

          <div className="status">
            <Image src={OnWay} alt="" width={50} height={50} />
            <span className="w-max">On its way</span>
            {order.status === 2 && (
              <div className="absolute -left-6 -top-6 w-24">
                <Image src={Spinner} alt="" />
              </div>
            )}

            {order.status > 2 && (
              <span className="rounded-full text-white bg-lime-400 px-4 py-2 text-base">
                Completed
              </span>
            )}
          </div>

          <div className="status">
            <UilBox width={50} height={50} />
            <span>Delivered</span>
            {order.status === 3 && (
              <div className="absolute -left-6 -top-6 w-24">
                <Image src={Spinner} alt="" />
              </div>
            )}

            {order.status > 3 && (
              <span className="rounded-full text-white bg-lime-400 px-4 py-2 text-base">
                Completed
              </span>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;

export const getServerSideProps = async ({ params }) => {
  const query = `*[_type == 'order' && _id == '${params.id}']`;
  const order = await client.fetch(query);

  return {
    props: {
      order: order[0],
    },
  };
};
