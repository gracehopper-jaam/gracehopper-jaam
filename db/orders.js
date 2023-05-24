const client = require("./client");

async function createNewOrder({userId,totalamount,orderdate,isProcessed}) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
    INSERT INTO order("userId",totalamount,orderdate,"isProcessed")
    VALUES ($1,$2,$3,$4)
    RETURNING *;
  `,
      [userId,totalamount,orderdate,isProcessed]
    );

  } catch (error) {
    throw error;
  }
}

async function getOrderById(id) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        SELECT * 
        FROM orders
         WHERE id = $1;
      `,
      [id]
    );

    return order;
  } catch (error) {
    throw error;
  }
}

async function getAllOrders() {
    try {
      const { rows: orders} = await client.query(
          ` SELECT orders.*, users.username AS "buyerName"
            FROM orders
            JOIN users ON orders."userId" = users.id
          `
      );
      
      return orders;
    } catch (error) {
      throw error;
    }
  }

async function getOrdersByUser(username ) {
  try {
    const orders = await getAllOrdersWithItems();
    const ordersByUser = orders.filter((order) => order.buyerName === username);
    return ordersByUser;
  } catch (error) {
    throw error;
  }
}
async function getCartByUser(username ) {
  try {
    const orders = await getOrdersByUser(username);
    const notProcessedOrders = orders.filter((order) => order.isProcessed === false);
    let tempArr = [...notProcessedOrders];
    tempArr.map(order => {
      return {...order, date: new Date(order.orderdate)};
    });
    const sortedDesc = tempArr.sort(
      (objA, objB) => Number(objB.date) - Number(objA.date),
    );

    return sortedDesc;
  } catch (error) {
    throw error;
  }
}


async function getAllOrdersWithItems() {
  try {
    const { rows: orders } = await client.query(
        ` SELECT orders.*, users.username AS "buyerName"
          FROM orders
          JOIN users ON orders."userId" = users.id
        `
    );
    
    return await attachItemsToOrder(orders);

  } catch (error) {
    throw error;
  }
}

async function attachItemsToOrder(orders) {
  try {
    const ordersToReturn = [...orders]; // prevents unwanted side effects.

    const position = orders.map((_, index) => `$${index + 1}`).join(", ");
    const orderIds = orders.map((order) => order.id);
    const { rows: orderItems } = await client.query(
      `
    SELECT products.*, order_items.qty,order_items.priceperunit,order_items."ordersId"
    FROM products
    JOIN order_items ON order_items."productId" = products.id
    WHERE order_items."ordersId" IN (${position})
    `,
      orderIds
    );

    // loop over each order
    for (const order of ordersToReturn) {
      // if the order.id matches the orderItem.ordersId then add to order.
      const orderItemsToAdd = orderItems.filter(
        (orderItem) => orderItem.ordersId === order.id
      );

      order.items = orderItemsToAdd;
    }

    return ordersToReturn;
  } catch (error) {
    throw error;
  }
}

async function updateOrderTotalAmount(id, totalamount) {
  try {
    const  {rows: [order]} = await client.query(
      `UPDATE order
       SET totalamount = $2
       WHERE id= $1
       RETURNING *;
      `,
      [id, totalamount]
    );
  return order;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createNewOrder, getOrderById, getOrdersByUser,getAllOrders, getAllOrdersWithItems,attachItemsToOrder,updateOrderTotalAmount,getCartByUser};

 