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
// GET /api/products/getAllProducts
export async function getAllProducts() {
  try {
    const response = await fetch(`${BASE}/products/getAllProducts`);
    const allProducts = await response.json();
    return allProducts;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${BASE}/products/getProductById`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: id })
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const getProductsByCategory = async (id) => {
  try {
    const response = await fetch(`${BASE}/products/getProductsByCategory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ categoryId: id })
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
};

export async function getAllCategories() {
  try {
    const response = await fetch(`${BASE}/categories/getAllCategories`);
    const getCategories = await response.json();
    return getCategories;
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
