import Controls from '../../ui/controls/Controls'
import React from 'react'
import { Form, useForm } from '../../ui/useForm'
import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import TruckApiRequest from '../../../pages/posts/ranchMangment/request/truckRequest'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import produce from 'immer'
import DeliveryAgentApiRequest from '../../../pages/posts/ranchMangment/request/deliveryAgentRequest'
import DriverApiRequests from '../../../pages/posts/ranchMangment/request/requestRanchManager'
const options = ['Option 1', 'Option 2']
const initialFValues = {
   licencePlate:' ',
   capacity:' ',
   ranchs:null,
   deliveryAgent:null,
  editing: false,
}
const TruckForm = ({
  NotifyMessage,
  setOpenPopup,
  recordForEdit,
  setRanchManagers,
}) => {

  useEffect(() => {
    if (recordForEdit !== null) {
      setValues({
        ...recordForEdit,
      })
    }
  }, [recordForEdit])
  const [ranchs, setDriver] = useState([])
    const [deliverAgents, setDeliveryAgent] = useState([])

const{viewUseByRole}=DriverApiRequests();
const route='truck_driver'
    const {viewAllDeliveryAgent} = DeliveryAgentApiRequest()
      useEffect(() => {
    viewUseByRole(route).then((data) => {
      console.log(data)
      if (data.err) {
        NotifyMessage({
          message: data.err,
          type: 'error',
        })
      } else if (data.users) {
        console.log(data)
        setDriver(data.users)
      }
    })
  }, [])
    useEffect(() => {
    viewAllDeliveryAgent().then((data) => {
      console.log(data)
      if (data.err) {
        NotifyMessage({
          message: data.err,
          type: 'error',
        })
      } else if (data.deliveryAgent) {
        console.log(data)
        setDeliveryAgent(data.deliveryAgent)
      }
    })
  }, [])
  const {addTruck,updateTruck} = TruckApiRequest()
  const validate = (fieldValues = values) => {
    const temp = { ...errors }
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if ('licencePlate' in fieldValues)
      temp.licencePlate =
        fieldValues.licencePlate.length !== 0 ? '' : 'This field is required.'

    if ('capacity' in fieldValues)
      temp.capacity =
        fieldValues.capacity.length !== 0 ? '' : 'This field is required.'
            if ('ranch' in fieldValues)
      temp.ranch = fieldValues.ranch != null ? '' : 'This field is required.'

    setErrors({
      ...temp,
    })

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === '')
  }

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFValues, true, validate)
  const handleSubmit = (e) => {
    e.preventDefault()

    if (validate()) {
      setValues({ ...values, submitting: true })
      if (values.editing === false) {
        console.log(values.ranch.id)
          console.log(values.deliverAgent.id)
        
        addTruck(values,values.ranch.id,values.deliverAgent.id).then((data) => {
          console.log(data)
          if (data.err) {
            setValues({ ...values, submitting: false })
            NotifyMessage({
              message: data.err,
              type: 'error',
            })
          } else {
            setRanchManagers(
              produce((draft) => {
                draft.unshift({ ...data.user})
              }),
            )
            NotifyMessage({
              message: 'Truck  created.',
              type: 'success',
            })
            setOpenPopup(false)
            resetForm()
          }
        })
      } else {
        updateTruck(values, recordForEdit.name).then((data) => {
          if (data.err) {
            setValues({ ...values, submitting: false })
            NotifyMessage({
              message: data.err,
              type: 'error',
            })
          } else {
            console.log(data)
            NotifyMessage({
              message: 'Ranch updated.',
              type: 'success',
            })
            setOpenPopup(false)
            resetForm()
            setRanchManagers(
              produce((draft) => {
                const index = draft.findIndex(
                  (ranch) => ranch.name === recordForEdit.name,
                )
                if (index !== -1) draft[index] = data.updatedResult
              }),
            )
          }
        })
      }
    }
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Controls.Input
            fullWidth
            label=" Licence Plate"
            name="licencePlate"
            value={values.licencePlate}
            onChange={handleInputChange}
            error={errors.licencePlate}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Capacity"
            name="capacity"
            value={values.capacity}
            onChange={handleInputChange}
            error={errors.capacity}
          />
        </Grid>
              <Grid item xs={12} md={6}>
          <Controls.AutoCompleteDriver
            values={values}
            setChange={setValues}
            options={ranchs}
            label="Driver"
            error={errors.ranch}
          />
        </Grid>
          <Grid item xs={12} md={6}>
          <Controls.AutoCompleteAgent
            values={values}
            setChange={setValues}
            options={deliverAgents}
            label="DeliveryAgent"
            error={errors.ranch}
          />
        </Grid>
        <Grid item xs={12}>
          <Controls.Button
            color="primary"
            variant="outlined"
            disabled={values.submitting ? true : false}
            text={
              values.editing === true
                ? values.submitting
                  ? 'Editing...'
                  : 'Edit'
                : values.submitting
                ? 'Adding...'
                : 'Add'
            }
            className="Button"
            type="submit"
          />
        </Grid>
      </Grid>
    </Form>
  )
}
export default TruckForm
