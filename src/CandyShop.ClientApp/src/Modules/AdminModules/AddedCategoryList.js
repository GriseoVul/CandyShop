import React,{useEffect, useState}from 'react';
import { getCategorysUrlApi, putCategoryUrlApi } from '../GeneralModules/urlAPIs';
import { getCategorys, updateItem } from '../GeneralModules/FetchFunctions';
import AdminCategoryListItem from './AdminCategoryListItem';

const AddedCategoryList = () => {
    const [categorys, setCategorys] = useState([])
    useEffect(() => {
      const fetchCategorys= async ()=>{
        try{
            const data = await getCategorys(getCategorysUrlApi)
            setCategorys(data)
        } catch(error){
            console.log(error);
        }
    }
    fetchCategorys()
    }, [])
    
    return (
        <>
        <h2 align={'center'}>Категории</h2>
        <div className='CategorysListBox'>
            <div className='CategorysList'>
                    {categorys.map((item, index)=>(
                        <AdminCategoryListItem item={item}/>
                    ))}
            </div>
        </div>
        </>
    );
}

export default AddedCategoryList;
