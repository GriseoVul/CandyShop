import React, {useState, useEffect} from 'react';
import SellerItem from './SellerItem';
import { isUrl } from './MyContext';

const SellerPage = () => {
    const url= `${isUrl}/Order`
    const [isSellerBox, setIsSellerBox] = useState(false)
    const [sellerData, setSellerData] = useState([]);
    const [dataset, setdataset] = useState([])
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
                console.log('это все товары',data2)
                console.log('это заказ',data)
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
            <div className={isSellerBox ? 'SellerBox' : ''}>
            {sellerData.map((item, index) => (
                <SellerItem key={index} item = {item} dataset={dataset}/>
            ))
            }
            </div>
        </div>
        </>
    );
}

export default SellerPage;