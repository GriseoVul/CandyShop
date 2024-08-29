import React , {useEffect, useState, useContext} from 'react';
import Candy from './Candy';
import Candys from './Candys';
import ProductCard from './ProductCard';
import { isUrl } from './MyContext';
import { MyContext } from './MyContext';
import Toast, {swalWithBootstrapButtons} from './Toast';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const url = `${isUrl}/Order/PUT`  //https://fakestoreapi.com/products   ${isUrl}/Order/PUT

const SellerEditCandys = () => {
    const { basketItems, setBasketItems,editOrderId, copyState} = useContext(MyContext);
    const [basketTotal, setBasketTotal] = useState(0);

    const navigateToSeller = useNavigate();

    useEffect(() =>{
      const total = basketItems.reduce((sum, item)=> sum += item.totalPrice*item.count , 0)
      setBasketTotal(total);
    },[basketItems])

    const acceptEditing = async () => {
      Toast(0,'Сохранение...', true)
      try {
        const response = await fetch(`${url}/${editOrderId}`,{
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
      navigateToSeller('/Seller');  // Обратите внимание на правильное имя функции
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
        <><h3>В заказе</h3>
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
        </div>
      )}
    </div>
    <div className='order-order'>
    <h2 style={{textAlign: 'center', marginBottom: '20px'}}>Итого: {basketTotal} ₽ </h2>
      <button className='button' onClick={confirmEditing}>Изменить</button>
      <button className='button' onClick={confirmCancelEdit}>Назад</button>
    </div>

        <h3>Добавить в заказ</h3>
        <Candys />
        </>

    );
}

export default SellerEditCandys;
