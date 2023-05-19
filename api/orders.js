/*
    Here, we are going to list all orders apis.
*/

const express = require("express");
const ordersRouter = express.Router();
const {
  getAllOrders,
  createNewOrder,
  getOrderById,
  getOrdersByUser,
  getAllOrdersWithItems,
  attachItemsToOrder,
} = require("../db/orders");

/*
    Get All orders
*/
ordersRouter.get("/getAllOrders", async (req, res, next) => {
  try {
    // collects all orders from database.
    const findAllOrders = await getAllOrders();
    res.send({
      message: "All orders have been successfully found.",
      code: "SUCCESS",
      orders: findAllOrders,
    });
  } catch (error) {
    res.send({
      message: "Something went wrong.",
      error: "ERROR",
    });
  }
});

/*
    Create A New Order
*/
ordersRouter.post("/createNewOrder", async (req, res, next) => {
  try {
    const addNewOrder = await createNewOrder(req.body);
    res.send({
      message: "A new order has been successfully created.",
      code: "SUCCESS",
      order: addNewOrder,
    });
  } catch (error) {
    res.send({
      message: "Something went wrong.",
      error: "ERROR",
    });
  }
});

module.exports = ordersRouter;
