import React, { useContext, useState, useEffect } from 'react';
import { MyContext } from './MyContext';
import ProductCard from './ProductCard';
import Swal from 'sweetalert2';

const Basket = () => {
  const { basketItems, setBasketItems, removeFromBasket} = useContext(MyContext);
  const [basketTotal, setBasketTotal] = useState(0);
  const url = `https://gdw3fstj-5063.euw.devtunnels.ms/api/Order/create`
  useEffect(() => {
    const total = basketItems.reduce((sum, item)=> sum += item.totalprice , 0)
    setBasketTotal(total);
  }, [basketItems, setBasketItems,removeFromBasket])

  async function postBasket(order){
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(order)
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json()
      Swal.fire('Заказ успешно создан!');
      return data
    } catch (error) {
      Swal.fire('Ошибка');
    }
  };

  const showOrderConfirm = () => {
    Swal.fire({
      title: 'Введите ваши данные',
      html: `
        <input type="text" id="swal-input1" class="swal2-input" placeholder="Имя">
        <input type="tel" id="swal-input2" class="swal2-input" placeholder="Телефон">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const name = document.getElementById('swal-input1').value;
        const phone = document.getElementById('swal-input2').value;

        if (!name || !phone) {
          Swal.showValidationMessage('Пожалуйста, заполните все поля');
        } else {
          return { name: name, phone: phone };
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { name, phone } = result.value;
        const order = {
          phoneNumber: phone,
          userName: name,
          products: basketItems,
        };
        Swal.fire({
          title: 'Создание заказа...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        }); 
      postBasket(order)
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

