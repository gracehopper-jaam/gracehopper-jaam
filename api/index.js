const express = require("express");
const router = express.Router();

/* 
    Server Status : Here you can check that server is working or not.?
*/
router.get("/status", function (req, res, next) {
  res.send({
    message: "Welcome to our Grace Shopper e-commerce store server.",
  });
});

/* 
    Router: For Products
*/
const productsRouter = require("./products");
router.use("/products", productsRouter);

/* 
    Router: For Categories
*/
const categoriesRouter = require("./categories");
router.use("/categories", categoriesRouter);

/* 
    Router: For orders
*/
const ordersRouter = require("./orders");
router.use("/orders", ordersRouter);

/* 
    Router middleware 
*/
router.use(async (req, res, next) => {
  next();
});

/* 
    Router middleware 
*/
router.use(function (req, res, next) {
  res.status(404).send({
    message:
      "API path not found. Please check if your path and API are correct",
  });
});

module.exports = router;
