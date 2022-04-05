import Controls from '../../ui/controls/Controls'
import React from 'react'
import { Form, useForm } from '../../ui/useForm'
import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import DeliveryAgentApiRequest from '../../../pages/posts/ranchMangment/request/ranchManagerDeliveryAgent'
import produce from 'immer'
const initialFValues = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  phoneNo: '',
  location:",",
  tinNumber:" ",
  address:"",
  editing: false,
}
const RanchManagerForm = ({
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
  const { addDerliveryAgent, updateDeliveryAgent } = DeliveryAgentApiRequest()
  const validate = (fieldValues = values) => {
    const temp = { ...errors }
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if ('firstName' in fieldValues)
      temp.firstName =
        fieldValues.firstName.length !== 0 ? '' : 'This field is required.'
          if ('userName' in fieldValues)
      temp.userName =
        fieldValues.userName.length !== 0 ? '' : 'This field is required.'
              if ('tinNumber' in fieldValues)
      temp.tinNumber =
        fieldValues.tinNumber.length !== 0 ? '' : 'This field is required.'
                  if ('address' in fieldValues)
      temp.address =
        fieldValues.address.length !== 0 ? '' : 'This field is required.'

    if ('lastName' in fieldValues)
      temp.lastName =
        fieldValues.lastName.length !== 0 ? '' : 'This field is required.'

    if ('phoneNo' in fieldValues)
      temp.phoneNo =
        fieldValues.phoneNo.length !== 0 ? '' : 'This field is required.'
    if ('email' in fieldValues)
      temp.email =
        regexEmail.test(fieldValues.email.toString().toLowerCase()) &&
        fieldValues.email.length != 0
          ? ''
          : 'Email is not valid.'
    if (values.editing == true) {
      if ('password' in fieldValues)
        temp.password =
          fieldValues.password.length == 0 || fieldValues.password.length > 7
            ? ''
            : 'Password must be atleast 8 characters.'
      if ('username' in fieldValues)
        temp.username =
          fieldValues.username.length != 0 ? '' : 'This field is required.'
    }
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
     
        addDerliveryAgent(values,).then((data) => {
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
                draft.unshift({ ...data.deliveryAgent})
              }),
            )
            NotifyMessage({
              message: 'Delivery Agent created.',
              type: 'success',
            })
            setOpenPopup(false)
            resetForm()
          }
        })
      } else {
        updateDeliveryAgent(values, recordForEdit.name).then((data) => {
          if (data.err) {
            setValues({ ...values, submitting: false })
            NotifyMessage({
              message: data.err,
              type: 'error',
            })
          } else {
            console.log(data)
            NotifyMessage({
              message: 'Delvery Agent  updated.',
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
            label="First Name"
            name="firstName"
            value={values.firstName}
            onChange={handleInputChange}
            error={errors.firstName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Last Name"
            name="lastName"
            value={values.lastName}
            onChange={handleInputChange}
            error={errors.lastName}
          />
        </Grid>
           <Grid item xs={12} md={6}>
          <Controls.Input
            label="UserName"
            name="userName"
            value={values.userName}
            onChange={handleInputChange}
            error={errors.userName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Phone Number"
            name="phoneNo"
            value={values.phoneNo}
            onChange={handleInputChange}
            error={errors.phoneNo}
          />
        </Grid>
           <Grid item xs={12} md={6}>
          <Controls.Input
            label=" Location"
            name="location"
            value={values.location}
            onChange={handleInputChange}
            error={errors.location}
          />
        </Grid>
                 <Grid item xs={12} md={6}>
          <Controls.Input
            label=" Address"
            name="address"
            value={values.address}
            onChange={handleInputChange}
            error={errors.address}
          />
        </Grid>
                  <Grid item xs={12} md={6}>
          <Controls.Input
            label=" TinNumber"
            name="tinNumber"
            value={values.tinNumber}
            onChange={handleInputChange}
            error={errors.tinNumber}
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
export default RanchManagerForm
