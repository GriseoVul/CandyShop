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
    <button className='SearchButton' onClick={handleSearch}><div>Найти</div><IconMagnify/></button>
        </div>
        </div>
    );
}

export default Search;

function IconMagnify(props) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height="24px"
        width="24px"
        {...props}
      >
        <path d="M9.5 3A6.5 6.5 0 0116 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 019.5 16 6.5 6.5 0 013 9.5 6.5 6.5 0 019.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5z" />
      </svg>
    );
  }
