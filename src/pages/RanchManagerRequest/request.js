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
import OftadehLayout from '../../components/OftadehLayout/OftadehLayout'
import OftadehBreadcrumbs from '../../components/OftadehBreadcrumbs/OftadehBreadcrumbs'
import { makeStyles, TextField } from '@material-ui/core'
import { Button } from '@mui/material'
import { url } from '../../utiles/config'
import requestApi from '../posts/ranchMangment/request/ranchManagerViewRequest'
import LiveStockSupplierForm from '../../components/forms/LiveStock/LiveStockSuplierForm'
import LiveStockForm from '../../components/forms/LiveStock/LIveStock'
import axios from 'axios'
import ViewListIcon from '@mui/icons-material/ViewList'
import RanchSupplayApiRequests from '../posts/ranchMangment/request/ranchSupplay'
import ApprovalIcon from '@mui/icons-material/Approval'
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
  { id: 'approved', label: 'Approved' },
  { id: 'ordered', label: 'Ordered' },
  { id: 'type', label: 'Type' },
  { id: 'ranchname', label: 'Ranch' },
  { id: 'createdAt', label: 'CreatedAt' },
  { id: 'actions', label: 'Actions', disableSorting: true },
]

const RanchManager = (props) => {
  const { viewAllRanchSUpplay, deleteRanchSUpplay } = RanchSupplayApiRequests()
  const { history } = props
  const classes = useStyles()
  const [openPopup, setOpenPopup] = useState(false)
  const [openPopupLiveStock, setOpenPopLiveStock] = useState(false)
  const [Q, setQ] = useState('')
  const [loading, setLoading] = useState(false)
  const [recordForEdit, setRecordForEdit] = useState(null)
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
  const [ranch, setRanch] = useState()
  useEffect(()=>{
  viewAllRanchSUpplay().then((data) => {
      console.log(data)
      if (data.err) {
        NotifyMessage({
          message: data.err,
          type: 'error',
        })
      } else if (data.supplies) {
        // console.log(data)
        setLoading(false)
        data.supplies.forEach((el) => {
        setRanch(el.name)
      }
    )
  }
})
  },[])
  console.log(ranch)
  useEffect(() => {
    console.log('the ranch that is send to the server',ranch)
    viewAllRequest().then((data) => {
      console.log(data)
      if (data.err) {
        NotifyMessage({
          message: data.err,
          type: 'error',
        })
      } else if (data.result) {
        console.log(data)
        setLoading(false)
        setRanchManagers(data.result)
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
  const [openView, setOpenView] = useState(false)
  const [viewDataa, setViewDataa] = useState([])
  const openViewLiveStock = (item) => {
    setOpenView(true)

    setViewDataa(item)
  }
  const openInPopup = (item) => {
    setRecordForEdit({ ...item, editing: true })
    setOpenPopup(true)
  }
  const [id, setId] = useState('')
  const openInLiveStock = (id) => {
    let token = localStorage.getItem('token')
    axios
      .get(`${url}/ranch-manager-livestocksupplier-livestock-quantity/${id}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.livestockSupplierQuantity)
      })
    setOpenPopLiveStock(true)
    setId(id)
  }

  const [openRanch, setOpenRanch] = useState(false)
  const [newData, setNewData] = useState()
  let newRanch
  const handelDetailes = (id) => {
    newRanch = ranchManagers.filter((element) => element.id === id)
    setNewData(newRanch)
    setOpenRanch(true)
  }
  console.log(newData)

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
                    <TableCell>
                      {item.approved ? <span>True</span> : <span>False</span>}
                    </TableCell>
                    <TableCell>
                      {item.ordered ? <span>True</span> : <span>False</span>}
                    </TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.ranchname}</TableCell>
                    <TableCell>
                      {new Date(item.createdAt).toLocaleString('en-US', {
                        hour12: true,
                      })}
                    </TableCell>
                    <TableCell>
                      <Controls.ActionButton
                        color="primary"
                        title="Approve"
                        variant="contained"
                        onClick={() => {
                          openInPopup(item)
                        }}
                      >
                        <ApprovalIcon fontSize="small" />
                      </Controls.ActionButton>
                      <span style={{ marginTop: '20px' }}>
                        <Controls.ActionButton
                          color="primary"
                          title="View Detile Request"
                          variant="contained"
                          onClick={() => {
                            handelDetailes(item.id)
                          }}
                        >
                          <ViewListIcon fontSize="small" />
                        </Controls.ActionButton>
                      </span>

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
                        <DeleteOutlineIcon fontSize="small" />
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
        title="Ranch Supplay Data"
        openPopup={openRanch}
        setOpenPopup={setOpenRanch}
      ></Popup>
    </OftadehLayout>
  )
}

export default RanchManager
