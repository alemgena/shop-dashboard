import React from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core/'
import { IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Dialog from '@material-ui/core/Dialog'
import Box from '@mui/material/Box'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import FormGroup from '@mui/material/FormGroup'
import Checkbox from '@mui/material/Checkbox'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
  backgroundColor: '#203040',
    color: theme.palette.common.white,
  }, 
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))
export default function RanchSupplayDetail(props) {
  const [ranch, setRanch] = React.useState([])
  const[food,setFood]=React.useState([]);
    const[protien,setProtien]=React.useState([]);
      const[medicen,setMedicen]=React.useState([]);
        const[vaccien,setVaccien]=React.useState([]);
        console.log(props.data)
  React.useEffect(() => {
    setRanch(props.data)
      props.data.forEach((el)=>{
    setFood(el.food) 
})
    props.data.forEach((el)=>{
    setProtien(el.protien) 
})
    props.data.forEach((el)=>{
    setVaccien(el.vaccines) 
})
    props.data.forEach((el)=>{
    setMedicen(el.medicen) 
})
  }, [])
  console.log(food)
console.log(vaccien)
/*
ExpirationDate: "2/3/2022"
createdAt: "2022-03-24T09:29:59.000Z"
deliveryStatus: "sent"
discription: "hgvhjknkjn"
dosage: "6"
id: "68c0eb2e-ffe3-4c6f-afe4-da679ef349a9"
name: "ggh"
productionDate: "2/3/2022"
quantity: "7"
ranchId: "c5b388ad-4359-4c95-8ba3-e0ea04f7e243"
ranchname: "ranch12"
source: "jmain"


*/

  return (
    <div>
      <DialogTitle id="scroll-dialog-title" style={{ marginTop: '10px' }}>
  Food Ranch Supplay
      </DialogTitle>
      <DialogContent>
        <List>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>DeliveryStatus</StyledTableCell>
            <StyledTableCell >Quantity</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>source</StyledTableCell>
            <StyledTableCell >Ranch</StyledTableCell>
                    <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {food.map((row) => (
            <StyledTableRow key={row.deliveryStatus}>
              <StyledTableCell >{row.deliveryStatus}</StyledTableCell>
              <StyledTableCell >{row.quantity}</StyledTableCell>
              <StyledTableCell >{row.name}</StyledTableCell>
              <StyledTableCell >{row.source}</StyledTableCell>
                 <StyledTableCell >{row.ranchname}</StyledTableCell>
                     <StyledTableCell>
                    
                      </StyledTableCell>
            </StyledTableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
       <DialogTitle id="scroll-dialog-title" style={{ marginTop: '10px' }}>
  Vaccine Ranch Supplay
      </DialogTitle>
       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>DeliveryStatus</StyledTableCell>
            <StyledTableCell >Quantity</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>source</StyledTableCell>
            <StyledTableCell >Ranch</StyledTableCell>
                    <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vaccien.map((row) => (
            <StyledTableRow key={row.deliveryStatus}>
              <StyledTableCell >{row.deliveryStatus}</StyledTableCell>
              <StyledTableCell >{row.quantity}</StyledTableCell>
              <StyledTableCell >{row.name}</StyledTableCell>
              <StyledTableCell >{row.source}</StyledTableCell>
                 <StyledTableCell >{row.ranchname}</StyledTableCell>
                     <StyledTableCell>
                    
                      </StyledTableCell>
            </StyledTableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
 <DialogTitle id="scroll-dialog-title" style={{ marginTop: '10px' }}>
  Protien Ranch Supplay
      </DialogTitle>
       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ExpirationDate</StyledTableCell>
            <StyledTableCell >ProductionDate</StyledTableCell>
            <StyledTableCell>DeliveryStatus</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
                 <StyledTableCell >Source</StyledTableCell>
            <StyledTableCell >Ranch</StyledTableCell>
                    <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {food.map((row) => (
            <StyledTableRow key={row.ExpirationDate}>
                 <StyledTableCell >{row.ExpirationDate}</StyledTableCell>
              <StyledTableCell >{row.productionDate}</StyledTableCell>
              <StyledTableCell >{row.deliveryStatus}</StyledTableCell>
              <StyledTableCell >{row.name}</StyledTableCell>
              <StyledTableCell >{row.source}</StyledTableCell>
                 <StyledTableCell >{row.ranchname}</StyledTableCell>
                     <StyledTableCell>
                    
                      </StyledTableCell>
            </StyledTableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <DialogTitle id="scroll-dialog-title" style={{ marginTop: '10px' }}>
  Medicen Ranch Supplay
      </DialogTitle>
       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>DeliveryStatus</StyledTableCell>
            <StyledTableCell >Quantity</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Source</StyledTableCell>
            <StyledTableCell >Ranch</StyledTableCell>
                    <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {food.map((row) => (
            <StyledTableRow key={row.deliveryStatus}>
              <StyledTableCell >{row.deliveryStatus}</StyledTableCell>
              <StyledTableCell >{row.quantity}</StyledTableCell>
              <StyledTableCell >{row.name}</StyledTableCell>
              <StyledTableCell >{row.source}</StyledTableCell>
                 <StyledTableCell >{row.ranchname}</StyledTableCell>
                     <StyledTableCell>
                    
                      </StyledTableCell>
            </StyledTableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </List>
       
      </DialogContent>
    </div>
  )
}
