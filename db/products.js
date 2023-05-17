const client = require("./client");

async function createNewProduct({name, price, description,categoryId, qtyAvailable, qtyOnOrder, rating}) {

    try {
       console.log("Creating products!");
      const {
        rows: [product],
      } = await client.query(
        `
      INSERT INTO products (name, price, description,"categoryId", "qtyAvailable", "qtyOnOrder", rating)
      VALUES($1,$2,$3,$4,$5,$6,$7)
      RETURNING *;
      `,
        [name, price, description,categoryId, qtyAvailable, qtyOnOrder, rating]
      );
      return product;

    } catch (error) {
        throw error;
    
    }
  }

  async function getAllProducts() {
    // select and return an array of all activities
    try {
      const { rows } = await client.query(
        `SELECT *
         FROM products;
       `
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async function getProductsByCategory(categoryId) {
    try{

        const {rows} = await client.query(
            `
            SELECT * 
            FROM products
            WHERE "categoryId" = $1
            `, [categoryId]
            );
    }
    catch(error)
    {
        throw error;
    }
  }

  async function getProductsBySubCategory(subCategoryName) {
    try{

        const {rows} = await client.query(
            `
            SELECT products.* 
            FROM products
            JOIN categories ON products."categoryId" = categories.id
            WHERE categories.subcategory IN (${subCategoryName})
            `, [subCategoryName]
            );
    }
    catch(error)
    {
        throw error;
    }
  }


  
module.exports = {
    createNewProduct,
     getAllProducts,
     getProductsByCategory,
     getProductsBySubCategory
    };
