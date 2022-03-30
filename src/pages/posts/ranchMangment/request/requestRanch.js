import { useHistory } from 'react-router-dom';
//import { API } from "../config";
//import { getCookie, userSessionExpired } from "./auth";
import {  userSessionExpired } from "./auth";
import { url } from '../../../../utiles/config'

import fetch from "isomorphic-fetch";
const RanchApiRequests = () => {

const navigate = useHistory();
    let token = localStorage.getItem('token')
  const addRanch = (ranch) => {
    return fetch(`${url}/admin-register-ranch`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ranch),
    })
      .then((response) => {
       userSessionExpired(response, navigate);
        return response.json();
      })
      .catch((err) => err);
  };
  const viewAllRanchs = () => {
    return fetch(`${url}/admin-list-all-ranches`, {
      method: "GET",
    headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
      userSessionExpired(response, navigate);
        console.log(response)
        return response.json();
      })
      .catch((err) => err);
  };
  const deleteRanch = (ranchName) => {
    return fetch(`${url}/admin-delete-ranch/${ranchName}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
     //   userSessionExpired(response, navigate);
        return response.json();
      })
      .catch((err) => err);
  };
  const updateRanch = (ranch, ranchName) => {
    return fetch(`${url}/admin-update-ranch/${ranchName}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ranch),
    })
      .then((response) => {
       // userSessionExpired(response, navigate);
        return response.json();
      })
      .catch((err) => err);
  };
  return { addRanch, viewAllRanchs, deleteRanch, updateRanch };
};

export default RanchApiRequests;
