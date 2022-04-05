import React from 'react'
//import PageTitle from "../components/layout/PageTitle";
//import ContentWrapper from '../../../components/ui/ContentWrapper'
import Norecords from '../../../components/ui/Norecords'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { Grid, InputAdornment, Toolbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import useTable from '../../../components/ui/useTable'
import Notification from '../../../components/ui/Notification'
import ConfirmDialog from '../../../components/ui/ConfirmDialog'
import Notify from '../../../components/ui/Notify'
import Popup from '../../../components/ui/Popup'
import Controls from '../../../components/ui/controls/Controls'
import { Search, Add } from '@mui/icons-material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'

import AllMedicen from '../../posts/ranchMangment/request/InspectorRequest/AllMedicen'
import produce from 'immer'
import PageSpinner from '../../../components/ui/PageSpinner'
//import OftadehLayout from '../../../components/Layout/Layout'
import OftadehLayout from '../../../components/Layout/Layout'
import OftadehBreadcrumbs from '../../../components/OftadehBreadcrumbs/OftadehBreadcrumbs'
import { makeStyles, TextField } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import ViewListIcon from '@mui/icons-material/ViewList'
import { ranchSlice } from '../../../slice/ranch'
import { Button } from '@mui/material'

const headCells = [
  { id: 'name', label: 'Name' },
  { id: 'ExpirationDate', label: 'ExpirationDate' },
  { id: 'productionDate', label: 'ProductionDate' },
  { id: 'dosage', label: 'Dosage' },
    { id: 'round', label: 'Round' },
  { id: 'actions', label: 'Actions', disableSorting: true },
]
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
const ManageRanch = (props) => {
  const dispatch = useDispatch()
  const ranchAction = ranchSlice.actions
  const { history } = props
  const classes = useStyles()
  const [openPopup, setOpenPopup] = useState(false)
  const [Q, setQ] = useState('')
  const [loading, setLoading] = useState(true)
  const [recordForEdit, setRecordForEdit] = useState(null)
  const { NotifyMessage, notify, setNotify } = Notify()
  const { viewAllVaccien, deleteRanch } = AllMedicen()
  const [ranchs, setRanchs] = useState([])
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
    viewAllVaccien().then((data) => {
      console.log(data)
      if (data.err) {
        NotifyMessage({
          message: data.err,
          type: 'error',
        })
      } else if (data.medicines) {
        setLoading(false)
        setRanchs(data.medicines)
        dispatch(ranchAction.setRanchs(data.ranches))
      }
    })
  }, [])
  console.log(ranchs)
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(ranchs, headCells, filterFn)

  useEffect(() => {
    setFilterFn({
      fn: (items) => {
        const columns = ['name', 'area', 'distance', 'location']

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
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    })
    deleteRanch(ranchName).then((data) => {
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
        setRanchs(
          produce(ranchs, (draft) => {
            const index = ranchs.findIndex((ranch) => ranch.name === ranchName)
            if (index !== -1) draft.splice(index, 1)
          }),
        )
      }
    })
  }
  const [ranch, setRanch] = useState()
  const openInPopup = (id) => {
    setRanch(id)
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
              label="Search Medicine"
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
                recordsAfterPagingAndSorting().map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.ExpirationDate}</TableCell>
                    <TableCell>{item.productionDate}</TableCell>
                    <TableCell>{item.dosage}</TableCell>
                    <TableCell>{item.rounds}</TableCell>

                    <TableCell>
                      <Controls.ActionButton
                        color="primary"
                        title="ViewDetial"
                        variant="contained"
                        onClick={() => {
                          openInPopup(item.id)
                        }}
                      >
                        <ViewListIcon fontSize="medium" />
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
        title="Ranch Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      ></Popup>
    </OftadehLayout>
  )
}

export default ManageRanch
