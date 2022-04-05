import React from 'react'
import {url} from '../../utiles/config'
const OneRanch = ({
  NotifyMessage,
  setOpenPopup,
id
}) => {
const viewOneRanch=()=>{
    console.log(id)
       let token = localStorage.getItem('token')
       return fetch(`${url}/viewRanch/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => err);
}
 React.useEffect(() => {
  viewOneRanch().then((data)=>{
      console.log(data)
      if(data.err){
         setOpenPopup(false) 
         NotifyMessage({
          message: data.err,
          type: 'error',
        })
      }
  })
  }, [])
return(
    <div>dbhjb</div>
)
}

export default OneRanch