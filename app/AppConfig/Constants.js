const BASE_URL = "http://192.168.254.223:3000/";

export const Constants = {
  STOCK_API: BASE_URL + "api/getStock",
  CART_API: BASE_URL + "api/getCart",
  CART_UPDATE: BASE_URL + "api/updateCart",
  REMOVE_ITEM: BASE_URL + "api/removeItem",
  USER_PROFILE: BASE_URL + "api/getUserProfile",
  ADD_ADDRESS: BASE_URL + "api/addAddress",
  SUCCESSFUL_PAYMENT_STOCK: BASE_URL + "api/successfulPaymentStock",
  SUCCESSFUL_PAYMENT_PURCHASED: BASE_URL + "api/successfulPaymentPurchased",
  SUCCESSFUL_PAYMENT_CART: BASE_URL + "api/successfulPaymentCart",
  SUCCESSFUL_PAYMENT_ALL: BASE_URL + "api/successfulPaymentAll",
  REGISTER: BASE_URL + "api/register",
  STOCK_READ: BASE_URL + "api/stockRead"
};
