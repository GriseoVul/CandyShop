import React, {useState} from 'react';
import Toast from './Toast';
import { isUrl } from './MyContext';

const AddedCategory = () => {
    const url = `${isUrl}/Category/create`
        // const url = `https://fakestoreapi.com/products`

    const [formData, setFormData] = useState({
        category: '',
    })

    async function createCategoty(data){
        Toast (0,'Создание...', true)
        try {
            const response = await fetch (url, {
                method: 'POST',
                body: data
            })
            if (!response.ok){
                throw new Error(`Error ${response.statusText}`)
            }
            Toast('success', 'Успешно')
            return true
        } catch (error){
            Toast(`error`, 'Не удалось создать')
            return false
        }
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if (!formData.category){
            Toast('error', 'Заполнены не все поля')
        } else {
            const data = new FormData();
            for (const key in formData){
                data.append(key, formData[key])
            }
            const succes = await createCategoty(data);
            if (succes) {
                setFormData({
                    category: ''
                })
            } else return
        }
    }

    const handleChange = (e) => {
        const nameOfCateory = e.target.value
        setFormData(prevState => ({
            ...prevState, category: nameOfCateory
        }))

    }

    return (
        <div className='product-item'>
            <h2>Добавить категорию</h2>
            <div className='product-list'>
            <form onSubmit={handleSubmit}>
                <input className='input-public' type="text" name='category'placeholder= 'Категория'value={formData.category} onChange={handleChange} />
                <button className='button' type='submit'>Добавить</button>
            </form>
            </div>
        </div>
    );
}

export default AddedCategory;
