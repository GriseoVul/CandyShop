import React, {useState, useEffect} from 'react';
import SellerItem from './SellerItem';


const SellerPage = () => {
    const url= `kakoito link`
    const [sellerData, setSellerData] = useState('');
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
        <div>фильтр
            <input placeholder='Номер заказа'></input>
            <input placeholder='статус'></input>
            <input placeholder='дата'></input>
            <input placeholder='трекномер'></input>
            <button className='button'>поиск</button>
        </div>
        <div className='SellerPage'>
            {/* {sellerData.map((item, index) => (
                <SellerItem key={index} item = {item}/>
            ))
            } */}
            <div className='SellerBox'>
            <SellerItem/>
            </div>
        </div>
        </>
    );
}

export default SellerPage;