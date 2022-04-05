import React from 'react'
//import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import fetch from 'isomorphic-fetch'
import { url } from '../../utiles/config'
import Controls from '../../components/ui/controls/Controls'
const Routes = ({
  NotifyMessage,
  id,
  setOpenPopup,
  recordForEdit,
  setRanchManagers,
}) => {
  const [formData, setFormData] = React.useState({
    viewAllRanches: false,
    viewRanch: false,
    viewLiveStock:false ,
    viewAllVaccine: false,
    viewVaccine: false,
    viewAllMedicine: false,
    viewAllProteins:false,
    viewProteins: false,
    viewtotalLiveStocks: false,
    viewtotalLiveStocksByResidence: false,
    viewtotalRanchLiveStocks: false,
    viewtotalRanchLiveStocksByResidence: false,
  })
  console.log(formData)
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleSumit = (e) => {
    e.preventDefault()
    Response().then((data) => {
        if(data.err){
   NotifyMessage({
              message: data.err,
              type: 'error',
            })
}
else if(data.message){
    setOpenPopup(false)
     NotifyMessage({
              message: data.message,
                 type: 'success'
            })
}
})

  }
  const Response = () => {
    let token = localStorage.getItem('token')
    return fetch(`${url}/admin-update-inspector-privilege/${id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      return response.json()
    })
  }
  return (
    <div>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              onChange={(e) => onChange(e)}
              name="viewAllRanches"
              value='true'
            />
          }
          label="View All Ranchs"
        />
        <FormControlLabel
          control={
            <Checkbox
             value='true'
              name="viewRanch"
              label=" View One Ranch"
              onChange={(e) => onChange(e)}
            />
          }
          label="View Ranchs"
        />
        <FormControlLabel
          control={
            <Checkbox
            value='true'
              name="viewLiveStock"
              onChange={(e) => onChange(e)}
            />
          }
          label="View One LiveStock"
        />
        <FormControlLabel
          control={
            <Checkbox
         value='true'
              name="viewAllVaccine"
              onChange={(e) => onChange(e)}
            />
          }
          label="View All Vaccine"
        />
        <FormControlLabel
          control={
            <Checkbox
            value='true'
              name="viewVaccine"
              onChange={(e) => onChange(e)}
            />
          }
          label="View One Vaccine"
        />

        <FormControlLabel
          control={
            <Checkbox
            value='true'
              name="viewAllMedicine"
              onChange={(e) => onChange(e)}
            />
          }
          label="View All Medicine"
        />
        <FormControlLabel
          control={
            <Checkbox
              value='true'
              name="viewAllProteins"
              onChange={(e) => onChange(e)}
            />
          }
          label="View All Proteins"
        />
        <FormControlLabel
          control={
            <Checkbox
              value='true'
              name="viewProteins"
              onChange={(e) => onChange(e)}
            />
          }
          label="View One Proteins"
        />
        <FormControlLabel
          control={
            <Checkbox
            value='true'
              name="viewtotalLiveStocks"
              onChange={(e) => onChange(e)}
            />
          }
          label="View Total Proteins"
        />
        <FormControlLabel
          control={
            <Checkbox
           value='true'
              name="viewtotalLiveStocksByResidence"
              onChange={(e) => onChange(e)}
            />
          }
          label="View  LiveStock By Residence"
        />
        <FormControlLabel
          control={
            <Checkbox
      value='true'
              name="viewtotalRanchLiveStocks"
              onChange={(e) => onChange(e)}
            />
          }
          label="View   Total Ranch LiveStock "
        />
        <FormControlLabel
          control={
            <Checkbox
          value='true'
              name="viewtotalRanchLiveStocksByResidence"
              onChange={(e) => onChange(e)}
            />
          }
          label="View Total Ranch LiveStock By Residence "
        />
      </FormGroup>
      <Controls.Button
        color="primary"
        variant="outlined"
        text="Add"
        onClick={(e) => {
          handleSumit(e)
        }}
        className="Button"
        type="submit"
      />
    </div>
  )
}

export default Routes
