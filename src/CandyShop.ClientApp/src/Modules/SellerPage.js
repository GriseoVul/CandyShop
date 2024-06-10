import React, {useState, useEffect} from 'react';
import SellerItem from './SellerItem';


const SellerPage = () => {
    const url= `kakoito link`
    const [isSellerBox, setIsSellerBox] = useState(false)
    const [sellerData, setSellerData] = useState('');
    const toggleSellerBox = () => {
        setIsSellerBox(!isSellerBox)
    }
    async function fetchSellerItems(){
        try {
            const responce = await fetch(url,{
                method: 'GET', 
            })
            if (!responce.ok){
                const errorText = await responce.json();
                throw new Error(errorText.error || `${responce.status}`)
            }
            return setSellerData(responce.json());
        } catch (error) {
            console.error(error);
            throw new Error(error.message)
        }
    }
    return (
        <>
        <div>фильтр <br/>
            <input className='input-public' placeholder='Номер заказа'></input>
            <input className='input-public' placeholder='статус'></input>
            <input className='input-public' placeholder='дата'></input>
            <input className='input-public' placeholder='трекномер'></input>
            <button className='button'>поиск</button>
        </div>
        <button className='button' onClick={toggleSellerBox}>
                {!isSellerBox ? ("К таблице"):("К списку")}</button>
        <div className='SellerPage'>
            {/* {sellerData.map((item, index) => (
                <SellerItem key={index} item = {item}/>
            ))
            } */}
            <div className={isSellerBox ? 'SellerBox' : 'SellerBoxV2'}>
            <SellerItem/>             <SellerItem/>             <SellerItem/>            <SellerItem/>
            </div>
        </div>
        </>
    );
}

export default SellerPage;