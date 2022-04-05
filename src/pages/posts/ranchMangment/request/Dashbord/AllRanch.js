//viewtotalLiveStocks
//viewAllRanches

import  { useHistory } from 'react-router-dom';

import fetch from "isomorphic-fetch";
//import { API } from "../config";
//import { getCookie, userSessionExpired } from "./auth";
import {  userSessionExpired } from "../auth";
import { url } from '../../../../../utiles/config'
const TotlaRanch = () => {
      let token = localStorage.getItem('token')
  const navigate = useHistory();
   
  const viewAllRanch = () => {
    return fetch(`${url}/admin-list-all-ranches`, {

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

  
  return {

    viewAllRanch,
    
  };
};

export default TotlaRanch;
