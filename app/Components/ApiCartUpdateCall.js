import { Constants } from "../AppConfig/Constants";
import axios from "axios";

export const ApiCartUpdateCall = (userId, id, addSub) => {
  console.log("apiUpdate called");
  axios
    .post(Constants.CART_UPDATE, { userId, id, addSub })
    .then(response => {
      if (response.data.code == 200) {
        console.log(`userId======>>>${userId}`);
      }
    })
    .catch(error => {
      console.log(error);
    });
};
