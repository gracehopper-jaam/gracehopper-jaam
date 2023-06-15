import { React, useState } from "react";

const UserProfile = (props) => {
  const { user, isLoggedIn } = props;
  const [firstname, setFirstname] = useState(isLoggedIn? user.firstname:"");
  const [lastname, setLastname] = useState(isLoggedIn? user.lastname:"");
  const [phone, setPhone] = useState(isLoggedIn?user.phone:"");
  const [email, setEmail] = useState(isLoggedIn?user.email:"");
  const [addressline1, setAddressline1] = useState(isLoggedIn?user.addressline1:"");
  const [addressline2, setAddressline2] = useState(isLoggedIn?user.addressline2:"");
  return (
    <>
      {isLoggedIn ? (
        <div>
          <div id="shipping">
            <h2 id="cart-message">Personal Information</h2>
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

            <label htmlFor="address1">Address Line 1*</label>
            <input
              type="text"
              name="address1"
              value={addressline1}
              onChange={(event) => setAddressline1(event.target.value)}
            />
            <label htmlFor="address2">City,State,Zip*</label>
            <input
              type="text"
              name="address2"
              value={addressline2}
              onChange={(event) => setAddressline2(event.target.value)}
            />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default UserProfile;
