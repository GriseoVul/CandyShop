import { HttpResponse, http } from 'msw'
const getProduct = ({request, params, cookies}) => {
  return HttpResponse.json([
    {
    id: "0",
    imageNames: 'Picture name',
    name: 'Тест',
    price: 500,
    discount: 0,
    totalPrice: 400,
    units: 'ШТ',
    description: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum ornare mollis. Nulla euismod augue id nunc euismod, eget condimentum sapien tempor. Proin ac eleifend ipsum, faucibus pretium ligula. Suspendisse metus lectus, tristique quis elit eget, lobortis bibendum lorem. In a placerat velit, id imperdiet ante. Aliquam felis augue, vehicula sit amet blandit sed, elementum quis urna. Sed cursus fermentum fermentum. Nullam eget ante sed velit dapibus euismod sit amet vel urna. Duis placerat feugiat leo non accumsan. Cras eget urna at felis blandit consequat. Nam nulla nisi, ullamcorper sed arcu vitae, accumsan commodo odio. Morbi et fermentum lorem. Praesent sed ultricies diam. Etiam aliquet nisl vel leo aliquet lacinia.',
    count: '',
    category: "Печенье",
    availability: true
  },
  {
    id: "1",
    imageNames: 'Picture name',
    name: 'Candy name',
    price: 900,
    discount: 0,
    totalPrice: 400,
    units: 'ШТ',
    description: 'Sonne',
    count: 0,
    category: "Конфеты",
    availability: true
  },
  {
    id: "2",
    imageNames: 'Picture name',
    name: 'Candy name',
    price: 510,
    discount: 50,
    totalPrice: 255,
    units: 'ШТ',
    description: 'Sonne',
    count: 0,
    category: "Конфеты",
    availability: true
  },
  {
    id: "3",
    imageNames: 'Picture name',
    name: 'Candy name',
    price: 530,
    discount: 20,
    totalPrice: 400,
    units: 'ШТ',
    description: 'Sonne',
    count: 0,
    category: "Конфеты",
    availability: true
  },
  {
    id: "4",
    imageNames: 'Picture name',
    name: 'Candy name',
    price: 500,
    discount: 20,
    totalPrice: 400,
    units: 'ШТ',
    description: 'Sonne',
    count: 0,
    category: "Конфеты",
    availability: true
  },
  {
    id: "5",
    imageNames: 'Picture name',
    name: 'Candy name',
    price: 500,
    discount: 20,
    totalPrice: 400,
    units: 'ШТ',
    description: 'Sonne',
    count: '',
    category: "Без сахара",
    availability: false
  },
  {
    id: "6",
    imageNames: 'Picture name',
    name: 'Elisenlebkuchen Nürnberger',
    price: 500,
    discount: 20,
    totalPrice: 400,
    units: 'ШТ',
    description: 'Sonne',
    count: '',
    category: "Конфеты",
    availability: true
  },
  {
    id: "7",
    imageNames: 'Picture name',
    name: 'Biscuit roulé aux éclats de caramel beurre salé, nappé de chocolat au lait avec des amandes effilées',
    price: 500,
    discount: 20,
    totalPrice: 400,
    units: 'ШТ',
    description: 'Sonne',
    count: '',
    category: "Печенье",
    availability: true
  },
  {
    id: "8",
    imageNames: 'Picture name',
    name: 'Candy name',
    price: 500,
    discount: 20,
    totalPrice: 400,
    units: 'ШТ',
    description: 'Sonne',
    count: '',
    category: "Конфеты",
    availability: true
  },
  {
    id: "9",
    imageNames: 'Picture name',
    name: 'Candy name9',
    price: 500,
    discount: 20,
    totalPrice: 400,
    units: 'ШТ',
    description: 'Sonne',
    count: '',
    category: "Печенье",
    availability: false
  },
  {
    id: "10",
    imageNames: 'Picture name',
    name: 'Candy name 10',
    price: 500,
    discount: 20,
    totalPrice: 400,
    units: 'КГ',
    description: 'Sonne',
    count: '',    
    category: "Печенье",
    availability: true
  },
  {
  id: "11",
  imageNames: 'Picture name',
  name: 'Candy name 11',
  price: 500,
  discount: 20,
  totalPrice: 400,
  units: 'КГ',
  description: 'Sonne',
  count: '',    
  category: "Печенье",
  availability: true
},
{
id: "12",
imageNames: 'Picture name',
name: 'Candy name 23',
price: 500,
discount: 20,
totalPrice: 400,
units: 'ШТ',
description: 'Sonne',
count: '',    
category: "Печенье",
availability: true
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

const getCategory = ({request, params, cookies}) =>{
  return HttpResponse.json(
    [
      {
        id: '0',
        name: 'Печенье'
      },
      {
        id: '1',
        name: 'Конфеты'
      },
      {
        id: '2',
        name: 'Без сахара'
      },
    ]
  )
}

const  getProductHandler = http.get('/api/Product', getProduct)
const getgetOrder = http.get('api/Order', getOrder)
const getgetCategory = http.get('api/Category', getCategory)

const postPostBasket = http.post('/api/Order/create', async ({request})=>{
    const info = await request
})

const postNewProduct = http.post('/api/Product/create', async ({request})=>{
  const info = await request
})

const postCategory = http.post('/api/Category/create', async ({request})=>{
  const info = await request
})




//  const putEditOrder = http.put('/api/Order/update?', async ({request, params})=>{
//   const {id} = params;
//   const nextPost= await request
//  })

export const handlers = [getProductHandler, postPostBasket, getgetOrder, getgetCategory,postCategory,postNewProduct]