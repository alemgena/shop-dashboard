import Controls from '../../ui/controls/Controls'
import React from 'react'
import { Form, useForm } from '../../ui/useForm'
import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import LiveStockApiRequests from '../../../pages/posts/ranchMangment/request/ranchLiveStock'
import RanchApiRequests from '../../../pages/posts/ranchMangment/request/requestRanch'

import produce from 'immer'
const initialFValues = {
  type: '',
  breed: '',
  tagNo: '',
  weight: '',
  residential: '',
age:'',
origin:'',
  editing: false,
}
const RanchManagerForm = ({
  setId,
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
  const [ranchs, setRanchs] = useState([])
  const [liveStockSupplier, setLiveStockSupplier] = useState([])
  console.log(setId)

  const { addLiveStock, updateRanch } = LiveStockApiRequests()
  const validate = (fieldValues = values) => {
    const temp = { ...errors }
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if ('type' in fieldValues)
      temp.type = fieldValues.type.length !== 0 ? '' : 'This field is required.'

    if ('breed' in fieldValues)
      temp.breed =
        fieldValues.breed.length !== 0 ? '' : 'This field is required.'

    if ('tagNo' in fieldValues)
      temp.tagNo =
        fieldValues.tagNo.length !== 0 ? '' : 'This field is required.'
    if ('weight' in fieldValues)
      temp.weight =
        fieldValues.weight.length !== 0 ? '' : 'This field is required.'
    if ('weight' in fieldValues)
      temp.weight =
        fieldValues.weight.length !== 0 ? '' : 'This field is required.'
    if ('residential' in fieldValues)
      temp.residential =
        fieldValues.residential.length !== 0 ? '' : 'This field is required.'
    if ('ranch' in fieldValues)
      temp.ranch = fieldValues.ranch != null ? '' : 'This field is required.'
    if ('livestock' in fieldValues)
      temp.livestock =
        fieldValues.livestock != null ? '' : 'This field is required.'
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
    
        addLiveStock(values, setId).then((data) => {
          
   console.log(data)
          if (data.err) {
            setValues({ ...values, submitting: false })
            NotifyMessage({
              message: data.err,
              type: 'error',
            })
          } else {
        
            NotifyMessage({
              message: 'LiveStock  created.',
              type: 'success',
            })
            setOpenPopup(false)
            resetForm()
          }
        })
      } else {
        updateRanch(values, recordForEdit.name).then((data) => {
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
            label="Type"
            name="type"
            value={values.type}
            onChange={handleInputChange}
            error={errors.type}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Breed"
            name="breed"
            value={values.breed}
            onChange={handleInputChange}
            error={errors.breed}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="TagNo"
            name="tagNo"
            value={values.tagNo}
            onChange={handleInputChange}
            error={errors.tagNo}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Weight"
            name="weight"
            value={values.weight}
            onChange={handleInputChange}
            error={errors.weight}
          />
        </Grid>
         <Grid item xs={12} md={6}>
          <Controls.Input
            label="Orgin"
            name="origin"
            value={values.origin}
            onChange={handleInputChange}
            error={errors.origin}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Residential"
            name="residential"
            value={values.residential}
            onChange={handleInputChange}
            error={errors.residential}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Age"
            name="age"
            value={values.age}
            onChange={handleInputChange}
            error={errors.age}
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
