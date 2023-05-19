// const express = require("express");
// const { requireUser } = require("./utils");
// const router = express.Router();
// const { UnauthorizedUpdateError,UnauthorizedDeleteError,DuplicateRoutineActivityError} = require("../errors");
// const { getAllOrdersWithItems, createNewOrder } = require("../db/orders");
// const {createNewOrderItem} =  require("../db/order_items");

// // GET /api/orders
// router.get("/", async (req, res, next) => {
//   try {
//     const allOrders = await getAllOrdersWithItems();
//     res.send(allOrders);
//   } catch (error) {
//     next(error);
//   }
// });

// //ADDS A ROW TO ORDERS TABLES
// // POST /api/orders
// router.post("/", requireUser, async (req, res, next) => {
//   const { totalamount,orderdate,isProcessed } = req.body;

//   try {
//     if (req.user) {
//       const userId = req.user.id;
//       const newOrder= await createNewOrder({
//         userId,
//         totalamount,
//         orderdate,
//         isProcessed,
//       });
//       res.send(newOrder);
//     }
//   } catch (error) {
//     next(error);
//   }
// });


// //ADDS A NEW ROW TO ORDER_ITEMS
// // POST /api/orders/:ordersId/orderItem
// router.post("/:ordersId/orderItems", requireUser, async (req, res, next) => {
//   const ordersId = +req.params.ordersId;

//   const { productId, priceperunit, qty } = req.body;

//   try {
//     const newOrderItem = await createNewOrderItem({
//       productId,
//       priceperunit,
//       qty,
//       ordersId,
//     });

//     res.send(newOrderItem);
//   } catch (error) {
//     next(error);
//   }
// });

// //ADDS MULTIPLE ROWS TO ORDER_ITEMS
// // POST /api/orders/:ordersId/orderItem
// router.post("/:ordersId/orderItems", requireUser, async (req, res, next) => {
//   const ordersId = +req.params.ordersId;

//   const  [items]  = req.body; //??/

//   try {
//    let newOrdersToReturn = [];
//    map.items(async ({ productId, priceperunit, qty, ordersId }) => {
//      let newOrderItem = await createNewOrderItem({
//        productId,
//        priceperunit,
//        qty,
//        ordersId,
//      });
//      newOrdersToReturn.push(newOrderItem);
//    });
//     res.send(newOrdersToReturn);
//   } catch (error) {
//     next(error);
//   }
// });


// // const response = await fetch(`${BASE}/orders/${ordersId}/orderItem`, {
// //   method:"POST",
// //   headers:{
// //     'Content-Type': 'application/json',
// //     "Authorization": `Bearer ${token}`
// //   },
// //   body: JSON.stringify({productId:productId,priceperunit:priceperunit,qty:qty,ordersId:ordersId})
// // })

// //can i do this
// // body: JSON.stringify([{productId:productId,priceperunit:priceperunit,qty:qty,ordersId:ordersId},
// // {productId:productId,priceperunit:priceperunit,qty:qty,ordersId:ordersId},
// // {productId:productId,priceperunit:priceperunit,qty:qty,ordersId:ordersId}])