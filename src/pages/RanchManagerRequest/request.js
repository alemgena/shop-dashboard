import React from 'react'
import fetch from 'isomorphic-fetch'
import Norecords from '../../components/ui/Norecords'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { Grid, InputAdornment, Toolbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import useTable from '../../components/ui/useTable'
import Notification from '../../components/ui/Notification'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import Notify from '../../components/ui/Notify'
import Popup from '../../components/ui/Popup'
import Controls from '../../components/ui/controls/Controls'
import TextField from '@mui/material/TextField'
import { Form, useForm } from '../../components/ui/useForm'
import {
  Search,
  Add,
  AirlineSeatIndividualSuiteSharp,
} from '@mui/icons-material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import produce from 'immer'
import PageSpinner from '../../components/ui/PageSpinner'
//import OftadehLayout from '../../components/OftadehLayout/OftadehLayout'
import OftadehLayout from '../../components/Layout/Layout'
import OftadehBreadcrumbs from '../../components/OftadehBreadcrumbs/OftadehBreadcrumbs'
import { makeStyles } from '@material-ui/core'
import { Button } from '@mui/material'
import { url } from '../../utiles/config'
import requestApi from '../posts/ranchMangment/request/ranchManagerViewRequest'
import LiveStockSupplierForm from '../../components/forms/LiveStock/LiveStockSuplierForm'
import LiveStockForm from '../../components/forms/LiveStock/LIveStock'
import axios from 'axios'
import ViewListIcon from '@mui/icons-material/ViewList'
import RanchSupplayApiRequests from '../posts/ranchMangment/request/ranchSupplay'
import ApprovalIcon from '@mui/icons-material/Approval'
import Truck from './requestLiveStocks'
import LiveStockRequest from './requestLiveStock'
import ReplayIcon from '@mui/icons-material/Replay'
import PersonIcon from '@mui/icons-material/Person'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  text: {
    width: 350,
  },
  my3: {
    margin: '1.3rem 0',
  },
  mb3: {
    margin: '1.3rem 0',
  },
  mb0: {
    marginBottom: 0,
  },
  mRight: {
    marginRight: '.85rem',
  },
  p1: {
    padding: '.85rem',
  },
  borderTextField: {
    marginRight: '20px',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#203040',
      },
      '&:hover fieldset': {
        borderColor: '#203040',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#203040',
        label: {
          display: 'none',
        },
      },
    },
  },
  formLabel: {
    color: '#203040',
    '&.Mui-focused': {
      color: '#203040',
    },
  },
  button: {
    backgroundColor: '#203040',
    color: 'white',
    fontFamily: 'Times New Roman',
  },
}))

const headCells = [
  { id: 'approved', label: 'Approved' },
  { id: 'ranchname', label: 'Ranch' },
  { id: 'createdAt', label: 'CreatedAt' },
  { id: 'actions', label: 'Actions', disableSorting: true },
]

const RanchManager = (props) => {
  const initialFValues = {
    type: '',
    quantity: '',
  }
  const validate = (fieldValues = values) => {
    const temp = { ...errors }
    //const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if ('type' in fieldValues)
      temp.type = fieldValues.type.length !== 0 ? '' : 'This field is required.'
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
      sendDataResponse(values).then((data) => {
        console.log(data)
        if(data.err){
              if (data.err) {
        NotifyMessage({
          message: data.err,
          type: 'error',
        })
      }
        }
        else if(data.message){
              NotifyMessage({
          message: data.message,
        type: 'success',
        })
        setQuantityFrom(false)
        }
      })
    }
  }
  const { history } = props
  const classes = useStyles()
  const [Q, setQ] = useState('')
  const [loading, setLoading] = useState(false)
  const { NotifyMessage, notify, setNotify } = Notify()
  const { viewAllRequest, deleteRanchManager } = requestApi()
  const [ranchManagers, setRanchManagers] = useState([])
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items
    },
  })
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  })
  useEffect(() => {
    viewAllRequest().then((data) => {
      console.log(data)
      if (data.err) {
        NotifyMessage({
          message: data.err,
          type: 'error',
        })
      } else if (data.requests) {
        console.log(data)
        setLoading(false)
        setRanchManagers(data.requests)
      }
    })
  }, [])
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(ranchManagers, headCells, filterFn)
  useEffect(() => {
    setFilterFn({
      fn: (items) => {
        const columns = ['firstName', 'lastName', 'location', 'ranch']
        if (Q === '') return items
        else {
          return items.filter((x) => {
            return columns.some((column) => {
              return x[column].toString().toLowerCase().includes(Q)
            })
          })
        }
      },
    })
  }, [Q])
  const onDelete = (ranchName) => {
    console.log(ranchName)
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    })
    deleteRanchManager(ranchName).then((data) => {
      if (data.err) {
        NotifyMessage({
          message: data.err,
          type: 'error',
        })
      } else {
        console.log(data)
        NotifyMessage({
          message: data.msg,
          type: 'success',
        })
        setRanchManagers(
          produce(ranchManagers, (draft) => {
            const index = ranchManagers.findIndex(
              (ranch) => ranch.username === ranchName,
            )
            if (index !== -1) draft.splice(index, 1)
          }),
        )
      }
    })
  }
  const [openRanch, setOpenRanch] = useState(false)
  const [newData, setNewData] = useState()
  const handelDetailes = (item) => {
    //  newRanch = ranchManagers.filter((element) => element.id === id)
    console.log(item.request.livestockrequest)
    setNewData(item.request.livestockrequest)
    setOpenRanch(true)
  }
  console.log(newData)
  const [truck, openTruck] = useState(false)
  const [truckId, setTrickId] = useState()
  const [quantityForm, setQuantityFrom] = useState(false)
  const sendResponse = (item) => {
    setQuantityFrom(true)
    // sendDataResponse(item)
  }
  const sendDataResponse = (data) => {
    let token = localStorage.getItem('token')
    let truckIdd = localStorage.getItem('truckId')
    console.log(truckIdd)
    console.log(data)
    return fetch(`${url}/respond-to-request/${truckIdd}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then((response) => {
      return response.json()
    })
  }

  return (
    <OftadehLayout>
      <Typography className={classes.mb3} variant="h5" component="h1">
        Request Mangement
      </Typography>
      <OftadehBreadcrumbs path={history} />
      <Toolbar>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Controls.Input
              label="Search Request"
              fullWidth
              value={Q}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setQ(e.target.value.trimLeft().toLowerCase())
              }}
            />
          </Grid>
        </Grid>
      </Toolbar>
      {loading ? (
        <PageSpinner />
      ) : (
        <>
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().length > 0 ? (
                recordsAfterPagingAndSorting().map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>True</TableCell>
                    <TableCell>{item.request_ranchname}</TableCell>
                    <TableCell>
                      {new Date(item.createdAt).toLocaleString('en-US', {
                        hour12: true,
                      })}
                    </TableCell>
                    <TableCell>
                      <span style={{ marginTop: '20px' }}>
                        <Controls.ActionButton
                          color="primary"
                          title="View Detile Request"
                          variant="contained"
                          onClick={() => {
                            handelDetailes(item)
                          }}
                        >
                          <ViewListIcon fontSize="small" />
                        </Controls.ActionButton>
                      </span>

                      <Controls.ActionButton
                        color="secondary"
                        title="respond to request"
                        onClick={() => {
                          sendResponse(item)
                        }}
                      >
                        <ReplayIcon fontSize="small" />
                      </Controls.ActionButton>
                      <Controls.ActionButton
                        color="secondary"
                        title="Select Truck"
                        onClick={() => {
                          openTruck(true)
                        }}
                      >
                        <PersonIcon fontSize="small" />
                      </Controls.ActionButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <Norecords col={5} />
              )}
            </TableBody>
          </TblContainer>
          <TblPagination />
        </>
      )}

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notification notify={notify} setNotify={setNotify} />
      <Popup
        title=" Request  Data"
        openPopup={openRanch}
        setOpenPopup={setOpenRanch}
      >
        <LiveStockRequest data={newData} />
      </Popup>
      <Popup title=" Request  Data" openPopup={truck} setOpenPopup={openTruck}>
        <Truck setTrickId={setTrickId} />
      </Popup>
      <Popup
        title=" Request  Data"
        openPopup={quantityForm}
        setOpenPopup={setQuantityFrom}
      >
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
              <TextField
                label="Quantity"
                name="quantity"
                type="number"
                value={values.quantity}
                onChange={handleInputChange}
                error={errors.quantity}
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
      </Popup>
    </OftadehLayout>
  )
}

export default RanchManager
