import { useHistory } from 'react-router-dom'

//import { API } from "../config";
//import { getCookie, userSessionExpired } from "./auth";
import { userSessionExpired } from './auth'
import { url } from '../../../../utiles/config'
const LiveStockApiRequests = () => {
  let token = localStorage.getItem('token')
  const navigate = useHistory()
  const addLiveStock = (LiveStock) => {
    return fetch(`${url}/ranch-manager-register-local-livestock-supplier`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(LiveStock),
    })
      .then((response) => {
        userSessionExpired(response, navigate)
        return response.json()
      })
      .catch((err) => err)
  }
  const sendResponse = (LiveStoc) => {
    return fetch(`${url}/selectLiveStocks`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body:LiveStoc,
    })
      .then((response) => {
        userSessionExpired(response, navigate)
        return response.json()
      })
      .catch((err) => err)
  }
  const viewAllLiveStockSupplier = () => {
    return fetch(`${url}/ranch-manager-view-local-livestock-supplier`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log(response)
        userSessionExpired(response, navigate)
        return response.json()
      })
      .catch((err) => err)
  }
  const deleteRanchManager = (username) => {
    return fetch(
      `${url}/ranch-manager-delete-local-livestock-supplier/${username}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((response) => {
        userSessionExpired(response, navigate)
        return response.json()
      })
      .catch((err) => err)
  }
  const updateLiveStock = (ranch, username) => {
    return fetch(`${url}/admin-update-user/${username}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ranch),
    })
      .then((response) => {
        userSessionExpired(response, navigate)
        return response.json()
      })
      .catch((err) => err)
  }
  return {
    addLiveStock,
    viewAllLiveStockSupplier,
    deleteRanchManager,
    updateLiveStock,
    sendResponse,
  }
}

export default LiveStockApiRequests
