import React, {useState} from 'react';
import AdminItem from './AdminItem';
import Swal from 'sweetalert2';
import Slider from './Slider';
import { isUrl } from './MyContext';
import AddedItemForm  from './AddedItemForm';
import AddedSliderSpec from './AddedSliderSpec';

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
