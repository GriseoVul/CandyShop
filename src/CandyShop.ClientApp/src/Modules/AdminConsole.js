import React, {useState} from 'react';
import AdminItem from './AdminItem';
import Swal from 'sweetalert2';
import Slider from './Slider';
import { isUrl } from './MyContext';

const AdminConsole = () => {
    const [CardButton, setCardButton] = useState(true)
    const [SliderButton, setSliderButton] = useState(true)
    const toggleVisibleCardButton = () => {
        setCardButton(!CardButton)
    }
    const toggleVisibleSliderButton =() =>{
        setSliderButton(!SliderButton)
    }
    return (
        <div>
            <button className='button' onClick={toggleVisibleCardButton}>Карточки товара</button>
            <button className='button' onClick={toggleVisibleSliderButton}>Спец. предложения</button>
            {!CardButton ? <><AddedItemForm/></> : <></>}
            {!SliderButton ? <><AddedSliderSpec/></>: <></>}
        </div>
    );
}

export default AdminConsole;

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

const AddedItemForm = () => {
    // const url = `https://fakestoreapi.com/products`
    const url = `${isUrl}/Product/create`
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

const AddedItems = ({item}) => {
    const [isthisItem, setIsthisItem] = useState({})
    function handleChange(e){
        e.preventDefault()
        setIsthisItem({
        image: null,
        name: item.name,
        description: item.discription,
        price: item.price,
        discount: item.discount,
        ye: item.ye,
        availability: item.availability,
        })
    }
    async function puttedData(){

    }

    return(
        <div className='product-item'>
        <h2>Добавить карточку товара</h2>
        <div className='product-list'>
            <form>
            <span>Изображение товара</span><br/>
            <input className='input-public' type="file" name="image" placeholder='Изображение товара' accept=".jpg, .jpeg, .png, .webm, .webp" onChange={handleChange}/><br/><br/>
            <span>Название</span><br/>
            <input className='input-public' type="text" name="name" value={item.name}onChange={handleChange}/><br/>
            <span>Описание</span><br/>
            <textarea className='input-public' type="text" name="description" value={item.description} style={{height: '100px'}} onChange={handleChange}/><br/>
            <span>Цена ₽</span><br/>
            <input className='input-public' type="number" name="price" value={item.price} onChange={handleChange}/><br/>
            <span>Скидка %</span><br/>
            <input className='input-public' type="number"  name="discount" value={item.discount} onChange={handleChange}/><br/>
           <span>Условные единицы</span><br/>
            <select className='input-public' name="ye" value={item.ye} onChange={handleChange}><br/>
            <option value=""></option>
                <option value="Th">ШТ</option>
                <option value="Kg">КГ</option>
            </select><br/>
            <span>Видимость покупателю</span><br/>
            <select className='input-public' name="availability" value={item.availability} onChange={handleChange}><br/>
                <option value="true">Да</option>
                <option value="false">Нет</option>
            </select><br/>
            <button className='button' type='submit'>Создать</button>
            </form>
        </div>
    </div>
    )
}

const AddedSliderSpec = () => {
    const url = `${isUrl}/Product/create`

    const [formData, setFormData] = useState({
        slide: null,})

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

     const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        if (!formData.slide) {
            Toast.fire({
                icon: "error",
                title: "Заполнены не все поля"
              });
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
         <input className='input-public' type="file" name="slide" placeholder='Изображение товара' accept=".jpg, .jpeg, .png, .webp" onChange={handleChange}/> <br/> <br/>
         <button className='button' type='submit'>Добавить спец. предложение</button>
         </form>
         </div>
        </div>
        </>
    )
}