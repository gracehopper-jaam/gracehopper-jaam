const client = require("./client");

async function createNewProduct({
  name,
  price,
  description,
  categoryId,
  qtyAvailable,
  qtyOnOrder,
  rating,
}) {
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
      [name, price, description, categoryId, qtyAvailable, qtyOnOrder, rating]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
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
  try {
    const { rows } = await client.query(
      `
       SELECT * 
       FROM products
       WHERE "categoryId" = $1;
      `,
      [categoryId]
    );
    console.log("getProductsByCategory", rows);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getProductsBySubCategory(subCategoryName) {
  try {
    const { rows } = await client.query(
      `SELECT products.*
       FROM products
       JOIN categories ON products."categoryId" = categories.id
       WHERE categories.subcategory = $1;
      `,
      [subCategoryName]
    );

    console.log(rows);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateProductQty(id, qty) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `UPDATE products
       SET "qtyAvailable" = "qtyAvailable" - $2,"qtyOnOrder" = "qtyOnOrder" + $2
       WHERE id= $1
       RETURNING *;
      `,
      [id, qty]
    );
    return product;
  } catch (error) {
    console.log(error);
  }
}

async function updateProduct({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [product],
    } = await client.query(
      `
        UPDATE products
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `,
      Object.values(fields)
    );

    return product;
  } catch (error) {
    throw error;
  }
}

async function deleteProduct(id) {
  try {
    await client.query(
      ` DELETE FROM products
        WHERE id = $1;
      `,
      [id]
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createNewProduct,
  getAllProducts,
  getProductsByCategory,
  getProductsBySubCategory,
  updateProductQty,
  updateProduct,
  deleteProduct
};
