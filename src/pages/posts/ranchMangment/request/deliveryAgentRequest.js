import  { useHistory } from 'react-router-dom';

//import { API } from "../config";
//import { getCookie, userSessionExpired } from "./auth";
import {  userSessionExpired } from "./auth";
import { url } from '../../../../utiles/config'
const DeliveryAgentApiRequest = () => {
      let token = localStorage.getItem('token')
  const navigate = useHistory();
  const addDerliveryAgent = (ranchManager) => {
    return fetch(`${url}/admin-register-deliveryAgent`, {
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
  const viewAllDeliveryAgent = () => {
    return fetch(`${url}/admin-listalldeliveryAgent`, {
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
  const deleteDeliveryAgent = (id) => {
    return fetch(`${url}/admin-delete-deliveryAgent/${id}`, {
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
  const updateDeliveryAgent = (data,id) => {
    return fetch(`${url}/admin-update-deliveryAgent/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        userSessionExpired(response, navigate);
        return response.json();
      })
      .catch((err) => err);
  };
  return {
    addDerliveryAgent, viewAllDeliveryAgent,deleteDeliveryAgent,updateDeliveryAgent,
  };
};

export default DeliveryAgentApiRequest;
