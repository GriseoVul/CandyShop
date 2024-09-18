import React , {useEffect, useState,useContext} from 'react';
import { MyContext } from './MyContext';
import Candy from './Candy';
import ResponsivePagination from 'react-responsive-pagination'
import ProductCard from './ProductCard';
import { getCandysData } from './FetchFunctions';
import { getProductUrlApi } from './urlAPIs';

const Candys = ({data}) => {
    const {filteredData, setFilteredData, setAllData, allData, basketItems} = useContext(MyContext);
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(12) //Количкество товаров на странице

    useEffect(() => {
        // Убедитесь, что Candys отражает изменения в basketItems
        const updatedItems = allData.map(item => {
          const foundInBasket = basketItems.find(basketItem => basketItem.id === item.id);
          return foundInBasket ? { ...item, count: foundInBasket.count } : item;
        });
        setFilteredData(updatedItems);
      }, [basketItems, allData]);

    useEffect(()=> {
        const fetchData = async() => {
            try{
                const data = await getCandysData(getProductUrlApi);
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
    }, [])

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
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)

    return (
        <>
        <div className='CandysBox'>
            <div className='Candys'>
                {/* {currentItems.length > 0 ? (currentItems.map((candy, index) => (
                <Candy key={index} item={candy} />
                ))): filteredData.length == 0 ?(<p>Ничего не найдено :(</p>):(<p>Загрузка...</p>)} */}
                {currentItems.length > 0 ? (currentItems.map((item) => (
                <ProductCard key={item.id} item={item} />
                ))): filteredData.length == 0 ?(<p>Ничего не найдено :(</p>):(<p>Загрузка...</p>)}
           {4>currentItems.length >0 && (
            <>         
             <div className="empty-block" ></div>       
             <div className="empty-block" ></div>
             <div className="empty-block" ></div>
             </>
            )}
            </div> 
        </div>
        <div className='paginationBox'>
        { filteredData.length > itemsPerPage && (<ResponsivePagination 
            current={currentPage}
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
