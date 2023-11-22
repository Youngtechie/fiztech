// Footer.js
"use client";

import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";

function Footer() {
  const [NoFooter, setNoFooter] = useState(true);

  function handleSetFooter() {
    setNoFooter((s) => (s = !s));
  }

  useEffect(() => {
    document
      .querySelector(".copyR1 .arrow-up ")
      ?.addEventListener("click", handleSetFooter);
  }, []);


  useEffect(() => {
    if (NoFooter) {
      (document.querySelector("footer") as HTMLElement).style.display = "none";
      (document.querySelector(".copyR1 .arrow-up") as HTMLImageElement).src =
        "/images/icon-arrow-up.svg";
    } else {
      (document.querySelector("footer") as HTMLElement).style.display = "flex";
      (document.querySelector(".copyR1 .arrow-up") as HTMLImageElement).src =
        "/images/icon-arrow-down.svg";
    }
  }, [NoFooter]);
  return (
    <div className="allFooter">
      <div className="copyR1">
        <span>Copyright &copy; 2023 Fiztech. All Rights Reserved.</span>
        <Image
          src="/images/icon-arrow-up.svg"
          alt="icon-arrow-up"
          width={30}
          height={20}
          className="arrow-up"
        />
      </div>
      <footer>
        <div className="infos">
          <div className="contact-info">
            <h3>Contact Us</h3>
            <p>Email: info@computeraccessoriesstore.com</p>
            <p>Phone: +1 (123) 456-7890</p>
            <p>Address: 1234 Accessory Ave, City, Country</p>
          </div>
          <div className="social-media">
            <h3>Follow Us</h3>
            <ul>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
