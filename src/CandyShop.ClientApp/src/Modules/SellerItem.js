import React, {forwardRef, useEffect, useState} from 'react';
import NotesManager from './NotesManager';

const SellerItem = ({item}) => {
const [isSelect, setisSelect] = useState(true);

const toggleSelect = () => {
    setisSelect(!isSelect)
}
    return (
      <><div className='Seller-item'>
            <div className='NumbOfOrder'>
                <h2>№1231313</h2>
            </div>
            <div className='Contact'>
            <span><span style={{fontSize: '20px'}}>Геннадий</span> <span><a href='tel:88005553535'>88005553535</a></span></span> <br/><br/>
                <span><span>08.07.2024</span> <span>14:15</span></span><br/><br/>
                <select className='select-status' disabled={isSelect}>
                    <option value="New">Новый</option>
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
                    <li>Печенье 4кг 400₽</li>
                    <li>Мармелад 10кг 2000₽</li>
                    <li>Конфеты 3шт 450₽</li>
                </ul>
                <button className='button'>Изменить</button>
                <h3>Итого: 2850₽</h3>
                {/* <label>Трекномер</label><br/> */}
                <input className='input-public' placeholder='Трекномер'></input>
                <button className='button'>Добавить</button><br/><br/>
                <NotesManager />
                <button className='button'>Печатать</button>             
            </div>
        </div></>  
    );
}

export default SellerItem;
