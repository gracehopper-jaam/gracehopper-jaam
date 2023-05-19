const express = require("express");
const { requireUser } = require("./utils");
const router = express.Router();
const {
  canEditOrderItem,
  updateItemQty,
  deleteOrderItem,
} = require("../db/order_items");

// PATCH /api/order_items/:orderItemsId
router.patch("/:orderItemsId", requireUser, async (req, res, next) => {
  const id = +req.params.orderItemsId;
  const { qty } = req.body;
  try {
    const canEdit = await canEditOrderItem(id, req.user.id);
    if (canEdit) {
      const updatedItem = await updateItemQty(id, qty);
      res.send(updatedItem).status(200);
    } else {
      next({
        message: "Unauthorized to make edits",
        name: "Unauthorized to make edits",
        error: "Unauthorized to make edits",
      });
    }
  } catch (error) {
    next(error);
  }
});

// DELETE /api/order_items/:orderItemsId
router.delete("/:orderItemsId", requireUser, async (req, res, next) => {
  const id = +req.params.orderItemsId;
  try {
    const canEdit = await canEditOrderItem(id, req.user.id);
    if (canEdit) {
      const deletedOrderItem = await deleteOrderItem(id);
      res.send(deletedOrderItem).status(200);
    } else {
      next({
        message: "Unauthorized to make edits",
        name: "Unauthorized to make edits",
        error: "Unauthorized to make edits",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
