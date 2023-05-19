const client = require("./client");

async function createNewOrderItem({ productId, priceperunit, qty, ordersId }) {
  try {
    const {rows:[newOrderItems]} = await client.query(
      `
             INSERT INTO order_items ("productId", priceperunit, qty, "ordersId")
             VALUES($1, $2, $3, $4)
             RETURNING *;
            `
            ,[productId, priceperunit, qty, ordersId]
    );
    return newOrderItems;
  } catch (error) {
    throw error;
  }
}

async function getOrderItemById(id) {
    try {
      const {
        rows: [orderItemById],
      } = await client.query(
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

async function deleteOrderItem(id) {
  try {
    await client.query(
      ` DELETE FROM order_items
        WHERE id = $1;
      `,
      [id]
    );
  } catch (error) {
    console.log(error);
  }
}

async function updateItemQty(id, qty) {
  try {
    const  {rows: [item]} = await client.query(
      `UPDATE order_items
       SET qty = $2
       WHERE id= $1
       RETURNING *;
      `,
      [id, qty]
    );
  return item;
  } catch (error) {
    console.log(error);
  }
}

async function canEditOrderItem(orderItemId, userId) {
  try {
    const {
      rows: [field],
    } = await client.query(
      `SELECT * FROM
        order_items
        JOIN orders
        ON order_items."ordersId" = orders.id
        WHERE order_items.id = $1`,
      [orderItemId]
    );

    return field.userId === userId;
  } catch (error) {
    throw error;
  }
}

module.exports = { createNewOrderItem,getOrderItemsByOrder,getOrderItemById,deleteOrderItem,updateItemQty,canEditOrderItem};
