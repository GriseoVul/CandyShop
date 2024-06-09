import React, { useContext, useState, useEffect } from 'react';
import { MyContext } from './MyContext';
import ProductCard from './ProductCard';
import Swal from 'sweetalert2';

const Basket = () => {
  const { basketItems, setBasketItems, removeFromBasket} = useContext(MyContext);
  const [basketTotal, setBasketTotal] = useState(0);
  useEffect(() => {
    const total = basketItems.reduce((sum, item)=> sum += item.totalprice , 0)
    setBasketTotal(total);
  }, [basketItems, setBasketItems,removeFromBasket])


  
  return (
    <>
    <h2 style={{textAlign: 'center', marginTop: "45px"}}>Корзина</h2>
    <div className='CandysBox'>
      {basketItems.length === 0 ? (
        <p style={{marginBottom: '100px', marginTop: '100px'}}>Корзина пуста</p>
      ) : (
       <div className='Candys'>
          {basketItems.map((item) => (
           <div className='Candy'> <ProductCard
            key={item.id}
            item={item}
            /> </div>
          ))}
        </div>
      )}
    </div>
    {basketItems.length > 0 && (<div className='order-order'>
            <h2 style={{textAlign: 'center', marginBottom: '20px'}}>Итого {basketTotal} </h2>
            <button className='button button-order'>Оформить заказ</button>
            </div>)}
         </>
  );
};

export default Basket;

