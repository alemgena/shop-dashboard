import Controls from '../../../components/ui/controls/Controls'
import React from 'react'
import { Form, useForm } from '../../../components/ui/useForm'
import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import RanchSupplayApiRequests from "../../../pages/posts/ranchMangment/request/ranchSupplay"
import RanchApiRequests from '../../../pages/posts/ranchMangment/request/requestRanch'
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import produce from 'immer'
//import AdapterDateFns from '@mui/lab/AdapterDateFns';
//import LocalizationProvider from '@mui/lab/LocalizationProvider';
//import TimePicker from '@mui/lab/TimePicker';
//import DateTimePicker from '@mui/lab/DateTimePicker';
//import DesktopDatePicker from '@mui/lab/DesktopDatePicker';//
//import MobileDatePicker from '@mui/lab/MobileDatePicker';
const initialFValues = {
  name: '',
  quantity: '',
  dosage: '',
  productionDate: '',
  ExpirationDate: '',
  discription:" ",
  source:"",
  rounds:'',
  editing: false,

}
const RanchManagerForm = ({
  NotifyMessage,
  setOpenPopup,
  recordForEdit,
  setRanchManagers,
}) => {
  const { viewAllRanchs } = RanchApiRequests()

  useEffect(() => {
    if (recordForEdit !== null) {
      setValues({
        ...recordForEdit,
      })
    }
  }, [recordForEdit])
  const [ranchs, setRanchs] = useState([])
  const[liveStockSupplier,setLiveStockSupplier]=useState([]);
  useEffect(() => {
    viewAllRanchs().then((data) => {
      if (data.err) {
        NotifyMessage({
          message: data.err,
          type: 'error',
        })
      } else if (data.ranches) {
        console.log(data)
        setRanchs(data.ranches)
      }
    })
  }, [])
  const { addRanchSupplay,updateRanchSUpplay, } = RanchSupplayApiRequests()
  const validate = (fieldValues = values) => {
    const temp = { ...errors }
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if ('type' in fieldValues)
      temp.type =
        fieldValues.type.length !== 0 ? '' : 'This field is required.'

    if ('name' in fieldValues)
      temp.name =
        fieldValues.name.length !== 0 ? '' : 'This field is required.'

    if ('source' in fieldValues)
      temp.source =
        fieldValues.source.length !== 0 ? '' : 'This field is required.'

    if ('discription' in fieldValues)
      temp.discription =
        fieldValues.discription.length !== 0 ? '' : 'This field is required.'
    if ('quantity' in fieldValues)
      temp.quantity =
        fieldValues.quantity.length !== 0 ? '' : 'This field is required.'
   if ('dosage' in fieldValues)
      temp.dosage =
        fieldValues.dosage.length !== 0 ? '' : 'This field is required.'
     if ('rounds' in fieldValues)
      temp.rounds =
        fieldValues.rounds.length !== 0 ? '' : 'This field is required.'
    if ('productionDate' in fieldValues)
      temp.productionDate =
        fieldValues.productionDate.length !== 0 ? '' : 'This field is required.'
    if ('ExpirationDate' in fieldValues)
      temp.ExpirationDate = fieldValues.ExpirationDate != 0? '' : 'This field is required.'


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

        console.log(values);
        
        const route='vaccine'
       addRanchSupplay(values,route).then((data) => {
                   console.log(data)
          if (data.err) {
            setValues({ ...values, submitting: false })
    
          } else {
            setOpen(true)
            resetForm()
          }
        })
       
    }
  }
    const [open, setOpen] = React.useState(false);
  return (
    <div>
        <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
       Vaccine Added
        </Alert>
      </Collapse>
    <Form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Controls.Input
            fullWidth
            label="Name"
            name="name"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Quantity"
            name="quantity"
            value={values.quantity}
            onChange={handleInputChange}
            error={errors.quantity}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="DosAge"
            name="dosage"
            value={values.dosage}
            onChange={handleInputChange}
            error={errors.dosAge}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="ProductionDate"
            name="productionDate"
            value={values.productionDate}
            onChange={handleInputChange}
            error={errors.productionDate}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="ExpirationDate"
            name="ExpirationDate"
            value={values.ExpirationDate}
            onChange={handleInputChange}
            error={errors.ExpirationDate}
          />
        </Grid>
               <Grid item xs={12} md={6}>
          <Controls.Input
            label="Descrieption"
            name="discription"
            value={values.discription}
            onChange={handleInputChange}
            error={errors.discription}
          />
        </Grid>
                 <Grid item xs={12} md={6}>
          <Controls.Input
            label="Rounds"
            name="rounds"
            value={values.rounds}
            onChange={handleInputChange}
            error={errors.rounds}
          />
        </Grid>
         <Grid item xs={12} md={6}>
          <Controls.Input
            label="Source"
            name="source"
            value={values.source}
            onChange={handleInputChange}
            error={errors.source}
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
    </div>
  )
}
export default RanchManagerForm
