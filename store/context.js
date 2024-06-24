import { useEffect, useState } from "react";
import { createContext } from "react";

export const Context = createContext({
  cartItems: [],
  setCartItems: () => {},
  removeFromCart : (id)=>{},
  addToCart : (item)=>{},
  updatedCartItemQuantity : (id, newQuantity)=>{}
});

export default function ContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // useEffect(() => {
  //   console.log(cartItems);
  // }, [cartItems]);

  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      const updatedCart = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCartItems(updatedCart);
    } else {
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  const updatedCartItemQuantity = (id, newQuantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart)
    console.log(id, newQuantity)
  };

  const value = {
    cartItems: cartItems,
    setCartItems: setCartItems,
    removeFromCart : removeFromCart,
    updatedCartItemQuantity : updatedCartItemQuantity,
    addToCart : addToCart
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
