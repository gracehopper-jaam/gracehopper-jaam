/*
    Here, we are going to list all product apis.
*/

const express = require("express");
const productsRouter = express.Router();
const {
  getAllProducts,
  createNewProduct,
  productfindByName,
  getProductsBySubCategory,
  getProductsByCategory,
  updateProductQty,
  updateProduct,
  deleteProduct,
  productfindById,
  getProductsByCategoryName
} = require("../db/products");

/*
    Product find by id
*/
productsRouter.post("/getProductById", async (req, res, next) => {
  try {
    console.log(req.body, 'req')
    const { id } = req.body;
    console.log(id, 'id');
    const find = await productfindById(id);
    if (find.length) {
      res.send({
        message: "Product has been successfully find.",
        code: "SUCCESS",
        products: find,
      });
    } else {
      res.send({
        message: "Something went wrong.",
        error: "ERROR",
      });
    }
  } catch (error) {
    res.send({
      message: "Something went wrong.",
      error: "ERROR",
    });
  }
});

/*
    Get All Products
*/
productsRouter.get("/getAllProducts", async (req, res, next) => {
  try {
    // collects all products from database.
    const findAllProducts = await getAllProducts();
    res.send({
      message: "All products have been successfully found.",
      code: "SUCCESS",
      products: findAllProducts,
    });
  } catch (error) {
    res.send({
      message: "Something went wrong.",
      error: "ERROR",
    });
  }
});

/*
    Create A New Product
*/
productsRouter.post("/createNewProduct", async (req, res, next) => {
  try {
    const { name } = req.body;
    const isNameExist = await productfindByName(name);
    if (isNameExist.length !== 0) {
      res.send({
        message: "Name is already exist.",
        code: "Error",
      });
    } else {
      // create new product in database.
      const addNewProduct = await createNewProduct(req.body);
      res.send({
        message: "A new product has been successfully created.",
        code: "SUCCESS",
        product: addNewProduct,
      });
    }
  } catch (error) {
    res.send({
      message: "Something went wrong.",
      error: "ERROR",
    });
  }
});

/*
    Get product by category 
*/
productsRouter.post("/getProductsByCategory", async (req, res, next) => {
  try {
    const { categoryId } = req.body;
    // get product via search by category.
    const findProductsByCategory = await getProductsByCategory(categoryId);
    if (findProductsByCategory.length) {
      res.send({
        message: "Product has been successfully found.",
        code: "SUCCESS",
        product: findProductsByCategory,
      });
    } else {
      res.send({
        message: `products not found against this ${categoryId}.`,
        code: "ERROR",
        product: findProductsByCategory,
      });
    }
  } catch (error) {
    res.send({
      message: "Something went wrong.",
      error: "ERROR",
    });
  }
});

/*
    Update product qty
*/
productsRouter.post("/updateProductQty", async (req, res, next) => {
  try {
    const { id, qtyAvailable } = req.body;
    // Update the quantity of the products by subtracting the number of sales.
    const changeProductQty = await updateProductQty(id, qtyAvailable);
    if (changeProductQty) {
      res.send({
        message: "Product has been successfully update number of quality.",
        code: "SUCCESS",
        product: changeProductQty,
      });
    } else {
      res.send({
        message: "Something went wrong.",
        error: "ERROR",
      });
    }
  } catch (error) {
    res.send({
      message: "Something went wrong.",
      error: "ERROR",
    });
  }
});

/*
    Update product
*/
productsRouter.post("/updateProduct", async (req, res, next) => {
  try {
    // update product columns.
    const updatedProduct = await updateProduct(req.body);
    if (updatedProduct) {
      res.send({
        message: "Product has been successfully updated.",
        code: "SUCCESS",
        product: updatedProduct,
      });
    } else {
      res.send({
        message: "Something went wrong.",
        error: "ERROR",
      });
    }
  } catch (error) {
    res.send({
      message: "Something went wrong.",
      error: "ERROR",
    });
  }
});

/*
    get product by sub category
*/
productsRouter.post("/getProductsBySubCategory", async (req, res, next) => {
  try {
    const { subcategory } = req.body;
    // delete product from database.
    const findProductsBySubCategory = await getProductsBySubCategory(
      subcategory
    );
    if (findProductsBySubCategory.length) {
      res.send({
        message: "Product has been successfully found.",
        code: "SUCCESS",
        products: findProductsBySubCategory,
      });
    } else {
      res.send({
        message: `Product not found against this ${subcategory} .`,
        code: "ERROR",
      });
    }
  } catch (error) {
    res.send({
      message: "Something went wrong.",
      error: "ERROR",
    });
  }
});

/*
    Delete product
*/
productsRouter.delete("/deleteProduct", async (req, res, next) => {
  try {
    const { id } = req.body;
    const isRecordExist = await productfindById(id);
    console.log(isRecordExist, 'isRecordExist')
    if (isRecordExist.length) {
      // delete product from database.
      await deleteProduct(id);
      res.send({
        message: "Product has been successfully deleted.",
        code: "SUCCESS",
      });
    } else {
      res.send({
        message: "Something went wrong.",
        error: "ERROR",
      });
    }
  } catch (error) {
    res.send({
      message: "Something went wrong.",
      error: "ERROR",
    });
  }
});


productsRouter.get("/:category", async (req, res, next) => {
  try {
    console.log("API GET HERE");
    const category = req.params.category;
 
    const products = await getProductsByCategoryName(category);
    if (products.length) {
      res.send(products);
    } else {
      next({
        message: `Products not found against this ${category}.`,
        name: "Category not found",
        error: "Category not found",
      });
    }
  } catch (error) {
    next(error);
  }
});




module.exports = productsRouter;