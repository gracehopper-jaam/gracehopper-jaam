const express = require("express");
const router = express.Router();

router.get("/testing", function (req, res, next) {
  res.send({ message: "bk working fine" });
});

router.use(async (req, res, next) => {
  next();
});

// ROUTER: // Define all type of router

router.use(function (req, res, next) {
  res.status(404).send({ message: "Not found" });
});

module.exports = router;
