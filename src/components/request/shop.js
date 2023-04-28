//http://localhost:8080/api/auth/getAllUser
import { useHistory } from "react-router-dom";
import { url } from "../../utiles/config";

import fetch from "isomorphic-fetch";
const UserApiRequests = () => {
  const viewUsers = () => {
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
  const deletUser = (email) => {
    return fetch(`${url}/api/auth/deleteUser?email=${email}`, {
      method: "DELETE",
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
    viewUsers,
    deletUser
  };
};

export default UserApiRequests;
