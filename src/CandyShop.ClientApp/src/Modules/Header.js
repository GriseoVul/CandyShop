import React, {useContext, useEffect, useState}from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from './MyContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { basketItems, filteredData, setFilteredData, allData} = useContext(MyContext);
    const [searchQuery, setSearchQuery] = useState('')

    const navigateToSearchPage = useNavigate();

    const handlesearchInputChange = (e) => {
        setSearchQuery(e.target.value)
    }

    useEffect(() => {
        // if (searchQuery.trim() !== ''){
        //     //фильтрация данных 
        //     const filteredItems = allData.filter(item =>
        //         item.name.toLowerCase().includes(searchQuery.toString().toLowerCase()))
        //         setFilteredData(filteredItems)
        // } else {
        //     setFilteredData(allData)
        // }
    },[allData, searchQuery])


    const handleSearch = () => {
        if (searchQuery.trim() !== ''){
            //фильтрация данных 
            const filteredItems = allData.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toString().toLowerCase()))
                setFilteredData(filteredItems)
        } else {
            setFilteredData(allData)
        }
        navigateToSearchPage('/Search')
    }

    const handleKeyPress = (e) => {
        if (e.key==='Enter'){
            handleSearch();
        }
    }

    return (
<header class="header">
        <div class="header-left">
            {/* <a href="#" class="logo">Наши Вкусняшки</a> */}
            <Link to ={'/'}>Наши Вкусняшки</Link>
        </div>
        <div class="header-center">
           {/* <input
    type="text"
    class="search-input"
    placeholder="Найти товар"
    value={searchQuery}
    onChange={handlesearchInputChange}
    onKeyPress={handleKeyPress}></input>
            <button className="search-button" onClick={handleSearch}>НАЙТИ</button> */}
        </div>
        <div class="header-right">
            <Link to = {'/Panel'}>Admin</Link>
            <Link to = {'/Seller'}>Seller</Link>
            {
                basketItems.length === 0 ? (<Link to={'/Busket'}>Корзина</Link>):(<Link to={'/Busket'}>Корзина({basketItems.length})</Link>)
            }   
        </div>
    </header>
    );
}

export default Header;
