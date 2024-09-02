import React from 'react';
import Candys from './Candys';
import { useState, useEffect, useContext } from 'react';
import { MyContext } from './MyContext';

const SearchResultPage = () => {
    const { basketItems, filteredData, setFilteredData, allData} = useContext(MyContext);
    useEffect(()=>{

    }, [allData, filteredData, setFilteredData]);
    return (
        <div>
            <h3 style={{textAlign: 'center', marginTop: '40px'}}>Результаты поиска</h3>
            {filteredData.length !== 0 ?
            (<Candys/>): (<p style={{textAlign: 'center', margin: '180px 40px'}}>Ничего не найдено!</p>)}
        </div>
    );
}

export default SearchResultPage;
