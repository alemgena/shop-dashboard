import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import axios from 'axios'
import { url } from '../../utiles/config'
import Controls from '../../components/ui/controls/Controls'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ReplayIcon from '@mui/icons-material/Replay'
import Notification from '../../components/ui/Notification'
import Notify from '../../components/ui/Notify'
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox'
//import Button from '@mui/material/Button'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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
  '&: td, th': {
    border: '6px solid rgba(224, 224, 224, 1)',
  },
}))
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function CustomizedTables(props) {
  const { NotifyMessage, notify, setNotify } = Notify()
  const [user, setUser] = React.useState([])
  const viewAllMedicen=()=>{
     let token = localStorage.getItem('token')
    return fetch(`${url}/ranch-manager-view-ranch-medicine`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      return response.json()
    })
  }
  const viewAllVaccine = () => {
    let token = localStorage.getItem('token')
    return fetch(`${url}/ranch-manager-view-ranch-vaccine`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      return response.json()
    })
  }
  const [vaccien, setVaccien] = React.useState([])
    const [medicen, setMedicen] = React.useState([])
  React.useEffect(() => {
    let token = localStorage.getItem('token')
    axios
      .get(`${url}/ranch-manager-livestocksupplier-livestocks/${props.id}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
       
        setUser(response.data.liveStock)
      })
    viewAllVaccine().then((data) => {

      data.vaccines.forEach((el) => {
        setVaccien(el.vaccines)
      })

    })
    viewAllMedicen().then((data)=>{
    
      data.medicine.forEach((el)=>{
setMedicen(el.medicines)
      })
    })
  }, [])

  const [dat, setData] = React.useState()
  const [box, setBox] = React.useState('')
  const [checked, setChecked] = React.useState(false)
const[buttonDisable,setButtonDisable]=React.useState(true)
  const getUserValue = (e,id) => {
    setButtonDisable(false)
    let isChecked = e.target.checked
    if (isChecked) {
      setChecked(true)
      setData({ vaccienId: e.target.value, liveStockId: props.id })
    }
    else{
        let copiedShopCart = {...dat};
          delete copiedShopCart[id];
      setData( data => ({
      ...copiedShopCart
    }));
    }
  }
  const[roundErr,setRoundErr]=React.useState(false)
    const[severity,setSeverity]=React.useState()
     const[roundErrMessage,setRoundErrMessage]=React.useState(false)
     const[temp,setTemp]=React.useState();
     const[roundCheck,setRoundCheck]=React.useState(false)
     const[disabled,setDisabled]=React.useState(false)
  const sendVaccien = (id,item) => {

vaccienId(id).then((data)=>{
  console.log(data)
  if(data.err){
    setRoundErr(true)
    setRoundErrMessage(data.err)
    setSeverity('error')
    console.log('errr')
   NotifyMessage({
          message: data.err,
          type: 'error',
        })
  }
  else{
    localStorage.setItem('item',item)
    setDisabled(true)
if(data.resualt){
setTemp(data.result.currentRound);
}
else{
  setTemp(data.vaccinationFollowup.currentRound)
}
       setRoundErr(true)
       setSeverity('success')
    setRoundErrMessage('LiveStock vaccienet successfuly ' )
  }
})
  }

  const vaccienId=(id)=>{
    let token = localStorage.getItem('token')
    return fetch(`${url}/${dat.vaccienId}/vaccinateLiveStocks/${id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      return response.json()
    })


  }
  const[conut,setCount]=React.useState();
  console.log(conut)
  return (
    <div>
        <Collapse in={roundErr}>
        <Alert severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setRoundErr(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
       {roundErrMessage}
        </Alert>
      </Collapse>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>LiveStocks(TagNo)</StyledTableCell>
            <StyledTableCell>Vaccine</StyledTableCell>
          </TableRow>
        </TableHead>
        {user.map((row) => (
          <TableBody>
            <StyledTableRow key={row.id}>
              <StyledTableCell>{row.tagNo}</StyledTableCell>
              <StyledTableCell>
                {vaccien.map((va) => (
         
                  <span>
                    <TableHead>
                      <TableRow>
                        Vaccine :{va.name}
                        <Button
                        disabled={buttonDisable}
    variant="contained"
   style={{ backgroundColor: '#203040',
    marginLeft:'30px', color: 'white',
    maxWidth: '40px', maxHeight: '10px', 
    minWidth: '30px', minHeight: '30px' }}
                          onClick={() => {
                            sendVaccien(row.id)
                          }}
                        >
                          Add
                        </Button>
                      </TableRow>
                    </TableHead>
                    <StyledTableRow>
                      <StyledTableCell key={va.id}>
                        {Array.from(Array(va.rounds), (e,i) => {
                        
                          return (
                            <span>
                              <StyledTableCell>Runds <span>{i+1}</span></StyledTableCell>
                              <StyledTableRow>
                                <StyledTableCell>
                                  <Checkbox
                                    value={va.id}
                                    onChange={(e) => getUserValue(e,i+1)}
                                  />

                                </StyledTableCell>
                              </StyledTableRow>
                            </span>
                          )
                        })}
                      </StyledTableCell>
                    </StyledTableRow>
                  </span>
                ))}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        ))}
      </Table>
    </TableContainer>
    </div>
  )
}
