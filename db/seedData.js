const client = require("./client");

async function dropTables() {
    console.log("Dropping All Tables...");
    try {
      await client.query(`
      DROP TABLE IF EXISTS order_items;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS categories;
      DROP TABLE IF EXISTS users;
      `);
    } catch (error) {
      throw error; // we pass the error up to the function that calls dropTables
    }
    // drop all tables, in the correct order
  }

async function createTables() {
    console.log("Creating All Tables...");
    try{
        await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            firstname VARCHAR(255) NOT NULL,
            lastname VARCHAR(255) NOT NULL,
            phone INTEGER NOT NULL,
            email VARCHAR(255) NOT NULL,
            addressline1 VARCHAR(255) NOT NULL,
            addressline2  VARCHAR(255)
          );

          CREATE TABLE categories(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            description TEXT NOT NULL,
            subcategory VARCHAR(255) NOT NULL
         );

         CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            price NUMERIC (7,2),
            description TEXT NOT NULL,
            "categoryId" INTEGER REFERENCES categories(id),
            "qtyAvailable" INTEGER NOT NULL,
            "qtyOnOrder" INTEGER NOT NULL,
            rating INTEGER DEFAULT 0
       );

       CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        totalamount INTEGER  NOT NULL,
        orderdate DATE NOT NULL DEFAULT CURRENT_DATE,
        "isProcessed" BOOLEAN DEFAULT false      
        );
        
        CREATE TABLE order_items (
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        priceperunit NUMERIC(7,2),
        qty INTEGER,
        "ordersId" INTEGER REFERENCES orders(id)
            
        );
    `);
    }
    catch(error)
    {
        console.log(error);
    }
}

    async function rebuildDB() {
        try {
            client.connect();
            await dropTables();
            await createTables();
          } catch (error) {
            console.log("Error during rebuildDB");
            throw error;
          }
    }

    module.exports = {
        rebuildDB,
        dropTables,
        createTables,
      };
      