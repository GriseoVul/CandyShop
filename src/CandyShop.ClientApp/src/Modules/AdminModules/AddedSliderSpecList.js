import React, {useEffect, useState} from 'react';
import {postBannerUrlApi, getBannersUrlApi} from '../GeneralModules/urlAPIs';
import {MyContext} from '../GeneralModules/MyContext';

const AddedSliderSpecList = () => {
    const [category, setCategory] = useState([])

    useEffect(() => {
        const fetchData= async ()=>{
            try{
                const data = await getCategorys(url);
                setAllData(data)
                setFilteredData(data)
            } catch(error){
                console.log(error);
            }
        }
        fetchData()
    
    }, [])
    

    return (
        <>
        <div className='SliderSpecBox'>
            <div className='SliderSpec'>

            </div>
        </div>
        </>
    );
}

export default AddedSliderSpecList;
