import  { useHistory } from 'react-router-dom';

import fetch from "isomorphic-fetch";
//import { API } from "../config";
//import { getCookie, userSessionExpired } from "./auth";
import {  userSessionExpired } from "./auth";
import { url } from '../../../../utiles/config'
const LiveStockApiRequests = () => {
      let token = localStorage.getItem('token')
  const navigate = useHistory();
  const addInspectors = (LiveStock,name) => {
    return fetch(`${url}/admin-register-inspector/${name}`, {
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
    const viewUseByRole=(route)=>{
    return fetch(`${url}/admin-list-users-byrole/${route}`, {
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
  const viewAllLiveStockSupplier = () => {
    return fetch(`${url}/ranch-manager-view-local-livestock-supplier`, {

      method: "GET",
      headers: {
        Accept: "application/json",
     Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response)
        userSessionExpired(response, navigate);
        return response.json();
      })
      .catch((err) => err);
  };
  const deleteRanchManager = (username) => {
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
    addInspectors,
    viewAllLiveStockSupplier,
    deleteRanchManager,
    updateLiveStock,
    viewUseByRole,
  };
};

export default LiveStockApiRequests;
