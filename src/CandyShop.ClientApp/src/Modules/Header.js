import React, {useContext}from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from './MyContext';

const Header = () => {
    const { basketItems} = useContext(MyContext);
    return (
<header class="header">
        <div class="header-left">
            {/* <a href="#" class="logo">Наши Вкусняшки</a> */}
            <Link to ={'/'}>Наши Вкусняшки</Link>
        </div>
        <div class="header-center">
            <input type="text" class="search-input" placeholder="Найти товар"></input>
            <button class="search-button">НАЙТИ</button>
        </div>
        <div class="header-right">
            <Link to = {'/Seller'}>Seller</Link>
            {
                basketItems.length === 0 ? (<Link to={'/Busket'}>Корзина</Link>):(<Link to={'/Busket'}>Корзина({basketItems.length})</Link>)
            }
           
        </div>
    </header>
    );
}

export default Header;
