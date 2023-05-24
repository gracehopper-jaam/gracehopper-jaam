const BASE = "http://localhost:8080/api";

/**************************aparna***********************/
export async function getAllOrders() {
  try {
    const response = await fetch(`${BASE}/orders`);
    const allOrders = await response.json();
    return allOrders;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
// GET /api/users/me
export const getMe = async (token) => {
    try {
      const response = await fetch(`${BASE}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  //// GET /api/users/:username/orders

  export const getOrdersByUser = async (token, username) => {
    try {
      const response = await fetch(`${BASE}/users/${username}/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      
      return result;
    } catch (err) {
      console.error(err);
    }
  };

// GET /api/users/:username/cart
  export const getCartByUser = async (token, username) => {
    try {
      const response = await fetch(`${BASE}/users/${username}/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  export const createNewOrder = async (token, orderObj) => {
    try {
      const response = await fetch(`${BASE}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderObj),
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  // POST /api/orders/:ordersId/orderItems

  export const createNewOrderItem = async (token, orderItem, ordersId) => {
    try {
      const response = await fetch(`${BASE}/orders/${ordersId}/orderItems`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderItem),
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  }
/***************************jason******************************/

/***************************maisha******************************/

/**************************aubrey********************************/
