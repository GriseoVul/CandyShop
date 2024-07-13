import React, {forwardRef, useEffect, useState} from 'react';
import { isUrl } from './MyContext';
import Toast from './Toast';
import moment from 'moment';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const url = `${isUrl}/Order/PUT`  //https://fakestoreapi.com/products

const SellerItem = ({item, dataset}) => {
const [isSelectStatus, setisSelectStatus] = useState(true);
const [isSelectTrack, setIsSelectTrack] = useState(true);
const [isSelectAdditionalData, setIsSelectAdditionalData] = useState(true);
const [isSelectCustomerAddres, setisSelectCustomerAddres] = useState(true);

const [isTrack, setIsTrack] = useState(item.trackId);
const [isStatus, setIsStatus] = useState(item.status);
const [isCustomerAdress, setIsCustomerAdress] = useState(item.customerAddress);
const [isAdditionaldata, setIsAdditionaldata] = useState(item.additionalData);
const [isOrderProduct, setIsOrderProduct] = useState(item.products)
const [isdataset, setDataset] = useState(dataset)

const MySwal = withReactContent(Swal);
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "buttonOK",
      cancelButton: "button"
    },
    buttonsStyling: false,
    allowOutsideClick: false,
  });

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
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              setisSelectStatus(false)
            }
          });
    }
}
// const toggleTrackInput = () => {
//     setIsSelectTrack(!isSelectTrack)
//     if (!isSelectTrack){
//         addTrack(isTrack)  
//     }
// }

// const toggleCustomerAddress = () => {
//     setisSelectCustomerAddres(!isSelectCustomerAddres)
//     if (!isSelectCustomerAddres){
//         editCustomerAdress(isCustomerAdress)
//     }
// }

// const toggleAdditionalData =() => {
//     setIsSelectAdditionalData(!isSelectAdditionalData)
//     if (!isSelectAdditionalData){
//         editAdditionalData(isAdditionaldata)
//     }
// }

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
            // if (updateData.status) {
            //     setIsStatus(item.status);
            // } else if (updateData.trackId) {
            //     setIsTrack(item.trackId);
            // } else if (updateData.customerAddress){
            //     setIsCustomerAdress(item.customerAddress)
            // } else if (updateData.additionalData){
            //     setIsAdditionaldata(item.additionalData)
            // }
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

// const editOrderStatus = (status) => {
//     updateOrder({ status });
// };

// const addTrack = (trackId) => {
//     updateOrder({ trackId: trackId });
// };

// const editCustomerAdress = (customerAddress) => {
//     updateOrder({customerAddress: customerAddress})
// }

// const editAdditionalData = (additionalData) => {
//     updateOrder ({additionalData: additionalData})
// }

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
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          setisSelectStatus(true)
        }
      });
}

const editOrder = () =>{
    if (!dataset || dataset.length === 0) {
        Toast("error", "Данные продуктов еще не загружены.");
        return;
    }
    //!
    const orderProducts= item.products
    let index = 0;
    console.log('заказы',orderProducts);
    console.log('продукты',isdataset);
    const thisProducts = []
        for (const i of isdataset) {
            thisProducts.push(isdataset[index])
            for (let j = 0; j< orderProducts.length; j++){
                if (orderProducts[j].id == isdataset[index].id){
                    thisProducts[index].count =orderProducts[j].count
                }
            }
            index++
            console.log('thisProducts', thisProducts);
            setDataset(thisProducts)
        }
    //!
    async function start(){
        const { value: isdataset} = MySwal.fire({
            title: 'Редактировать товары',
            html: (
                <div>
                    {dataset.map((product, index) => (
                        <div key={index}>
                            <div>{product.name}</div>
                            <div>{product.price}</div>
                            <input
                                type="number"
                                defaultValue={product.count}
                                onChange={(e) => handleProductChange(index, 'count', e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            ),
            confirmButtonText: 'Сохранить',
            preConfirm: () => {
                const filteredProducts = isdataset
                return filteredProducts;
            }
        });
    };
    start(isdataset)
}

const handleProductChange = (index, field, value) => {
    const updatedProducts = [...item.products];
    updatedProducts[index][field] = value;
    item.products = updatedProducts; // Updating the original item.products to reflect changes
};
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
                заказ. типо список
                </div>
                <ul>
                    {item.products.map((i, index)=> (
                        <li key={index} item={i}>{i.name} Цена:{i.price} Количество:{i.count} Итого:{i.price * i.count}</li>
                    ))}
                </ul>
                <h3>Итого: {item.totalprice}</h3>
                <textarea className='input-public' type="text" name="description" value={isAdditionaldata} style={{height: '100px', width: '325px'}} placeholder='Примечание' onChange={inputAdditionalData} disabled={isSelectStatus}></textarea><br/>
                {!isSelectStatus && <button className='button' onClick={cancelButton}>Отменить</button>}
                <button className='button' onClick={toggleSelect}>{isSelectStatus ? "Изменить" : "Готово"}</button><br/><br/><br/>
                <button className='button'style={{marginBottom: '19px'}}>Печатать</button>
            </div>
        </div></>  
    );
}

export default SellerItem;
