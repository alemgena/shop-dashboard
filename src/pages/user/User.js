import * as React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import Button from '@mui/material/Button'
import { useState, useRef } from 'react'
import JoditEditor from 'jodit-react'
import AddIcon from '@mui/icons-material/Add'
// import { EditorState, convertToRow } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TableHead from '@mui/material/TableHead'
import OftadehLayout from '../../components/OftadehLayout/OftadehLayout'
import OftadehBreadcrumbs from '../../components/OftadehBreadcrumbs/OftadehBreadcrumbs'
import { Typography, makeStyles, TextField } from '@material-ui/core'
//import AddPostRightPanels from '../../../components/extra/AddPostRightPanels/AddPostRightPanels'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import { Grid, Toolbar } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { Close } from '@material-ui/icons'
import Divider from '@mui/material/Divider';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})
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
    // - The TextField-root
    // - Make the border more distinguishable

    // (Note: space or no space after & matters. See SASS "parent selector".)
    '& .MuiOutlinedInput-root': {
      // - The Input-root, inside the TextField-root
      '& fieldset': {
        // - The <fieldset> inside the Input-root
        borderColor: '#203040',

        // - Set the Input border
      },
      '&:hover fieldset': {
        borderColor: '#203040',

        // - Set the Input border when parent has :hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#203040',
        label: {
          display: 'none',
        }, // - Set the Input border when parent is focused
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
  // demoEditor: {
  //   border: "1px solid #eee",
  //   padding: "5px",
  //   borderRadius: "2px",
  //   height: "350px"
  // }
}))
function TablePaginationActions(props) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  )
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
}
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Cupcake', 305, 3.7),
  createData('Donut', 452, 25.0),
  createData('Eclair', 262, 16.0),
  createData('Frozen yoghurt', 159, 6.0),
  createData('Gingerbread', 356, 16.0),
  createData('Honeycomb', 408, 3.2),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Jelly Bean', 375, 0.0),
  createData('KitKat', 518, 26.0),
  createData('Lollipop', 392, 0.2),
  createData('Marshmallow', 318, 0),
  createData('Nougat', 360, 19.0),
  createData('Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1))

export default function User(props) {
  const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const [open, setOpen] = React.useState(false)
  const setOpenPopup = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const classes = useStyles()
  const { history } = props
  return (
    <OftadehLayout>
      <Typography className={classes.mb3} variant="h5" component="h1">
        User
      </Typography>
      <OftadehBreadcrumbs path={history} />
      <Toolbar>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <TextField
              id="outlined-basic"
              label="Search User"
              fullWidth
              variant="outlined"
              className={classes.borderTextField}
              InputLabelProps={{
                className: classes.formLabel,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              style={{
                marginTop: '10px',
                backgroundColor: '#203040',
                color: 'white',
                fontFamily: 'Times New Roman',
              }}
              variant="outlined"
              startIcon={<AddIcon />}
        
              onClick={() => {
                setOpenPopup()
              }}
            >
              Add New
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
      <Dialog
        fullWidth
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box position="absolute" top={0} right={0}>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
    

        <Box
          style={{ marginLeft: '10px', marginTop: '30px' }}
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '30ch' },
          }}
          noValidate
          autoComplete="off"
        > 
             <Typography className={classes.mb3} variant="h5" component="h1">
        User Form
      </Typography>
     
              <Divider  sx={{ fontSize:"32px", width:"50px"}}/>
          <TextField
            id="outlined-basic"
            className={classes.borderTextField}
            InputLabelProps={{
              className: classes.formLabel,
            }}
            label="FirstName"
            variant="outlined"
            style={{ width: '45%' }}
          />
          <TextField
            style={{ width: '45%' }}
            id="filled-basic"
            className={classes.borderTextField}
            InputLabelProps={{
              className: classes.formLabel,
            }}
            label="LastName"
            variant="outlined"
          />
          <TextField
            style={{ width: '45%' }}
            id="standard-basic"
            className={classes.borderTextField}
            InputLabelProps={{
              className: classes.formLabel,
            }}
            label="Email"
            variant="outlined"
          />
          <TextField
            style={{ width: '45%' }}
            id="standard-basic"
            sx={{ width: 350 }}
            className={classes.borderTextField}
            InputLabelProps={{
              className: classes.formLabel,
            }}
            label="UserName"
            variant="outlined"
          />
          <TextField
            id="standard-basic"
            style={{ width: '45%' }}
            className={classes.borderTextField}
            InputLabelProps={{
              className: classes.formLabel,
            }}
            label="UserName"
            variant="outlined"
          />
        </Box>
             <Button style={{ backgroundColor: '#203040', width:'70px',marginLeft:"20px", marginBottom:"30px",marginTop:"30px" ,color: 'white' }}>
                Add
              </Button>
      </Dialog>
      <TableContainer style={{ marginTop: '20px', marginLeft:"25px",}} component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead
            style={{
              backgroundColor: '#203040',
              color: 'white',
              fontFamily: 'Times New Roman',
            }}
          >
            <TableRow style={{ color: 'white' }}>
              <TableCell style={{ color: 'white' }} align="right">
                First Name{' '}
              </TableCell>
              <TableCell style={{ color: 'white' }} align="right">
                Last Name
              </TableCell>
              <TableCell style={{ color: 'white' }} align="right">
                PhoneNo
              </TableCell>
              <TableCell style={{ color: 'white' }} align="right">
                Email
              </TableCell>
              <TableCell style={{ color: 'white' }} align="right">
                UserName
              </TableCell>

              <TableCell style={{ color: 'white' }} align="right">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableFooter></TableFooter>
        </Table>
      </TableContainer>
    </OftadehLayout>
  )
}
