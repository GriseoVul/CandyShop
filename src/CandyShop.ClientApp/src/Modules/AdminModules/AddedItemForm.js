import React , {useEffect, useState} from "react";
import { isUrl } from '../GeneralModules/MyContext';
import Toast from "../GeneralModules/Toast";
import ProductCard from "../GeneralModules/ProductCard";
import { getCategorys, createItem, updateItem} from "../GeneralModules/FetchFunctions";
import { putProductUrlApi, postProductUrlApi, getCategorysUrlApi } from "../GeneralModules/urlAPIs";

const AddedItemForm = ({item, edit}) => {
    const urlProductCreate = `https://fakestoreapi.com/products`
    // const urlProductCreate = `${isUrl}/Product/create`
    const urlCategoryGet = `${isUrl}/Category`
    const urlProductUpdate = `${isUrl}/Product/update?`
    // const urlProductUpdate =`https://fakestoreapi.com/products/`

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
    const [copyData, setCopyData] = useState({...formData, totalPrice: 0})
    useEffect(() => {
      const calcTotalPrice = ()=> {
        const totalPrice = Math.round(formData.price - (formData.price / 100)* formData.discount)
        setCopyData({...formData, totalPrice})
      }
      calcTotalPrice();
    }, [formData])

    useEffect(()=>{
        if (item){
            setFormData({
                image: item.imageName,
                name: item.name,
                description: item.description,
                price: item.price,
                discount: item.discount,
                units: item.units,
                availability: item.availability,
                category:item.category,       
            })
        }
    },[])
    
    useEffect(()=>{
        const fetchCategory = async() => {
            try{
                const data = await getCategorys(getCategorysUrlApi);
                setItemCategories(data)
                console.log(itemCategories);
            } catch (error){
                console.log(error);
            }
        }
        fetchCategory();
    },[])
 
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
    
    const statusAnswerOk =() => {
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

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (edit){
            if (!formData.name || !formData.description || !formData.price || !formData.units || !formData.category) {
                Toast("error", 'Заполнены не все поля')
              } else {
                const data = new FormData();

                for (const key in formData) {
                    data.append(key, formData[key]);
                    console.log(key , formData[key]);
                }
                // formData.image = null;
                console.log(data);
                    const succeses =  await updateItem(`${putProductUrlApi}/${item.id}`,data)
                            if (succeses) {
                                statusAnswerOk();
                            }
        }
        } else {
            if (!formData.name || !formData.image || !formData.description || !formData.price || !formData.units || !formData.category) {
                Toast("error", 'Заполнены не все поля')
              } else {
                const data = new FormData();
                for (const key in formData) {
                    data.append(key, formData[key]);
                    console.log(key , formData[key]);
                }
                console.log(data);
                const succeses =  await createItem(postProductUrlApi,data)
                if (succeses) {
                    statusAnswerOk();
                } 
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
        <div className="work-with-candy-box">
            <div className="work-with-candy">
        <div className='product-item'style={{margin:'10px'}}>
            {edit ? (<h2>Изменить карточку товара</h2>):(<h2>Добавить карточку товара</h2>)}
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
           <br/> {edit ? (<button className='button' type='submit'>Изменить</button>):(<button className='button' type='submit'>Создать</button>)}
            </form><br/>
        </div>
    </div>
    <div className="prevBox"><ProductCard item={copyData} admin={true}/></div>
    </div>
    </div>
    )
}

export default AddedItemForm