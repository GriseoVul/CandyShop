import React from 'react';

const SellerItem = ({item}) => {
    return (
        <div className='Seller-item'>
            <div className='NumbOfOrder'>
                <h2>№1231313</h2>
            </div>
            <div className='Contact'>
                <h3>Имя</h3>
                <h3>Номер телефона</h3>
                <h5>Дата заказа </h5>
                <h3>В раборте</h3>
                <button className='button'>Новый</button>
                <button className='button'>В работе</button>
                <button className='button'>Отправлен</button>
                <button className='button'>Завершен</button>
                <ul>
                    заказ
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>
                <h3>Сумма заказа</h3>
                {/* <label>Трекномер</label><br/> */}
                <input placeholder='Трекномер'></input>
                <button className='button'>Добавить</button><br/><br/>
            </div>
        </div>
    );
}

export default SellerItem;
