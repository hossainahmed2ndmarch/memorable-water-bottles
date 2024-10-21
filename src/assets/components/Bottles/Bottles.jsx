import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import "./Bottles.css";
import {
  addCartToLocalStorage,
  getStoredCart,
  removeFromLocalStorage,
} from "../../../utilities/localstorage";
import Cart from "../Cart/Cart";

const Bottles = () => {
  const [bottles, setBottles] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const loadBottles = async () => {
      const res = await fetch("bottle.json");
      const data = await res.json();
      setBottles(data);
    };
    loadBottles();
  }, []);

  // Load cart from local storage
  useEffect(() => {
    if (bottles.length > 0) {
      const storedCart = getStoredCart();
      const savedCart = [];
      for (const id of storedCart) {
        const bottle = bottles.find((bottle) => bottle.id === id);
        if (bottle) {
          savedCart.push(bottle);
        }
      }
      console.log(savedCart);
      setCart(savedCart);
    }
  }, [bottles]);

  const handleCart = (bottle) => {
    const newCart = [...cart, bottle];
    setCart(newCart);
    addCartToLocalStorage(bottle.id);
  };

  const handleRemoveCart = (id) => {
   const remainingCart = cart.filter(bottle => bottle.id !== id)
   setCart(remainingCart);
    removeFromLocalStorage(id);
  };
  return (
    <div>
      <h2>Bottles Available: {bottles.length}</h2>
      <Cart cart={cart} handleRemoveCart={handleRemoveCart}></Cart>
      <div className="bottle-container">
        {bottles.map((bottle) => (
          <Bottle
            key={bottle.id}
            handleCart={handleCart}
            bottle={bottle}
          ></Bottle>
        ))}
      </div>
    </div>
  );
};

export default Bottles;
