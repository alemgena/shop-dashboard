import Controls from '../../ui/controls/Controls'
import React from 'react'
import { Form, useForm } from '../../ui/useForm'
import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import GovermentOfficeApi from '../../../pages/posts/ranchMangment/request/govermentOfficeRequestMain'
import produce from 'immer'
const initialFValues = {
  govOfficeName: '',
  govOfficePhoneNo: '',
  govOfficeEmail: '',
  location: '',
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
  const {    addGovermentOfiice,updateGovermentOfiice } = GovermentOfficeApi()
  const validate = (fieldValues = values) => {
    const temp = { ...errors }
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if ('govOfficeName' in fieldValues)
      temp.govOfficeName =
        fieldValues.govOfficeName.length !== 0 ? '' : 'This field is required.'
          if ('govOfficePhoneNo' in fieldValues)
      temp.govOfficePhoneNo =
        fieldValues.govOfficePhoneNo.length !== 0 ? '' : 'This field is required.'
     
    if ('govOfficeEmail' in fieldValues)
      temp.govOfficeEmail =
        regexEmail.test(fieldValues.govOfficeEmail.toString().toLowerCase()) &&
        fieldValues.govOfficeEmail.length != 0
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
        addGovermentOfiice(values,).then((data) => {
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
                draft.unshift({ ...data.govOffice})
              }),
            )
            NotifyMessage({
              message: 'Goverment Office  created.',
              type: 'success',
            })
            setOpenPopup(false)
            resetForm()
          }
        })
      } else {
        updateGovermentOfiice(values, recordForEdit.name).then((data) => {
          if (data.err) {
            setValues({ ...values, submitting: false })
            NotifyMessage({
              message: data.err,
              type: 'error',
            })
          } else {
            console.log(data)
            NotifyMessage({
              message: ' goverment Office  updated.',
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
            label="Name"
            name="govOfficeName"
            value={values.govOfficeName}
            onChange={handleInputChange}
            error={errors.govOfficeName}
          />
        </Grid>
       
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Email"
            name="govOfficeEmail"
            value={values.govOfficeEmail}
            onChange={handleInputChange}
            error={errors.govOfficeEmail}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Phone Number"
            name="govOfficePhoneNo"
            value={values.govOfficePhoneNo}
            onChange={handleInputChange}
            error={errors.govOfficePhoneNo}
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
