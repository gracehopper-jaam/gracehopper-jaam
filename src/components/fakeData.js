const fakeOrderItemsOld = [
    {
      id:1,
      productId: 1,
      priceperunit: 30,
      qty: 1,
      ordersId: 1,
    },
    {
      id:2,
      productId: 2,
      priceperunit: 90,
      qty: 1,
      ordersId: 1,
    },
    {
      id:3,
      productId: 2,
      priceperunit: 90,
      qty: 2,
      ordersId: 2,
    },
    {
      id:4,  
      productId: 3,
      priceperunit: 40,
      qty: 1,
      ordersId: 2,
    },
  ];

  const fakeOrderItems = [
    {
      id: 1,
      name: 'HeadPhone NOT By Beats',
      price: '30.00',
      description: 'different types of headphones',
      categoryId: 1,
      qtyAvailable: 218,
      qtyOnOrder: 42,
      rating: 5,
      qty: 1,
      priceperunit: '30.00',
      ordersId: 3
    },
   { id: 2,
      name: 'HeadPhone By Apple',
      price: '90.00',
      description: 'headphone that has xyz',
      categoryId: 2,
      qtyAvailable: 100,
      qtyOnOrder: 50,
      rating: 4,
      qty: 2,
      priceperunit: '90.00',
      ordersId: 3
   },
   {
    id: 3,
    name: 'HeadPhone By Sony',
    price: '40.00',
    description: 'different types of headphones',
    categoryId: 1,
    qtyAvailable: 80,
    qtyOnOrder: 20,
    rating: 3,
    qty: 1,
    priceperunit: '40.00',
    ordersId: 3
  }
  ];


  const fakeOrders = [
    {
      id: 1,
      userId: 1,
      totalamount: 70,
      orderdate: '2023-05-17',
      isProcessed: false,
      buyerName: 'user1@gmail.com',
      items: [
        {
          id: 2,
          name: 'HeadPhone By Apple',
          price: '90.00',
          description: 'headphone that has xyz',
          categoryId: 2,
          qtyAvailable: 100,
          qtyOnOrder: 50,
          rating: 4,
          qty: 1,
          priceperunit: '90.00',
          ordersId: 1
        },
        {
          id: 1,
          name: 'HeadPhone NOT By Beats',
          price: '30.00',
          description: 'different types of headphones',
          categoryId: 1,
          qtyAvailable: 218,
          qtyOnOrder: 42,
          rating: 5,
          qty: 1,
          priceperunit: '30.00',
          ordersId: 1
        }
      ]
    },
    {
      id: 2,
      userId: 2,
      totalamount: 220,
      orderdate: '2023-05-17',
      isProcessed: false,
      buyerName: 'albert@gmail.com',
      items: [
        {
          id: 2,
          name: 'HeadPhone By Apple',
          price: '90.00',
          description: 'headphone that has xyz',
          categoryId: 2,
          qtyAvailable: 100,
          qtyOnOrder: 50,
          rating: 4,
          qty: 2,
          priceperunit: '90.00',
          ordersId: 2
        },
        {
          id: 3,
          name: 'HeadPhone By Sony',
          price: '40.00',
          description: 'different types of headphones',
          categoryId: 1,
          qtyAvailable: 80,
          qtyOnOrder: 20,
          rating: 3,
          qty: 1,
          priceperunit: '40.00',
          ordersId: 2
        }
      ]
    },
    {
      id: 3,
      userId: 1,
      totalamount: 120,
      orderdate: '2023-05-19',
      isProcessed: false,
      buyerName: 'user1@gmail.com',
      items: [
        {
          id: 2,
          name: 'HeadPhone By Apple',
          price: '90.00',
          description: 'headphone that has xyz',
          categoryId: 2,
          qtyAvailable: 100,
          qtyOnOrder: 50,
          rating: 4,
          qty: 1,
          priceperunit: '90.00',
          ordersId: 3
        },
        {
          id: 1,
          name: 'HeadPhone NOT By Beats',
          price: '30.00',
          description: 'different types of headphones',
          categoryId: 1,
          qtyAvailable: 218,
          qtyOnOrder: 42,
          rating: 5,
          qty: 1,
          priceperunit: '30.00',
          ordersId: 3
        }
      ]
    },

  ]

 

  module.exports = {fakeOrderItems,fakeOrders};