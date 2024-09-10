import React,{ useState,useEffect} from 'react';
import { isUrl } from './MyContext';
import AddedItemForm from './AddedItemForm';

const AdminItem = ({item, toggleState, onToggle}) => {
const url = `${isUrl}/Image`

const toggleMore = toggleState?.toggleMore || false;
const toggleEdit = toggleState?.toggleEdit || false;

    return (
        <>
        <div className='ItemListItem'>
        <span>{item.name}</span><span>{item.category}</span>
        <div className='boxIconBox'>
        <div className='iconBox' onClick={() => onToggle('toggleMore')}>{!toggleMore ? (<IconArrowDownDropCircle/>): (<IconArrowUpDropCircle/>)}</div>
        <div className='iconBox' onClick={() => onToggle('toggleEdit')}><IconLeadPencil/></div>
        </div>
        </div>
        {toggleMore ? (     
            <div className='aboutBox'>
            <div className='imageBox'>
            <img src={`${url}${item.imageNames}`} loading="lazy" alt={item.name}/>
            </div>   
            <div className='about'>
            <br/><span className='boldText'>ID: </span><span>{item.id}</span><br/>
            <span className='boldText' >Описание: </span><span>{item.description}</span><br/>
            <span className='boldText'>Цена: </span><span>{item.price}₽</span><br/>
            <span className='boldText'>Скидка: </span><span>{item.discount}%</span><br/>
            <span className='boldText'>Итоговая цена: </span><span>{item.totalPrice}₽</span><br/>
            <span className='boldText'>Единицы измерения: </span><span>{item.units}</span>
            <br/><br/>
        </div></div>):(<></>)}
        {toggleEdit ? (<AddedItemForm item={item} edit={true}/>):(<></>)}
        </>
    );
}

export default AdminItem;

function IconArrowUpDropCircle(props) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height="30px"
        width="30px"
        {...props}
      >
        <path d="M12 22A10 10 0 012 12 10 10 0 0112 2a10 10 0 0110 10 10 10 0 01-10 10m5-8l-5-5-5 5h10z" />
      </svg>
    );
  }
  
  function IconArrowDownDropCircle(props) {
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          height="30px"
          width="30px"
          {...props}
        >
          <path d="M12 2a10 10 0 0110 10 10 10 0 01-10 10A10 10 0 012 12 10 10 0 0112 2m-5 8l5 5 5-5H7z" />
        </svg>
      );
    }
  
  function IconLeadPencil(props) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height="30px"
        width="30px"
        {...props}
      >
        <path d="M16.84 2.73c-.39 0-.77.15-1.07.44l-2.12 2.12 5.3 5.31 2.12-2.1c.6-.61.6-1.56 0-2.14L17.9 3.17c-.3-.29-.68-.44-1.06-.44M12.94 6l-8.1 8.11 2.56.28.18 2.29 2.28.17.29 2.56 8.1-8.11m-14 3.74L2.5 21.73l6.7-1.79-.24-2.16-2.31-.17-.18-2.32" />
      </svg>
    );
  }

