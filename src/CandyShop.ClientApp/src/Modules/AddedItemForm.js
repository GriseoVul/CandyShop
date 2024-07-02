import React , {useState} from "react";
import Swal from 'sweetalert2';
import { isUrl } from './MyContext';
import Toast from "./Toast";

const AddedItemForm = () => {
    // const url = `https://fakestoreapi.com/products`
    const url = `${isUrl}/Product/create`
    const [formData, setFormData] = useState({
        image: null,
        name: '',
        description: '',
        price: '',
        discount: '',
        units: '',
        availability: true
    });
    async function createProduct(data){
        Toast(0,0,true)
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: data
            })
            if (!response.ok){
                throw new Error (`Error ${response.statusText}`)
            }
            Toast('succes, успешно')
              return true
        } catch (error){
            Toast("error", 'Не удалось создать')
              return false
        }
    }
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'file' ? files[0] : (type === 'number' ? Number(value) : (name === 'availability' ? value === 'true' : value))
        }));
    };   
    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!formData.name || !formData.image || !formData.description || !formData.price || !formData.units || !formData.availability) {
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
                availability: true
            });
            document.querySelector('input[type="file"]').value = null;
          }
    }
}
    return(
        <div className='product-item'>
        <h2>Добавить карточку товара</h2>
        <div className='product-list'>
            <form onSubmit={handleSubmit}>
            <span>Изображение товара</span><br/>
            <input className='input-public' type="file" name="image" placeholder='Изображение товара' accept=".jpg, .jpeg, .png, .webm, .webp" onChange={handleChange}/><br/><br/>
            <span>Название</span><br/>
            <input className='input-public' type="text" name="name" value={formData.name}onChange={handleChange}/><br/>
            <span>Описание</span><br/>
            <textarea className='input-public' type="text" name="description" value={formData.description} style={{height: '100px'}} onChange={handleChange}/><br/>
            <span>Цена ₽</span><br/>
            <input className='input-public' type="number" name="price" value={formData.price} onChange={handleChange}/><br/>
            <span>Скидка %</span><br/>
            <input className='input-public' type="number"  name="discount" value={formData.discount} onChange={handleChange}/><br/>
           <span>Условные единицы</span><br/>
            <select className='input-public' name="units" value={formData.units} onChange={handleChange}><br/>
            <option value=""></option>
                <option value="Th">ШТ</option>
                <option value="Kg">КГ</option>
            </select><br/>
            <span>Видимость покупателю</span><br/>
            <select className='input-public' name="availability" value={formData.availability} onChange={handleChange}><br/>
                <option value="true">Да</option>
                <option value="false">Нет</option>
            </select><br/>
            <button className='button' type='submit'>Создать</button>
            </form>
        </div>
    </div>
    )
}

export default AddedItemForm