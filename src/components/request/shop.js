//http://localhost:8080/api/auth/getAllUser
import { useHistory } from "react-router-dom";
import { url } from "../../utiles/config";

import fetch from "isomorphic-fetch";
const ShopApiRequests = () => {
  const viewShops = () => {
    return fetch(`${url}/shop`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => err);
  };

  return {
    viewShops,
    
  };
};

export default ShopApiRequests;
