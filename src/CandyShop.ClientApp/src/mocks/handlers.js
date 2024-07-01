import { HttpResponse, http } from 'msw'
const getProduct = ({request, params, cookies}) => {
  return HttpResponse.json([
    {
    id: "0",
    imageNames: 'Picture name',
    name: 'Candy name',
    price: 500,
    discount: 20,
    totalPrice: 400,
    ye: 'шт',
    description: 'Sonne'
  },
  {
    id: "1",
    imageNames: 'Picture name',
    name: 'Candy name',
    price: 500,
    discount: 20,
    totalPrice: 400,
    ye: 'шт',
    description: 'Sonne'
  },
  {
    id: "2",
    imageNames: 'Picture name',
    name: 'Candy name',
    price: 500,
    discount: 20,
    totalPrice: 400,
    ye: 'шт',
    description: 'Sonne'
  },
])
}

const getOrder = ({request, params, cookies}) => {
    return HttpResponse.json([
        {
            id: '666',
            customerName: 'Miyagi',
            customerPhoneNumber: '88005553535',
            status: 'Empty',
            products: [
                {
                    id: 0,
                    name: 'Name1',
                    price: 400,
                    count: 10
                },
                {
                    id: 1,
                    name: 'Name2',
                    price: 500,
                    count: 10
                },                
                {
                    id: 2,
                    name: 'Name3',
                    price: 1000,
                    count: 10
                }
            ]

        }
    ])
}
const  getProductHandler = http.get('/api/Product', getProduct)
const getgetOrder = http.get('api/Order', getOrder)

const postPostBasket = http.post('/api/Order/create', async ({request})=>{
    const info = await request
})

export const handlers = [getProductHandler, postPostBasket, getgetOrder]