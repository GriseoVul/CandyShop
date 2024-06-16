import React, {useState, useEffect ,useContext} from 'react';
import { MyContext } from './MyContext';
import Swal from 'sweetalert2';


const ProductCard = ({item}) => {
  const url = `https://gdw3fstj-5063.euw.devtunnels.ms/api/Image/`
  const [isQuantity, setIsQuantity] = useState(0)
  const { addToBasket, basketItems, removeFromBasket } = useContext(MyContext)
useEffect(()=> {
  const existingItem = basketItems.find(basketItem => basketItem.id === item.id)
  if (existingItem){
    setIsQuantity(existingItem.quantity)
  }
},[basketItems, item.id])

const handlerZeroState = () => {
  setIsQuantity(0)
  removeFromBasket(item)
 } 

const handlerAddToBasket = () => {
  const newItem = {...item, quantity: isQuantity+1}
  addToBasket(newItem)
}
const handlerRemoveFromBasket = () => {
  if (isQuantity >1 ){
    const newItem = {...item, quantity: isQuantity-1}
    addToBasket(newItem)
  } 
 else handlerZeroState()
  }

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0 && value <= 999) {
      if (value === 0) {
        handlerZeroState();
      } 
      else {
        setIsQuantity(value);
        const newItem = { ...item, quantity: value };
        addToBasket(newItem);
      }
    }
  };
  const showProductAlert = () => {
      Swal.fire({
        title: item.name,
        html: `
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 500px; margin: auto;">
        <img src="${`${url}${item.imageNames}`}" alt="image" style="width: 100%; max-width: 300px; height: auto; border-radius: 10px;">
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
<div className='product-item'>
    <img src={`${url}${item.imageNames}`} alt={item.name} onClick={handlerClick}/>
    <div className='product-list'>
        <h3>{item.name}</h3>
        <span className='price'>{item.price} <span className='ye'>₽/{item.ye}</span></span>
        {item.discount > 0 && <span className='sale-price'>-{item.discount}%</span>} 
        {item.discount === 0 && <span className='sale-price' style={{visibility: 'hidden'}}>Пусто</span>}<br/>
        {isQuantity === 0 ? (
          <button className={`button button-inbasket`} onClick={handlerAddToBasket}>В корзину</button>
        ) : (
          <div className="quantity-controls">
            <button className="button" onClick={handlerRemoveFromBasket}>-</button>
            <input
              className="input-quantity"
              type="number"
              value={isQuantity}
              min="0"
              max="999"
              onChange={handleInputChange}/>
            <button className="button" onClick={handlerAddToBasket}>+</button><br/>
            <button className={`button button-delete`} onClick={handlerZeroState}>Удалить</button>
          </div>
        )}
    </div>
</div>
)
};

export default ProductCard;