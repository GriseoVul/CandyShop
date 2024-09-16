import Toast from "./Toast";

//  Функции для API

//Получение категорий
export async function getCategorys(urlAPI){
    try{
        const response = await fetch(urlAPI,{
            method: 'GET',
        })
        if (!response.ok){
            const errorText = await response.json();
            throw new Error(errorText.error || `${response.status}`)
        }
        return response.json();
    } catch (error){
        throw new Error(error.massage)
    }
}

//Получение товаров
export async function getCandysData(urlAPI){
    try {
        const response = await fetch(urlAPI, {
            method: "GET",
        })
        if (!response.ok){
            const errorText = await response.json();
            throw new Error(errorText.error || `${response.status}`);
        }
        return response.json();
    } catch(error){
        throw new Error(error.message)
    }
}

//Создание
export async function createItem(urlAPI,data){
    Toast(0,'Создание...',true)
    try {
        const response = await fetch(urlAPI, {
            method: 'POST',
            body: data
        })
        if (!response.ok){
            throw new Error (`Error ${response.statusText}`)
        }
        Toast('success', 'Успешно')
          return true
    } catch (error){
        Toast("error", 'Не удалось создать')
          return false
    }
}

//Обновление товара
export async function updateItem(urlAPI,data){
    Toast(0,'Изменение...',true)
    try {
        const response = await fetch(urlAPI, {
            method: 'PUT',
            body: data
        })
        if (!response.ok){
            throw new Error (`Error ${response.statusText}`)
        }
        Toast('success', 'Успешно')
        // window.location.reload();
          return true
    } catch (error){
        Toast("error", 'Не удалось изменить')
          return false
    }
}