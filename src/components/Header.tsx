"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function Header() {
  let show = false;
  function showNav() {
    const nav = document.querySelector(".nav1") as HTMLDivElement;
    const overlay = document.querySelector(".overlay") as HTMLDivElement;
    if (show === false) {
      nav.style.visibility = "visible";
      overlay.style.display = "block";
      show = true;
    } else {
      nav.style.visibility = "hidden";
      show = false;
      overlay.style.display = "none";
    }
  }

  const [more1, setMore1] = useState(false);
  const [more2, setMore2] = useState(false);
  const [cartNo, setCartNo] = useState(0);

  function ChangeMore1() {
    setMore1((s) => !s); // Simplified toggle
  }

  function ChangeMore2() {
    setMore2((s) => !s); // Simplified toggle
  }

  useEffect(() => {
    document.querySelectorAll(".btnN1").forEach((e) => {
      e.addEventListener("click", ChangeMore1);
    });
    document.querySelectorAll(".btnN2").forEach((e) => {
      e.addEventListener("click", ChangeMore2);
    });

    const cartItems = sessionStorage.getItem("cartItems");
    if (cartItems) {
      // Attempt to parse the cart items from sessionStorage
      try {
        const parsedCartItems = JSON.parse(cartItems);
        // Set cartNo to the length of the parsed cart items array
        setCartNo(parsedCartItems.length);
      } catch (error) {
        console.error("Error parsing cart items:", error);
      }
    } else {
      // No cart items in sessionStorage, set cartNo to 0
      setCartNo(0);
    }

    const keyToTrack = "cartItems";
    let previousValue = sessionStorage.getItem(keyToTrack);

    let timeOut = setInterval(() => {
      const currentValue = sessionStorage.getItem(keyToTrack);
      if (currentValue !== previousValue) {
        // Handle the change here'
        let recentValue = sessionStorage.getItem(keyToTrack);
        const parsedArry = JSON.parse(recentValue as string);
        setCartNo(parsedArry.length);
      }
    }, 500);

    return()=>{
      clearInterval(timeOut)
    }
  }, []); // Empty dependency array to run it once on component mount

  useEffect(() => {
    // Update the display and src attributes based on the more1 and more2 states
    document.querySelectorAll(".more1").forEach((e: any) => {
      e.style.display = more1 ? "flex" : "none";
    });

    document.querySelectorAll(".btnN1 img").forEach((e: any) => {
      e.src = more1
        ? "/images/icon-arrow-up.svg"
        : "/images/icon-arrow-down.svg";
      e.alt = more1 ? "icon-arrow-up" : "icon-arrow-down";
    });
  }, [more1]);

  useEffect(() => {
    // Update the display and src attributes based on the more2 state
    document.querySelectorAll(".more2").forEach((e: any) => {
      e.style.display = more2 ? "flex" : "none";
    });

    document.querySelectorAll(".btnN2 img").forEach((e: any) => {
      e.src = more2
        ? "/images/icon-arrow-up.svg"
        : "/images/icon-arrow-down.svg";
      e.alt = more2 ? "icon-arrow-up" : "icon-arrow-down";
    });
  }, [more2]);

  return (
    <header>
      <Link href={"/"} className="logo">
        Fiztech
      </Link>

      <Image
        src="/images/icon-menu.svg"
        width="30"
        height="25"
        alt="icon-menu"
        className="icon-menu"
        onClick={showNav}
      />

      <nav className="nav1">
        <div className="navS">
          <Link href={"/cart"}>
            <span className="noProduct">{cartNo}</span>
            <Image src={"/images/cart.png"} alt="cart" height={40} width={40} />
          </Link>

          <Image
            src="/images/icon-close-menu.svg"
            alt="icon-close-menu"
            width="25"
            height={"25"}
            className="icon-close"
            onClick={showNav}
          />
        </div>

        <div className="navF">
          <div className="con1">
            <button className="btnN1 btn1">
              <span>Products</span>
              <Image
                src="/images/icon-arrow-down.svg"
                alt="icon-arrow-down"
                width={10}
                height={6}
              />
            </button>
            <div className="more1">
              <Link href={"/products"}>All products</Link>
              <Link href={"/products/smartphones"}>Smartphones</Link>
              <Link href={"/products/laptops"}>Laptops</Link>
              <Link href={"/products/accessories"}>Accessories</Link>
            </div>
          </div>

          <div className="con2">
            <button className="btnN2 btn1">
              <span>Company</span>
              <Image
                src="/images/icon-arrow-down.svg"
                alt="icon-arrow-down"
                width={10}
                height={6}
              />
            </button>
            <div className="more2">
              <Link href={"/"}>History</Link>
              <Link href={"/"}>Our Team</Link>
            </div>
          </div>

          <button className="btn1">
            <span>Repair Service</span>
          </button>

          <button className="btn1">
            <span>Blog</span>
          </button>

          <button className="btn1">
            <span>About</span>
          </button>
        </div>
      </nav>

      <nav className="nav2">
        <Image
          src="/images/icon-close-menu.svg"
          alt="icon-close-menu"
          width="25"
          height={"25"}
          className="icon-close"
        />

        <div className="navF">
          <div className="con1">
            <button className="btnN1 btn1">
              <span>Products</span>
              <Image
                src="/images/icon-arrow-down.svg"
                alt="icon-arrow-down"
                width={10}
                height={6}
              />
            </button>
            <div className="more1">
              <Link href={"/products"}>All products</Link>
              <Link href={"/products/smartphones"}>Smartphones</Link>
              <Link href={"/products/laptops"}>Laptops</Link>
              <Link href={"/products/accessories"}>Accessories</Link>
            </div>
          </div>

          <div className="con2">
            <button className="btnN2 btn1">
              <span>Company</span>
              <Image
                src="/images/icon-arrow-down.svg"
                alt="icon-arrow-down"
                width={10}
                height={6}
              />
            </button>
            <div className="more2">
              <Link href={"/"}>History</Link>
              <Link href={"/"}>Our Team</Link>
            </div>
          </div>

          <button className="btn1">
            <span>Repair Service</span>
          </button>

          <button className="btn1">
            <span>Blog</span>
          </button>

          <button className="btn1">
            <span>About</span>
          </button>
        </div>

        <div className="navS">
          <Link href={"/cart"}>
            <span className="noProduct">{cartNo}</span>
            <Image src={"/images/cart.png"} alt="cart" height={40} width={40} />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
