import React , {useEffect, useState} from "react";
import { isUrl } from './MyContext';
import Toast from "./Toast";

const AddedItemForm = () => {
    // const url = `https://fakestoreapi.com/products`
    const url = `${isUrl}/Product/create`
    const url2 = `${isUrl}/Category`
    const [itemCategories, setItemCategories] = useState([])
    const [formData, setFormData] = useState({
        image: null,
        name: '',
        description: '',
        price: '',
        discount: '',
        units: '',
        availability: true,
        category:'',
    });

    useEffect(()=>{
        const fetchCategory = async() => {
            try{
                const data = await getCategorys();
                setItemCategories(data)
                console.log(itemCategories);
            } catch (error){
                console.log(error);
            }
        }
        fetchCategory();
    },[])

    async function getCategorys(){
        try{
            const response = await fetch(url2,{
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
    async function createProduct(data){
        Toast(0,'Создание...',true)
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: data
            })
            if (!response.ok){
                throw new Error (`Error ${response.statusText}`)
            }
            Toast('success', 'успешно')
              return true
        } catch (error){
            Toast("error", 'Не удалось создать')
              return false
        }
    }
 
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        let updatedValue;
        if (type === 'file') {
            // Если тип поля файл, то сохраняем первый выбранный файл
            updatedValue = files[0];
        } else if (type === 'number') {
            // Если тип поля число
            if (value === '') {
                // Если значение пустое, сохраняем пустую строку
                updatedValue = '';
            } else {
                // В противном случае преобразуем значение в число
                updatedValue = Number(value);
            }
        } else if (name === 'availability') {
            // Если имя поля - availability, преобразуем значение в boolean
            updatedValue = value === 'true';
        } else {
            // Для всех остальных типов полей сохраняем значение как есть
            updatedValue = value;
        }
        // Обновляем состояние с новыми значениями
        setFormData(prevState => ({
            ...prevState,
            [name]: updatedValue
        }));
    };
    

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!formData.name || !formData.image || !formData.description || !formData.price || !formData.units || !formData.category) {
            Toast("error", 'Заполнены не все поля')
          } else {
            const data = new FormData();
            for (const key in formData) {
                data.append(key, formData[key]);
                console.log(key , formData[key]);
            }
            console.log(data);
            const succeses =  await createProduct(data)
        if (succeses) {
            setFormData({
                image: null,
                name: '',
                description: '',
                price: '',
                discount: '',
                units: '',
                availability: true,
                category:'',
            });
            document.querySelector('input[type="file"]').value = null;
          }
    }
}
    const handleInputSellChange = (e) =>{
        const value = e.target.value;
        if (value === '' || (parseInt(value,10) >= 0 && parseInt(value, 10)<=100)){
            setFormData(prevState => ({
                ...prevState,
                discount: value
        }))
    }
}
    return(
        <div className='product-item'>
        <h2>Добавить карточку товара</h2>
        <div className='product-list'>
            <form onSubmit={handleSubmit}>
            <span>Изображение товара</span><br/>
            <input className='input-public' style={{width: '325px'}}type="file" name="image" placeholder='Изображение товара' accept=".jpg, .jpeg, .png, .webm, .webp" onChange={handleChange}/><br/><br/>
            <span>Название</span><br/>
            <input className='input-public' style={{width: '325px'}}type="text" name="name" value={formData.name}onChange={handleChange}/><br/>
            <span>Категория</span><br/>
            {/* <input className='input-public' type="text" name="category" value={formData.category}onChange={handleChange}/><br/> */}
            <select className="input-public"style={{width: '337px' }} type='text' name='category'placeholder="Категория" value={formData.category}onChange={handleChange}>
                <option value=''></option>
                {itemCategories.map((item, index)=>(
                    <option key={index} value={item.name}>{item.name}</option>
                ))}
            </select><br/>
            <span>Описание</span><br/>
            <textarea className='input-public' style={{width: '325px', height: '100px'}} type="text" name="description" value={formData.description} onChange={handleChange}/><br/>
            <span>Цена ₽</span><br/>
            <input className='input-public' style={{width: '325px'}} type="number" name="price" value={formData.price} onChange={handleChange}/><br/>
            <span>Скидка %</span><br/>
            <input className='input-public' style={{width: '325px'}} type="number"  name="discount" value={formData.discount} onChange={handleInputSellChange}/><br/>
           <span>Условные единицы</span><br/>
            <select className='input-public' style={{width: '337px' }}name="units" value={formData.units} onChange={handleChange}><br/>
            <option value=""></option>
                <option value="ШТ">ШТ</option>
                <option value="КГ">КГ</option>
            </select><br/>
            <span>Видимость покупателю</span><br/>
            <select className='input-public' style={{width: '337px' }}name="availability" value={formData.availability} onChange={handleChange}><br/>
                <option value="true">Да</option>
                <option value="false">Нет</option>
            </select><br/>
           <br/> <button className='button' type='submit'>Создать</button>
            </form>
        </div>
    </div>
    )
}

export default AddedItemForm