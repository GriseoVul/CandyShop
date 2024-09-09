import React , {useState} from "react";
import { isUrl } from './MyContext';
import Toast from "./Toast";

const AddedSliderSpec = () => {
    const url = `${isUrl}/Product/create`

    const [formData, setFormData] = useState({
        slide: null,
    })

    async function createProduct(data){
        Toast(0,'Создание...', true)
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: data
            })
            if (!response.ok){
                throw new Error (`Error ${response.statusText}`)
            }
            Toast('succes', 'Успешно')
              return true
        } catch (error){
            Toast('error' , 'Не удалось создать')
              return false
        }
    }

     const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        if (!formData.slide) {
            Toast("error", "Заполнены не все поля")
        } else {
            const data = new FormData();
            for (const key in formData) {
                data.append(key, formData[key]);
                console.log(key, formData[key]);
            }
            console.log(data);
            const success = await createProduct(data);
            if (success) {
                setFormData({
                    slide: null,
                });
                document.querySelector('input[type="file"]').value = null;
            }
        }
    };
        const handleChange = (e) => {
            const {name, files, type} = e.target;
            setFormData(prevState => ({
                ...prevState, [name]: type === 'file' ? files[0] : e.target.value
            }));
        };  
    return (
        <> 
        <div className='product-item'>
        <h2>Добавить спец. предложение</h2>
        <div className='product-list'>
        <form onSubmit={handleSubmit}>
         <input className='input-public'style={{width:'300px' }} type="file" name="slide" placeholder='Изображение товара' accept=".jpg, .jpeg, .png, .webp" onChange={handleChange}/> <br/> <br/>
         <button className='button' type='submit'>Добавить спец. предложение</button>
         </form>
         </div>
        </div>
        </>
    )
}

export default AddedSliderSpec