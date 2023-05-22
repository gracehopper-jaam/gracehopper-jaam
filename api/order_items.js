const client = require("./client");

async function createNewOrderItem({ productId, priceperunit, qty, ordersId }) {
  try {
    const { rows: [newOrderItem] } = await client.query(
      `
      INSERT INTO order_items ("productId", priceperunit, qty, "ordersId")
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `,
      [productId, priceperunit, qty, ordersId]
    );
    return newOrderItem;
  } catch (error) {
    throw error;
  }
}

async function getOrderItemById(id) {
  try {
    const { rows: [orderItemById] } = await client.query(
      `
      SELECT *
      FROM order_items
      WHERE id = $1;
      `,
      [id]
    );

    return orderItemById;
  } catch (error) {
    throw error;
  }
}

async function getOrderItemsByOrder(id) {
  try {
    const { rows } = await client.query(
      `
      SELECT *
      FROM order_items
      WHERE "ordersId" = $1;
      `,
      [id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = { createNewOrderItem, getOrderItemsByOrder, getOrderItemById };
