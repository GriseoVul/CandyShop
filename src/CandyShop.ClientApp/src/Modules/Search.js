import React, {useContext, useEffect, useState}from 'react';
import { Link } from 'react-router-dom';
import { MyContext, isUrl } from './MyContext';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const url2 = `${isUrl}/Category`

    const { basketItems, filteredData, setFilteredData, allData} = useContext(MyContext);
    const [searchQuery, setSearchQuery] = useState('')
    const [itemCategories, setItemCategories] = useState([])
    const [selectCategory, setSelectCategory] = useState('')

    const navigateToSearchPage = useNavigate();

    const handlesearchInputChange = (e) => {
        setSearchQuery(e.target.value)
    }

    const handleCategoryChange = (e) => {
        setSelectCategory(e.target.value)
    }

    async function getCategorys(){
        try{
            const response = await fetch(url2,{
                method: 'GET',
            })
            if (!response.ok){
                const errorText = await response.json();
                throw new Error(errorText.error || `${response.status}`)
            }
            return response.json();
        } catch (error){
            throw new Error(error.massage)
        }
    }

    // useEffect(() => {
    //     const applyFilters = () => {
    //         let filteredItems = allData;
    //          if (searchQuery.trim() !== '') {
    //             filteredItems = filteredItems.filter(item => 
    //                                                         item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    //          }
    //          if (selectCategory !== ''){
    //             filteredItems = filteredItems.filter(item => 
    //                                                         item.category === selectCategory)
    //          }
    //          setFilteredData(filteredItems)
    //     }
    //     applyFilters()
    // },[allData, searchQuery, selectCategory, setFilteredData])

    useEffect(()=>{
        const fetchCategory = async() => {
            try{
                const data = await getCategorys();
                setItemCategories(data)
            } catch (error){
                console.log(error);
            }
        }
        fetchCategory();
    }, [allData, filteredData, setFilteredData]);

    const handleSearch = () => {
       // Применяем фильтрацию по текущим значениям полей
       setFilteredData(prevData => {
        let filteredItems = allData;

        if (searchQuery.trim() !== '') {
            filteredItems = filteredItems.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectCategory !== '') {
            filteredItems = filteredItems.filter(item =>
                item.category === selectCategory
            );
        }

        return filteredItems;
    });
};

const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
};

const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        // Предотвращаем раскрытие списка при нажатии Enter
        e.preventDefault();
    }
};

    return (
        <div className='SearchBox'>
            <div className='Search'>
    <input
    type="text"
    class="search-input"
    placeholder="Найти товар"
    value={searchQuery}
    onChange={handlesearchInputChange}
    onKeyPress={handleKeyPress}></input>
    <select className={`input-public ${selectCategory === '' ? 'select-placeholder' : ''}`} style={{width: '212px' }} type='text' name='category' placeholder="Категория" value={selectCategory} onChange={handleCategoryChange}onKeyPress={handleKeyPress} onKeyDown={handleKeyDown}>
                <option value='' disabled style={{ color: '#8e8e8e' }}>Категории</option>
                <option value=''></option>
                {itemCategories.map((item, index)=>(
                    <option key={index} value={item.name} style={{ color: '#000' }}>{item.name}</option>
                ))}</select>
    <button className="button" onClick={handleSearch}>НАЙТИ</button>
        </div>
        </div>
    );
}

export default Search;
