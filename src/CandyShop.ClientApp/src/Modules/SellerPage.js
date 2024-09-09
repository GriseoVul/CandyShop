import React, {useState, useEffect} from 'react';
import SellerItem from './SellerItem';
import { isUrl } from './MyContext';

const SellerPage = () => {
    const url= `${isUrl}/Order`
    const [isSellerBox, setIsSellerBox] = useState(false)
    const [sellerData, setSellerData] = useState([]);
    const [dataset, setdataset] = useState([])

    const [selectOrderId, setSelectOrderId] = useState('')
    const [selectStatus, setSelectStatus] = useState('Empty')
    const [selectOrderDataStart, setSelectOrderDataStart] = useState('')
    const [selectOrderDataEnd, setSelectOrderDataEnd] = useState('')
    const [selectTrackID, setSelectTrackID] = useState('')

    const [formFilterData, setFormFilterData] = useState({
        id:'',
        trackId: '',
        status: '',
        orderDataFrom: '',
        orderDataTo: '',
    })

    useEffect(()=>{
        if (!selectOrderDataStart){
            const currentData = new Date();
            const startDate = new Date();
            startDate.setDate(currentData.getDate()-7)
    
           const  formatDate = (date)=> {
                const year = date.getFullYear();
                const month = String(date.getMonth() +1).padStart(2,'0');
                const day = String(date.getDate()).padStart(2,'0');
                return `${year}-${month}-${day}`
            }
    
            setSelectOrderDataStart(formatDate(startDate))
            setSelectOrderDataEnd(formatDate(currentData))
        }
    },[])

    useEffect(() => {
        if (selectOrderDataStart && selectOrderDataEnd) {
            getSearchedData().then(setSellerData).catch(console.error);
            getCandysData().then(setdataset).catch(console.error);
        }
    }, [selectOrderDataStart, selectOrderDataEnd]);

    const handleSelectOrderId = (e) => {
        const id = e.target.value
        setSelectOrderId(id)
    }
    const handleSelectStatus = (e) => {
        const status = e.target.value
        setSelectStatus(status)
    }
    const handleOrderDataStart = (e) => {
        const data = e.target.value
        setSelectOrderDataStart(data)
    }
    const handleOrderDataEnd = (e) => {
        const data = e.target.value
        setSelectOrderDataEnd(data)
    }
    const handleSelectTrackID = (e) => {
        const trackId = e.target.value
        setSelectTrackID(trackId)
    }

    const handleSearch = () => {
        getSearchedData();
    }

    
    const toggleSellerBox = () => {
        setIsSellerBox(!isSellerBox)
    }

    async function getSearchedData () {
        const params = new URLSearchParams({
            id: selectOrderId,
            trackId: selectTrackID,
            status: selectStatus,
            orderDataFrom: selectOrderDataStart,
            orderDataTo: selectOrderDataEnd,})
        try {
            const response =await fetch (`${url}?${params.toString()}`,{
                method: 'GET',
            })
            if (!response.ok){
                const errorText = await response.json()
                throw new Error(errorText)
            }
            return response.json()
        } catch(error){
            console.log(error)
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
            <input className='input-public' placeholder='Трекномер' value={selectTrackID} onChange={handleSelectTrackID}></input>
        <div className='input-public-mod'><div className='div-input-mod'>C:</div> <input className='input-public' style={{height: '15px', width:'185px' }} type='date' value={selectOrderDataStart} onChange={handleOrderDataStart}></input></div>
        <div className='input-public-mod'><div className='div-input-mod'>По: </div><input className='input-public' style={{height: '15px', width:'185px'}} type='date' value={selectOrderDataEnd} onChange={handleOrderDataEnd}></input></div>
        <br/>
        </div><br/>
        <button className='button' onClick={handleSearch}>Поиск</button>
        </div>
        <button className={`button button-table`} onClick={toggleSellerBox}>
                {!isSellerBox ? ("К таблице"):("К списку")}</button>
        <div className='SellerPage'>
            <div className={isSellerBox ? 'SellerBox' : 'SellerCollumn'}>
                {sellerData.length > 0 ? (sellerData.map((item, index) => (
               <><SellerItem key={index} item = {item} dataset={dataset}/></>
            ))): (<p>нет заказов</p>)}
            {4>sellerData.length>0 && (<><div className='empty'></div></>)}
            </div>
        </div><br/>
        </>
    );
}

export default SellerPage;