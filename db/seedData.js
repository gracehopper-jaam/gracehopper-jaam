const client = require("./client");


const {
  createUser, getUserById, updateUser, getUser, getUserByFirstAndLastName, createGuest,
  createNewCategory, getAllCategories,
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
  canEditOrderItem,
  getCartByUser,
  deleteOrder
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
  firstname: "Guessy",
  lastname: "Sons",
  phone: 1234567891,
  email: "guessy@gmail.com",
  addressline1: "123 Main St",
  addressline2: "New Orleans, LA",
  isRegistered: false,
}

categoryData = {
  name: "Hoolee",
  description: "I am a tabby cat",
  subcategory: "cat"
}



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
            phone VARCHAR(10) NOT NULL,
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
        "isProcessed" BOOLEAN DEFAULT false,
        UNIQUE(id, "isProcessed",orderdate)      
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


async function createInitialUsers() {
  console.log("Creating New USers");
  try{
    const usersToCreate =[
      {
        username: "user1@gmail.com",
        password: '12345678',
        firstname:"Albert",
        lastname:"Bertie",
        phone: 1234567891,
        email:"user1@gmail.com",
        addressline1:'123 walker road va',
        addressline2:'Fairfax, VA',
        isRegistered:false
      },
      {
        username: 'user20@gmail.com',
        password: '12345678',
        firstname:'Snadra',
        lastname:'Bullocks',
        phone:987654321,
        email:'user20@gmail.com',
        addressline1:'123 king street road va',
        addressline2:"Alexandri, CA",
        isRegistered:false,
      },
      {
        username: "albert@gmail.com",
        password: 'hello',
        firstname:'Albert',
        lastname:'Sons',
        phone:1234567891,
        email:"albert@gmail.com",
        addressline1:"123 Main St",
        addressline2:"New Orleans, LA",
        isRegistered:false
      }
    ];

    const users = await Promise.all(usersToCreate.map(createUser));
    console.log("Done creating new users", users);

  }catch(error)
  {
    throw error;
  }

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
        name: "Sony WH-1000XM4",
        price: 30,
        description: "These wireless noise-canceling headphones offer exceptional sound quality, adaptive noise cancellation, long battery life, and touch controls. They are known for their comfortable fit and excellent noise isolation.",
        categoryId: 1,
        qtyAvailable: 200,
        qtyOnOrder: 56,
        rating: 0,
      },
      {
        name: "Bose QuietComfort 35 II",
        price: 40,
        description: "These wireless headphones are renowned for their world-class noise cancellation technology. They provide a balanced sound profile, comfortable fit, and built-in voice assistants for easy control and access to information.",
        categoryId: 1,
        qtyAvailable: 80,
        qtyOnOrder: 20,
        rating: 3,
      },
      {
        name: "Sennheiser Momentum 3",
        price: 90,
        description: "These headphones combine premium materials and exceptional sound quality. They offer active noise cancellation, intuitive controls, and a stylish design. The Momentum 3 Wireless is known for its detailed and balanced audio performance.",
        categoryId: 2,
        qtyAvailable: 100,
        qtyOnOrder: 50,
        rating: 4,
      },
      {
        name: "Audio-Technica ATH-M50x",
        price: 60,
        description: "These professional studio headphones are highly regarded for their accurate audio reproduction and robust build quality. They deliver clear, detailed sound and have a foldable design for convenient storage and portability.",
        categoryId: 2,
        qtyAvailable: 300,
        qtyOnOrder: 60,
        rating: 1,
      },
      {
        name: "Audio-Technica ATH-M49x",
        price: 60,
        description: "These professional studio headphones are highly regarded for their accurate audio reproduction and robust build quality. They deliver clear, detailed sound and have a foldable design for convenient storage and portability.",
        categoryId: 2,
        qtyAvailable: 300,
        qtyOnOrder: 60,
        rating: 1,
      },
      {
        name: "Beyerdynamic DT 990 Pro",
        price: 60,
        description: "  These open-back studio headphones provide a spacious soundstage and excellent audio reproduction. They feature a comfortable fit, durable construction, and are favored by audio professionals for critical listening and mixing.",
        categoryId: 2,
        qtyAvailable: 300,
        qtyOnOrder: 60,
        rating: 1,
      },
      {
        name: "JBL Everest Elite 750NC",
        price: 189.99,
        description: "These professional studio headphones are highly regarded for their accurate audio reproduction and robust build quality. They deliver clear, detailed sound and have a foldable design for convenient storage and portability.",
        categoryId: 2,
        qtyAvailable: 300,
        qtyOnOrder: 60,
        rating: 1,
      },
      {
        name: "Audio-Technica ATH-K48x",
        price: 99.99,
        description: " These wireless headphones offer active noise cancellation, customizable sound settings, and a comfortable fit. They are equipped with JBL's signature sound and provide a long battery life for extended listening sessions.",
        qtyAvailable: 300,
        qtyOnOrder: 60,
        rating: 3,
      },

      //speakers
      {
        name: "Logitech Z623",
        price: 60,
        description: "These speakers offer powerful, THX-certified audio with a total peak power of 200 watts. They feature a subwoofer for deep bass and multiple inputs for versatile connectivity.",
        categoryId: 2,
        qtyAvailable: 300,
        qtyOnOrder: 60,
        rating: 1,
      },
      {
        name: "Bose Companion 2 Series III",
        price: 60,
        description: "These speakers provide balanced audio performance and a space-saving design. They feature dual inputs for easy connection to multiple devices and are ideal for desktop setups.",
        categoryId: 2,
        qtyAvailable: 300,
        qtyOnOrder: 60,
        rating: 1,
      },
      {
        name: "Klipsch ProMedia 2.1 ",
        price: 60,
        description: "This speaker system includes two satellite speakers and a subwoofer, delivering powerful and immersive sound. They feature a control pod for convenient volume adjustment and headphone connectivity.",
        categoryId: 2,
        qtyAvailable: 300,
        qtyOnOrder: 60,
        rating: 1,
      },
      {
        name: "Creative Pebble Plus",
        price: 60,
        description: " These compact speakers provide a budget-friendly option with good sound quality. They feature a built-in subwoofer for enhanced bass and a sleek, modern design.",
        categoryId: 2,
        qtyAvailable: 300,
        qtyOnOrder: 60,
        rating: 1,
      },

      //Accesories 
      {
        name: "Apple Lightning to 3.5mm Headphone Jack Adapter",
        price: 60,
        description: "This adapter is made by Apple and is designed to connect devices with a Lightning connector to audio devices with a 3.5mm headphone jack. It allows you to use your existing 3.5mm headphones or audio cables with Lightning devices",
        categoryId: 2,
        qtyAvailable: 300,
        qtyOnOrder: 60,
        rating: 1,
      },
      {
        name: "Belkin Lightning Audio + Charge RockStar ",
        price: 60,
        description: "This adapter from Belkin allows you to simultaneously charge your iPhone or iPad while listening to music or making calls through a 3.5mm audio device. It has a Lightning port for charging and a 3.5mm audio port for connecting headphones or speakers.",
        qtyAvailable: 320,
        qtyOnOrder: 60,
        rating: 1,
      },
      {
        name: "Audioengine A2+",
        price: 60,
        description: "These compact speakers deliver impressive sound quality with a built-in amplifier. They have a sleek design, convenient volume controls, and offer multiple connectivity options.",
        categoryId: 2,
        qtyAvailable: 300,
        qtyOnOrder: 60,
        rating: 1,
      },
      {
        name: "Geekria UltraShell Headphone Case",
        price: 60,
        description: "his durable headphone case is designed to protect your headphones from dust, scratches, and impacts. It features a hard shell exterior, a soft interior lining, and a zipper closure for secure storage and easy access.",
        categoryId: 2,
        qtyAvailable: 300,
        qtyOnOrder: 60,
        rating: 1,
      },
      {
        name: "LTGEM Headphone Case",
        price: 60,
        description: "These compact speakers deliver impressive sound quality with a built-in amplifier. They have a sleek design, convenient volume controls, and offer multiple connectivity options.",
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
      `INSERT INTO "public"."orders"("userId","totalamount","orderdate","isProcessed")
      VALUES
      (1,70,'2023-05-17',FALSE),
      (2,220,'2023-05-17',FALSE),
      (1,120,'2023-05-19',TRUE);
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
    {
      productId: 1,
      priceperunit: 30,
      qty: 1,
      ordersId: 3,
    },
    {
      productId: 2,
      priceperunit: 90,
      qty: 1,
      ordersId: 3,
    }
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
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialCategories();
    await createInitialProducts();
    
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
      
