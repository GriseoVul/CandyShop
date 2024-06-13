import React, { createContext, useState } from 'react';

export const MyContext = createContext();
const MyContextProvider = ({ children }) => {
  const [basketItems, setBasketItems] = useState([]);

  const addToBasket = (newItem) => {
    setBasketItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === newItem.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: newItem.quantity, totalprice: newItem.quantity * item.totalPrice }
            : item
        );
      } else {
        return [...prevItems, { ...newItem, totalprice: newItem.quantity * newItem.totalPrice }];
      }
    });
  };

  const removeFromBasket = (itemToRemove) => {
    setBasketItems((prevItems)=> prevItems.filter(item=> item.id !== itemToRemove.id))
  }

  return (
    <MyContext.Provider value={{ basketItems, setBasketItems, addToBasket, removeFromBasket}}>
      {children}
    </MyContext.Provider>
  );
};
export default MyContextProvider;