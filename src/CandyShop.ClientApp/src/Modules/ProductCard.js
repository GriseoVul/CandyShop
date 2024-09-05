import React, {useState, useEffect ,useContext} from 'react';
import { MyContext } from './MyContext';
import Swal from 'sweetalert2';
import { isUrl } from './MyContext';
const ProductCard = ({item}) => {
  const url = `${isUrl}/Image/`
  const [isCount, setIsCount] = useState(0)
  const { addToBasket, basketItems, removeFromBasket,setBasketItems } = useContext(MyContext)

  const errorImage = `https://placehold.co/100/f8f8f8/000000?text=Что-то+пошло+не+так:(`

useEffect(()=> {
  const existingItem = basketItems.find(basketItem => basketItem.id === item.id)
  if (existingItem && existingItem.count > 0){
    setIsCount(existingItem.count)
  }
},[basketItems, item.id])

const handlerZeroState = () => {
  setIsCount(0)
  removeFromBasket(item)
 } 

const handlerAddToBasket = () => {
  const newItem = {...item, count: isCount+1}
  setIsCount(prevCount => prevCount + 1);
  addToBasket(newItem)

}
const handlerRemoveFromBasket = () => {
  if (isCount >1 ){
    const newItem = {...item, count: isCount-1}
    setIsCount(prevCount => prevCount - 1); 
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
        setIsCount(value);
        const newItem = { ...item, count: value };
        addToBasket(newItem);
      }
    }
  };
  const showProductAlert = () => {
    const img = new Image();
    const imageSrc = `${url}${item.imageNames}`; // Попытка загрузить основное изображение
  
    img.src = imageSrc;
    img.onerror = () => {
      img.src = errorImage; // Если ошибка, подставляем заглушку
    };
    img.onload =() => {
      Swal.fire({
        title: item.name,
        html: `
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 500px; margin: auto;">
        <img src="${img.src}" alt="image" style="width: 100%; max-width: 300px; height: auto; border-radius: 10px;">
        <p style="text-align: center; margin: 20px 0;">Категория: ${item.category}</p>
        <p style="text-align: center; margin: 10px 0;">Описание: ${item.description}</p>
      </div>
        `,
        showConfirmButton: false,
      });
    }
    };

  function handlerClick(event){
      event.preventDefault();
      showProductAlert()
  }
return (
<div className='product-item'>
    <img src={`${url}${item.imageNames}`} loading="lazy" alt={item.name} onClick={handlerClick} onError={(e) => e.target.src = errorImage}/> 
    {/* ${url}${item.imageNames} */}
        {/* https://i.ibb.co/V9WdKPS/3.png */}
    <div className='product-list'>
        <h3>{item.name}</h3>
        {item.discount > 0 ?
                             <span className='price'><span style={{textDecoration: 'line-through',color: 'gray' }}>{item.price}₽</span> <span style={{color: 'var(--saleitemprice)'}}>-{item.discount}%</span><br/>{item.totalPrice}₽<span className='ye'>/{item.units}</span></span> 
                             : <span className='price'>{item.price} <span className='ye'>₽/{item.ye}</span></span>}
      
        {item.discount === 0 && <span className='sale-price' style={{visibility: 'hidden'}}>Пусто</span>}<br/>
        {isCount === 0 ? (
          <div className="quantity-controls"><button className={`button button-inbasket`}style={{margin:'16px 0px'}} onClick={handlerAddToBasket}>В корзину</button></div>
        ) : (
          <div className="quantity-controls">
            <button className="button" onClick={handlerRemoveFromBasket}>-</button>
            <input
              className="input-quantity"
              type="number"
              value={isCount}
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