import React, { useContext } from 'react';
import { MyContext } from './MyContext';
import ProductCard from './ProductCard';
import Swal from 'sweetalert2';

const Basket = () => {
  const { basketItems, setBasketItems } = useContext(MyContext);
  

  const removeItemFromBasket = (itemToRemove) => {
    setBasketItems(basketItems.filter(item => item.id !== itemToRemove.id));
  };

  const showEditQuantityAlert = (item) => {
    let quantity = item.quantity;
    let totalprice = item.totalprice;
    let saleprice = item.price-item.price/100*item.sale


    Swal.fire({
      title: item.name,
      html: `
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 500px; margin: auto;">
          <img src="${item.pic}" alt="image" style="width: 100%; max-width: 300px; height: auto; border-radius: 10px;">
          <p style="text-align: center; margin: 10px 0;">${item.description}</p>
          <p id="price" style="text-align: center; font-size: 1.2em; font-weight: bold;">₽${item.price}</p>
          <p id="sale-price" style="text-align: center; font-size: 1.2em; font-weight: bold;">₽${saleprice}</p>
          <p id="total-price" style="text-align: center; font-size: 1em;">Всего ₽${item.totalprice}</p>
          <div style="display: flex; justify-content: center; align-items: center; margin-top: 20px; width: 100%;">
            <button id="decrease" style="cursor: pointer; padding: 6px 12px; background: #b80000; color: white; border: none; border-radius: 4px; margin: 0 10px;">-</button>
            <input id="quantity" type="number" value="${item.quantity}" min="1" max="999" style="width: 60px; text-align: center; margin: 0 10px; padding: 6px; border: 1px solid #ccc; border-radius: 4px;">
            <button id="increase" style="cursor: pointer; padding: 6px 12px; background: #b80000; color: white; border: none; border-radius: 4px; margin: 0 10px;">+</button>
          </div>
          <button className="button" id="update" style="cursor: pointer; margin-top: 20px; padding: 10px 20px; background: #b80000; color: white; border: none; border-radius: 4px; transition: background-color 0.3s ease, color 0.3s ease;">Обновить</button>
        </div>
      `,
      showConfirmButton: false,
      didOpen: () => {
        const quantityInput = document.getElementById('quantity');
        const totalPriceElement = document.getElementById('total-price');
        const saleP = document.getElementById('sale-price')
        const priceP = document.getElementById('price')

        if (item.sale === 0){
          saleP.style = "display: none"
        } else {
          priceP.style = "text-decoration: line-through"
          Object.assign(saleP.style, {
            color: 'red',
            fontSize: "1.5em",
            margin: '5px'
          })
        }

        const updateTotalPrice = () => {
          if (item.sale > 0){
            totalprice= quantity*saleprice;
            } else totalprice= quantity*item.price;
            totalPriceElement.textContent=`Всего ₽${totalprice}`;
        };

        document.getElementById('increase').addEventListener('click', () => {
          let currentValue = parseInt(quantityInput.value);
          if (currentValue < 999) {
            quantityInput.value = currentValue + 1;
            quantity = quantityInput.value;
            updateTotalPrice();
          }
        });

        document.getElementById('decrease').addEventListener('click', () => {
          if (parseInt(quantityInput.value) > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
            quantity = quantityInput.value;
            updateTotalPrice();
          }
        });

        quantityInput.addEventListener('input', () => {
          if (quantityInput.value < 1) {
            quantityInput.value = 1;
          } else if (quantityInput.value > 999) {
            quantityInput.value = 999;
          }
          quantity = quantityInput.value;
          updateTotalPrice();
        });

        document.getElementById('update').addEventListener('click', () => {
          const updatedItem = { ...item, quantity: parseInt(quantityInput.value), totalprice };

          setBasketItems(basketItems.map(basketItem => 
            basketItem.id === item.id ? updatedItem : basketItem
          ));

          Swal.fire(`Обновлено`);
        });
      }
    });
  };

  return (
    <>
    <h2 style={{textAlign: 'center', marginTop: "45px"}}>Корзина</h2>
    <div className='CandysBox'>
      {basketItems.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <div className='CandysBasket'>
          {basketItems.map((item) => (
            <ProductCard
              key={item.id} // Используем уникальный идентификатор вместо индекса
              item={item}
              onButtonClick={() => showEditQuantityAlert(item)}
              onRemoveClick={() => removeItemFromBasket(item)}
              buttonText="Изменить"
              showQuantity={true}
              basket={true}
            />
          ))}
        </div>
      )}
    </div>
         <h2 style={{textAlign: 'center', marginBottom: '60px'}}>Итого `summ` </h2>
         </>
  );
};

export default Basket;

