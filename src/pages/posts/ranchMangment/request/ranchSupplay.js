import { useHistory } from 'react-router-dom';
//import { API } from "../config";
//import { getCookie, userSessionExpired } from "./auth";
import {  userSessionExpired } from "./auth";
import { url } from '../../../../utiles/config'

import fetch from "isomorphic-fetch";
const RanchSupplayApiRequests = () => {

const navigate = useHistory();
    let token = localStorage.getItem('token')
  const addRanchSupplay = (ranch,type) => {
    return fetch(`${url}/ranch-manager-register-supply/${type}`, {
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
  const viewAllRanchSUpplay = () => {
    return fetch(`${url}/ranch-manager-view-ranch-supply`, {
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
  const deleteRanchSUpplay = (ranchName) => {
    return fetch(`${url}/ranch-manager-delete-supply/${ranchName}`, {
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
  const updateRanchSUpplay = (ranch, ranchName) => {
    return fetch(`${url}/ranch-manager-update-ranch-supply/${ranchName}`, {
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
  return { addRanchSupplay,updateRanchSUpplay, viewAllRanchSUpplay, deleteRanchSUpplay };
};

export default RanchSupplayApiRequests;
