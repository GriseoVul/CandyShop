import React, { createContext, useState } from 'react';

export const MyContext = createContext();
const MyContextProvider = ({ children }) => {
  const [basketItems, setBasketItems] = useState([]);
  const [allData, setAllData] = useState([])
  const [editOrderId, setEditOrderId] = useState(0)
  const [copyState, setCopyState] = useState('')
  const [filteredData, setFilteredData] = useState([])  

  const addToBasket = (newItem) => {
    setBasketItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === newItem.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === newItem.id
            ? { ...item, count: newItem.count, totalprice: newItem.count * item.totalPrice }
            : item
        );
      } else {
        return [...prevItems, { ...newItem, totalprice: newItem.count * newItem.totalPrice }];
      }
    });
  };

  const removeFromBasket = (itemToRemove) => {
    setBasketItems((prevItems)=> prevItems.filter(item=> item.id !== itemToRemove.id))
  }

  return (
    <MyContext.Provider value={{ basketItems, setBasketItems, addToBasket, removeFromBasket, setAllData, allData, editOrderId, setEditOrderId, copyState, setCopyState, filteredData, setFilteredData}}>
      {children}
    </MyContext.Provider>
  );
};
export default MyContextProvider;

export const isUrl = `/api` // /api // https://gdw3fstj-5063.euw.devtunnels.ms/api