import React, {forwardRef, useEffect, useState} from 'react';
import { isUrl } from './MyContext';
import Toast from './Toast';
import moment from 'moment';

const url = `${isUrl}/Order/PUT`  //https://fakestoreapi.com/products

const SellerItem = ({item}) => {
const [isSelectStatus, setisSelectStatus] = useState(true);
const [isSelectTrack, setIsSelectTrack] = useState(true);
const [isSelectAdditionalData, setIsSelectAdditionalData] = useState(true);
const [isSelectCustomerAddres, setisSelectCustomerAddres] = useState(true);

const [isTrack, setIsTrack] = useState(item.trackId);
const [isStatus, setIsStatus] = useState(item.status);
const [isCustomerAdress, setIsCustomerAdress] = useState(item.customerAddress);
const [isAdditionaldata, setIsAdditionaldata] = useState(item.additionalData);

useEffect(() => {
    setIsStatus(item.status);
}, [item.status]);

const isoData =(toISO)=>{
    const date = moment(toISO)
    return date.format('DD.MM.YYYY HH:mm')
}
const toggleSelect = () => {
    setisSelectStatus(!isSelectStatus)
    if (!isSelectStatus){
        editOrderStatus(isStatus)
    }
}
const toggleTrackInput = () => {
    setIsSelectTrack(!isSelectTrack)
    if (!isSelectTrack){
        addTrack(isTrack)  
    }
}

const toggleCustomerAddress = () => {
    setisSelectCustomerAddres(!isSelectCustomerAddres)
    if (!isSelectCustomerAddres){
        editCustomerAdress(isCustomerAdress)
    }
}
const updateOrder = async (updateData) => {
    Toast(0,'Сохранение...',true)
    try {
        const response = await fetch(`${url}/${item.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...item, ...updateData})
        })
        if (!response.ok){
            throw new Error(`Error ${response.statusText}`)
        } else {
            Toast('success', 'Успешно!')
        }
        } catch (error){
            //Все доп запросы сюда
            if (updateData.status) {
                setIsStatus(item.status);
            } else if (updateData.trackId) {
                setIsTrack(item.trackId);
            } else if (updateData.customerAddress){
                setIsCustomerAdress(item.customerAddress)
            }
            Toast("error", 'Не удалось изменить.')
        }
}

const editOrderStatus = (status) => {
    updateOrder({ status });
};

const addTrack = (trackId) => {
    updateOrder({ trackId: trackId });
};

const editCustomerAdress = (customerAddress) => {
    updateOrder({customerAddress: customerAddress})
}



const selectStatus = (e) => {
    const newStatus = e.target.value
    setIsStatus(newStatus)
}

const inputTrack = (e)=> {
   const newTrack = e.target.value
    setIsTrack(newTrack)
}

const inputCustomerAddress = (e)=> {
    const newAddress = e.target.value
    setIsCustomerAdress(newAddress)
}

const inputAdditionalData = (e) => {
    const newAdditionalData = e.target.value
    setIsAdditionaldata(newAdditionalData)
}
    return (
      <><div className='Seller-item'>
            <div className='NumbOfOrder'>
                <h2>Заказ №{item.id}</h2>
            </div>
            <div className='Contact'>
            <span><span style={{fontSize: '20px'}}>{item.customerName}</span> <span><a href={`tel:${item.customerPhoneNumber}`}>{item.customerPhoneNumber}</a></span></span> <br/><br/>
                <span>Создан  {isoData(item.createdAt)}</span><br/>
                <span>Изменен {isoData(item.updatedAt)}</span><br/><br/>
                <textarea className='input-public' type="text" name="description" style={{height: '60px'}}  value={isCustomerAdress} placeholder='Адрес заказа' disabled={isSelectCustomerAddres} onChange={inputCustomerAddress}></textarea>
                <button className='button' onClick={toggleCustomerAddress} >{isSelectCustomerAddres ? "Изменить" : "Готово"}</button><br/>
                <select className='select-status' value={isStatus}disabled={isSelectStatus} onChange={selectStatus}>
                    <option value="Empty">Новый</option>
                    <option value="Pending">В работе</option>
                    <option value="Shipped">Отправлен</option>
                    <option value="Delivered">Завершен</option>
                    <option value="IncorrectData">Неверные данные</option>
                    <option value="Canseled">Отменен</option>
                </select>
                <button className='button' onClick={toggleSelect}>
                    {!isSelectStatus ? ("Готово"):("Изменить")}
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
                <input className='input-public' placeholder='Трекномер' value={isTrack} disabled={isSelectTrack}onChange={inputTrack}></input>
                <button className='button' onClick={toggleTrackInput}>{isSelectTrack ? "Изменить" : "Готово"}</button><br/><br/>
                <textarea className='input-public' type="text" name="description" value={'item.additionalData'}style={{height: '100px'}} placeholder='Примечание' disabled={isSelectAdditionalData}></textarea>
                <button className='button' >Добавить</button><br/><br/><br/>
                <button className='button'style={{marginBottom: '19px'}}>Печатать</button>
            </div>
        </div></>  
    );
}

export default SellerItem;
