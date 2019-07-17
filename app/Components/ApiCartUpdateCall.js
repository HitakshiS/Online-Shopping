import { Constants } from "../AppConfig/Constants";
import axios from "axios";

export const ApiCartUpdateCall = (user_id, product_id, addSub) => {
  axios
    .post(Constants.CART_UPDATE, { user_id, product_id, addSub })
    .then(response => {
      if (response.data.code == 200) {
        console.log(`userId======>>>${user_id}`);
      }
    })
    .catch(error => {
      console.log(error);
    });
};
