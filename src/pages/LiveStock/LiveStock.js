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
import LiveStockApiRequests from '../posts/ranchMangment/request/ranchLiveStock'
import LiveStockForm from '../../components/forms/LiveStock/LIveStock'

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
  { id: 'type', label: 'Type' },
  { id: 'breed', label: 'Breed' },
  { id: 'tagNo', label: 'TagNo' },
  { id: 'weight', label: 'Weight' },
  { id: 'age', label: 'Age' },
  { id: 'residential', label: 'Residentioal' },
  { id: 'actions', label: 'Actions', disableSorting: true },
]

const RanchManager = (props) => {
  const { history } = props
  const classes = useStyles()
  const [openPopup, setOpenPopup] = useState(false)
  const [Q, setQ] = useState('')
  const [loading, setLoading] = useState(false)
  const [recordForEdit, setRecordForEdit] = useState(null)
  const { NotifyMessage, notify, setNotify } = Notify()
  const {viewAllLiveStock, deleteLiveStock } = LiveStockApiRequests()
  const [liveStock, setLiveStock] = useState([])
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
    viewAllLiveStock().then((data) => {
   
      if (data.err) {
        NotifyMessage({
          message: data.err,
          type: 'error',
        })
      } else if (data.livestockSuppliers) {
        console.log(data)
        setLoading(false)
        setLiveStock(data.livestockSuppliers)
      }
    })
  }, [])

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(liveStock, headCells, filterFn)

  useEffect(() => {
    setFilterFn({
      fn: (items) => {
        const columns = [
          'type',
          'breed',
          'tagNo',
          'weight',
          'age',
          'residential',
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
    deleteLiveStock(ranchName).then((data) => {
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
        setLiveStock(
          produce(liveStock, (draft) => {
            const index = setLiveStock.findIndex(
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
              label="Search Ranch Manager"
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
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.phoneNo}</TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.ranch}</TableCell>

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
                          <Controls.ActionButton
                        color="primary"
                        title="Add LiveStock"
                        variant="contained"
                        onClick={() => {
                          openInPopup(item)
                        }}
                      >
                        <Add fontSize="medium" />
                      </Controls.ActionButton>
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
        title="LiveStock Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <LiveStockForm
          NotifyMessage={NotifyMessage}
          setOpenPopup={setOpenPopup}
          recordForEdit={recordForEdit}
          setRanchManagers={setLiveStock}
        />
      </Popup>
    </OftadehLayout>
  )
}

export default RanchManager
