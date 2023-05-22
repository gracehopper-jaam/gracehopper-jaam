import React from "react";

const CartItem = (props) =>
{
const {item} = props;
return (
<>
<div><p>{item.id}</p></div>
</>

);

}

export default CartItem;