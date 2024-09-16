import React from 'react';
import Candys from '../GeneralModules/Candys';
import { useState, useEffect, useContext } from 'react';
import { MyContext, isUrl } from '../GeneralModules/MyContext';

const SearchResultPage = () => {
    const url2 = `${isUrl}/Category`

    const { basketItems, filteredData, setFilteredData, allData} = useContext(MyContext);

    return (
        <div>
            <h3 style={{textAlign: 'center', marginTop: '40px'}}>Результаты поиска</h3>
            {/* <select className="input-public"style={{width: '337px' }} type='text' name='category'placeholder="Категория" value={selectCategory} onChange={handleCategoryChange}>
                <option value=''></option>
                {itemCategories.map((item, index)=>(
                    <option key={index} value={item.name}>{item.name}</option>
                ))}</select> */}
            {filteredData.length !== 0 ?
            (<Candys/>): (<p style={{textAlign: 'center', margin: '180px 40px'}}>Ничего не найдено!</p>)}
        </div>
    );
}

export default SearchResultPage;
