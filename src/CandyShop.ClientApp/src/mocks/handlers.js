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
    description: 'Sonne',
    count: '',
  },
  {
    id: "1",
    imageNames: 'Picture name',
    name: 'Candy name',
    price: 9700,
    discount: 20,
    totalPrice: 400,
    ye: 'шт',
    description: 'Sonne',
    count: 0,
  },
  {
    id: "2",
    imageNames: 'Picture name',
    name: 'Candy name',
    price: 51200,
    discount: 20,
    totalPrice: 400,
    ye: 'шт',
    description: 'Sonne'
  },
  {
    id: "3",
    imageNames: 'Picture name',
    name: 'Candy name',
    price: 530,
    discount: 20,
    totalPrice: 400,
    ye: 'шт',
    description: 'Sonne',
    count: 0,
  },
  {
    id: "4",
    imageNames: 'Picture name',
    name: 'Candy name',
    price: 500,
    discount: 20,
    totalPrice: 400,
    ye: 'шт',
    description: 'Sonne',
    count: '',
  },
])
}

const getOrder = ({request, params, cookies}) => {
    return HttpResponse.json([
        {
            id: '1',
            customerName: 'Miyagi',
            customerPhoneNumber: '88005553535',
            customerAddress: "Planeristov55",
            status: 'Empty',
            trackId: '',
            createdAt: "2024-07-02T21:37:39.1321844+03:00",
            updatedAt: "2024-07-03T21:37:39.132186+03:00",
            additionalData: "",
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
                }            
            ],
            totalprice:19000

        },
        {
          id: '2',
          customerName: 'Malboro',
          customerPhoneNumber: '88000000000',
          customerAddress: "Planeristov55",
          status: 'Pending',
          trackId: '4242525634545',
          createdAt: "2024-07-02T21:37:39.1321844+03:00",
          updatedAt: "2024-07-03T21:37:39.132186+03:00",
          additionalData: "This is order",
          products: [
              {
                  id: 0,
                  name: 'Name1',
                  price: 400,
                  count: 1
              },
              {
                  id: 1,
                  name: 'Name2',
                  price: 500,
                  count: 4
              },                
              {
                  id: 4,
                  name: 'Name5',
                  price: 1000,
                  count: 5
              }
          ],
          totalprice:1900

      }
    ])
}
const  getProductHandler = http.get('/api/Product', getProduct)
const getgetOrder = http.get('api/Order', getOrder)

const postPostBasket = http.post('/api/Order/create', async ({request})=>{
    const info = await request
})

 const putEditOrder = http.put('/api/Order/PUT/:id', async ({request, params})=>{
  const {id} = params;
  const nextPost= await request.json()
  console.log('Updating post "%s" with:', id, nextPost)
 })

export const handlers = [getProductHandler, postPostBasket, getgetOrder, putEditOrder]