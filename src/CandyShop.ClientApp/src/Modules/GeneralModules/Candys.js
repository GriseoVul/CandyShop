import React , {useEffect, useState,useContext} from 'react';
import { MyContext } from './MyContext';
import Candy from './Candy';
import ResponsivePagination from 'react-responsive-pagination'
import { isUrl } from './MyContext';
import { getCandysData } from './FetchFunctions';

const Candys = () => {
    const url = `${isUrl}/Product` //api/Product //${isUrl}/Product
    const { basketItems, filteredData, setFilteredData, allData,setAllData} = useContext(MyContext);
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(12) //Количкество товаров на странице


    useEffect(()=> {
        const fetchData = async() => {
            try{
                const data = await getCandysData(url);
                if (!filteredData.length){
                    setFilteredData(data);
                }
                setAllData(data)
                return data;
            } 
            catch (error){
                console.log(error)
            }
        }
        fetchData()
    }, [setFilteredData, setAllData])

    useEffect(()=> {
        setCurrentPage(1)
    },[filteredData, setFilteredData])

    const handleScrollToTop = () => { // перемотка к началу страницы
        window.scrollTo({
            top: 110,
            behavior: 'smooth'
        });
    };

    // пагинатор
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = candysItem.slice(indexOfFirstItem, indexOfLastItem)
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)

    return (
        <>
        <div className='CandysBox'>
        <div className='Candys'>
   {currentItems.length > 0 ? (currentItems.map((candy, index) => (
       <Candy key={index} item={candy} />
   ))): filteredData.length == 0 ?(<p>Ничего не найдено :(</p>):(<p>Загрузка...</p>)}
           {4>currentItems.length >0 && (
            <>         
             <div className="empty-block" ></div>       
             <div className="empty-block" ></div>
             <div className="empty-block" ></div>
             </>
        )}
   {/* {candysItem.length>0 && <button className={`scroll-to-top button`} style={{opacity: "50%"}} onClick={handleScrollToTop}>Вверх</button>} */}
        </div> 
        </div>
        <div className='paginationBox'>
        { filteredData.length > itemsPerPage && (<ResponsivePagination 
            current={currentPage}
            // total={Math.ceil(candysItem.length / itemsPerPage)}
            total={Math.ceil(filteredData.length / itemsPerPage)}
            onPageChange={page => {
                setCurrentPage(page);
                handleScrollToTop();
                }
            }
        />)}
        </div><br/><br/>
        </>
    );
}

export default Candys;
