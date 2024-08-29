import React , {useEffect, useState} from 'react';
import Candy from './Candy';
import ResponsivePagination from 'react-responsive-pagination'
import { dropEllipsis } from 'react-responsive-pagination/narrowBehaviour';
import { isUrl } from './MyContext';

const Candys = () => {
    const url = `${isUrl}/Product` //api/Product //${isUrl}/Product
    const [candysItem, setCandysItem] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(12) //Количкество товаров на странице


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

    const handleScrollToTop = () => { // перемотка к началу страницы
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

    // пагинатор
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = candysItem.slice(indexOfFirstItem, indexOfLastItem)

    return (
        <>
        <div className='CandysBox'>
        <div className='Candys'>
   {currentItems.length > 0 ? (currentItems.map((candy, index) => (
       <Candy key={index} item={candy} />
   ))): <p>Загрузка...</p>}
   {/* {candysItem.length>0 && <button className={`scroll-to-top button`} style={{opacity: "50%"}} onClick={handleScrollToTop}>Вверх</button>} */}
        </div> 
        </div>
        <div className='paginationBox'>
        <ResponsivePagination 
            current={currentPage}
            total={Math.ceil(candysItem.length / itemsPerPage)}
            onPageChange={page => {
                setCurrentPage(page);
                handleScrollToTop();
                }
            }
         
        />
        </div><br/><br/>
        </>
    );
}

export default Candys;
