import React , {useEffect, useState} from 'react';
import Candy from './Candy';

import C1 from './Pictures/C1.webp'
import C2 from './Pictures/C2.webp'
import C3 from './Pictures/C3.webp'
import C4 from './Pictures/C4.webp'

const Candys = () => {
    const url = `sdfsf`

    const [CandysItem, setCandysItem]= useState('')
    useEffect(()=> {
        const fetchData = async() => {
            try{
                const data = await getCandysData();
                setCandysItem(data)
            } catch (error){
                console.log(error)
            }
        }
        fetchData();
    }, [CandysItem, setCandysItem])
    
    let arr = [C1,C2,C3,C4]
    let arr2 = ['impulse','Nippo Bondy','Bon Time','krutfrut']
    let items = [
        {id: 1,
            pic: arr[0],
            name: arr2[2],
            price: 100,
            sale: 20,
            totalprice: 0,
            quantity: 0,
            description: "описание тест 1 jxtym lkbyhjjt jkgbcft njdfhf rjnjhjt z yt vjue ghblevfnm b gbie nhfyckbnjv gjnjve xnj vyt ye;yj xnj nj c.lf yfgbcfnm "
        },
        {id: 2,
            pic: arr[2],
            name: arr2[1],
            price: 200,
            sale: 50,
            totalprice: 0,
            quantity: 0,
            description: "описание тест 2"
        },
        {id: 3,
            pic: arr[3],
            name: arr2[3],
            price: 150,
            sale: 0,
            totalprice: 0,
            quantity: 0,
            description: "описание тест 3"
        },
        {id: 4,
            pic: arr[1],
            name: arr2[0],
            sale: 0,
            price: 300,
            totalprice: 0,
            quantity: 0,
            description: "описание тест 4"
        },
        {id: 5,
            pic: arr[0],
            name: arr2[2],
            sale: 0,
            price: 100,
            totalprice: 0,
            quantity: 0,
            description: "описание тест 1"
        },
        {id: 6,
            pic: arr[2],
            name: arr2[1],
            price: 200,
            sale: 30,
            description: "описание тест 2"
        },
        {id: 7,
            pic: arr[3],
            name: arr2[3],
            price: 150,
            sale: 0,
            totalprice: 0,
            description: "описание тест 3"
        },
        {id: 8,
            pic: arr[1],
            name: arr2[0],
            price: 300,
            sale: 0,
            totalprice: 0,
            description: "описание тест 4"
        }
    ]

    async function getCandysData(){
        try {
            const responce = await fetch(url, {
                method: "GET",
            })
            if (!responce.ok){
                const errorText = await responce.json();
                throw new Error(errorText)
            }
            return responce.json()
        } catch(error){
            console.log(error);
            throw new Error(error.message)
        }
    }

    return (
        <div className='CandysBox'>
        <div className='Candys'>
            {items.map((item, index)=> (
              <Candy key={index} item = {item}/>
            ))}
        </div>
        </div>
    );
}

export default Candys;

