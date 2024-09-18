import React, { useContext } from 'react';
import { MyContext } from './MyContext';
import ProductCard from './ProductCard';

const Candy = ({item}) => {
    return (
      <div className='Candy'><ProductCard
      key={item.id}
      item={item}
  /></div>
    );
}

export default Candy;
