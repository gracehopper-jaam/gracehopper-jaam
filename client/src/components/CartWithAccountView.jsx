import "./Cart.css";
import React, { useState } from "react";
const CartWithAccountView = (props) => {

    const { isLoggedIn, currentUser, cart} = props;
    const [cardnumber, setCardnumber] = useState('');
    const [expdate,setExpdate] = useState('');
    const [cvv, setCvv] = useState('');
    const [firstname,setFirstname] = useState(''); ///TODO :needs to be currentUser.firstname
    const [lastname,setLastname] = useState(''); ///TODO :needs to be currentUser.lastname
    const [phone,setPhone] = useState(''); ///TODO :needs to be currentUser.phone
    const [email,setEmail] = useState(''); ///TODO :needs to be currentUser.email
    const [address1, setAddress1] = useState(''); ///TODO :needs to be currentUser.
    const [address2, setAddress2] = useState('');///TODO :needs to be currentUser.

    console.log("CartWithAccountView" ,cart );
    return (
      <>
        <form id="cart-with-acct-container">
          <h1>Checkout</h1>
          <div id="shipping">
          <h2>Ship To:</h2>
            <label htmlFor="firstname">First Name *</label>
            <input
              type="text"
              name="firstname"
              value={firstname}
              onChange={(event) => setFirstname(event.target.value)}
            />
            <label htmlFor="lastname">Last Name *</label>
            <input
              type="text"
              name="lastname"
              value={lastname}
              onChange={(event) => setLastname(event.target.value)}
            />

            <label htmlFor="phone">Phone*</label>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
            <label htmlFor="email">Email*</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <span>
              <label htmlFor="address1">Address Line 1*</label>
              <input
                type="text"
                name="address1"
                value={address1}
                onChange={(event) => setAddress1(event.target.value)}
              />
              <label htmlFor="address2">Address Line 2*</label>
              <input
                type="text"
                name="address2"
                value={address2}
                onChange={(event) => setAddress2(event.target.value)}
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
              <button> Continue Shopping</button>
            </div>
          )}
          
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