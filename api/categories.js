/*
    Here, we are going to list all categories apis.
*/

const express = require("express");
const categoriesRouter = express.Router();

const {
  createNewCategory,
  getAllCategories,
  categoryfindByName,
} = require("../db/categories");

/*
    Get All categories
*/
categoriesRouter.get("/getAllCategories", async (req, res, next) => {
  try {
    // collects all categories from database.
    const findAllCategories = await getAllCategories();
    res.send({
      message: "All categories have been successfully found.",
      code: "SUCCESS",
      categories: findAllCategories,
    });
  } catch (error) {
    res.send({
      message: "Something went wrong.",
      error: "ERROR",
    });
  }
});

/*
      Create A New Category
  */
categoriesRouter.post("/createNewCategory", async (req, res, next) => {
  try {
    const { name } = req.body;
    const isNameExist = await categoryfindByName(name);
    console.log(isNameExist, "isNameExist");
    if (isNameExist.length !== 0) {
      res.send({
        message: "Name is already exist.",
        code: "Error",
      });
    } else {
      const addNewCategory = await createNewCategory(req.body);
      if (addNewCategory) {
        res.send({
          message: "A new category has been successfully created.",
          code: "SUCCESS",
          category: addNewCategory,
        });
      } else {
        res.send({
          message: "Something went wrong.",
          error: "ERROR",
        });
      }
    }
  } catch (error) {
    console.log(error, "error");
    res.send({
      message: "Something went wrong.",
      error: "ERROR",
    });
  }
});

module.exports = categoriesRouter;
