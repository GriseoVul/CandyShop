import React, {forwardRef, useEffect, useState} from 'react';
import { isUrl } from './MyContext';
import Toast from './Toast';


const url = `${isUrl}/Order/PUT`  //https://fakestoreapi.com/products

const SellerItem = ({item}) => {
const [isSelect, setisSelect] = useState(true);
const [isTrack, setIsTrack] = useState('');
const [selectedStatus, setSelectedStatus] = useState(item.status);
useEffect(() => {
    setSelectedStatus(item.status);
}, [item.status]);

const toggleSelect = () => {
    setisSelect(!isSelect)
    if (!isSelect){
        editOrderStatus(selectedStatus)
    }
}
const editOrderStatus = async (status) => {
    Toast(0,0,true)
    try {
        const response = await fetch(`${url}/${item.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...item, status: status})
        })
        if (!response.ok){
            throw new Error(`Error ${response.statusText}`)
        } else {
            Toast('success', 'Успешно')
        }
        } catch (error){
            Toast("error", 'Не удалось изменить статус')
        }
}
const addTrack = async (track) => {
    Toast(0,0,true)
    try {
        const response = await fetch(`${url}/${item.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...item, trackId: track})
        })
        if (!response.ok){
            throw new Error(`Error ${response.statusText}`)
        } else {
            Toast('success', 'Успешно')
        }
    } catch (error) {
        Toast('error', 'Не удалось добавить трекномер')
    }
}
const selectStatus = (e) => {
    const newStatus = e.target.value
    setSelectedStatus(newStatus)
}

const inputTrack = (e)=> {
   const newTrack = e.target.value
    setIsTrack(newTrack)
}

const handleClickAddTrack= ()=>{
addTrack(isTrack)
}
    return (
      <><div className='Seller-item'>
            <div className='NumbOfOrder'>
                <h2>Заказ №{item.id}</h2>
            </div>
            <div className='Contact'>
            <span><span style={{fontSize: '20px'}}>{item.customerName}</span> <span><a href={`tel:${item.customerPhoneNumber}`}>{item.customerPhoneNumber}</a></span></span> <br/><br/>
                <span><span>08.07.2024</span> <span>14:15</span></span><br/><br/>
                <select className='select-status' value={selectedStatus}disabled={isSelect} onChange={selectStatus}>
                    <option value="Empty">Новый</option>
                    <option value="Pending">В работе</option>
                    <option value="Shipped">Отправлен</option>
                    <option value="Delivered">Завершен</option>
                    <option value="IncorrectData">Неверные данные</option>
                    <option value="Canseled">Отменен</option>
                </select>
                <button className='button' onClick={toggleSelect}>
                    {!isSelect ? ("Готово"):("Изменить")}
                </button>
                <ul>
                    заказ
                    {item.products.map((i, index)=> (
                        <li key={index} item={i}>{i.name} {i.price} {i.count}</li>
                    ))}
                </ul>
                <button className='button'>Изменить</button>
                <h3>Итого: {item.totalprice}</h3>
                {/* <label>Трекномер</label><br/> */}
                <input className='input-public' placeholder='Трекномер' onChange={inputTrack}></input>
                <button className='button' onClick={handleClickAddTrack}>Добавить</button><br/><br/>
                <textarea className='input-public' type="text" name="description"style={{height: '100px'}} placeholder='Примечание'></textarea><br/>
                <button className='button' onClick={handleClickAddTrack}>Добавить</button><br/><br/><br/>
                <button className='button'style={{marginBottom: '19px'}}>Печатать</button> 
            </div>
        </div></>  
    );
}

export default SellerItem;
