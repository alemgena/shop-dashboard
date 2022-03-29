import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import{url} from '../../utiles/config'
import Controls from '../../components/ui/controls/Controls'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReplayIcon from '@mui/icons-material/Replay';
import Checkbox from '@mui/material/Checkbox';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
     backgroundColor: '#203040',
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



export default function CustomizedTables(props) {
const[user,setUser]=React.useState([]);
  React.useEffect(() => {
         let token = localStorage.getItem('token')
axios.get(`${url}/ranch-manager-livestocksupplier-livestocks/${props.id}`,{ headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
      }})
.then((response)=>{
  console.log(response.data.liveStock)
  setUser(response.data.liveStock)
})
  },[])
    console.log(props)
      const [selectedRows, setSelectedRows] =React.useState([])
       const [selected, setSelected] = React.useState([]);
 

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };




  const isSelected = (name) => selected.indexOf(name) !== -1;
  return (
    <TableContainer component={Paper}>
       
      <Table
           onSelectionChange={(rows) => setSelectedRows(rows)}
             options={{
          selection: true
        }}
      sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
                      <Checkbox
          />
            <StyledTableCell>Breed</StyledTableCell>
            <StyledTableCell >Age</StyledTableCell>
            <StyledTableCell>TagNo</StyledTableCell>
            <StyledTableCell>Type</StyledTableCell>
            <StyledTableCell >Ranch</StyledTableCell>
               <StyledTableCell>Residential</StyledTableCell>
               
          </TableRow>
        </TableHead>
           {user.map((row) => (
        <TableBody
      
         >
       
            <StyledTableRow key={row.name}
        
          
            >
                     <Checkbox
          />
              <StyledTableCell >{row.breed}</StyledTableCell>
              <StyledTableCell >{row.age}</StyledTableCell>
              <StyledTableCell >{row.tagNo}</StyledTableCell>
              <StyledTableCell >{row.type}</StyledTableCell>
                 <StyledTableCell >{row.ranchname}</StyledTableCell>
                     <StyledTableCell>{row.residential}</StyledTableCell>
                   
            </StyledTableRow>

        </TableBody>
                    
          ))}
      </Table>
    </TableContainer>
  );
}