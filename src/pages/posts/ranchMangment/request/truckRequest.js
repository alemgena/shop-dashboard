import  { useHistory } from 'react-router-dom';

//import { API } from "../config";
//import { getCookie, userSessionExpired } from "./auth";
import {  userSessionExpired } from "./auth";
import { url } from '../../../../utiles/config'

import fetch from "isomorphic-fetch";
import { DeliveryDining } from '@mui/icons-material';
const DeliveryAgentApiRequest = () => {
      let token = localStorage.getItem('token')
  const navigate = useHistory();
  const addTruck = (ranchManager,driverId,deliverAgentId) => {
    return fetch(`${url}/${deliverAgentId}/admin-register-deliveryAgent-truck/${driverId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ranchManager),
    })
      .then((response) => {
        userSessionExpired(response, navigate);
        return response.json();
      })
      .catch((err) => err);
  };
  const viewTruck = () => {
    return fetch(`${url}/admin-list-all-deliveryAgent-trucks`, {
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
  const deleteTruck = (username) => {
    return fetch(`${url}/admin-delete-deliveryAgent`, {
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
  const updateTruck = (ranch, username) => {
    return fetch(`${url}/admin-update-deliveryAgent`, {
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
    addTruck,updateTruck, viewTruck,deleteTruck,
  };
};

export default DeliveryAgentApiRequest;
