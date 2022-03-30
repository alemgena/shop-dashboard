import  { useHistory } from 'react-router-dom';

import fetch from "isomorphic-fetch";
//import { API } from "../config";
//import { getCookie, userSessionExpired } from "./auth";
import {  userSessionExpired } from "./auth";
import { url } from '../../../../utiles/config'
const LiveStockApiRequests = () => {
      let token = localStorage.getItem('token')
  const navigate = useHistory();
  const addLiveStock = (LiveStock,id) => {
    return fetch(`${url}/ranch-manager-add-livestock/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(LiveStock),
    })
      .then((response) => {
        userSessionExpired(response, navigate);
        return response.json();
      })
      .catch((err) => err);
  };
  const viewAllRequest = () => {
    return fetch(`${url}/admin-viewCustomerLiveStockRequest`, {
      method: "GET",
      headers: {
        Accept: "application/json",
     Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        userSessionExpired(response, navigate);
        return response.json();
      })
      .catch((err) => err);
  };
  const deleteLiveStock = (username) => {
    return fetch(`${url}/admin-delete-user/${username}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        userSessionExpired(response, navigate);
        return response.json();
      })
      .catch((err) => err);
  };
  const AprroveRequest = (id) => {
    return fetch(`${url}/admin-grantRequest/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        userSessionExpired(response, navigate);
        return response.json();
      })
      .catch((err) => err);
  };
  const updateLiveStock = (ranch, username) => {
    return fetch(`${url}/admin-update-user/${username}`, {
      method: "PATCH",
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
  return {
    addLiveStock,
   viewAllRequest ,
   AprroveRequest,
    deleteLiveStock,
    updateLiveStock,
  };
};

export default LiveStockApiRequests;
