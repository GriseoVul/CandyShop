import Toast from "./Toast";
import Swal from 'sweetalert2';

//  Функции для API

//Получение категорий
export async function getCategorys(urlAPI) {
    try {
        const response = await fetch(urlAPI, {method: 'GET'})
        if (!response.ok) {
            const errorText = await response.json();
            throw new Error(errorText.error || `${response.status}`)
        }
        return response.json();
    } catch (error) {
        throw new Error(error.massage)
    }
}

//Получение товаров
export async function getCandysData(urlAPI) {
    try {
        const response = await fetch(urlAPI, {method: "GET"})
        if (!response.ok) {
            const errorText = await response.json();
            throw new Error(errorText.error || `${response.status}`);
        }
        return response.json();
    } catch (error) {
        throw new Error(error.message)
    }
}

//Создание
export async function createItem(urlAPI, data, customHeader=null) {
    Toast(0, 'Создание...', true)
    try {
        const headers = customHeader || {}
        const response = await fetch(urlAPI, {
            method: 'POST',
            headers: headers,
            body: data
        })
        if (!response.ok) {
            throw new Error(`Error ${response.statusText}`)
        }
        Toast('success', 'Успешно')
        return true
    } catch (error) {
        Toast("error", 'Не удалось создать')
        return false
    }
}

//Обновление
export async function updateItem(urlAPI, data,customHeader=null) {
    Toast(0, 'Изменение...', true)
    const headers = customHeader || {}
    try {
        const response = await fetch(urlAPI, {
            method: 'PUT',
            headers: headers,
            body: data
        })
        if (!response.ok) {
            throw new Error(`Error ${response.statusText}`)
        }
        Toast('success', 'Успешно')
        // window.location.reload();
        return true
    } catch (error) {
        Toast("error", 'Не удалось изменить')
        return false
    }
}

//Заказ в корзине
export async function createNewOrder(urlAPI, data,customHeader=null){
    try {
        const headers = customHeader || {}
        const response = await fetch(urlAPI, {
            method: 'POST',
            headers: headers,
        // headers: {
        //   'Content-Type': "application/json",
        // },
            body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      Swal.fire('Заказ успешно создан!');
      return true
    } catch (error) {
      Swal.fire('Ошибка');
      return false
    }
  };