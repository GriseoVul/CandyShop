import React , {useEffect, useState, useContext} from 'react';
import Candy from './Candy';
import Candys from './Candys';
import ProductCard from './ProductCard';
import { isUrl } from './MyContext';
import { MyContext } from './MyContext';

const SellerEditCandys = () => {
    const { basketItems, setBasketItems, removeFromBasket} = useContext(MyContext);
    useEffect(() =>{

    },[basketItems])
    return (
        <><h3>В заказе</h3>
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

        <h3>Добавить в заказ</h3>
        <Candys></Candys>
        </>

    );
}

export default SellerEditCandys;
