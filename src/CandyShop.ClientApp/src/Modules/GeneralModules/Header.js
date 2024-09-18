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
            {/* {
                basketItems.length === 0 ? (<><Link to={'/Busket'}>Корзина</Link><IconBasketFill/></>):(<Link to={'/Busket'}>Корзина({basketItems.length})</Link>)
            }  */}
              <div className='basketLinkBox'><div className='basketLink'>{basketItems.length > 0 && (<span className='basketLinkSpan'>{basketItems.length}</span>)}<Link to={'/Busket'}><IconBasketOutline/>Корзина</Link></div></div>
        </div>
    </header>
    );
}

export default Header;

function IconBasketOutline(props) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height="30px"
        width="30px"
        {...props}
      >
        <path d="M22 9h-4.79l-4.38-6.56a.997.997 0 00-1.66.01L6.79 9H2c-.55 0-1 .45-1 1 0 .09 0 .18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1M12 4.8L14.8 9H9.2L12 4.8M18.5 19h-13l-2.19-8H20.7l-2.2 8M12 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
      </svg>
    );
  }