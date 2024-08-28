import React, {forwardRef, useEffect, useState,useContext} from 'react';
import { MyContext } from './MyContext';
import { isUrl } from './MyContext';
import Toast , {swalWithBootstrapButtons} from './Toast';
import moment from 'moment';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {Link, useNavigate} from "react-router-dom";

const url = `${isUrl}/Order/PUT`  //https://fakestoreapi.com/products ${isUrl}/Order/PUT

const SellerItem = ({item, dataset}) => {

const { addToBasket,setBasketItems ,basketItems, removeFromBasket, setAllData,setEditOrderId, setCopyState } = useContext(MyContext)

const [isSelectStatus, setisSelectStatus] = useState(true);
const [isVisibleOrder, setIsVisibleOrder] = useState(false);

const [isTrack, setIsTrack] = useState(item.trackId);
const [isStatus, setIsStatus] = useState(item.status);
const [isCustomerAdress, setIsCustomerAdress] = useState(item.customerAddress);
const [isAdditionaldata, setIsAdditionaldata] = useState(item.additionalData);
const [isOrderProduct, setIsOrderProduct] = useState(item.products)
const [isdataset, setDataset] = useState(dataset);

const navigateToEditOrder = useNavigate();

const MySwal = withReactContent(Swal);
// const swalWithBootstrapButtons = Swal.mixin({
//     customClass: {
//       confirmButton: "buttonOK",
//       cancelButton: "button"
//     },
//     buttonsStyling: false,
//     allowOutsideClick: false,
//   });

useEffect(() => {
    setIsStatus(item.status);
}, [item.status]);

const isoData =(toISO)=>{
    const date = moment(toISO)
    return date.format('DD.MM.YYYY HH:mm')
}

const accordion = () =>{
    setIsVisibleOrder(!isVisibleOrder)

}

const toggleSelect = () => {
    setisSelectStatus(!isSelectStatus)
    if (!isSelectStatus){
          swalWithBootstrapButtons.fire({
            title: "Сохранить изменения?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Да",
            cancelButtonText: "Нет",
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                editALL(isStatus,isTrack, isCustomerAdress, isAdditionaldata)
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              setisSelectStatus(false)
            }
          });
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
            if (updateData) {
                    setIsStatus(item.status);
                    setIsTrack(item.trackId);
                    setIsCustomerAdress(item.customerAddress)
                    setIsAdditionaldata(item.additionalData)
                }
            Toast("error", 'Не удалось изменить.')
        }
}

const editALL = (status, trackId, customerAddress, additionalData)=>{
    updateOrder({ 
        status: status,
        trackId: trackId,
        customerAddress: customerAddress,
        additionalData: additionalData,
     });
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

const editOrderItems = () => {
  const updatedBasketItems = dataset.map((data) => {
    console.log(data);
    console.log(item.products);
    const dataId = String(data.id)
      // Находим соответствующий продукт в item.products по ID
      const product = item.products.find(product => String(product.id) === dataId);
      console.log('product',product);
      // Если продукт найден, добавляем свойство count
      if (product) {
          return { ...data, count: product.count };
      }
      // Если соответствующего продукта нет, возвращаем оригинальные данные или null, в зависимости от логики
      return { ...data, count: 0 }; // можно вернуть null, если так нужно
  });
  // Фильтруем элементы, чтобы убрать те, у которых count равен 0, если это необходимо
  const filteredBasketItems = updatedBasketItems.filter(item => item.count > 0);
  // Обновляем корзину, если есть элементы для добавления
  if (filteredBasketItems.length > 0) {
      setBasketItems(filteredBasketItems);
      setCopyState(filteredBasketItems)
      setEditOrderId(item.id)
      console.log(item.id);
      console.log('Итоговая корзина', filteredBasketItems);
  } else {
      console.log('Нет товаров для добавления');
  }
  navigateToEditOrder('/EditOrder')
}

const cancelButton = () => {
    swalWithBootstrapButtons.fire({
        title: "Отменить изменения?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Да",
        cancelButtonText: "Нет",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            setIsStatus(item.status);
            setIsTrack(item.trackId);
            setIsCustomerAdress(item.customerAddress)
            setIsAdditionaldata(item.additionalData)
            setisSelectStatus(true)
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          setisSelectStatus(true)
        }
      });
}

    return (
      <><div className='Seller-item'>
            <div className='NumbOfOrder'>
                <h2>Заказ №{item.id}</h2>
            </div>
            <div className='Contact'>
            <span><span style={{fontSize: '20px'}}>{item.customerName}</span><br/> <span>Тел:<a href={`tel:${item.customerPhoneNumber}`}>{item.customerPhoneNumber}</a></span></span> <br/><br/>
                <span>Создан  {isoData(item.createdAt)}</span><br/>
                <span>Изменен {isoData(item.updatedAt)}</span><br/><br/>
                <select className='select-status' value={isStatus}disabled={isSelectStatus} style={{width: '337px' }} onChange={selectStatus}>
                    <option value="Empty">Новый</option>
                    <option value="Pending">В работе</option>
                    <option value="Shipped">Отправлен</option>
                    <option value="Delivered">Завершен</option>
                    <option value="IncorrectData">Неверные данные</option>
                    <option value="Canseled">Отменен</option>
                </select><br/>
                <br/><input className='input-public' placeholder='Трекномер' value={isTrack} style={{width: '325px'}} disabled={isSelectStatus}onChange={inputTrack}></input><br/><br/>
                <textarea className='input-public' type="text" name="description" style={{height: '45px', width: '325px' }}  value={isCustomerAdress} placeholder='Адрес заказа' disabled={isSelectStatus} onChange={inputCustomerAddress}></textarea>
                <div className='Order-items'>
                    <br/><div className='Order-header' onClick={accordion}><h3>{!isVisibleOrder ? 'Показать детали заказа' : 'Скрыть детали заказа'}</h3></div>
                    {isVisibleOrder ? 
                        <div className='Order-body'> <br/>
                              {item.products.map((i, index)=> (
                                 <div key={index}>
                                 <h3>{i.name}</h3>
                                 <div className='Order-flex'>
                                      <div className='Order-flex-item'>Кол-во: {i.count}</div>
                                      <div className='Order-flex-item'>* {i.price}₽</div>
                                      <div className='Order-flex-item'>= {i.price * i.count}₽</div>
                                 </div><br/>
                              </div>
                                 ))}
                             <h3>Итого: {item.totalprice}</h3><br/>
                             <button className='button' onClick={editOrderItems}>Изменить состав</button>
                        </div>  : <></>}
                </div> <br/>
                <textarea className='input-public' type="text" name="description" value={isAdditionaldata} style={{height: '100px', width: '325px'}} placeholder='Примечание' onChange={inputAdditionalData} disabled={isSelectStatus}></textarea><br/>
                {!isSelectStatus && <button className='button' onClick={cancelButton}>Отменить</button>}
                <button className='button' onClick={toggleSelect}>{isSelectStatus ? "Изменить" : "Готово"}</button><br/><br/><br/>
                <button className='button'style={{marginBottom: '19px'}}>Печатать</button>
            </div>
        </div></>  
    );
}

export default SellerItem;
