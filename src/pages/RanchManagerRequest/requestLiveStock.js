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
import RequestLiveStock from './requestLiveStocks'
import LiveStockApiRequests from '../posts/ranchMangment/request/ranchManagerLiveStock'
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
  console.log(props.data)
  const [liveStock, setLiveStock] = React.useState([])
  const [order, setOrder] = React.useState([])
  React.useEffect(() => {
 console.log(props.data.type)
 setLiveStock(props.data)
  }, [])

console.log(liveStock)
  /*
createdAt: "2022-03-26T09:59:12.000Z"
currency: "USD"
delivery_method: "gate"
destination: ""
email: "alemgenateferi1@gmail.com"
firstName: "alemgen"
id: "3ed23857-fc15-4f20-bc46-e9b651b36d56"
lastName: null
orderDate: "2022-03-26T09:59:08.106Z"
origin: "Ethiopia Origin"
phoneNo: "0948320125"
productId: "13"
quantity: "1"
totalPrice: "75"
*/
  return (
    <div>
      <DialogTitle id="scroll-dialog-title" style={{ marginTop: '10px' }}>
        Live Stock Request
      </DialogTitle>
      <DialogContent>
        <List>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Breed</StyledTableCell>
                  <StyledTableCell>Age</StyledTableCell>
                  <StyledTableCell>Color</StyledTableCell>
                  <StyledTableCell>Quantity</StyledTableCell>
                  <StyledTableCell>Weight</StyledTableCell>
                  <StyledTableCell>Product Name</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell>{liveStock.breed}</StyledTableCell>
                  <StyledTableCell>{liveStock.age}</StyledTableCell>
                  <StyledTableCell>{liveStock.color}</StyledTableCell>
                  <StyledTableCell>{liveStock.quantity}</StyledTableCell>
                  <StyledTableCell>{liveStock.weight} Kg</StyledTableCell>
                  <StyledTableCell>{liveStock.type}</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
       </List>
      </DialogContent>
    </div>
  
  )
}
