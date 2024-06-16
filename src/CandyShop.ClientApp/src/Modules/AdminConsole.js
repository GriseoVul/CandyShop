import React, {useState} from 'react';
import AdminItem from './AdminItem';
import Swal from 'sweetalert2';

const AdminConsole = () => {
    return (
        <div>
<AddedItemForm/>
        </div>
    );
}

export default AdminConsole;

const AddedItemForm = () => {
    // const url = `https://fakestoreapi.com/products`
    const url = `https://gdw3fstj-5063.euw.devtunnels.ms/api/Product/create`
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
    const [formData, setFormData] = useState({
        image: null,
        name: '',
        description: '',
        price: '',
        discount: '',
        ye: '',
        availability: true
    });
    async function createProduct(data){
        const loadingToast = Toast.fire({
            icon: 'info',
            title: 'Создание...',
            timer: undefined,
            didOpen: (toast) => {
                Swal.showLoading();
            }
        });
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: data
            })
            if (!response.ok){
                throw new Error (`Error ${response.statusText}`)
            }
            Toast.fire({
                icon: "success",
                title: "Успешно"
              });
              return true
        } catch (error){
            Toast.fire({
                icon: "error",
                title: "Не удалось создать"
              });
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
        if (!formData.name || !formData.image || !formData.description || !formData.price || !formData.ye || !formData.availability) {
              Toast.fire({
                icon: "error",
                title: "Заполнены не все поля"
              });
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
                ye: '',
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
            <select className='input-public' name="ye" value={formData.ye} onChange={handleChange}><br/>
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