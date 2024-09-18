import React from 'react';

const Sale = ({item}) => {
    return (
        <div className='SaleBox'>
            <span>Скидка!</span><br/><div className='Sale'><span>-{item}</span><IconTicketPercent/></div>
        </div>
    );
}

export default Sale;

function IconTicketPercent(props) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height="20px"
        width="20px"
        {...props}
      >
        <path d="M4 4a2 2 0 00-2 2v4a2 2 0 012 2 2 2 0 01-2 2v4a2 2 0 002 2h16a2 2 0 002-2v-4a2 2 0 01-2-2 2 2 0 012-2V6a2 2 0 00-2-2H4m11.5 3L17 8.5 8.5 17 7 15.5 15.5 7m-6.69.04c.98 0 1.77.79 1.77 1.77a1.77 1.77 0 01-1.77 1.77c-.98 0-1.77-.79-1.77-1.77a1.77 1.77 0 011.77-1.77m6.38 6.38c.98 0 1.77.79 1.77 1.77a1.77 1.77 0 01-1.77 1.77c-.98 0-1.77-.79-1.77-1.77a1.77 1.77 0 011.77-1.77z" />
      </svg>
    );
  }