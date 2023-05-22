const express = require("express");
const { requireUser } = require("./utils");
const router = express.Router();

const {
  getAllOrdersWithItems,
  createNewOrder,
  updateOrderTotalAmount,
  getOrderById,
} = require("../db/orders");
const { createNewOrderItem } = require("../db/order_items");

// GET /api/orders
router.get("/", async (req, res, next) => {
  try {
    const allOrders = await getAllOrdersWithItems();
    console.log(allOrders);
    res.send(allOrders);
  } catch (error) {
    next(error);
  }
});

//ADDS A ROW TO ORDERS TABLES
// POST /api/orders
router.post("/", requireUser, async (req, res, next) => {
  const { totalamount, orderdate, isProcessed } = req.body;

  try {
    if (req.user) {
      const userId = req.user.id;
      const newOrder = await createNewOrder({
        userId,
        totalamount,
        orderdate,
        isProcessed,
      });
      res.send(newOrder);
    }
  } catch (error) {
    next(error);
  }
});

//ADDS A NEW ROW TO ORDER_ITEMS
// POST /api/orders/:ordersId/orderItem
router.post("/:ordersId/orderItems", requireUser, async (req, res, next) => {
  const ordersId = +req.params.ordersId;

  const { productId, priceperunit, qty } = req.body;

  try {
    const newOrderItem = await createNewOrderItem({
      productId,
      priceperunit,
      qty,
      ordersId,
    });

    res.send(newOrderItem);
  } catch (error) {
    next(error);
  }
});

//ADDS MULTIPLE ROWS TO ORDER_ITEMS
// POST /api/orders/:ordersId/orderItemsList
router.post(
  "/:ordersId/orderItemsList",
  requireUser,
  async (req, res, next) => {
    const ordersId = +req.params.ordersId;

    const [items] = req.body; //??/

    try {
      let newOrdersToReturn = [];
      ///UPDATE SYNTAX POTENTIALLY
      map.items(async ({ productId, priceperunit, qty, ordersId }) => {
        let newOrderItem = await createNewOrderItem({
          productId,
          priceperunit,
          qty,
          ordersId,
        });
        newOrdersToReturn.push(newOrderItem);
      });
      res.send(newOrdersToReturn);
    } catch (error) {
      next(error);
    }
  }
);

// PATCH /api/orders/:orderId
router.patch("/:orderId", requireUser, async (req, res, next) => {
  const id = +req.params.orderId;

  const { totalamount } = req.body;

  try {
    const order = await getOrderById(id);
    if (order.buyerName === req.user.username) {
      const updatedOrder = await updateOrderTotalAmount(+totalamount);
      res.send(updatedOrder);
    } else {
      res.status(403);
      next({
        error: "403",
        message: "UnauthorizedUpdate",
        name: "403",
      });
    }
  } catch (error) {
    console.log("updateorder error", error);
    next(error);
  }
});

module.exports = router;
