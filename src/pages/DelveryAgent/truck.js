import React from 'react'
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
import { Search, Add } from '@mui/icons-material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import produce from 'immer'
import PageSpinner from '../../components/ui/PageSpinner'
//import OftadehLayout from '../../components/OftadehLayout/OftadehLayout'
import OftadehLayout from '../../components/Layout/Layout'
import OftadehBreadcrumbs from  '../../components/OftadehBreadcrumbs/OftadehBreadcrumbs'
import { makeStyles, TextField } from '@material-ui/core'
import { Button } from '@mui/material'

import TruckApiRequest from '../posts/ranchMangment/request/truckRequest'
import TruckForm from '../../components/forms/DeliveryAgent/truck'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  { id: 'capacity', label: 'Capacity' },
  { id: 'cargo', label: 'Cargo' },
  { id: 'location', label: 'Current Location' },
  { id: 'licencePlate', label: 'Licence Plate' },
  { id: 'onduty', label: 'ON Duty' },
  { id: 'actions', label: 'Actions', disableSorting: true },
]

const RanchManager = (props) => {
  const { history } = props
  const classes = useStyles()
  const [openPopup, setOpenPopup] = useState(false)
  const [Q, setQ] = useState('')
  const [loading, setLoading] = useState(true)
  const [recordForEdit, setRecordForEdit] = useState(null)
  const { NotifyMessage, notify, setNotify } = Notify()
  const {viewTruck,deleteTruck  } = TruckApiRequest()
  const [deliveryAgent,setDeliveryAgent] = useState([])
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
    viewTruck().then((data) => {
   console.log('all truck is',data)
      if (data.err) {
        NotifyMessage({
          message: data.err,
          type: 'error',
        })
     
      } else if (data) {
       // console.log(data)
        setLoading(false)
        setDeliveryAgent(data)
      }
    })
  }, [])
console.log(deliveryAgent)
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(deliveryAgent, headCells, filterFn)

  useEffect(() => {
    setFilterFn({
      fn: (items) => {
       const columns = [
          'firstName',
          'lastName',
          'phoneNo',
          'email',
          'username',
        
        ]

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
    deleteTruck(ranchName).then((data) => {
      if (data.err) {
        NotifyMessage({
          message: data.err,
          type: 'error',
        })
      } else {
        NotifyMessage({
          message: data.msg,
          type: 'success',
        })
        setDeliveryAgent(
          produce(deliveryAgent, (draft) => {
            const index = deliveryAgent.findIndex(
              (ranch) => ranch.username === ranchName,
            )
            if (index !== -1) draft.splice(index, 1)
          }),
        )
      }
    })
  }
  const openInPopup = (item) => {
    setRecordForEdit({ ...item, editing: true })
    setOpenPopup(true)
  }
  const[openRanch,setOpenRanch]=useState(false)
   const[newData,setNewData]=useState(false)
  let newRanch;

  
  return (
    <OftadehLayout>
      <Typography className={classes.mb3} variant="h5" component="h1">
        Ranch Mangement
      </Typography>
      <OftadehBreadcrumbs path={history} />
      <Toolbar>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Controls.Input
              label="Search Delivery Agent"
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
          <Grid item xs={12} sm={4}>
            <Controls.Button
              text="Add New"
              variant="outlined"
              startIcon={<Add />}
              color="secondary"
              onClick={() => {
                setOpenPopup(true)
                setRecordForEdit(null)
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
                recordsAfterPagingAndSorting().map((item,index) => (
                  <TableRow  key={index}>
                    <TableCell>{item.capacity}</TableCell>
                    <TableCell>{item.cargo}</TableCell>
                    <TableCell>{item.currentLocation}</TableCell>
                    <TableCell>{item.licencePlate}</TableCell>
                     <TableCell>{item.licencePlate?<span>True</span>:<span>false</span>}</TableCell>
                    <TableCell>
                      <Controls.ActionButton
                        color="primary"
                        title="Update"
                        variant="contained"
                        onClick={() => {
                          openInPopup(item)
                        }}
                      >
                        <EditIcon fontSize="medium" />
                      </Controls.ActionButton>
                      <Controls.ActionButton
                        color="secondary"
                        title="Delete"
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: 'Are you sure to delete this product?',
                            subTitle: "You can't undo this operation",
                            onConfirm: () => {
                              onDelete(item.username)
                            },
                          })
                        }}
                      >
                        <DeleteOutlineIcon fontSize="medium" />
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
        title="Delivery Truck Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <TruckForm
          NotifyMessage={NotifyMessage}
          setOpenPopup={setOpenPopup}
          recordForEdit={recordForEdit}
          setRanchManagers={setDeliveryAgent}
        />
      </Popup>
    </OftadehLayout>
  )
}

export default RanchManager
