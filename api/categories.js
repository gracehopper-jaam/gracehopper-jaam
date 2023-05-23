const express = require('express');
const router = express.Router();
const { getAllCategories, createNewCategory } = require('../db/categories');

router.use((req, res, next) => {

    next();
    });

// GET /api/categories
router.get('/', async (req, res, next) => {
    try {
        const categories = await getAllCategories();
        res.send(categories);
    } catch (error) {
        next(error);
    }
})

// POST /api/categories
router.get('/:category', async (req, res, next) => {
    const { category } = req.params;
    
    try {
        const category = await getCategoriesByName(category);
    
    if(category) {
    console.log(`Here are the categorties!: ${category}:`);
        res.send({
            category
         });

    } else {
        next({
        name: "Error creating category",
        message: "Not able to create new category"
  })
}
    } catch (error) {
        next(error);
    }
  });

  // PATCH 

  module.exports = router; 