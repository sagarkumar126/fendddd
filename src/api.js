const API_URL = import.meta.env.VITE_API_URL;

export const getFoodList = async () => {
  const res = await fetch(`${API_URL}/food/list`);
  return await res.json();
};

export const placeOrder = async (orderData) => {
  const res = await fetch(`${API_URL}/order/place`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  return await res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};
