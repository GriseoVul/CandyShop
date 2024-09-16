import React, {useState} from 'react';
import { isUrl } from '../GeneralModules/MyContext';
import AddedItemForm  from './AddedItemForm';
import AddedSliderSpec from './AddedSliderSpec';
import AddedCategory from './AddedCategory';
import AdminItemList from './AdminItemList';
import AddedCategoryList from './AddedCategoryList';
import Slider from '../ClientModules/Slider';

const AdminConsole = () => {
    const [cardButton, setCardButton] = useState(true)
    const [sliderButton, setSliderButton] = useState(true)
    const [categoryButton, setCategoryButton] = useState(true)

    const toggleVisibleCategoryButton = () =>{
        setCategoryButton(!categoryButton)
    }
    const toggleVisibleCardButton = () => {
        setCardButton(!cardButton)
    }
    const toggleVisibleSliderButton =() =>{
        setSliderButton(!sliderButton)
    }
    return (
        <div>
            <button className='button' onClick={toggleVisibleCardButton}>Товары</button>
            <button className='button' onClick={toggleVisibleSliderButton}>Спец.предложения</button>
            <button className='button' onClick={toggleVisibleCategoryButton}>Категории</button>
            <br/>

            {!cardButton ? <><AddedItemForm/><AdminItemList /></> : <></>}
            {!sliderButton ? <><AddedSliderSpec/></>: <></>}
            {!categoryButton ? <><AddedCategory/><AddedCategoryList/></>: <></>}
        </div>
    );
}

export default AdminConsole;
