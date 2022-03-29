import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import OftadehLayout from '../../components/OftadehLayout/OftadehLayout';
import OftadehBreadcrumbs from '../../components/OftadehBreadcrumbs/OftadehBreadcrumbs';
import { makeStyles, TextField } from '@material-ui/core'
import { Typography } from '@mui/material';
import { url } from '../../utiles/config';
import axios  from 'axios';
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const headCells = [
  { id: 'type', label: 'Type' },
  { id: 'name', label: 'Name' },
  { id: 'quantity', label: 'Quantity' },
  { id: 'dosAge', label: 'DosAge' },
  { id: 'productionDate', label: 'ProductionDate' },
  { id: 'expirationDate', label: 'ExpirationDate' },
  { id: 'residential', label: 'Residentioal' },
  { id: 'actions', label: 'Actions', disableSorting: true },
]


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function CustomizedTables(props) {
    const classes=useStyles();
      const { history } = props
              let token = localStorage.getItem('token')
              const[ranchSupplay,setranchSUpplay]=React.useState([])
       React.useEffect(() => {
   axios.get(`${url}/ranch-manager-view-ranch-supply`, {
    headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
    //  userSessionExpired(response, navigate);
        console.log(response)
     setranchSUpplay(response.data.supplies)
      })
      .catch((err) => err);
        },[])
        console.log("jjj",ranchSupplay)
  return (
        <OftadehLayout>
      <Typography className={classes.mb3} variant="h5" component="h1">
        Ranch Mangement
      </Typography>
      <OftadehBreadcrumbs path={history} />
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
              
                       <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align="right">Type</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">DosAge</StyledTableCell>
             <StyledTableCell align="right">ProductionDate</StyledTableCell>
            <StyledTableCell align="right">ExpirationDate</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ranchSupplay&& ranchSupplay.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.quantity}</StyledTableCell>
              <StyledTableCell align="right">{row.dosAge}</StyledTableCell>
              <StyledTableCell align="right">{row.expirationDate}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </OftadehLayout>
  );
}
