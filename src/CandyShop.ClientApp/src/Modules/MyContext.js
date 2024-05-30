import React, { createContext, useState } from 'react';

export const MyContext = createContext();
const MyContextProvider = ({ children }) => {
  const [basketItems, setBasketItems] = useState([]);

  const addToBasket = (newItem) => {
    setBasketItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === newItem.id);
      if (existingItem) {
      //   return prevItems.map(item =>
      //     item.id === newItem.id
      //     ? { ...item, quantity: item.quantity + newItem.quantity, totalprice: (item.quantity + newItem.quantity) * item.price }
      //     : item.id
      //   );
      // } else {
      //   return [...prevItems, newItem];
      return prevItems.map(item => {
        if (item.id === newItem.id){
          const newQuantity = item.quantity + newItem.quantity;
          const cappedQuantity = Math.min(newQuantity, 999);
          return{
            ...item, 
            quantity: cappedQuantity, 
            totalprice: cappedQuantity*item.price
          }
        }
        return item;
      })
      } else {
        return[...prevItems, {...newItem, quantity: Math.min(newItem.quantity, 999), totalprice: newItem.price* Math.min(newItem.quantity, 999) }]
      }
    });
  };

  return (
    <MyContext.Provider value={{ basketItems, setBasketItems, addToBasket }}>
      {children}
    </MyContext.Provider>
  );
};
export default MyContextProvider;