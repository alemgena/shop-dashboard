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
import{url} from '../../utiles/config'
import LiveStockApiRequests from '../posts/ranchMangment/request/ranchManagerLiveStock'
import LiveStockSupplierForm from '../../components/forms/LiveStock/LiveStockSuplierForm'
import LiveStockForm from '../../components/forms/LiveStock/LIveStock'
import axios from 'axios'
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewLiveStock from './recover'
import Vacciennn from './liveStockVaccien'
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
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
  { id: 'username', label: 'Username' },
  { id: 'ranch', label: 'Ranch' },
  { id: 'actions', label: 'Actions', disableSorting: true },
]

const RanchManager = (props) => {
  const { history } = props
  const classes = useStyles()
  const [openPopup, setOpenPopup] = useState(false)
    const [openPopupLiveStock, setOpenPopLiveStock] = useState(false)
  const [Q, setQ] = useState('')
  const [loading, setLoading] = useState(true)
  const [recordForEdit, setRecordForEdit] = useState(null)
  const { NotifyMessage, notify, setNotify } = Notify()
  const { viewAllLiveStockSupplier, deleteRanchManager } = LiveStockApiRequests()
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
    viewAllLiveStockSupplier().then((data) => {
   console.log(data)
      if (data.err) {
        NotifyMessage({
          message: data.err,
          type: 'error',
        })
      } else if (data.livestockSuppliers) {
        setLoading(false)
        setRanchManagers(data.livestockSuppliers)
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
        const columns = [
          'firstName',
          'lastName',
          'location',
          'ranch',
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


  const onDelete = (id) => {
  
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    })
    deleteRanchManager(id).then((data) => {

      if (data.err) {
        NotifyMessage({
          message: data.err,
          type: 'error',
        })
      } else {
        console.log(data)
        NotifyMessage({
          message: "LiveStockSuplier Deleted",
          type: 'success',
        })
        setRanchManagers(
          produce(ranchManagers, (draft) => {
            const index = ranchManagers.findIndex(
              (ranch) => ranch.id === id,
            )
            if (index !== -1) draft.splice(index, 1)
          }),
        )
      }
    })
  }
  const[openView,setOpenView]=useState(false);
  const[viewDataa,setViewDataa]=useState([])
    const[openVaccien,setVaccienOpen]=useState(false);
    const[vaccien,setVaccien]=useState([])
const openViewLiveStock=(item)=>{
  setOpenView(true);
  setViewDataa(item)
}
  const openInPopup = (item) => {
    setRecordForEdit({ ...item, editing: true })
    setOpenPopup(true)
  }
  const [id,setId]=useState('')
 const  vaccineDetaile=(item)=>{
setVaccienOpen(true)
setVaccien(item)
 }
   const openInLiveStock=(id)=>{
   setOpenPopLiveStock(true);
setId(id);
   }
  return (
    <OftadehLayout>
      <Typography className={classes.mb3} variant="h5" component="h1">
        LiveStock Supplier Mangement
      </Typography>
      <OftadehBreadcrumbs path={history} />
      <Toolbar>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Controls.Input
              label="Search LiveStock Supplier"
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
                  <TableRow key={index}>
                    <TableCell>{item.firstName}</TableCell>
                    <TableCell>{item.lastName}</TableCell>
                    <TableCell>{item.username}</TableCell>
                             <TableCell>{item.ranchname}</TableCell>
                    <TableCell>
                      <Controls.ActionButton
                        color="primary"
                        title="Update"
                        variant="contained"
                        onClick={() => {
                          openInPopup(item)
                        }}
                      >
                        <EditIcon fontSize="small" />
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
                              onDelete(item.id)
                            },
                          })
                        }}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </Controls.ActionButton>
                      <span style={{marginTop:"20px"}}>
                               <Controls.ActionButton
                        color="primary"
                        title="Add LiveStock"
                        variant="contained"
                        onClick={() => {
                          openInLiveStock(item.id)
                        }}
                      >
                        <Add fontSize="small" />
                      </Controls.ActionButton>
                      </span>
                      <span style={{marginTop:"20px"}}>
                               <Controls.ActionButton
                        color="primary"
                        title="View LiveStock"
                        variant="contained"
                        onClick={() => {
                          openViewLiveStock(item.id)
                        }}
                      >
                        <ViewListIcon fontSize="small" />
                      </Controls.ActionButton>
                      </span>
                               <span style={{marginTop:"20px"}}>
                               <Controls.ActionButton
                        color="primary"
                        title="View Vaccination"
                        variant="contained"
                        onClick={() => {
                          vaccineDetaile(item.id)
                        }}
                      >
                        <ViewListIcon fontSize="small" />
                      </Controls.ActionButton>
                      </span>
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
        title="LiveStock Supplier Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <LiveStockSupplierForm
          NotifyMessage={NotifyMessage}
          setOpenPopup={setOpenPopup}
          recordForEdit={recordForEdit}
          setRanchManagers={setRanchManagers}
        />
        </Popup>
            <Popup
        title="LiveStock Form"
        openPopup={openPopupLiveStock}
        setOpenPopup={setOpenPopLiveStock}
      >
            <LiveStockForm
          NotifyMessage={NotifyMessage}
          setOpenPopup={setOpenPopLiveStock}
          recordForEdit={recordForEdit}
          setRanchManagers={setRanchManagers}
          setId={id}
        />
      </Popup>
       <Popup
        title="LiveStock "
        openPopup={openView}
        setOpenPopup={setOpenView}
      >
            <ViewLiveStock
      id={viewDataa}
        />
      </Popup>
        <Popup
        title="Vaccienation"
        openPopup={openVaccien}
        setOpenPopup={setVaccienOpen}
      >
            <Vacciennn
      id={vaccien}
        />
      </Popup>
    </OftadehLayout>
  )
}

export default RanchManager
