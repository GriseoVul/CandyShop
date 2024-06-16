import React from 'react';

const AdminItem = ({item}) => {
const url = `https://gdw3fstj-5063.euw.devtunnels.ms/api/Image/`
function handlerClick(event){
    event.preventDefault();
}
    return (
        <div className='product-item'>
    <img src={`${url}${item.imageNames}`} alt={item.name} onClick={handlerClick}/>
    <div className='product-list'>
        <h3>{item.name}</h3>
        <span className='price'>{item.price} <span className='ye'>₽/{item.ye}</span></span>
        {item.discount > 0 && <span className='sale-price'>-{item.discount}%</span>} 
        {item.discount === 0 && <span className='sale-price' style={{visibility: 'hidden'}}>Пусто</span>}<br/>
    </div>
</div>
    );
}

export default AdminItem;


