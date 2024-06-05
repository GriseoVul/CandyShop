import React, { useContext } from 'react';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { MyContext } from './MyContext';
import ProductCard from './ProductCard';

const BasketItem = ({item}) => {
    const { addToBasket } = useContext(MyContext)
    const showProductAlert = () => {
      let quantity = 1;
      let totalprice = item.price;
      let saleprice = item.price-item.price/100*item.sale
      if (item.sale > 0){
        totalprice = saleprice;
      }

        Swal.fire({
          title: item.name,
          html: `
          <div style="display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 500px; margin: auto;">
          <img src="${item.pic}" alt="image" style="width: 100%; max-width: 300px; height: auto; border-radius: 10px;">
          <p style="text-align: center; margin: 10px 0;">${item.description}</p>
        </div>
          `,
          showConfirmButton: false,
        });
      };

    function handlerClick(event){
        event.preventDefault();
        showProductAlert()
    }
    return (
      <div className='Candy'><ProductCard
      key={item.id}
      item={item}
      onButtonClick={handlerClick}
  /></div>
    );
}

export default BasketItem;
