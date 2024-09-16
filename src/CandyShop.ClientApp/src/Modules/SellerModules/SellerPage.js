import React, {useState, useEffect} from 'react';
import SellerItem from './SellerItem';
import { isUrl } from '../GeneralModules/MyContext';
import { getCandysData } from '../GeneralModules/FetchFunctions';

const SellerPage = () => {
    const url= `${isUrl}/Order`
    const url2 = `${isUrl}/Product`

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
            getCandysData(url2).then(setdataset).catch(console.error);
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
    
    return (
        <>
        <div className='SearchBox'>
        <h3 style={{textAlign:'center'}}>Фильтр<IconFilter/></h3><br/>
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
        <button className='SearchButton' onClick={handleSearch}><div>поиск</div><IconMagnify/></button>
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

function IconFilter(props) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height="1em"
        width="1em"
        {...props}
      >
        <path d="M14 12v7.88c.04.3-.06.62-.29.83a.996.996 0 01-1.41 0l-2.01-2.01a.989.989 0 01-.29-.83V12h-.03L4.21 4.62a1 1 0 01.17-1.4c.19-.14.4-.22.62-.22h14c.22 0 .43.08.62.22a1 1 0 01.17 1.4L14.03 12H14z" />
      </svg>
    );
  }

  function IconMagnify(props) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height="24px"
        width="24px"
        {...props}
      >
        <path d="M9.5 3A6.5 6.5 0 0116 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 019.5 16 6.5 6.5 0 013 9.5 6.5 6.5 0 019.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5z" />
      </svg>
    );
  }