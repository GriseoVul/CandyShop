import React, {forwardRef, useEffect, useState} from 'react';
import NotesManager from './NotesManager';

const SellerItem = ({item}) => {
const [isSelect, setisSelect] = useState(true);

const toggleSelect = () => {
    setisSelect(!isSelect)
}
const editOrderItem = () => {

}
    return (
      <><div className='Seller-item'>
            <div className='NumbOfOrder'>
                <h2>Заказ №{item.id}</h2>
            </div>
            <div className='Contact'>
            <span><span style={{fontSize: '20px'}}>{item.userName}</span> <span><a href={`tel:${item.phoneNumber}`}>{item.phoneNumber}</a></span></span> <br/><br/>
                <span><span>08.07.2024</span> <span>14:15</span></span><br/><br/>
                <select className='select-status' value={item.status}disabled={isSelect}>
                    <option value="Empty">Новый</option>
                    <option value="In_work">В работе</option>
                    <option value="Mailed">Отправлен</option>
                    <option value="End">Завершен</option>
                    <option value="Incorrect_data">Неверные данные</option>
                    <option value="Canseled">Отменен</option>
                </select>
                <button className='button' onClick={toggleSelect}>
                    {!isSelect ? ("Готово"):("Изменить")}
                </button>
                <ul>
                    заказ
                    {item.products.map((i, index)=> (
                        <li key={index} item={i}>{i.name} {i.price} {i.quantity}</li>
                    ))}
                </ul>
                <button className='button'>Изменить</button>
                <h3>Итого: NULL</h3>
                {/* <label>Трекномер</label><br/> */}
                <input className='input-public' placeholder='Трекномер'></input>
                <button className='button'>Добавить</button><br/><br/>
                <NotesManager />
                <button className='button'style={{marginBottom: '19px'}}>Печатать</button>             
            </div>
        </div></>  
    );
}

export default SellerItem;
