import React, { useContext } from 'react';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { MyContext } from './MyContext';
import ProductCard from './ProductCard';

const Candy = ({item}) => {
  const { addToBasket } = useContext(MyContext)
    return (
      <div className='Candy'><ProductCard
      key={item.id}
      item={item}
  /></div>
    );
}

export default Candy;
