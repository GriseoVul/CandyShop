import React, {useState, useEffect} from 'react';
import SellerItem from './SellerItem';
import { isUrl } from './MyContext';

const SellerPage = () => {
    const url= `${isUrl}/Order`
    const [isSellerBox, setIsSellerBox] = useState(false)
    const [sellerData, setSellerData] = useState([]);
    const [dataset, setdataset] = useState([])

    const [selectOrderId, setSelectOrderId] = useState('')
    const [selectStatus, setSelectStatus] = useState('')
    const [selectOrderData, setSelectOrderData] = useState('')
    const [selectTrackID, setSelectTrackID] = useState('')

    const [formFilterData, setFormFilterData] = useState({
        id:'',
        trackId: '',
        status: '',
        dataOfOrder: '',
    })

    const handleSelectOrderId = (e) => {
        const id = e.target.value
        setSelectOrderId(id)
    }
    const handleSelectStatus = (e) => {
        const status = e.target.value
        setSelectStatus(status)
    }
    const handleOrderData = (e) => {
        const data = e.target.value
        setSelectOrderData(data)
    }
    const handleSelectTrackID = (e) => {
        const trackId = e.target.value
        setSelectTrackID(trackId)
    }

    
    const toggleSellerBox = () => {
        setIsSellerBox(!isSellerBox)
    }
    useEffect(()=> {
        const fetchData = async() => {
            try{
                const data = await fetchSellerItems();
                const data2 = await getCandysData();
                setSellerData(data)
                setdataset(data2)
                return data;
            } 
            catch (error){
                console.log(error)
            }
        }
        fetchData();
        getCandysData()
    }, [])
    async function fetchSellerItems(){
        try {
            const responce = await fetch(url,{
                method: 'GET', 
            })
            if (!responce.ok){
                const errorText = await responce.json();
                throw new Error(errorText.error || `${responce.status}`)
            }
            return responce.json()
        } catch (error) {
            console.error(error);
            throw new Error(error.message)
        }
    }
    async function getCandysData(){
        try {
            const responce = await fetch(`${isUrl}/Product`, {
                method: "GET",
            })
            if (!responce.ok){
                const errorText = await responce.json();
                throw new Error(errorText);
            }
            const data = await responce.json();
            return data
        } catch(error){
            console.log(error);
            throw new Error(error.message)
        }
    }
    return (
        <>
        <div className='SearchBox'> <br/>
        <h3 style={{textAlign:'center'}}>Фильтр</h3><br/>
        <div className='Search'>
        <input className='input-public' placeholder='Номер заказа' type='number' inputMode='numeric' onChange={handleSelectOrderId} value={selectOrderId}></input>
            {/* <select className='select-status' value={isStatus}disabled={isSelectStatus} style={{width: '337px' }} onChange={selectStatus}> */}
            <select className={`input-public ${selectStatus === '' ? 'select-placeholder' : ''}`} value={selectStatus} style={{width: '212px', height:'27px'}} onChange={handleSelectStatus}>
                    <option value='' disabled style={{ color: '#8e8e8e' }}>Статус заказа</option>
                    <option value=""></option>
                    <option value="Empty"style={{ color: '#000' }}>Новый</option>
                    <option value="Pending"style={{ color: '#000' }}>В работе</option>
                    <option value="Shipped"style={{ color: '#000' }}>Отправлен</option>
                    <option value="Delivered"style={{ color: '#000' }}>Завершен</option>
                    <option value="IncorrectData"style={{ color: '#000' }}>Неверные данные</option>
                    <option value="Canseled"style={{ color: '#000' }}>Отменен</option>
            </select>
            <input className='input-public' style={{height: '15px' }} type='date' value={selectOrderData} onChange={handleOrderData}></input>
            <input className='input-public' placeholder='Трекномер' value={selectTrackID} onChange={handleSelectTrackID}></input><br/>
        </div><br/>
        <button className='button' >Поиск</button>
        </div>
        <button className='button' onClick={toggleSellerBox}>
                {!isSellerBox ? ("К таблице"):("К списку")}</button>
        <div className='SellerPage'>
            <div className={isSellerBox ? 'SellerBox' : ''}>
            {sellerData.map((item, index) => (
               <><SellerItem key={index} item = {item} dataset={dataset}/><br/></>
            ))
            }
            </div>
        </div><br/>
        </>
    );
}

export default SellerPage;