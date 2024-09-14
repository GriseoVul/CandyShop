import React, { useState,useEffect, useContext} from 'react';
import { MyContext, isUrl } from './MyContext';
import Search from './Search';
import AdminItem from './AdminItem';
import ResponsivePagination from 'react-responsive-pagination'

const AdminItemList = () => {
    const url = `${isUrl}/Product` 
    const [items, setItems] = useState('')
    const {filteredData, setFilteredData,setAllData} = useContext(MyContext);
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(12) //Количкество товаров на странице

    const [toggleStates, setToggleStates] = useState({});

    useEffect(()=>{
        const fetchData= async ()=>{
            try{
                const data = await getCandysData();
                setAllData(data)
                setFilteredData(data)
            } catch(error){
                console.log(error);
            }
        }
        fetchData()
        console.log(items);
    },[])

    const handleToggle = (id, type) => {
        setToggleStates(prevState => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                [type]: !prevState[id]?.[type],
            },
        }));
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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)

    const handleScrollToTop = () => { // перемотка к началу страницы
        window.scrollTo({
            top: 110,
            behavior: 'smooth'
        });
    };

    return (
        <>
        <h2 align={'center'}>Товары</h2>
        <Search/>
        <div className='ItemListBox'>
            <div className='ItemList'>
            <div  className='ItemListItem'>
            <span><h3>Название</h3></span><span><h3>Категория</h3></span> <div className='boxIconBox'></div>
            </div>
            {currentItems.length>0 && (currentItems.map((item, index)=>(
                <AdminItem key={index} item={item} toggleState={toggleStates[item.id]}
                            onToggle={(type) => handleToggle(item.id, type)}/>
    )))}
            </div>
        </div>
        <br/><br/>
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

export default AdminItemList;


