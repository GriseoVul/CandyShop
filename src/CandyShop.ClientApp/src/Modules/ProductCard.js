import React from 'react';

const ProductCard = ({ item, onButtonClick, onRemoveClick, buttonText, showQuantity, basket }) => {
  const yesbasket  = (<div className='basket-item'>
  <img src={item.pic} alt={item.name} />
  <div className='basket-list'>
    <h3>{item.name}</h3>
    <span className='price'>₽{item.price}</span>
    {item.sale > 0 && <span className='sale-price'> -{item.sale}%</span>}
    {item.sale === 0 && <span className='sale-price' style={{visibility: 'hidden'}}>Пусто</span>}
    {showQuantity && <p>Количество: {item.quantity}</p>}
    <button className='button' onClick={onButtonClick}>{buttonText}</button>
    {onRemoveClick && (
      <button className='button' onClick={onRemoveClick} style={{ marginLeft: '10px' }}>X</button>
    )}
  </div>
  </div>)

  const noBasket = ( <div className='product-item'>
  <img src={item.pic} alt={item.name} />
  <div className='product-list'>
    <h3>{item.name}</h3>
    <span className='price'>₽{item.price}</span>
    {item.sale > 0 && <span className='sale-price'> -{item.sale}%</span>}
    {item.sale === 0 && <span className='sale-price' style={{visibility: 'hidden'}}>Пусто</span>}
    {showQuantity && <p>Количество: {item.quantity}</p>}
    <button className='button' onClick={onButtonClick}>{buttonText}</button>
  </div>
</div>)
  return basket === true ? yesbasket : noBasket;

};

export default ProductCard;
