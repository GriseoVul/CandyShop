import React from 'react';

const Sale = ({item}) => {
    return (
        <div className='SaleBox'>
            <span className='Sale'>Скидка!</span><br/><span>-{item}%</span>
        </div>
    );
}

export default Sale;
