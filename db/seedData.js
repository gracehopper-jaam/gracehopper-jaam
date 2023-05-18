const client = require("./client");
const { createUser, getUserById, updateUser, getUser, getUserByFirstAndLastName, createGuest } = require("./users");

const {createNewProduct} = require("./index-db");

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
            password VARCHAR(255),
            firstname VARCHAR(255) NOT NULL,
            lastname VARCHAR(255) NOT NULL,
            phone INTEGER NOT NULL,
            email VARCHAR(255) NOT NULL,
            addressline1 VARCHAR(255) NOT NULL,
            addressline2  VARCHAR(255),
            "isRegistered" BOOLEAN DEFAULT false
          );

          CREATE TABLE categories(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            subcategory VARCHAR(255) NOT NULL,
            UNIQUE(name, subcategory)
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
};


async function createInitialUsers() {
  console.log("Creating New Users");
  try {
    await client.query(
      `
            INSERT INTO "public"."users"("id","username","password","firstname","lastname","phone","email","addressline1","addressline2","isRegistered")
            VALUES
            (1,'user1@gmail.com','12345678','Albert','Bertie',1234567891,'user1@gmail.com','123 walker road va',NULL,FALSE),
            (2,'user20@gmail.com','12345678','Snadra','Bullocks',987654321,'user20@gmail.com','123 king street road va',NULL,FALSE);
    `
    );

    console.log("Done creating new users");
  } catch (error) {
    throw error;
  }
  console.log(" Finished Creating New Users");
}

async function createInitialCategories () {
  console.log("Creating New CAtegories");
  try {
    await client.query(
        `
        INSERT INTO "public"."categories"("id","name","description","subcategory")
        VALUES
        (1,'Headphones','Headphones','Over the ear'),
        (2,'Headphones','Headphones','in the ear'),
        (3,'Speakers','speakers','desktop'),
        (4,'Speakers','speakers','outdoor'),
        (5,'Headphones','Headphones','wireless');
        `);
        } catch (error) {
            throw error;
        }
        console.log("Done creating new categories");
}

async function createInitialProducts(){
    console.log("Creating New Products");
    try{

        const productsToCreate = [
            {
            name :"HeadPhone By Beats", 
            price: 30,
            description: "different types of headphones",
            categoryId : 1, 
            qtyAvailable : 20, 
            qtyOnOrder :1, 
            rating :3
            },

        ]
        const products = await Promise.all(productsToCreate.map(createNewProduct));
        console.log("Done creating new products");
    }
    catch(error)
    {
        throw error;
    }
    console.log(" Finished Creating New Products");
};

data = {
  username: "albert123",
  password: "hello",
  firstName: "Albert",
  lastName: "Sons",
  phone: 1234567891,
  email: "albert@gmail.com",
  addressline1: "123 Main St",
  addressline2: "New Orleans, LA",
  isRegistered: false,
};

guestData = {
  password: "hello",
  firstName: "Guessy",
  lastName: "Sons",
  phone: 1234567891,
  email: "guessy@gmail.com",
  addressline1: "123 Main St",
  addressline2: "New Orleans, LA",
  isRegistered: false,
}


    async function rebuildDB() {
      try {
            client.connect();
            await dropTables();
            await createTables();

            console.log("Creating user...");
            console.log(await createUser(data));
            
            console.log("Getting user by Id...");
            console.log(await getUserById(1));

            console.log("Getting user by username & password...");
            console.log(await getUser( {username: "albert123", password: "hello"} ));

            console.log("Updating users...");
            console.log(await updateUser(1, {username: "newUserName", isRegistered: true}));

            console.log("Getting user by first & last name...");
            console.log(await getUserByFirstAndLastName({firstName: "Albert", lastName: "Sons"}));

            console.log("Creating guest user...");
            console.log(await createGuest(guestData))

            // await createInitialUsers();
            // await createInitialCategories();
            // await createInitialProducts();

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
      