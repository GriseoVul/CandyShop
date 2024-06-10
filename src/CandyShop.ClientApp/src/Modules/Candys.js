import React , {useEffect, useState} from 'react';
import Candy from './Candy';
import Slider from './Slider';

const Candys = () => {
    const url = `https://gdw3fstj-5063.euw.devtunnels.ms/api/Product`

    const [candysItem, setCandysItem] = useState([])
    useEffect(()=> {
        const fetchData = async() => {
            try{
                const data = await getCandysData();
                console.log(data)
                setCandysItem(data)
                return data;
            } 
            catch (error){
                console.log(error)
            }
        }
        fetchData()
    }, [])
    

    async function getCandysData(){
        try {
            const responce = await fetch(url, {
                method: "GET",
            })
            if (!responce.ok){
                const errorText = await responce.json();
                throw new Error(errorText)
            }
            const data = await responce.json();
            console.log("data getCandyData", data);
            return data
        } catch(error){
            console.log(error);
            throw new Error(error.message)
        }
    }
    return (
        <>
        <Slider />
        <div className='CandysBox'>
        <div className='Candys'>
   {candysItem.length > 0 ? candysItem.map((candy, index) => (
       <Candy key={index} item={candy} />
   )) : <p>Загрузка...</p>}
        </div>
        </div>
        </>
    );
}

export default Candys;

