import React,{ useState,useEffect} from 'react';
import AddedItemForm from './AddedItemForm';
import { getImageUrlApi } from '../GeneralModules/urlAPIs';


const AdminItem = ({item, toggleState, onToggle}) => {

const toggleMore = toggleState?.toggleMore || false;
const toggleEdit = toggleState?.toggleEdit || false;

    return (
        <>
        <div className='ItemListItem'>
        <span>{item.name}</span><span>{item.category}</span>
        <div className='boxIconBox'>
        <div className='iconBox' onClick={() => onToggle('toggleMore')}>{!toggleMore ? (<IconArrowDownDropCircle/>): (<IconArrowUpDropCircle/>)}</div>
        <div className='iconBox' onClick={() => onToggle('toggleEdit')}>{!toggleEdit ? (<IconPencilPlus/>): (<IconPencilMinus/>)}</div>
        </div>
        </div>
        {toggleMore ? (     
            <div className='aboutBox'>
            <div className='imageBox'>
            <img src={`${getImageUrlApi}/${item.imageNames}`} loading="lazy" alt={item.name}/>
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

  function IconPencilPlus(props) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height="30px"
        width="30px"
        {...props}
      >
        <path d="M20.7 7c.4-.4.4-1 0-1.4l-2.3-2.3c-.4-.4-1-.4-1.4 0l-1.8 1.8L19 8.9M3 17.2V21h3.8l11-11.1-3.7-3.8L3 17.2M7 2v3h3v2H7v3H5V7H2V5h3V2h2z" />
      </svg>
    );
  }

  function IconPencilMinus(props) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height="30px"
        width="30px"
        {...props}
      >
        <path d="M20.7 7c.4-.4.4-1 0-1.4l-2.3-2.3c-.4-.4-1-.4-1.4 0l-1.8 1.8L19 8.9M3 17.2V21h3.8l11-11.1-3.7-3.8L3 17.2M10 5v2H2V5h8z" />
      </svg>
    );
  }