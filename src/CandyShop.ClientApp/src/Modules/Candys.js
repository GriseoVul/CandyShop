import React , {useEffect, useState} from 'react';
import Candy from './Candy';
import Slider from './Slider';
import { isUrl } from './MyContext';

const Candys = () => {
    const url = `${isUrl}/Product` //api/Product //${isUrl}/Product
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

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    async function getCandysData(){
        try {
            const responce = await fetch(url, {
                method: "GET",
            })
            if (!responce.ok){
                const errorText = await responce.json();
                throw new Error(errorText);
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
   {candysItem.length > 0 ? (candysItem.map((candy, index) => (
       <Candy key={index} item={candy} />
   ))): <p>Загрузка...</p>}
   {candysItem.length>0 && <button className={`scroll-to-top button`} onClick={handleScrollToTop}>Вверх</button>}
        </div> 

        </div>
        </>
    );
}

export default Candys;
