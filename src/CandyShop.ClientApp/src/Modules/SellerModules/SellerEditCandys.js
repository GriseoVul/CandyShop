import React , {useEffect, useState, useContext} from 'react';
import Candys from '../GeneralModules/Candys';
import ProductCard from '../GeneralModules/ProductCard';
import Search from '../GeneralModules/Search';
import { isUrl } from '../GeneralModules/MyContext';
import { MyContext } from '../GeneralModules/MyContext';
import Toast, {swalWithBootstrapButtons} from '../GeneralModules/Toast';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { putOrderUrlApi } from '../GeneralModules/urlAPIs';


const url = `${isUrl}/Order/PUT`  //https://fakestoreapi.com/products   ${isUrl}/Order/PUT

const SellerEditCandys = () => {
    const { basketItems, setBasketItems,editOrderId, removeFromBasket, setFilteredData, allData, setAllData} = useContext(MyContext);
    const [basketTotal, setBasketTotal] = useState(0);
    const [searchQuery, setSearchQuery] = useState('')

    const navigateToSeller = useNavigate();

    const handlesearchInputChange = (e) => {
      setSearchQuery(e.target.value)
  }

  useEffect(() => {
      if (searchQuery.trim() !== ''){
          //фильтрация данных 
          const filteredItems = allData.filter(item =>
              item.name.toLowerCase().includes(searchQuery.toString().toLowerCase()))
              setFilteredData(filteredItems)
      } else {
          setFilteredData(allData)
      }
  },[allData, searchQuery])

    useEffect(() =>{
      const total = basketItems.reduce((sum, item)=> sum += item.totalPrice*item.count , 0)
      setBasketTotal(total);
    },[basketItems,removeFromBasket,setBasketItems])

    const acceptEditing = async () => {
      Toast(0,'Сохранение...', true)
      try {
        const response = await fetch(`${putOrderUrlApi}${editOrderId}`,{
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ ...basketItems})
        })
        if (!response.ok){
          throw new Error(`Error ${response.statusText}`)
        } else {
          Toast('success', 'Успешно!')
          navigateToSeller('/Seller')
        }
      } catch (error){
        Toast('error', 'Не удалось изменить.')
      }
    }

    const confirmEditing = () => {
      swalWithBootstrapButtons.fire({
        title: "Сохранить изменения?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Да",
        cancelButtonText: "Нет",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            acceptEditing();
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          return;
        }
      });
    }

    const cancelEdit = () => {
      setBasketItems([]);
      navigateToSeller('/Seller');
    };

    const confirmCancelEdit = () => {
      swalWithBootstrapButtons.fire({
        title: "Отменить изменения?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Да",
        cancelButtonText: "Нет",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          cancelEdit();
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          return;
        }
      });
    }
    
    return (
        <>
        <h3 style={{textAlign: 'center', marginTop: '20px'}}>В заказе</h3>
            <div className='CandysBox'>
      {basketItems.length === 0 ? (
        <p style={{marginBottom: '100px', marginTop: '100px'}}>Корзина пуста</p>
      ) : (
       <div className='Candys'>
          {basketItems.map((item) => (
           <div className='Candy'> <ProductCard
            key={item.id}
            item={item}
            /> </div>
          ))}
              {4>basketItems.length >0 && (
            <>         
             <div className="empty-block" ></div>       
             <div className="empty-block" ></div>
             <div className="empty-block" ></div>
             </>
        )}
        </div>
      )}
    </div>
    <div className='order-order'>
    <h2 style={{textAlign: 'center', marginBottom: '20px'}}>Итого: {basketTotal} ₽ </h2>
      <button className='button' onClick={confirmEditing}>Изменить</button>
      <button className='button' onClick={confirmCancelEdit}>Назад</button>
    </div>   
    <h3 style={{textAlign: 'center', marginTop: '40px'}}>Добавить в заказ</h3>
    <Search/>
    <Candys/>
        </>
    );
}

export default SellerEditCandys;
