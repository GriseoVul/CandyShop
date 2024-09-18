import React, {useState} from 'react';
import Toast from '../GeneralModules/Toast';
import { isUrl } from '../GeneralModules/MyContext';
import { postCategoryUrlApi } from '../GeneralModules/urlAPIs';
import { createItem } from '../GeneralModules/FetchFunctions';

const AddedCategory = () => {
    const [formData, setFormData] = useState({category: ''})

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.category) {
            Toast('error', 'Заполнены не все поля')
        } else {
            const data = new FormData();
            for (const key in formData) {
                data.append(key, formData[key])
            }
            const succes = await createItem(postCategoryUrlApi, data);
            if (succes) {
                setFormData({category: ''})
            } else 
                return
        }
    }

    const handleChange = (e) => {
        const nameOfCateory = e.target.value
        setFormData(prevState => ({
            ...prevState,
            category: nameOfCateory
        }))
    }

    return (
        <div className='product-item'>
            <h2>Добавить категорию</h2>
            <div className='product-list'>
                <form onSubmit={handleSubmit}>
                    <input
                        className='input-public'
                        type="text"
                        name='category'
                        placeholder='Категория'
                        value={formData.category}
                        onChange={handleChange}/>
                    <button className='button' type='submit'>Добавить</button>
                </form>
            </div>
        </div>
    );
}

export default AddedCategory;
