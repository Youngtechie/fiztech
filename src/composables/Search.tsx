import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface ProductProps {
  name: string;
  description: string;
  price: number;
  id: string;
  imgUrl: string;
}

export default function Product({
  name,
  description,
  price,
  id,
  imgUrl,
}: ProductProps) {

  const handleButtonClick = (e: any) => {
    e.preventDefault();
    console.log('wow');
  };

  return (
    
    <Link href={`/products/${id}`} className="product-card">
      <div className="product-image">
        <Image src={imgUrl} height={50} width={50} alt={name} />
      </div>

      <div className="product-info">
        <h2 className="product-name">{name}</h2>
        <p className="product-description">{description}</p>

        <div className="product-price">
          <span>{price}</span>
        </div>

        <button className="add-to-cart-btn" onClick={handleButtonClick}>Add to Cart</button>
      </div>
    </Link>
  );
}