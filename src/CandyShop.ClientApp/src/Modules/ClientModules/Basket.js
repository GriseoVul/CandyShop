import React, { useContext, useState, useEffect } from 'react';
import { MyContext } from '../GeneralModules/MyContext';
import ProductCard from '../GeneralModules/ProductCard';
import Swal from 'sweetalert2';
import { createNewOrder } from '../GeneralModules/FetchFunctions';
import { postOrderUrlApi } from '../GeneralModules/urlAPIs';
import Candys from '../GeneralModules/Candys';

const Basket = () => {
  const { basketItems, setBasketItems, removeFromBasket} = useContext(MyContext);
  const [basketTotal, setBasketTotal] = useState(0);
  useEffect(() => {
    const total = basketItems.reduce((sum, item)=> sum += item.totalPrice*item.count , 0)
    setBasketTotal(total);
  }, [basketItems, setBasketItems,removeFromBasket])

  const showOrderConfirm = () => {
    Swal.fire({
      title: 'Введите ваши данные',
      html: `
        <input type="text" id="swal-input1" class="swal2-input" style="margin: 0px" placeholder="Имя">
        <input type="tel" id="swal-input2" class="swal2-input" style="margin: 0px" inputmode="tel" placeholder="Телефон">
        <input type="text" id="swal-input3" class="swal2-input" style="margin: 0px" placeholder="Адрес">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const name = document.getElementById('swal-input1').value;
        const phone = document.getElementById('swal-input2').value;
        const customerAddress = document.getElementById('swal-input3').value;

        if (!name || !phone || !customerAddress) {
          Swal.showValidationMessage('Пожалуйста, заполните все поля');
        } else {
          return { name: name, phone: phone, customerAddress:customerAddress};
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { name, phone, customerAddress } = result.value;
        const order = {
         customerPhoneNumber: phone,
          customerName: name,
          customerAddress: customerAddress,
          products: basketItems,
        };
        Swal.fire({
          title: 'Создание заказа...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        }); 
        console.log(order);
      createNewOrder(postOrderUrlApi, order)
      .then(()=> {
        Swal.fire('Заказ успешно создан','','success')
        setBasketItems([])
    })
      .catch((error)=> {Swal.fire('Ошибка создания заказа',error.massage,'error')});
      }
    });
  };


  return (
    <>
    <h2 style={{textAlign: 'center', marginTop: "45px"}}>Корзина</h2>
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
    {basketItems.length > 0 && (<div className='order-order'>
            <h2 style={{textAlign: 'center', marginBottom: '20px'}}>Итого {basketTotal} </h2>
            <button className='button button-order' onClick={showOrderConfirm}>Оформить заказ</button>
            </div>)}
         </>
  );
};

export default Basket;

