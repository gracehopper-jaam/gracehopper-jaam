const client = require('./client');

async function createNewCategory({ name, description, subcategory }) {
   // create a new category
    try {
        console.log("Creating Categories YAY!");
        const { rows:[categories] } = await client.query(`
        INSERT INTO categories(name, description, subcategory)
        VALUES ($1, $2, $3)
        ON CONFLICT (name, subcategory) DO NOTHING
        RETURNING *;
      `, [ name, description, subcategory]
      );
      return categories;
    } catch (error) {
      throw error;
    }
  }

  async function getAllCategories() {
    // select and return an array of all categories
    try {
      const { rows } = await client.query(`
        SELECT *
         FROM categories;
       `);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  
  module.exports = {
    createNewCategory,
    getAllCategories
    };