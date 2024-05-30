import React from 'react';
import Candy from './Candy';

import C1 from './Pictures/C1.webp'
import C2 from './Pictures/C2.webp'
import C3 from './Pictures/C3.webp'
import C4 from './Pictures/C4.webp'

const Candys = () => {
    let arr = [C1,C2,C3,C4]
    let arr2 = ['impulse','Nippo Bondy','Bon Time','krutfrut']

    let items = [
        {id: 1,
            pic: arr[0],
            name: arr2[2],
            price: 100,
            sale: 20,
            description: "описание тест 1 jxtym lkbyhjjt jkgbcft njdfhf rjnjhjt z yt vjue ghblevfnm b gbie nhfyckbnjv gjnjve xnj vyt ye;yj xnj nj c.lf yfgbcfnm "
        },
        {id: 2,
            pic: arr[2],
            name: arr2[1],
            price: 200,
            sale: 50,
            description: "описание тест 2"
        },
        {id: 3,
            pic: arr[3],
            name: arr2[3],
            price: 150,
            sale: 0,
            description: "описание тест 3"
        },
        {id: 4,
            pic: arr[1],
            name: arr2[0],
            sale: 0,
            price: 300,
            description: "описание тест 4"
        },
        {id: 5,
            pic: arr[0],
            name: arr2[2],
            sale: 0,
            price: 100,
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
            description: "описание тест 3"
        },
        {id: 8,
            pic: arr[1],
            name: arr2[0],
            price: 300,
            sale: 0,
            description: "описание тест 4"
        }
    ]

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

