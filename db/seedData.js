const client = require("./client");
const { createUser, getUserById, updateUser } = require("./users");

const {
  createNewProduct,
  getProductsBySubCategory,
  getProductsByCategory,
  updateProductQty,
  updateProduct,
  deleteProduct,
  getAllOrders,
  getOrderById,
  createNewOrderItem,
  getOrderItemsByOrder,
  getOrderItemById,
  getOrdersByUser,
  getAllOrdersWithItems,
  updateItemQty,
  canEditOrderItem
} = require(".");

const prodObj = {
  name: "HeadPhone NOT By Beats",
  price: 30,
  description: "different types of headphones",
  categoryId: 1,
  qtyAvailable: 220,
  qtyOnOrder: 40,
  rating: 5,
};

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
  try {
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
  } catch (error) {
    console.log(error);
  }
}

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

async function createInitialUsers() {
  console.log("Creating New USers");
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

async function createInitialCategories() {
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
      `
    );
  } catch (error) {
    throw error;
  }
  console.log("Done creating new categories");
}

async function createInitialProducts() {
  console.log("Creating New Products");
  try {
    const productsToCreate = [
      {
        name: "HeadPhone By Beats",
        price: 30,
        description: "different types of headphones",
        categoryId: 1,
        qtyAvailable: 200,
        qtyOnOrder: 56,
        rating: 0,
      },
      {
        name: "HeadPhone By Sony",
        price: 40,
        description: "different types of headphones",
        categoryId: 1,
        qtyAvailable: 80,
        qtyOnOrder: 20,
        rating: 3,
      },
      {
        name: "HeadPhone By Apple'",
        price: 90,
        description: "headphone that has xyz",
        categoryId: 2,
        qtyAvailable: 100,
        qtyOnOrder: 50,
        rating: 4,
      },
      {
        name: "HeadPhone By Random'",
        price: 60,
        description: "headphone that has xyz",
        categoryId: 2,
        qtyAvailable: 300,
        qtyOnOrder: 60,
        rating: 1,
      },
    ];
    const products = await Promise.all(productsToCreate.map(createNewProduct));
    console.log("Done creating new products");
  } catch (error) {
    throw error;
  }
  console.log(" Finished Creating New Products");
}

async function createInitialOrderData() {
  try {
    await client.query(
      `INSERT INTO "public"."orders"("id","userId","totalamount","orderdate","isProcessed")
      VALUES
      (1,1,70,'2023-05-17',FALSE),
      (2,2,220,'2023-05-17',FALSE);
      `
    );
  } catch (error) {
    throw error;
  }
}

async function createInitialOrderItemsData() {
  const orderItemsToCreate = [
    {
      productId: 1,
      priceperunit: 30,
      qty: 1,
      ordersId: 1,
    },
    {
      productId: 2,
      priceperunit: 90,
      qty: 1,
      ordersId: 1,
    },
    {
      productId: 2,
      priceperunit: 90,
      qty: 2,
      ordersId: 2,
    },
    {
      productId: 3,
      priceperunit: 40,
      qty: 1,
      ordersId: 2,
    },
  ];
  try {
    const orderItems = await Promise.all(
      orderItemsToCreate.map(createNewOrderItem)
    );
    console.log("Done creating new order items", orderItems);
  } catch (error) {
    throw error;
  }
}

async function createProductsForTestingGetAllOrdersWithItems() {
  try {
    await client.query(
      `INSERT INTO "public"."products"("id","name","price","description","categoryId","qtyAvailable","qtyOnOrder","rating")
      VALUES
      (1,'HeadPhone By Beats',30,'different types of headphones',1,200,56,0),
      (2,'HeadPhone By Apple',90,'headphone that has xyz',2,100,50,4),
      (3,'HeadPhone By Sony',40,'different types of headphones',1,80,20,3),
      (4,'HeadPhone By Random',60,'headphone that has xyz',2,300,60,1);
  `
    );
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialCategories();
    //to test createNewProduct() function
    // await createInitialProducts();
    await createProductsForTestingGetAllOrdersWithItems();
    await getProductsByCategory(1);
    await getProductsBySubCategory("Over the ear");
    await updateProduct({
      id: 1,
      name: "HeadPhone NOT By Beats",
      price: 30,
      description: "different types of headphones",
      categoryId: 1,
      qtyAvailable: 220,
      qtyOnOrder: 40,
      rating: 5,
    });
    await updateProductQty(1, 2);
    await deleteProduct(4);
    await createInitialOrderData();
    await createInitialOrderItemsData();
    console.log("All Orders", await getAllOrders());
    console.log("Orders by ID 1", await getOrderById(1));
    console.log("Order Items for Order 1", await getOrderItemsByOrder(1));
    console.log("Get A single order item by ID", await getOrderItemById(2));
    console.log(
      "Get Orders By Username : ",
      await getOrdersByUser("user20@gmail.com")
    );

    const allorders = await getAllOrdersWithItems();
    console.log(" Get all orders with items attcahed", allorders[1]);
    console.log("orderitem qty updated",await  updateItemQty(1,3));
    console.log(await canEditOrderItem(1,1)); //should return true
    console.log(await canEditOrderItem(1,2)); //should return false
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
