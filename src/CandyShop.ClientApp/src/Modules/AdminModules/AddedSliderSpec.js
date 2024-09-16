import React , {useState, useEffect} from "react";
import { isUrl } from '../GeneralModules/MyContext';
import Toast from "../GeneralModules/Toast";
import { createItem } from "../GeneralModules/FetchFunctions";

const AddedSliderSpec = () => {
    const urlSliderItemCreate = `${isUrl}/Product/create`

    const [prevIMG, setPrevIMG] = useState('')

    const [formData, setFormData] = useState({
        slide: null,
    })

    useEffect(() => {
        if (formData.slide) {
            const objectUrl = URL.createObjectURL(formData.slide);
            setPrevIMG(objectUrl);

            // Очистка URL-объекта при обновлении или размонтировании компонента
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [formData.slide]);

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
            const success = await createItem(urlSliderItemCreate, data); //
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
            <div className="imgSliderPrevBox" style={{border:'2px solid black'}}>
                <div className="imgSliderPrev">
                    <img src={prevIMG} alt="16 x 9"/>
                </div>
            </div>
        <form onSubmit={handleSubmit}>
            <br/><span>Предпросмотр</span><br/><br/>
         <input className='input-public'style={{width:'300px' }} type="file" name="slide" placeholder='Изображение товара' accept=".jpg, .jpeg, .png, .webp" onChange={handleChange}/> <br/> <br/>
         <button className='button' type='submit'>Добавить спец. предложение</button>
         </form>
         </div>
        </div>
        </>
    )
}

export default AddedSliderSpec