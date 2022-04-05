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
import AllLiveStock from '../../posts/ranchMangment/request/InspectorRequest/AllLiveStock'
import produce from 'immer'
import PageSpinner from '../../../components/ui/PageSpinner'
//import OftadehLayout from '../../../components/Layout/Layout'
import OftadehLayout from '../../../components/Layout/Layout'
import OftadehBreadcrumbs from '../../../components/OftadehBreadcrumbs/OftadehBreadcrumbs'
import { makeStyles, TextField } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import ViewListIcon from '@mui/icons-material/ViewList';
import { ranchSlice } from '../../../slice/ranch'
import { Button } from '@mui/material'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


const headCells = [
  { id: 'name', label: 'Name' },
  { id: 'area', label: 'Area' },
  { id: 'location', label: 'Location' },
  { id: 'distance', label: 'Distance' },
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
    card: {
    width: 200,
    height:250,
   backgroundColor: "green"
    
  },
  cardMedia:{
      fontSize: 100,
  }
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
  const { viewAllLiveStock, deleteRanch } = AllLiveStock()
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
    viewAllLiveStock().then((data) => {
      console.log(data)
      if (data.err) {
        NotifyMessage({
          message: data.err,
          type: 'error',
        })
      } else if (data.totalNumber){
        setLoading(false)
        setRanchs(data.totalNumber)
        dispatch(ranchAction.setRanchs(data.ranches))
      }
    })
  }, [])


  return (
    <OftadehLayout>
      <Typography className={classes.mb3} variant="h5" component="h1">
        Ranch Mangement
      </Typography>
      <OftadehBreadcrumbs path={history} />
       <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
  style={{ minHeight: '100vh' }}
 >
          <Card style={{ color: 'white', backgroundColor: '#e91e63' }}
          className={classes.card}>
      <CardContent 
      style={{marginLeft:"40px"}}
      className={classes.cardMedia}>
   {ranchs}
      </CardContent>
  
    </Card>
        </Grid>
    </OftadehLayout>
  )
}

export default ManageRanch
