# JAAM 

## A fully operating mock e-commerce website selling audio products such as headphones, speakers, and audio accessories.

#### [Click here for the live version!](https://jaam-again.fly.dev/)

# Technologies
- HTML
- CSS
- JavaScript
- React
- Express
- Node.js
- PostgreSQL

# Features
## User Authentication
#### The user can easily navigate the website and purchase the products after being logged in. Guest users are also able to navigate the site and add items to their cart. A user is able to add, edit, and delete the products in the database.
username: jaamfam@jaam.com  
password: music123

## Product Description
#### The user is able to view available products to pick from a variety. Once a product is selected, the user is able to view a detailed description of each product. The user now also has the ability to select the number of products they wish to add to the shopping cart. 

## Shopping Cart
#### The user is able to modify the quantity of the product in the shopping cart as well as delete it if necessary. The cart persists if you are a logged-in user.The total sum of money a user can expect to pay is updated according to the quantity of the products in the shopping cart. Desired goods can be purchased through the checkout page.

## Code Snippet 
```
const handleQtyChange =(event) =>
{
  const newQty = event.target.value;
  let newTotalAmt = 0;
  setQty(newQty);
  let tempCart = JSON.parse(localStorage.getItem("currentCart"));
  let updatedCartArr = tempCart.items.map((tempItem) => {
    if (tempItem.id === item.id) {
      tempItem.qty = newQty;
    }
    return tempItem;
  });

  updatedCartArr.map((tempItem) => {
    newTotalAmt += tempItem.qty * tempItem.priceperunit;
  });

  const cartObject = {
    totalamount: newTotalAmt,
    items: [...updatedCartArr], 
    username: tempCart.username,
    persistedCart: tempCart.persistedCart,
  };
  console.log(
    "HANDLE QUANTITY CHANGE",
    cartObject,
    "TOTAL AMT : ",
    newTotalAmt
  );
  localStorage.setItem("currentCart", JSON.stringify(cartObject));
  setCart(cartObject);
}

```
#### The code above shows that the user is able to add products to the shopping cart.

# Installation
### To get a local copy up and running follow these steps:
- Clone repository:
  ```
  https://github.com/gracehopper-jaam/graceshopper-jaam.git) 
  ```
- Install packages:
  ```
  npm install
  ```
- Seed the database:
  ```
  npm run seed
  ```
- Run app in developement mode: 
  ```
  npm run start:dev
  ```
- Open http://localhost:8080 to view it in your browser

# Authors
- Jason Bourg		 	  [Github  ](https://github.com/jbourg4364)     [LinkedIn](https://www.linkedin.com/in/jason-bourg/)
- Aubrey Little 	  [Github ](https://github.com/aubrey042)       [LinkedIn](https://www.linkedin.com/in/aubrey-little/)
- Aparna Priyavadan	[Github  ](https://github.com/aparnas12)      [LinkedIn](https://www.linkedin.com/in/aparna-priyavadan-33989a211/)
- Maisha Khan		    [Github  ](https://github.com/maishasaiyara)  [LinkedIn](https://www.linkedin.com/in/maishasaiyara)


