import React, {useState, useEffect ,useContext} from 'react';
import { MyContext } from './MyContext';
import Swal from 'sweetalert2';
import { getImageUrlApi } from './urlAPIs';
import Sale from './Sale';

const ProductCard = ({item, admin}) => {
  //https://24ai.tech/ru/wp-content/uploads/sites/4/2023/10/01_product_1_sdelat-izobrazhenie-1-1-7-scaled.jpg
  const [isCount, setIsCount] = useState(0)
  const { addToBasket, basketItems, removeFromBasket,setBasketItems,allData,setAllData} = useContext(MyContext)
  const [prevIMG, setPrevIMG] = useState('')

  useEffect(()=>{
    if(item.image){
      setPrevIMG(URL.createObjectURL(item.image))
    }
  },[item])

  const errorImage = `https://placehold.co/100/f8f8f8/000000?text=Что-то+пошло+не+так:(`

useEffect(()=> {
  const existingItem = basketItems.find(basketItem => basketItem.id === item.id)
  if (existingItem && existingItem.count > 0){
    setIsCount(existingItem.count)
  }
},[basketItems, item.id, allData, setAllData])

const updateAllData = (updatedItem) => {
  setAllData((prevData)=>
  prevData.map((item)=>
  item.id===updatedItem.id ? {...item, count: updatedItem.count}: item))
}

const handlerZeroState = () => {
  const zerostate = {...item, count: 0}
  setIsCount(0)
  updateAllData(zerostate)
  removeFromBasket(item)
  console.log(item.count);
 } 

const handlerAddToBasket = () => {
  const newItem = {...item, count: isCount+1}
  setIsCount(prevCount => prevCount + 1);
  addToBasket(newItem)
  updateAllData(newItem)
  console.log(item.count);
}


const handlerRemoveFromBasket = () => {
  if (isCount > 1 ){
    const newItem = {...item, count: isCount-1}
    setIsCount(prevCount => prevCount - 1); 
    addToBasket(newItem)
    updateAllData(newItem)
    console.log(item.count);
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
    const imageSrc = `${getImageUrlApi}/${item.imageNames}`; // Попытка загрузить основное изображение
  
    img.src = imageSrc;
    img.onload =() => {
      if (admin){
        Swal.fire({
          title: item.name,
          html: `
          <div style="display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 500px; margin: auto;">
          <img src="${prevIMG}" alt="image" style="width: 100%; max-width: 300px; height: auto; border-radius: 10px;">
          <p style="text-align: center; margin: 20px 0;">Категория: ${item.category}</p>
          <p style="text-align: center; margin: 10px 0;">Описание: ${item.description}</p>
        </div>
          `,
          showConfirmButton: false,
        });
      } else {
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
      }
    img.onerror = () => {
      img.src = errorImage; // Если ошибка, подставляем заглушку
    };
    };

  function handlerClick(event){
      event.preventDefault();
      showProductAlert()
  }
return (
<div className='Candy'>
<div className='product-item'>
  <div className='img-item'>
    {admin ? (
      <img src={prevIMG} loading="lazy" alt={item.name} onClick={handlerClick} onError={(e) => e.target.src = errorImage}/>
    ):(
      <img src={`${getImageUrlApi}/${item.imageNames}`} loading="lazy" alt={item.name} onClick={handlerClick} onError={(e) => e.target.src = errorImage}/>
    )}
  {item.discount > 0 && (<Sale item={item.discount}/>)}
  </div>
    <div className='product-list'>
        <br/><h3>{item.name}</h3>
        <div className='discount-price-box'>
          {item.discount > 0 && (<span className='price'style={{fontWeight:'500',marginLeft: '1px', marginRight:'5px', textAlign: 'right',fontSize: '100%',textDecoration: 'line-through',color: 'gray' }}>{item.price}₽</span>)}

        <span className='price' style={{fontSize:'160%', fontWeight:'600',textAlign: 'center'}}> {item.totalPrice}₽<span className='ye'>/{item.units}</span></span>
        </div>
           
                             
        {isCount == 0  ? (
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
</div>
)
};

export default ProductCard;