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
/***************************jason******************************/

/***************************maisha******************************/

/**************************aubrey********************************/
