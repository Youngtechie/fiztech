import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface ProductProps {
  name: string;
  description?: string;
  price: number;
  fakePrice?: number;
  id: string;
  imgUrl: string;
  rating?: number;
}

export default function Product({
  name,
  description,
  price,
  fakePrice,
  id,
  imgUrl,
  rating,
}: ProductProps) {
  const [activity, setActivity] = useState("Add");
  const [quantity, setQuantity] = useState(1);
  const [Total, setTotal] = useState(price * quantity);
  const inputQuantity = useRef() as any;

  const handleAddClick = (e: any) => {
    e.preventDefault();

    const productArr = {
      name: name,
      price: price,
      id: id,
      imgUrl: imgUrl,
      quantity: quantity,
      total: Total
    };

    if (sessionStorage.getItem("cartItems")) {
      const storedArray = JSON.parse(
        sessionStorage.getItem("cartItems") as string
      );
      storedArray.push(productArr);
      sessionStorage.setItem("cartItems", JSON.stringify(storedArray));
    } else {
      sessionStorage.setItem("cartItems", JSON.stringify([productArr]));
    }
    setActivity("Remove");
  };

  const handleRemoveClick = (e: any) => {
    e.preventDefault();

    // Retrieve the current cart items from sessionStorage
    const cartItems = JSON.parse(sessionStorage.getItem("cartItems") || "[]");

    // Find the index of the product to remove based on its 'id'
    const productIndex = cartItems.findIndex((item: any) => item.id === id);

    if (productIndex !== -1) {
      // Remove the product from the cart by splicing it from the array
      cartItems.splice(productIndex, 1);

      // Update the cart in sessionStorage with the modified cart items
      sessionStorage.setItem("cartItems", JSON.stringify(cartItems));

      // Update the activity state to "Add" since the product is now removed
      setActivity("Add");
    }
  };

  const increase = (e: any) => {
    e.preventDefault();
    // Increase the quantity in the input field
    const newQuantity = quantity + 1;
    inputQuantity.current.value = newQuantity;

    // Update the quantity state
    setQuantity(newQuantity);

    // Update the cart in sessionStorage
    updateCartQuantity(newQuantity);
  };

  const decrease = (e: any) => {
    e.preventDefault();
    if (quantity > 1) {
      // Decrease the quantity in the input field
      const newQuantity = quantity - 1;
      inputQuantity.current.value = newQuantity;

      // Update the quantity state
      setQuantity(newQuantity);

      // Update the cart in sessionStorage
      updateCartQuantity(newQuantity);
    }
  };

  const updateCartQuantity = (newQuantity: any) => {
    const cartItems = JSON.parse(sessionStorage.getItem("cartItems") || "[]");
    const updatedCart = cartItems.map((item: any) => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    // Convert the updated array back to a JSON string
    const updatedArrayString = JSON.stringify(updatedCart);

    // Store the updated JSON string back in sessionStorage
    sessionStorage.setItem("cartItems", updatedArrayString);
  };

  useEffect(() => {
    if (sessionStorage.getItem("cartItems")) {
      const cartItems = JSON.parse(
        sessionStorage.getItem("cartItems") as string
      );
      const hasObjectWithId = cartItems.some((obj: any) => obj.id === id);
      const desiredItem = cartItems.find((item: any) => item.id === id);
      if (hasObjectWithId) {
        setActivity("Remove");
        setQuantity((q) => (q = desiredItem.quantity));
        inputQuantity.current.value = desiredItem.quantity;
      } else {
        setActivity("Add");
      }
    }
    
  }, [id]);

  useEffect(() => {
    // Calculate the total based on the current price and quantity
    const newTotal = price * quantity;
    
    // Update the total state variable
    setTotal(newTotal);
  
    // Retrieve the cart items from sessionStorage
    const cartItems = JSON.parse(sessionStorage.getItem("cartItems") || "[]");
  
    // Update the total for the specific item in the cart
    const updatedCart = cartItems.map((item: any) => {
      if (item.id === id) {
        return { ...item, total: newTotal };
      }
      return item;
    });
  
    // Convert the updated array back to a JSON string
    const updatedArrayString = JSON.stringify(updatedCart);
  
    // Store the updated JSON string back in sessionStorage
    sessionStorage.setItem("cartItems", updatedArrayString);

  }, [quantity, price, id]);
  

  return (
    <Link href={`/products/${id}`} className="product-card">
      <div className="product-image">
        <Image src={imgUrl} height={100} width={100} alt={name} />
      </div>

      <div className="product-info">
        <h2 className="product-name">{name}</h2>
        <p className="product-description">{description}</p>

        <div className="product-price">
          <span><Image src="/images/naira.png" alt="naira" width={20} height={20} className="naira"/>{price}</span>
          <span className="fake"><Image src="/images/naira.png" alt="naira" width={20} height={20} className="naira"/>{fakePrice}</span>
        </div>

        <div className="product-rating">
          <i className="fa fa-star"></i>
          <span className="rating">{rating}</span>
        </div>

        <div className="product_quantity">
          <button type="button" onClick={decrease}>
            -
          </button>
          <input type="number" name="quantity" ref={inputQuantity} readOnly />
          <button type="button" onClick={increase}>
            +
          </button>
        </div>

        <div className="product_Total">
          <span><Image src="/images/naira.png" alt="naira" width={20} height={20} className="naira"/>{Total}</span>
        </div>

        <button
          className={`${activity}-btn`}
          onClick={activity === "Add" ? handleAddClick : handleRemoveClick}
        >
          {" "}
          {activity} {activity === "Add"? 'to' : 'from'} Cart{" "}
        </button>
      </div>
    </Link>
  );
}
