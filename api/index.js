const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { getUserById } = require("../db");

//Check token and establish our req.user
router.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    // nothing to see here
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    try {
      const { id } = jwt.verify(token, JWT_SECRET);
      req.user = await getUserById(id);
      next();
    } catch ({ message, name }) {
      next({
        message,
        name,
      });
    }
  } else {
    next({ message: "Authorization Error", name: "Authorization Error" });
  }
});
router.use((req, res, next) => {
  if (req.user) {
    console.log("User is set: ", req.user);
  }
  next();
});

// GET /api/health
router.get("/health", async (req, res, next) => {
  res.send({ message: "it is healthy", status: 200 });
});

// ROUTER: /api/users
const usersRouter = require("./users");
router.use("/users", usersRouter);

// // ROUTER: /api/products
// const productsRouter = require("./products");
// router.use("/products", productsRouter);

// ROUTER: /api/orders
const ordersRouter = require("./orders");
router.use("/orders", ordersRouter);

// // ROUTER: /api/order_items
const orderItemsRouter = require("./orderItems");
router.use("/order_items", orderItemsRouter);

// // ROUTER: /api/categories
// const categoriesRouter = require("./categories");
// router.use("/categories", categoriesRouter);

// ROUTER: /api/
router.use("/", (req, res, next) =>{
  res.status(404);
  res.send(
    next({
      message: "Page Not Found",
      name: "Page Not Found",
      error: "Page Not Found",
    })
  )
});

//Error Handler
router.use((error, req, res, next) => {
  res.send({
    message: error.message,
    name: error.name,
    error: error.error,
  });
});

module.exports = router;
