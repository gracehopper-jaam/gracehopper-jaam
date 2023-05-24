import { createNewOrder,createNewOrderItem } from "../api-client";
import "./Cart.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const CartWithAccountView = (props) => {

    const { isLoggedIn, user, cart, token,setCart} = props;
    const [cardnumber, setCardnumber] = useState('');
    const [expdate,setExpdate] = useState('');
    const [cvv, setCvv] = useState('');
    const [firstname,setFirstname] = useState(user.firstname); 
    const [lastname,setLastname] = useState(user.lastname); 
    const [phone,setPhone] = useState(user.phone); 
    const [email,setEmail] = useState(user.email); 
    const [addressline1, setAddressline1] = useState(user.addressline1); 
    const [addressline2, setAddressline2] = useState(user.addressline2);
    const navigate =useNavigate();

    const  handleSubmit = async(event) => {
      event.preventDefault();
     
      const currDate = new Date().toISOString().split('T')[0];
      const orderObj ={
        totalamount:cart.totalamount, 
        orderdate:currDate, 
        isProcessed:true
      }

      const newOrder = await createNewOrder( token ,orderObj);
      
      if(newOrder !== null )
      {
        cart.items.map(async(item) => {
          let orderItem = { productId:item.id, priceperunit:item.price, qty:item.qty } ;
          const newItem = await createNewOrderItem( token ,orderItem,newOrder.id);
          
        });
      }
          const cartObject = {
            orderdate: "",
            totalamount: "",
            items: [],
            username: user.username,
            persistedCart: false,
          };
          localStorage.setItem("currentCart", JSON.stringify(cartObject));
          setCart(cartObject);
    }

    

    return (
      <>
        <form onSubmit = {handleSubmit} id="cart-with-acct-container">
          <h1>Checkout</h1>
          <div id="shipping">
          <h2>Ship To:</h2>
            <label htmlFor="firstname">First Name *</label>
            <input
              type="text"
              name="firstname"
              value={user.firstname}
              onChange={(event) => setFirstname(event.target.value)}
            />
            <label htmlFor="lastname">Last Name *</label>
            <input
              type="text"
              name="lastname"
              value={user.lastname}
              onChange={(event) => setLastname(event.target.value)}
            />

            <label htmlFor="phone">Phone*</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={(event) => setPhone(event.target.value)}
            />
            <label htmlFor="email">Email*</label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <span>
              <label htmlFor="address1">Address Line 1*</label>
              <input
                type="text"
                name="address1"
                value={user.addressline1}
                onChange={(event) => setAddressline1(event.target.value)}
              />
              <label htmlFor="address2">Address Line 2</label>
              <input
                type="text"
                name="address2"
                value={user.addressline}
                onChange={(event) => setAddressline2(event.target.value)}
              />
            </span>
          </div>
        
          {cart.items != null && cart.items.length > 0 ? (
            
            cart.items.map((item, index) => {
              return (
                <div key={index} id="item-container-1">
                  <img
                    src="https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2338&q=80"
                    alt="headphone"
                    width="100"
                    height="100"
                  />
                  <p>{item.name}</p>
                  <p>{item.qty}</p>
                </div>
              );
            })
          ) : (
            <div>
              <h2> Shopping Cart Empty </h2>
              <button onClick={() => {
              navigate('/');
            }} > Continue Shopping</button>
            </div>
          )}
          {cart.items != null && cart.items.length > 0 ? (<><h3>Total Amount Due : ${cart.totalamount}</h3></>):(<></>)}
          {cart.items != null && cart.items.length > 0 ? (
            <div id='payment'>
              <h2>Payment</h2>

              <label htmlFor="cardnumber">Card Number *</label>
              <input
                type="text"
                name="cardnumber"
                value={cardnumber}
                onChange={(event) => setCardnumber(event.target.value)}
              />
              <label htmlFor="expdate">Exp. Date *</label>
              <input
                type="text"
                name="expdate"
                placeholder="MM/YY"
                value={expdate}
                onChange={(event) => setExpdate(event.target.value)}
              />
              <label htmlFor="cvv">CVV *</label>
              <input
                type="text"
                name="cvv"
                value={cvv}
                onChange={(event) => setCvv(event.target.value)}
              />

            </div>
          ) 
          : 
          (
            <></>
          )}
           {cart.items != null && cart.items.length > 0 ? 
           (
           <div id='placeorder'>
           <button id='placeOrderButton'>Place Order</button>
           </div>
           )
           :
           (<></>)}
        </form>
      </>
    );
}

export default CartWithAccountView;