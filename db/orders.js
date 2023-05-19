const client = require("./client");

async function createNewOrder(cartObj) {
  try {
    //TODO: implement once createGuestUser has been completed
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
    const { rows } = await client.query(
      ` SELECT orders.*, users.username AS "buyerName"
            FROM orders
            JOIN users ON orders."userId" = users.id
          `
    );
    //TODO : Attach all the order_items to this order

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getOrdersByUser({ username }) {
  try {
    const orders = await getAllOrders();
    const ordersByUser = orders.filter((order) => order.buyerName === username);
    return ordersByUser;
  } catch (error) {
    throw error;
  }
}

async function getAllOrdersWithItems() {
  try {
    const { rows } = await client.query(
      ` SELECT orders.*, users.username AS "buyerName"
          FROM orders
          JOIN users ON orders."userId" = users.id
        `
    );
    //TODO : Attach all the order_items to this order

    return rows;
  } catch (error) {
    throw error;
  }
}

async function attachItemsToOrder(id) {
  try {
    const order = await getOrderById(id);

    const {
      rows: [orderItems],
    } = await client.query(
      `SELECT order_items.* 
      FROM order_items
      JOIN orders ON orders.id = order_items."ordersId"
      WHERE orders.id = $1;
      `,
      [id]
    );

    order.orderItems = orderItems;

    return order;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createNewOrder,
  getOrderById,
  getOrdersByUser,
  getAllOrders,
  getAllOrdersWithItems,
  attachItemsToOrder,
};
