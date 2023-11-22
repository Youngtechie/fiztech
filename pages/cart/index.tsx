import React, { useEffect, useState } from "react";

import PagesLayout from "../layout";
import Product from "@/composables/Product";
import Link from "next/link";
import Image from "next/image";

export default function Cart() {
  const [AllcartItems, setAllCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    document.body.style.overflowY = "scroll";
    const keyToTrack = "cartItems";
    let previousValue = sessionStorage.getItem(keyToTrack);
    const parsedArry = JSON.parse(previousValue as string);
    setAllCartItems(parsedArry);
    setTotal(parsedArry.reduce(getSum, 0));

    function getSum(a: any, b: any) {
      return a + b.total;
    }

    let timeOut = setInterval(() => {
      const currentValue = sessionStorage.getItem(keyToTrack);
      if (currentValue !== previousValue) {
        // Handle the change here'
        let recentValue = sessionStorage.getItem(keyToTrack);
        const parsedArry = JSON.parse(recentValue as string);
        setAllCartItems(parsedArry);
        setTotal(parsedArry.reduce(getSum, 0));
      }
    }, 500);

    return () => {
      clearInterval(timeOut);
    };
  }, []);

  return (
    <PagesLayout>
      <div className="cart">
        <h2 className="title">Cart</h2>
        {AllcartItems.length === 0 ? (
          <div className="cartEmpty">
            <p>Cart is empty. Start shopping now!</p>
            <Link href={"/products"}>Shop Now</Link>
          </div>
        ) : (
          <div className="ChoosenProducts">
            {AllcartItems.map((item: any) => {
              return (
                <Product
                  key={item.id}
                  name={item.name}
                  id={item.id}
                  imgUrl={item.imgUrl}
                  price={item.price}
                />
              );
            })}

            <div className="totalAll">
              <span>
                <span className="toAll">Total All:</span>{" "}
                <Image
                  src="/images/naira.png"
                  alt="naira"
                  width={20}
                  height={20}
                  className="naira"
                />
                <span className="toText">{total}</span>
              </span>
            </div>

            <div className="orderSec">
              <button className="orderBtn">ORDER</button>
            </div>
          </div>
        )}
      </div>
      <div className="overlay"></div>
    </PagesLayout>
  );
}
